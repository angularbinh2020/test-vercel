import { IVR360 } from "sites/mogivi/models/IVR360";
import { IHotSpotIcon } from "models/IHotSpotIcon";
import { IAdsData } from "models/IAdsData";

export interface I360VrTourPageData {
  data: IVR360;
  tagIcons: IHotSpotIcon[];
  footerImages: IHotSpotIcon[];
  hotSpotIcons: IHotSpotIcon[];
  ads: IAdsData[];
  mogiverserId: any;
  mogiverseGetDetailApi: string;
  isEditView?: boolean;
  updateTourSettingApi: string;
}
