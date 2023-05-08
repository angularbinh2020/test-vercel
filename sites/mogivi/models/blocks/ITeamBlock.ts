import { IETTeamItem } from "../IETTeamItem";

export interface ITeamBlock {
  system: {
    contentType: "teamBlock";
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
    team: IETTeamItem[];
  };
}
