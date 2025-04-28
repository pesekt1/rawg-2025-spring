import { useQuery } from "@tanstack/react-query";
import ApiClient, { Response } from "../../services/api-client";
import stores from "./stores";
import ms from "ms";

export interface Store {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

const apiClient = new ApiClient<Store>("/stores");

const useStores = () =>
  useQuery<Response<Store>, Error>({
    queryKey: ["stores"],
    queryFn: apiClient.getAll,
    staleTime: ms("1d"),
    cacheTime: ms("1d"),
    initialData: stores,
  });

export default useStores;
