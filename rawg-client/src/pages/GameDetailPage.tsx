import { Heading, Spinner, Text } from "@chakra-ui/react";
import useGame from "../domain/game/useGame";
import { useParams } from "react-router-dom";

const GameDetailPage = () => {
  const { id } = useParams();
  const { data: game, error, isLoading } = useGame(Number(id));

  if (isLoading) return <Spinner />;
  if (error || !game) throw error;

  return (
    <>
      <Heading>{game.name}</Heading>
      <Text>{game.description_raw}</Text>
    </>
  );
};

export default GameDetailPage;
