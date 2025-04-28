import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const LIMIT = 300;

  if (!children) return null;

  if (children.length <= LIMIT) return <Text>{children}</Text>;

  return (
    <Text>
      {!isExpanded ? children.slice(0, LIMIT) + "..." : children}
      <Button
        size="xs"
        marginLeft={1}
        colorScheme="yellow"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {!isExpanded ? "Show more" : "Show less"}
      </Button>
    </Text>
  );
};

export default ExpandableText;
