import { ReactElement } from "react";
import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";

export type DrawerMenuConfiguration = {
  title: string;
  list: ListItem[];
};

export interface ListItemIndex extends IndexRouteObject {
  id: string;
  text?: string;
  icon?: ReactElement;
}

export interface ListItemNonIndex extends NonIndexRouteObject {
  id: string;
  text?: string;
  icon?: ReactElement;
  children?: ListItem[];
}

export type ListItem = ListItemIndex | ListItemNonIndex;
