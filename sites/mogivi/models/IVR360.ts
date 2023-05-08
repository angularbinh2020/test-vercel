import { IHotSpotIcon } from "models/IHotSpotIcon";
import { TOUR_STATUS } from "../const/vr360";
import { IHotSpot } from "./ICommonHotSpotOption";

export interface IYawPitch {
  yaw: number;
  pitch: number;
}
export interface ConnectedHotSpot {
  default_view: IYawPitch;
  coord_y_p: IYawPitch;
  ai_service_status: number;
  detectedConnectedSuccess: boolean;
  detectedDefaultViewSuccess: boolean;
  linked_room_id: string;
}

export interface Image360 {
  isCompletedSetup: boolean;
  tagHotSpots: any[];
  nextMarkerPosition: IHotSpot;
  previousMarkerPosition: IHotSpot;
  defaultView: IYawPitch;
  previewImageSize: number;
  originalWidth: number;
  originalHeight: number;
  id: number;
  gid: string;
  faceSize: number;
  customHotSpots: IHotSpot[];
  connectedHotspot: ConnectedHotSpot[];
  ads?: any;
  imageFooterCoverSetting?: FooterCoverSetting;
  hotspotIdsDetectedFail: number[];
  title: string;
}

export interface FooterCoverSetting {
  isUsed: boolean;
  yaw: number;
  pitch: number;
  width: number;
  height: number;
  radius: number;
  id: string;
  icon: IHotSpotIcon;
}

export interface ITourSettings {
  Image360s: Image360[];
  tourHotSpotIcon?: IHotSpotIcon;
  description: string;
  title: string;
  full_name: string;
}

export interface IImageJson {
  preview: string;
  titleImages: string[];
  titleSize: number;
  originalWidth: number;
  originalHeight: number;
  faceSize: number;
  roomPreview: string;
}

export interface IRoom {
  id: number;
  title: string;
  gid: string;
  status: string;
  panorama_360_url: string | null;
  images_json: string;
  imagesJsonParsed: IImageJson;
  panorama_url_preview: string;
}

export interface IVR360 {
  id: number;
  tour_settings: ITourSettings;
  title: string;
  phone: string;
  email: string;
  full_name: string;
  rooms: IRoom[];
  created_at: string;
  status: TOUR_STATUS;
  vr_tour_url_view: string;
  vr_tour_url: string;
}

export interface IImageList {
  id: number;
  thumbnailUrl: string;
  title: string;
}
