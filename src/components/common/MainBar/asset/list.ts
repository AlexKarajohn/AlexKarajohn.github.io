import { DrawerMenuConfiguration, DrawerMenuItem } from "src/types/types";
import PreviewIcon from "@mui/icons-material/Preview";
import HomeIcon from "@mui/icons-material/Home";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { createElement } from "react";
import TheaterComedySharpIcon from "@mui/icons-material/TheaterComedySharp";
import { v4 as uuid } from "uuid";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DirectionsSubwayFilledSharpIcon from "@mui/icons-material/DirectionsSubwayFilledSharp";

export const list: DrawerMenuItem[] = [
  {
    id: uuid(),
    text: "Home",
    icon: createElement(HomeIcon),
  },
  {
    id: uuid(),
    text: "Feature Display",
    icon: createElement(PreviewIcon),
    children: [
      {
        id: uuid(),
        text: "First Child",
      },
      {
        id: uuid(),
        text: "Second Child",
        icon: createElement(DirectionsSubwayFilledSharpIcon),
        children: [
          {
            id: uuid(),
            text: "Seconds Child First Child",
            icon: createElement(TheaterComedySharpIcon),
          },
          {
            id: uuid(),
            text: "Seconds Child Second Child",
            children: [
              {
                id: uuid(),
                text: "Seconds Child Seconds Child First Child",
                icon: createElement(VisibilityRoundedIcon),
              },
              {
                id: uuid(),
                text: "Seconds Child Seconds Child Second Child",
              },
            ],
          },
          {
            id: uuid(),
            text: "Seconds Child Third Child",
            icon: createElement(TheaterComedySharpIcon),
          },
        ],
      },
    ],
  },
  {
    id: uuid(),
    text: "Contact",
    icon: createElement(ContactPageIcon),
    route: "bob",
  },
];

export const menuConfiguration: DrawerMenuConfiguration = {
  title: "Main Menu",
  list: list,
};
