import { ListItem } from "src/types/types";
import { v4 as uuid } from "uuid";

export const listItemCreator = (listItem: Partial<ListItem>): ListItem => {
  return {
    ...listItem,
    id: uuid(),
  };
};
