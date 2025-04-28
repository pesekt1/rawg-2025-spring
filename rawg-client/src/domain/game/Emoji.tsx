import { ImageProps, Image } from "@chakra-ui/react";
import bullsEye from "../../assets/bulls-eye.webp";
import meh from "../../assets/meh.webp";
import thumbsUp from "../../assets/thumbs-up.webp";

interface Props {
  rating_top: number;
}

const Emoji = ({ rating_top }: Props) => {
  if (rating_top < 3) return null;

  const emojiMap: { [key: number]: ImageProps } = {
    3: { src: meh, alt: "meh", boxSize: "25px" },
    4: { src: thumbsUp, alt: "recommended", boxSize: "25px" },
    5: { src: bullsEye, alt: "exceptional", boxSize: "35px" },
  };

  return <Image marginTop={1} {...emojiMap[rating_top]} />;
};

export default Emoji;
