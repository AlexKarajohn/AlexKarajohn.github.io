import {
  DrawerMenuConfiguration,
  ListItem,
  RecommendationQuote,
  Skill,
} from "src/types/types";
import PreviewIcon from "@mui/icons-material/Preview";
import HomeIcon from "@mui/icons-material/Home";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { createElement } from "react";
import TheaterComedySharpIcon from "@mui/icons-material/TheaterComedySharp";
import { v4 as uuid } from "uuid";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DirectionsSubwayFilledSharpIcon from "@mui/icons-material/DirectionsSubwayFilledSharp";
import { Layout } from "../components/Layout/Layout";
import { Contact } from "src/pages/Contact/Contact";
import { Home } from "src/pages/Home/Home";

export const RouteList: ListItem[] = [
  {
    id: uuid(),
    text: "Home",
    icon: createElement(HomeIcon),
    path: "/",
    index: true,
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    id: uuid(),
    text: "Feature Display",
    icon: createElement(PreviewIcon),
    path: "/featureDisplay",
    element: <Layout />,
    children: [
      {
        id: uuid(),
        text: "First Child",
        path: "firstChild",
        element: <>1</>,
      },
      {
        id: uuid(),
        text: "Second Child",
        path: "SecondChild",
        icon: createElement(DirectionsSubwayFilledSharpIcon),
        children: [
          {
            id: uuid(),
            text: "Seconds Child First Child",
            icon: createElement(TheaterComedySharpIcon),
            path: "SecondsChildFirstChild",
            element: <>SecondsChildFirstChild</>,
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
    path: "/contact",
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
];

export const skillList: Skill[] = [
  { name: "React.Js", level: 95, years: 8 },
  { name: "Typescript", level: 85, years: 5 },
  { name: "Javascript", level: 95, years: 8 },
  { name: "ReduxJs", level: 90, years: 8 },
  { name: "Node.Js", level: 80, years: 7 },
  { name: "CI/CD", level: 90, years: 5 },
  { name: "Testing", level: 92, years: 6 },
  { name: "HTML", level: 90, years: 10 },
  { name: "CSS", level: 70, years: 8 },
  { name: "AWS", level: 50, years: 2 },
];

export const recommendationsList: RecommendationQuote[] = [
  {
    by: "Sean Fitzgerald",
    linkToLinkedIn: "https://www.linkedin.com/in/seantechart/",
    position: "Director, R&D at Veritone",
    quote:
      "Alexandros quickly took ownership over a key front end application after joining my team, making it easier to maintain and more testable.",
    relation: "Managed Alexandros Directly",
  },
  {
    by: "Whit Walker",
    linkToLinkedIn: "https://www.linkedin.com/in/whitwalker/",
    position: "VP of Products, at Veritone",
    quote:
      "He's got a knack for looking at the bigger picture, ensuring that whatever he builds isn’t just technically sound but also nails the user experience.",
    relation: "Worked with Alexandros on the same team",
  },
  {
    by: "Sumit Gupta",
    linkToLinkedIn: "https://www.linkedin.com/in/sumit-gupta-cto",
    position: "CTO at Pandologic",
    quote:
      "Alexandros excels in collaborating with cross-functional teams, consistently contributing his expertise to both engineering and product discussions.",
    relation: "Senior to Alexandros but didn't manage him directly",
  },
  {
    by: "Keisuke Inoue",
    linkToLinkedIn: "https://www.linkedin.com/in/keisukeinoue",
    position: "Director, Data Scientist at Pandologic",
    quote:
      "His ability to work swiftly and with meticulous attention to detail greatly enhanced the quality of our projects. He played a pivotal role in integrating the data science features our team developed into the front-end components he crafted, demonstrating his skill and versatility.",
    relation: "Senior to Alexandros but didn't manage him directly",
  },
  {
    by: "William Runyon",
    linkToLinkedIn: "https://www.linkedin.com/in/william-runyon",
    position: "Product Manager",
    quote:
      "A natural problem solver and an impressively holistic thinker, Alexandros immerses himself in the “why” of the challenge before applying exhaustive effort in determining the “how.”",
    relation: "Worked with Alexandros on the same team",
  },
];

export const menuConfiguration: DrawerMenuConfiguration = {
  title: "Main Menu",
  list: RouteList,
};
