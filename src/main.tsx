import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./Layout.tsx";
import Todos from "./apps/Todos.tsx";
import Notes from "./apps/Notes.tsx";

export const APPS: {
  [x: string]: RouteObject;
} = {
  todos: {
    path: "todos",
    element: <Todos />,
  },
  notes: {
    path: "notes",
    element: <Notes />,
  },
};

export const setLastOpen = (appKey: string) => {
  localStorage.setItem("last_open_app", appKey);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [...Object.values(APPS)],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
