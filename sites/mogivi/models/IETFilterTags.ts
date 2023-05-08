import { ITagItem } from "./ITagItem";

export interface IETValuesFilterTagsItem {
  system: {
    contentType: "eTValuesFilterTagsItem";
    id: string;
  };
  fields: {
    title: string;
    parameter: string;
    filters: {
      contentName: string;
      contentSegmentUrl: string;
      node: any;
      id: string;
      linkType: string;
      type: string;
    };
    options: ITagItem[];
    selected: ITagItem;
    defaultValue: ITagItem;
  };
  filterOptions?: ITagItem;
}
