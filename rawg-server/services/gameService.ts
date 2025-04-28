import { SelectQueryBuilder } from "typeorm";
import { Game } from "../entities/Game";
import { AppDataSource } from "../startup/data-source";

const gameRepository = AppDataSource.getRepository(Game);

const addGenreFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  genreId: String | undefined
) => {
  if (genreId) {
    queryBuilder.andWhere((qb) => {
      const subQuery = qb
        .subQuery()
        .select("game.id")
        .from(Game, "game")
        .leftJoin("game.genres", "genres")
        .where("genres.id = :genreId", { genreId })
        .getQuery();
      return "game.id IN " + subQuery;
    });
  }
};

const addStoreFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  storeId: Number | undefined
) => {
  if (storeId) {
    queryBuilder.andWhere((qb) => {
      const subQuery = qb
        .subQuery()
        .select("game.id")
        .from(Game, "game")
        .leftJoin("game.stores", "stores")
        .where("stores.id = :storeId", { storeId })
        .getQuery();
      return "game.id IN " + subQuery;
    });
  }
};

const addParentPlatformFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  parentPlatformId: Number | undefined
) => {
  if (parentPlatformId) {
    queryBuilder.andWhere((qb) => {
      const subQuery = qb
        .subQuery()
        .select("game.id")
        .from(Game, "game")
        .leftJoin("game.parent_platforms", "parent_platforms")
        .where("parent_platforms.id = :parentPlatformId", { parentPlatformId })
        .getQuery();
      return "game.id IN " + subQuery;
    });
  }
};

const addOrdering = (
  queryBuilder: SelectQueryBuilder<Game>,
  ordering: String | undefined
) => {
  if (!ordering) {
    return;
  }
  //TODO: implement calculation of the relevance ordering
  if (ordering === "relevance") {
    queryBuilder.orderBy("game.rating", "DESC");
  }
  if (ordering === "-added") {
    queryBuilder.orderBy("game.added", "DESC");
  }
  if (ordering === "name") {
    queryBuilder.orderBy("game.name", "ASC");
  }
  if (ordering === "-released") {
    queryBuilder.orderBy("game.released", "DESC");
  }
  if (ordering === "-metacritic") {
    queryBuilder.orderBy("game.metacritic", "DESC");
  }
  if (ordering === "-rating") {
    queryBuilder.orderBy("game.rating", "DESC");
  }
};

const addSearch = (
  queryBuilder: SelectQueryBuilder<Game>,
  search: String | undefined
) => {
  if (search) {
    queryBuilder.andWhere("LOWER(game.name) LIKE :search", {
      search: `%${search}%`,
    });
  }
};

const buildGameQuery = (req: any) => {
  const genreId = req.query.genres ? String(req.query.genres) : undefined;
  const storeId = req.query.stores ? Number(req.query.stores) : undefined;
  const parentPlatformId = req.query.parent_platforms
    ? Number(req.query.parent_platforms)
    : undefined;
  const ordering = req.query.ordering ? String(req.query.ordering) : undefined;
  const search = req.query.search
    ? String(req.query.search).toLowerCase()
    : undefined;

  //query builder to get all games with their genres, parent_platforms, and stores
  const queryBuilder = gameRepository
    .createQueryBuilder("game")
    .leftJoinAndSelect("game.genres", "genres")
    .leftJoinAndSelect("game.parent_platforms", "parent_platforms")
    .leftJoinAndSelect("game.stores", "stores");

  addGenreFilter(queryBuilder, genreId);
  addStoreFilter(queryBuilder, storeId);
  addParentPlatformFilter(queryBuilder, parentPlatformId);
  addOrdering(queryBuilder, ordering);
  addSearch(queryBuilder, search);

  return queryBuilder;
};

const modifyGameResponse = (games: Game[]) => {
  return games.map((game) => ({
    ...game,
    parent_platforms: game.parent_platforms?.map((parent_platform) => ({
      platform: parent_platform,
    })),
  }));
};

export const getGames = async (req: any) => {
  const DEFAULT_PAGE_SIZE = 10;
  const DEFAULT_PAGE = 1;

  const page = req.query.page ? Number(req.query.page) : DEFAULT_PAGE;
  const pageSize = req.query.page_size
    ? Number(req.query.page_size)
    : DEFAULT_PAGE_SIZE;

  const queryBuilder = buildGameQuery(req);
  queryBuilder.skip((page - 1) * pageSize).take(pageSize);

  const [games, total] = await queryBuilder.getManyAndCount();
  const modifiedGames = modifyGameResponse(games);

  return {
    count: total,
    next:
      total > page * pageSize
        ? `${process.env.SERVER_URL}/games?page=${
            page + 1
          }&page_size=${pageSize}`
        : null,
    results: modifiedGames,
  };
};

export const getGame = async (id: string) => {
  const game = await gameRepository
    .createQueryBuilder("game")
    .leftJoinAndSelect("game.genres", "genres")
    .leftJoinAndSelect("game.parent_platforms", "parent_platforms")
    .leftJoinAndSelect("game.stores", "stores")
    .leftJoinAndSelect("game.publishers", "publishers")
    .where("game.id = :id", { id })
    .getOne();

  if (!game) {
    throw new Error("Game not found");
  }

  return {
    ...game,
    parent_platforms: game.parent_platforms?.map((parent_platform) => ({
      platform: parent_platform,
    })),
  };
};
