import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Game } from "./entities/Game";
import { Genre } from "./entities/Genre";
import { Store } from "./entities/Store";
import { ParentPlatform } from "./entities/ParentPlatform";
import { Publisher } from "./entities/Publisher";

const connectionString = process.env.DATABASE_URL;

//NOTE: There needs to be existing database named rawgDatabase in your MySQL server
export const AppDataSource = new DataSource({
  type: "mysql",
  url: connectionString,
  synchronize: true, // Set to false in production and use migrations instead
  logging: false,
  entities: [Game, Genre, Store, ParentPlatform, Publisher],
  migrations: [],
  subscribers: [],
});
