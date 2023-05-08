import { IBreadcrumb } from "../IBreadcrumb";
import { IETSettingsAPIItem } from "../IETSettingsAPIItem";
import { ISubcribeAPI } from "./ISubcribeAPI";

export interface IBreadcrumbsProjectPageBlock {
  system: {
    contentType: "breadcrumbsProjectPageBlock";
  };
  fields: {
    contentBgColour: string;
    disableDesktopWeb: boolean;
    disableMobileApp: boolean;
    disableMobileWeb: boolean;
    excludeFromSearch: boolean;
    itemTitle: string;
    pageSummary: string;
    showSocialShareIcons: boolean;
    settingsAPIBreadcrumb: IETSettingsAPIItem[];
    breadcrumbs?: IBreadcrumb[];
    subcribeAPI: ISubcribeAPI;
  };
}
