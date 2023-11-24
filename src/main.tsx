import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { theme } from "src/theme/theme.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { list } from "./components/common/MainBar/asset/list";
import { ListItem } from "./types/types";

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
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
