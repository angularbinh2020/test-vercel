import { IETIconItem } from "../IETIconItem";

export interface IFeaturesBlock {
  system: {
    contentType: "featuresBlock";
  };
  fields: {
    title: string;
    subtitle: string;
    icons: IETIconItem[];
  };
}
