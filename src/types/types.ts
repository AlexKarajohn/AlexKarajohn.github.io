import { ReactElement } from "react";

export type DrawerMenuConfiguration = {
  title: string;
  list: DrawerMenuItem[];
};

export type DrawerMenuItem = {
  id: string;
  text: string;
  route?: string;
  icon?: ReactElement;
  children?: DrawerMenuItem[];
};
