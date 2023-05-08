import { IETServiceAnimatedItem } from "../IETServiceAnimatedItem";

export interface IServicesAnimatedBlock {
  system: {
    contentType: "servicesAnimated";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    items: IETServiceAnimatedItem[];
  };
}
