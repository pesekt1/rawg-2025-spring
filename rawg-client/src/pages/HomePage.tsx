import { Grid, Show, GridItem, Box, HStack } from "@chakra-ui/react";
import CustomList from "../components/CustomList";
import GameGrid from "../domain/game/GameGrid";
import GameHeading from "../domain/game/GameHeading";
import PlatformSelector from "../domain/platform/PlatformSelector";
import SortSelector from "../components/SortSelector";
import useGameQueryStore from "../state";
import useGenres from "../domain/genre/useGenres";
import useStores from "../domain/store/useStores";

const HomePage = () => {
  const { genreId, storeId } = useGameQueryStore((s) => s.gameQuery);
  const setGenreId = useGameQueryStore((s) => s.setGenreId);
  const setStoreId = useGameQueryStore((s) => s.setStoreId);

  return (
    <Grid
      templateAreas={{
        base: "main",
        lg: `"aside main"`,
      }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <Show above="lg">
        <GridItem area={"aside"}>
          <CustomList
            title="Genres"
            onSelectedItemId={setGenreId}
            selectedItemId={genreId}
            useDataHook={useGenres}
          />
          <CustomList
            title="Stores"
            onSelectedItemId={setStoreId}
            selectedItemId={storeId}
            useDataHook={useStores}
          />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <Box paddingLeft={2}>
          <GameHeading />
          <HStack>
            <PlatformSelector />
            <SortSelector />
          </HStack>
          <GameGrid />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
