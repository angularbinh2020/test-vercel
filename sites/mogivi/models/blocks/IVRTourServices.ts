import { IETServiceItem } from "../IETServiceItem";

export interface IVRTourServices {
  system: {
    contentType: "vRTourServices";
    id: string;
  };
  fields: {
    title: string;
    text: string;
    embedLink: string;
    items: IETServiceItem[];
  };
}
