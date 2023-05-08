import { useEffect, useState } from "react";
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
interface Props {
  pageData: {
    data: IVR360;
    tagIcons: IHotSpotIcon[];
    hotSpotIcons: IHotSpotIcon[];
    ads: IAdsData[];
  };
  onBack?: any;
}
const UserView = (props: Props) => {
  const { ads, tagIcons, hotSpotIcons, data: vr360Data } = props.pageData;

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
    zoomOutRef,
    zoomInRef,
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

  useEffect(() => {
    const initImageSetting = imagesSetting.current[0];
    const selectedHotSpotIcon = hotSpotIcons[0];
    setCurrentHotSpotIcon(selectedHotSpotIcon);
    setCurrentImageSetting(initImageSetting);
    setTimeout(() => {
      initViewer();
    }, 500);
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
        <BottomControls
          setCurrentUserInfo={setCurrentUserInfo}
          currentImageSetting={currentImageSetting}
          handleGoToImageSettingByImageId={handleGoToImageSettingByImageId}
          zoomInRef={zoomInRef}
          zoomOutRef={zoomOutRef}
          // tourDetail={tourDetail}
          isAutoRotate={isAutoRotate}
          setAutoRotate={setAutoRotate}
          // currentUserInfo={currentUserInfo}
          isShowImageSlide={true}
          data={vr360Data}
          onBack={props.onBack}
        />
        <TagInfoModal viewer={viewer} />
      </div>
      <HotSpotTemplate />
    </>
  );
};

export default UserView;
