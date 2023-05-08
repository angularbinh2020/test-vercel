import ITag from "models/ITag";
import { IETKeyValueItem } from "../IETKeyValueItem";
import { IETSettingsAPIItem } from "../IETSettingsAPIItem";
import { ILinkInfo } from "../ILinkInfo";
export interface IInfoGridBlock {
  system: {
    contentType: "infoGridBlock";
  };
  fields: {
    disableDesktopWeb: boolean;
    disableMobileApp: boolean;
    disableMobileWeb: boolean;
    excludeFromSearch: boolean;
    contentBgColour: string;
    itemTitle: string;
    subtitle: string;
    introductionText: string;
    pageSummary: string;
    videoIntroduction: ILinkInfo;
    groupBlocks: IETKeyValueItem[];
    investorsTags: ITag[];
    settingsAPI: IETSettingsAPIItem[];
  };
}
