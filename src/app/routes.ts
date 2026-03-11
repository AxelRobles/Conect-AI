import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Search } from "./components/Search";
import { Integrations } from "./components/Integrations";
import { ResultsPage } from "./components/ResultsPage";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      {
        path: "/",
        Component: Root,
        children: [
          { index: true, Component: Search },
          { path: "integrations", Component: Integrations },
          { path: "search-results", Component: ResultsPage },
        ],
      },
    ],
  },
]);
