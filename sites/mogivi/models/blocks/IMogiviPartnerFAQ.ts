import IBlockImage from "models/blocks/IBlockImage";
import { IETFAQItem } from "../IETFAQItem";

export interface IMogiviPartnerFAQ {
  system: {
    contentType: "mogiviPartnerFAQ";
    id: string;
  };
  fields: {
    title: string;
    fAQs: IETFAQItem[];
    adviceText: string;
    image: IBlockImage;
  };
}
