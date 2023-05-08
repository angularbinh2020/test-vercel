import { IETProductItem } from "../IETProductItem";

export interface IProducts {
  system: {
    contentType: string;
    id: string;
  };
  fields: {
    title: string;
    items: IETProductItem[];
  };
}
