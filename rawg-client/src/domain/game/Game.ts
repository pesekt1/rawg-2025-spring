import { Genre } from "../genre/Genre";
import { Platform } from "../platform/Platform";
import { Publisher } from "../publisher/Publisher";
import { Store } from "../store/Store";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
  description_raw: string;
  genres: Genre[];
  stores: Store[];
  publishers: Publisher[];
}
