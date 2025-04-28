import { AppDataSource } from "./data-source";
import * as fs from "fs";
import { Game } from "./entities/Game";
import { Genre } from "./entities/Genre";
import { ParentPlatform } from "./entities/ParentPlatform";
import { Store } from "./entities/Store";
import axios from "axios";
import { Publisher } from "./entities/Publisher";

//We need this because the original data has a different structure
interface GameOriginal {
  id: number;
  description_raw?: string;
  name: string;
  background_image?: string;
  metacritic?: number;
  parent_platforms: { platform: ParentPlatform }[];
  genres: Genre[];
  stores: { store: Store }[];
  publishers: Publisher[];
}

async function getAdditionalGameData(id: number) {
  const apiKey = process.env.RAWG_API_KEY;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${apiKey}`
    );
    const description_raw: string = response.data.description_raw || "";
    const publishers: Publisher[] = response.data.publishers || [];
    return {
      description_raw,
      publishers,
    };
  } catch (error) {
    console.error(`Error fetching description for game ID ${id}:`, error);
    return null; // or handle the error as needed
  }
}

async function insertData() {
  await AppDataSource.initialize(); //initialize connection

  //get data from games.json and parse it.
  const rawData = fs.readFileSync("games.json", "utf-8");
  const parsedData = JSON.parse(rawData);
  const gamesOriginalData: GameOriginal[] = parsedData.results;
  //transform original data to match our entities
  const gamesData: Game[] = gamesOriginalData.map((game) => ({
    ...game,
    parent_platforms: game.parent_platforms.map((p) => p.platform),
    stores: game.stores.map((s) => s.store),
  }));

  //create repository instances for CRUD operations on entities
  const gameRepo = AppDataSource.getRepository(Game);
  const genreRepo = AppDataSource.getRepository(Genre);
  const platformRepo = AppDataSource.getRepository(ParentPlatform);
  const storeRepo = AppDataSource.getRepository(Store);
  const publisherRepo = AppDataSource.getRepository(Publisher);

  //before inserting data, delete all existing data
  await gameRepo.delete({});
  console.log("Games deleted");
  await genreRepo.delete({});
  console.log("Genres deleted");
  await platformRepo.delete({});
  console.log("Platforms deleted");
  await storeRepo.delete({});
  console.log("Stores deleted");
  await publisherRepo.delete({});
  console.log("Publishers deleted");

  //loop through the games and insert data in all tables
  for (const game of gamesData) {
    //get additional Data
    const { description_raw, publishers } =
      (await getAdditionalGameData(game.id)) || {};

    game.description_raw = description_raw;
    game.publishers = publishers || [];

    //check each publisher for a game and save it if it doesn't exist
    await Promise.all(
      game.publishers.map(async (p) => {
        let publisher = await publisherRepo.findOne({ where: { id: p.id } });
        if (!publisher) {
          publisher = await publisherRepo.save(p);
          console.log(`Publisher ${publisher.name} created`);
        }
        return publisher;
      })
    );

    //check each genre for a game and save it if it doesn't exist
    await Promise.all(
      game.genres.map(async (g) => {
        let genre = await genreRepo.findOne({ where: { id: g.id } });
        if (!genre) {
          genre = await genreRepo.save(g);
          console.log(`Genre ${genre.name} created`);
        }
        return genre;
      })
    );

    //check each store for a game and save it if it doesn't exist
    await Promise.all(
      game.stores.map(async (s) => {
        let store = await storeRepo.findOne({ where: { id: s.id } });
        if (!store) {
          store = await storeRepo.save(s);
          console.log(`Store ${store.name} created`);
        }
        return store;
      })
    );

    //check each platform for a game and save it if it doesn't exist
    await Promise.all(
      game.parent_platforms.map(async (p) => {
        let platform = await platformRepo.findOne({ where: { id: p.id } });
        if (!platform) {
          platform = await platformRepo.save(p);
          console.log(`Platform ${platform.name} created`);
        }
        return platform;
      })
    );

    //save the game - this will also save the relationships in the join tables
    await gameRepo.save(game);
    console.log(`Game ${game.name} created`);
  }

  //terminate the process
  process.exit();
}

insertData();
