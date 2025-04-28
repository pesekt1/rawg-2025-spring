import ApiClient from "../../services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Game } from "./useGames";

const apiClient = new ApiClient<Game>("/games");

const useGame = (gameId: number) =>
  useQuery<Game, Error>({
    queryKey: ["game", gameId],
    queryFn: () => apiClient.get(gameId),
    staleTime: Infinity,
  });

export default useGame;
