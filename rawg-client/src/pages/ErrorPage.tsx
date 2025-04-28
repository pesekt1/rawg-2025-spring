import { Box, Heading, Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar />
      <Box paddingX={3} paddingTop={3}>
        <Heading>Ooops...</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? "Page not found"
            : "Something went wrong"}
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;
