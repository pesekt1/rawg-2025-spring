import { Router } from "express";
import { getGames, getGame } from "../services/gameService";

const gameRouter = Router();

gameRouter.get("/", async (req, res) => {
  //getGames returns the modified object to with the client
  const response = await getGames(req);
  res.send(response);
});

gameRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const response = await getGame(id);
  res.send(response);
});

export default gameRouter;
