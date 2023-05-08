import ITag from "models/ITag";

export interface IETLocationItem {
  system: {
    contentType: "eTLocationItem";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    subtitle: string;
    streetTag: ITag;
    addressText: string;
    coordinatesX: string;
    coordinatesY: string;
  };
}
