import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Search } from "./components/Search";
import { Integrations } from "./components/Integrations";
import { ChatPage } from "./components/ChatPage";
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
          { path: "chat", Component: ChatPage },
        ],
      },
    ],
  },
]);
