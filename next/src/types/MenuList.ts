import { ReactElement } from "react";

export interface MenuList {
  label: string;
  link: string;
  icon: ReactElement;
  children?: Array<MenuList>;
}
