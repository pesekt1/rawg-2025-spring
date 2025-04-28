import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Game } from "../entities/Game";
import { Genre } from "../entities/Genre";
import { Store } from "../entities/Store";
import { ParentPlatform } from "../entities/ParentPlatform";
import { Publisher } from "../entities/Publisher";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: process.env.DATABASE_URL,
  synchronize: false, // Set to false in production and use migrations instead
  logging: true,
  entities: [Game, Genre, Store, ParentPlatform, Publisher],
  migrations: [],
  subscribers: [],
});
