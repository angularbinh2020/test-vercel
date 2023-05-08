import { ITagYoutubeHotspot } from "./ITagYoutubeHotspot";
import { ITagTikTokHotspot } from "./ITagTikTokHotspot";
import { ITagPdfHotspot } from "./ITagPdfHotspot";
import { ITagMenuHotspot } from "./ITagMenuHotspot";
import { ITagInstagramHotspot } from "./ITagInstagramHotspot";
import { ITagGoogleMapHotspot } from "./ITagGoogleMapHotspot";
import { ITagFeedbackHotspot } from "./ITagFeedbackHotspot";
import { ITagFacebookHotspot } from "./ITagFacebookHotspot";
import { IHotSpotIcon } from "models/IHotSpotIcon";
import { AdsTypes } from "../const/vr360";
import { ITagIFrameHotspot } from "./ITagIFrameHotspot";
import { ITagTextHotspot } from "./ITagTextHotspot";
import { ITagVideoHotspot } from "./ITagVideoHotspot";
import { IYawPitch } from "./IVR360";

export interface IImageTarget {
  title: string;
  thumbnailUrl: string;
  id: number;
}

export type TagHotSpotConfig =
  | ITagTextHotspot
  | ITagVideoHotspot
  | ITagIFrameHotspot
  | ITagFacebookHotspot
  | ITagFeedbackHotspot
  | ITagGoogleMapHotspot
  | ITagInstagramHotspot
  | ITagMenuHotspot
  | ITagPdfHotspot
  | ITagTikTokHotspot
  | ITagYoutubeHotspot;

export interface IHotSpot {
  id?: any;
  icon?: IHotSpotIcon;
  title?: string;
  yaw?: number;
  pitch?: number;
  imageTargetId?: number;
  onClick?: any;
  imageTarget?: IImageTarget;
  width?: number;
  mobileScale?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  radius?: number;
  height?: number;
  defaultView?: IYawPitch;
  tagHotSpotConfig?: TagHotSpotConfig;
}

export interface ICommonHotSpotOption {
  viewer?: any;
  scene?: any;
  hotSpotConfig?: IHotSpot;
  onClickRemoveHotSpot?: any;
  onClickEditHotSpot?: any;
  onChangeHotPosition?: any;
  ads?: {
    type: AdsTypes;
    url: string;
    YoutubeId: string;
  };
}
