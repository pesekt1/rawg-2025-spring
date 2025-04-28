import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import ApiClient from "../../services/api-client";
import { Response } from "../../services/api-client";
import genres from "./genres";

export interface Genre {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

const apiClient = new ApiClient<Genre>("/genres");

const useGenres = () =>
  useQuery<Response<Genre>, Error>({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: ms("1d"),
    cacheTime: ms("1d"),
    initialData: genres,
  });

export default useGenres;
