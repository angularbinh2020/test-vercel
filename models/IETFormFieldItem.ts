import { IETKeyValueItem } from "./IETKeyValueItem";

export interface IETFormFieldItem {
  system: {
    contentType: "eTFormFieldItem";
  };
  fields: {
    label: string;
    placeholder: string;
    elementName: string;
    required: boolean;
    fieldType: string;
    values: IETKeyValueItem[];
  };
}
