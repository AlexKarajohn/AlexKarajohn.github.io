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

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

export type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export interface Skill {
  level: Range<0, 101>;
  name: string;
  years?: Range<0, 101>;
}

export interface RecommendationQuote {
  by: string;
  linkToLinkedIn?: string;
  position: string;
  relation: string;
  quote: string;
}
