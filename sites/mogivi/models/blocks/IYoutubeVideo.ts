import { ILinkInfo } from "../ILinkInfo";

export interface IYoutubeVideo {
  system: {
    contentType: "youtubeVideo";
    id: string;
  };
  fields: {
    itemTitle: string;
    oldCMSNodeId: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    link: ILinkInfo;
    youtubeID: string;
    description: string;
  };
}
