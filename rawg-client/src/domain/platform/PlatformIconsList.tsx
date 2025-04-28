import { HStack, Icon } from "@chakra-ui/react";

import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { Platform } from "./usePlatforms";

interface Props {
  platforms: Platform[];
}

const PlatformIconsList = ({ platforms }: Props) => {
  const getIcon = (slug: string) => {
    switch (slug) {
      case "pc":
        return FaWindows;
      case "playstation":
        return FaPlaystation;
      case "xbox":
        return FaXbox;
      case "mac":
        return FaApple;
      case "linux":
        return FaLinux;
      case "android":
        return FaAndroid;
      case "ios":
        return MdPhoneIphone;
      case "nintendo":
        return SiNintendo;
      default:
        return undefined;
    }
  };

  return (
    <HStack margin={1}>
      {platforms.map((platform) => (
        <Icon key={platform.id} as={getIcon(platform.slug)} />
      ))}
    </HStack>
  );
};

export default PlatformIconsList;
