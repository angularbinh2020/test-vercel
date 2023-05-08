import { IETIconItem } from "../IETIconItem";

export interface IPromotionSteps {
  system: {
    contentType: string;
    id: string;
  };
  fields: {
    title: string;
    text: string;
    steps: IETIconItem[];
  };
}
