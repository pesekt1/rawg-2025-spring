import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage";
import GameDetailPage from "./GameDetailPage";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/games/:id", element: <GameDetailPage /> },
    ],
  },
]);

export default router;
