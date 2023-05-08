import { TagHotspotTypes } from "sites/mogivi/const/tag-hotspot-types";

interface IFile {
  logoUrl: string;
  description: string;
}

interface IAssetType {
  keyword: TagHotspotTypes;
  name: string;
  nodeId: number;
}

export interface IHotSpotIcon {
  nodeId: number;
  name: string;
  keyword: string;
  file: IFile;
  assetType?: IAssetType;
}
