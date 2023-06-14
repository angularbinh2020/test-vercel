import { ETProjectAPISetting } from "../ETProjectAPISetting";
import { ILinkInfo } from "../ILinkInfo";

export interface IProjectsAPI {
  system: {
    contentType: "projectsAPI";
  };
  fields: {
    itemTitle: string;
    subtitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    settingAPI: ETProjectAPISetting[];
    themes: string;
    link: ILinkInfo;
    dataResult?: any[];
  };
}
