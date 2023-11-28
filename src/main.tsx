import React from "react";
import ReactDOM from "react-dom/client";

import CssBaseline from "@mui/material/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { list } from "./components/common/MainBar/asset/list";
import { ListItem } from "./types/types";
import { ThemeProvider } from "./theme/context/ThemeProvider";

const addErrorElement = (item: ListItem): ListItem => {
  if (item.children) {
    return {
      ...item,
      errorElement: <div>oops!</div>,
      children: item.children.map(addErrorElement),
    };
  }
  return {
    ...item,
    errorElement: <div>oops!</div>,
  };
};

const router = createBrowserRouter(list.map(addErrorElement));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
