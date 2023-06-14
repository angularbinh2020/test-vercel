import { useCallback, useEffect, useState } from "react";
import { IVR360 } from "sites/mogivi/models/IVR360";
import { IHotSpotIcon } from "models/IHotSpotIcon";
import { IAdsData } from "models/IAdsData";
import HotSpotTemplate from "./components/HotSpotTemplate";
import styles from "./styles.module.scss";
import PhotoSphereContainer from "../PhotoSphereContainer";
import TopNavigation from "./components/TopNavigation";
import useRenderTour from "sites/mogivi/hooks/useRenderVRTour";
import BottomControls from "./components/BottomControls";
import MiniMap from "./components/MiniMap";
import TagInfoModal from "./components/TagInfoModal";
import useBoolean from "sites/mogivi/hooks/useBoolean";
import { IGetTourInfoResponse } from "sites/mogivi/models/apis/get-tour-info";
import axios from "apis/axios";
import { TOUR_SHOW_AGENCY_DETAIL } from "sites/mogivi/const/vr360";
import Tooltip from "@material-ui/core/Tooltip";
import AiDesktopDesignImg from "sites/mogivi/assets/icons/ai-design-destop.png";
import AiMobileDesignImg from "sites/mogivi/assets/icons/ai-mobile-design.png";
import AiIconDesignImg from "sites/mogivi/assets/icons/ai-icon.png";
import Image from "next/image";
import { isMobile } from "react-device-detect";
interface Props {
  pageData: {
    data: IVR360;
    tagIcons: IHotSpotIcon[];
    hotSpotIcons: IHotSpotIcon[];
    ads: IAdsData[];
    vrTourCheckStatusApi?: string;
  };
  onBack?: any;
}
const UserView = (props: Props) => {
  const {
    ads,
    tagIcons,
    hotSpotIcons,
    data: vr360Data,
    vrTourCheckStatusApi,
  } = props.pageData;
  const [aiTourUrl, setAiTourUrl] = useState();
  const [isLoadingStatus, closeLoadingStatus] = useBoolean(
    Boolean(vrTourCheckStatusApi)
  );
  const [isShowAgencyInfo, showMogiviInfo, showAgencyInfo] = useBoolean(
    !Boolean(vrTourCheckStatusApi)
  );
  const [iframeUrl, setIframeUrl] = useState("");
  const [currentUserInfo, setCurrentUserInfo] = useState({
    userName: "",
    userPhoneNumber: "",
  });
  const {
    initViewer,
    isAutoRotate,
    setAutoRotate,
    setCurrentHotSpotIcon,
    containerRef,
    currentImageSetting,
    setCurrentImageSetting,
    currentIndex,
    handleGoToImageSetting,
    handleGoToImageSettingByImageId,
    isDisabledPreviousButton,
    isDisabledNextButton,
    imagesSetting,
    viewer,
  } = useRenderTour({
    vr360: vr360Data,
    tagIcons,
    adsAvailable: ads,
  });

  const getTourStatus = useCallback(async () => {
    if (!vrTourCheckStatusApi) return;
    try {
      const res: IGetTourInfoResponse = (await axios.get(vrTourCheckStatusApi))
        .data;
      const isAllowShowAgency =
        res?.data?.allow_vr_tour === TOUR_SHOW_AGENCY_DETAIL.ALLOW;
      isAllowShowAgency ? showAgencyInfo() : showMogiviInfo();
      setAiTourUrl(res?.data?.ai_vr_tour_url);
    } catch (e) {
      console.error(e);
      showAgencyInfo();
    } finally {
      closeLoadingStatus();
    }
  }, []);

  useEffect(() => {
    const initImageSetting = imagesSetting.current[0];
    const selectedHotSpotIcon = hotSpotIcons[0];
    setCurrentHotSpotIcon(selectedHotSpotIcon);
    setCurrentImageSetting(initImageSetting);
    setTimeout(() => {
      initViewer();
    }, 500);
    getTourStatus();
  }, []);

  return (
    <>
      <div className={styles.previewWindowContainer}>
        <MiniMap
          className={styles.miniMap}
          viewer={viewer}
          handleGoToImageSettingByImageId={handleGoToImageSettingByImageId}
        />
        <PhotoSphereContainer isNotRectangle ref={containerRef} />
        <TopNavigation
          currentIndex={currentIndex}
          handleGoToImageSetting={handleGoToImageSetting}
          isDisabledPreviousButton={isDisabledPreviousButton}
          isDisabledNextButton={isDisabledNextButton}
          roomTitle={currentImageSetting?.title || ""}
        />
        {aiTourUrl && (
          <Tooltip
            placement="top"
            title={iframeUrl ? "Tour gốc" : "Tour edit by AI"}
          >
            <Image
              src={
                iframeUrl
                  ? AiIconDesignImg
                  : isMobile
                  ? AiMobileDesignImg
                  : AiDesktopDesignImg
              }
              alt={iframeUrl ? "Tour gốc" : "Tour edit by AI"}
              onClick={() => setIframeUrl(iframeUrl ? "" : aiTourUrl)}
              className={styles.switchViewAiTour}
            />
          </Tooltip>
        )}
        <BottomControls
          setCurrentUserInfo={setCurrentUserInfo}
          currentImageSetting={currentImageSetting}
          handleGoToImageSettingByImageId={handleGoToImageSettingByImageId}
          // tourDetail={tourDetail}
          isAutoRotate={isAutoRotate}
          setAutoRotate={setAutoRotate}
          // currentUserInfo={currentUserInfo}
          isShowImageSlide={true}
          data={vr360Data}
          onBack={props.onBack}
          isShowAgencyInfo={isShowAgencyInfo}
          isLoadingStatus={isLoadingStatus}
        />
        <TagInfoModal viewer={viewer} />
        {iframeUrl && (
          <div className={styles.iframe}>
            <iframe src={iframeUrl} className="w-100 h-100" />
          </div>
        )}
      </div>
      <HotSpotTemplate />
    </>
  );
};

export default UserView;
