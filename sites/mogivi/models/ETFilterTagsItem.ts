import { IETSettingsAPIItem } from "./IETSettingsAPIItem";

export interface ETFilterTagsItem {
  system: {
    contentType: string;
    id: string;
  };
  fields: {
    title: string;
    parameterNameAPI: string;
    selectControlType: string;
    filterOptions: IProductTagItem[];
    options: PriceRangeOptions[];
  };
}

interface PriceRangeOptions {
  system: {
    id: string;
    contentType: string;
  };
  fields: {
    key: string;
    value: string;
  };
}

export interface IProductTagItem {
  contentSegmentUrl: string;
  contentName: string;
  id: string;
  node: {
    system: {
      id: string;
      contentType: string;
    };
    fields: {
      itemTitle: string;
      activities: any;
    };
  };
  type: string;
}

export interface IETLocationSuggestionAPIItem {
  system: {
    contentType: string;
    id: string;
  };
  fields: {
    placeholder: string;
    apiSettings: IETSettingsAPIItem[];
  };
}
