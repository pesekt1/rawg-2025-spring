import { SimpleGrid, Text } from "@chakra-ui/react";
import { Game } from "./Game";
import DefinitionItem from "../../components/DefinitionItem";
import CriticScore from "./CriticScore";

interface Props {
  game: Game;
}

const GameAttributes = ({ game }: Props) => {
  return (
    <SimpleGrid columns={2} as="dl">
      <DefinitionItem term="Platforms">
        {game.parent_platforms.map((platform) => (
          <Text>{platform.platform.name}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Genres">
        {game.genres.map((genre) => (
          <Text>{genre.name}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Stores">
        {game.stores.map((store) => (
          <Text>{store.name}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Publishers">
        {game.publishers.map((publisher) => (
          <Text>{publisher.name}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Metacritic Score">
        <CriticScore score={game.metacritic} />
      </DefinitionItem>
    </SimpleGrid>
  );
};

export default GameAttributes;
