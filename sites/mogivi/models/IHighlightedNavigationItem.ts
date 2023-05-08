import { ILinkInfo } from "./ILinkInfo";

export interface ISubMenu {
  system: {
    contentType: "links";
    id: string;
  };
  fields: {
    label: string;
    menus: ILinkInfo[];
  };
}

export interface IHighlightedNavigationItem {
  system: {
    contentType: "highlightedNavigationItem";
  };
  fields: {
    cmsTitle: string;
    node: {
      name: string;
      url: string;
      target: string | null;
      type: string;
    };
    subMenus: ISubMenu[];
    subMenus2: ISubMenu[];
  };
}
