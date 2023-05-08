import { IETKeyValueItem } from "./IETKeyValueItem";
import { ITagItem } from "./ITagItem";

export interface IETSettingsAPIItem {
  system: {
    contentType: "eTSettingsAPIItem";
  };
  fields: {
    backgroundColor: string;
    method: string;
    parameters: IETKeyValueItem[];
    apiKeyTag: {
      contentName: string;
      contentSegmentUrl: string;
      id: string;
      node: ITagItem;
      linkType: string;
      type: string;
    };
  };
}
