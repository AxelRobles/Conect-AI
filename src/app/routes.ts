import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Search } from "./components/Search";
import { Integrations } from "./components/Integrations";
import { ResultsPage } from "./components/ResultsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Search },
      { path: "integrations", Component: Integrations },
      { path: "search-results", Component: ResultsPage },
    ],
  },
]);
