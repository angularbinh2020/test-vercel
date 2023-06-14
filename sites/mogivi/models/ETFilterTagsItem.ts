import { IETSettingsAPIItem } from "./IETSettingsAPIItem";

interface Node {
  system: {
    id: string;
    contentType: string;
    urlSegment: string;
  };
  fields: {
    itemTitle: string;
    activities: any;
  };
}

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
  node: Node;
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
