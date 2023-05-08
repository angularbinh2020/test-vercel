import { AdsTypes } from "sites/mogivi/const/vr360";

export interface IAdsData {
  url: string;
  nodeId: number;
  name: string;
  keyword: string;
  adsType: {
    keyword: AdsTypes;
    name: string;
    nodeId: number;
  };
}
