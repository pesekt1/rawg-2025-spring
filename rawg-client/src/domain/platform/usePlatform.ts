import usePlatforms from "./usePlatforms";

const usePlatform = (selectedPlatformId?: number) => {
  const { data } = usePlatforms();
  const selectedPlatform = data?.results?.find(
    (platform) => platform.id === selectedPlatformId
  );

  return selectedPlatform;
};
export default usePlatform;
