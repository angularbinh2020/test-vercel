export interface IETIntroductionTextItem {
  system: {
    contentType: "eTIntroductionTextItem";
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
    introductionText: string;
  };
}
