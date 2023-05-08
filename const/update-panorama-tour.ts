import { MOGIVI_CONTENT_TYPE } from "sites/mogivi/const/content-type";
import VR_TOUR_API_URL from "./vr-tour-api-url";

export const UPDATE_PANORAMA_TOUR_URL = {
  [MOGIVI_CONTENT_TYPE.vrTourPlaceholder]:
    VR_TOUR_API_URL.UPDATE_MOBILE_PANORAMA_TOUR_SETTING,
  [MOGIVI_CONTENT_TYPE.thetaTourPlaceholder]:
    VR_TOUR_API_URL.UPDATE_THETA_PANORAMA_TOUR_SETTING,
};
