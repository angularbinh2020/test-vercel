import { IETSettingsAPIItem } from "../IETSettingsAPIItem";
import { IETValuesFilterTagsItem } from "../IETFilterTags";

export interface IDocumentsFiltersBlock {
  system: {
    contentType: string;
  };
  fields: {
    contentBgColour: string;
    disableDesktopWeb: boolean;
    disableMobileApp: boolean;
    disableMobileWeb: boolean;
    excludeFromSearch: boolean;
    itemTitle: string;
    pageSummary: string;
    resultsPerPage: number;
    filtersOptions: IETValuesFilterTagsItem[];
    apiSearchSettings: IETSettingsAPIItem[];
  };
}
