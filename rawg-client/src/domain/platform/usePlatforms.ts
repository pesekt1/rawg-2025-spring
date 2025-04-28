import { useQuery } from "@tanstack/react-query";
import ApiClient, { Response } from "../../services/api-client";
import platforms from "./platforms";
import ms from "ms";
import { Platform } from "./Platform";

const apiClient = new ApiClient<Platform>("/platforms/lists/parents");

const usePlatforms = () =>
  useQuery<Response<Platform>, Error>({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,
    staleTime: ms("1d"),
    cacheTime: ms("1d"),
    initialData: platforms,
  });
export default usePlatforms;
