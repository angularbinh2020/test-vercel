import React, { useMemo } from "react";
import classNames from "classnames";

import Tooltip from "@material-ui/core/Tooltip";

import styles from "./bottom-controls.module.scss";

import PlayIcon from "sites/mogivi/assets/icons/play.png";
import PauseIcon from "sites/mogivi/assets/icons/pause.png";
import ZoomInIcon from "sites/mogivi/assets/icons/ic-zoom-in.svg";
import ZoomOutIcon from "sites/mogivi/assets/icons/ic-zoom-out.svg";
import ShareIcon from "sites/mogivi/assets/icons/ic-share.svg";
import ImagesList from "../ImagesList";
import AgencyInfo from "../AgencyInfo";
import OnlineCounseling from "../OnlineCounseling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import Image from "next/legacy/image";
import { useSetToastState } from "sites/mogivi/redux/toast.slice";
import { IVR360, Image360 } from "sites/mogivi/models/IVR360";
import useDetectDeviceByScreen from "sites/mogivi/hooks/useDetectDeviceByScreen";
import MogiviAvatar from "sites/mogivi/assets/images/mogivi-avatar.png";
import { closeAllOpenPopup } from "sites/mogivi/utils/vr360";
import { MOGIVI_CONTACT } from "const/config";

interface Props {
  currentImageSetting: Image360 | undefined;
  handleGoToImageSettingByImageId: any;
  isAutoRotate: any;
  setAutoRotate: any;
  isShowImageSlide: any;
  data: IVR360;
  setCurrentUserInfo: any;
  onBack?: any;
  isShowAgencyInfo?: boolean;
  isLoadingStatus?: boolean;
}

const BottomControls = (props: Props) => {
  const {
    currentImageSetting,
    handleGoToImageSettingByImageId,
    isAutoRotate,
    setAutoRotate,
    data,
    onBack,
    isShowAgencyInfo,
    isLoadingStatus,
  } = props;
  const { isTabletOrMobile, isMobile } = useDetectDeviceByScreen();
  const { showInfoToast } = useSetToastState();
  const agency = {
    fullName: isShowAgencyInfo
      ? data.tour_settings.full_name ?? data.full_name
      : MOGIVI_CONTACT.fullName,
    email: isShowAgencyInfo ? data.email : MOGIVI_CONTACT.email,
    phone: isShowAgencyInfo ? data.phone : MOGIVI_CONTACT.phone,
  };
  const images = useMemo(() => {
    return data.rooms
      .filter((room) =>
        currentImageSetting?.hotspotIdsDetectedFail.includes(room.id)
      )
      .map((room) => ({
        id: room.id,
        thumbnailUrl: room.panorama_url_preview,
        title: room.title,
      }));
  }, [currentImageSetting, data]);
  const isShowImageSlide = Boolean(images.length);
  const handleShare = () => {
    const textAreaElement = document.createElement("input");
    document.body.append(textAreaElement);
    textAreaElement.value = location.href;
    textAreaElement.select();
    document.execCommand("copy");
    showInfoToast("Đã copy tour, sẵn sàng chia sẻ.");
    textAreaElement.remove();
  };

  const urlParams = new URLSearchParams(window.location.search);
  const viewMobileApp = urlParams.get("ViewMobileApp");
  const isViewOnMobileApp = viewMobileApp && viewMobileApp == "1";
  const commonProps = {
    isMobile,
    closeAllOpenPopup,
    isTabletOrMobile,
  };
  if (isViewOnMobileApp) {
    return <></>;
  }
  if (isMobile)
    return (
      <>
        <div className={classNames(styles.bottomActionsBar)}>
          <div className={styles.actionContainer}>
            <>
              <AgencyInfo
                userName={agency.fullName}
                isMobile={isMobile}
                closeAllOpenPopup={closeAllOpenPopup}
                isTabletOrMobile={isTabletOrMobile}
                email={agency.email}
                phoneNumber={agency.phone}
                isLoading={isLoadingStatus}
              />

              {isShowImageSlide && (
                <ImagesList
                  images={images}
                  handleGoToImageSettingByImageId={
                    handleGoToImageSettingByImageId
                  }
                  {...commonProps}
                />
              )}

              <Tooltip
                title={isAutoRotate ? "Tạm dừng tự động quay" : "Tự động quay"}
              >
                <button
                  className={styles.btnBack}
                  onClick={() => setAutoRotate(!isAutoRotate)}
                >
                  <Image
                    src={isAutoRotate ? PauseIcon : PlayIcon}
                    alt="auto rotate control"
                    width={21}
                    height={20}
                  />
                </button>
              </Tooltip>
              <Tooltip title="Chia sẻ">
                <button className={styles.btnBack} onClick={handleShare}>
                  <Image src={ShareIcon} alt="share" width={21} height={20} />
                </button>
              </Tooltip>

              {onBack && (
                <Tooltip title="Trở về">
                  <button className={styles.btnBack} onClick={onBack}>
                    <FontAwesomeIcon icon={faBackward} width={21} height={20} />
                  </button>
                </Tooltip>
              )}
            </>
            <OnlineCounseling
              // agencyInfo={tourDetail.Requestor}
              // userInfo={currentUserInfo}
              // chatInfoStore={chatInfoStore}
              // conversations={conversations}
              // tourId={tourId}
              // handleSaveUserInfo={(newUserInfo: any) =>
              //   setCurrentUserInfo(newUserInfo)
              // }
              userName={agency.fullName}
              avatar={MogiviAvatar.src}
              agencyPhoneNumber={agency.phone}
              {...commonProps}
            />
          </div>
        </div>
      </>
    );

  return (
    <>
      <div
        className={classNames(
          styles.bottomActionsBar,
          styles.hideOnMobileLandscape
        )}
      >
        <div className="d-flex">
          {isShowImageSlide && (
            <ImagesList
              images={images}
              handleGoToImageSettingByImageId={handleGoToImageSettingByImageId}
              {...commonProps}
            />
          )}
          <div className={classNames(styles.zoomContainer, "ms-3")}>
            <div className="h-100 d-flex align-items-center justify-content-between">
              <Tooltip title="Phóng to">
                <button data-zoom-in className="d-flex py-1">
                  <Image src={ZoomInIcon} alt="zoom in" />
                </button>
              </Tooltip>
              <Tooltip title="Thu nhỏ">
                <button data-zoom-out className="ms-3 d-flex">
                  <Image src={ZoomOutIcon} alt="zoom out" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className={styles.actionContainer}>
          <AgencyInfo
            userName={agency.fullName}
            isMobile={isMobile}
            closeAllOpenPopup={closeAllOpenPopup}
            isTabletOrMobile={isTabletOrMobile}
            email={agency.email}
            phoneNumber={agency.phone}
            isLoading={isLoadingStatus}
          />
          <Tooltip
            title={isAutoRotate ? "Tạm dừng tự động quay" : "Tự động quay"}
          >
            <button
              className={styles.btnBack}
              style={isViewOnMobileApp ? { marginLeft: "0px" } : {}}
              onClick={() => setAutoRotate(!isAutoRotate)}
            >
              <Image
                src={isAutoRotate ? PauseIcon : PlayIcon}
                alt="auto rotate control"
                width={21}
                height={20}
              />
            </button>
          </Tooltip>
          <Tooltip title="Chia sẻ">
            <button className={styles.btnBack} onClick={handleShare}>
              <Image src={ShareIcon} alt="share" width={21} height={20} />
            </button>
          </Tooltip>
          {onBack && (
            <Tooltip title="Trở về">
              <button className={styles.btnBack} onClick={onBack}>
                <FontAwesomeIcon icon={faBackward} width={21} height={20} />
              </button>
            </Tooltip>
          )}
        </div>
        <OnlineCounseling
          userName={agency.fullName}
          avatar={MogiviAvatar.src}
          agencyPhoneNumber={agency.phone}
          // agencyInfo={tourDetail.Requestor}
          // chatInfoStore={chatInfoStore}
          // conversations={conversations}
          // userInfo={currentUserInfo}
          // handleSaveUserInfo={(newUserInfo: any) =>
          //   setCurrentUserInfo(newUserInfo)
          // }
          // {...commonProps}
          // tourId={tourId}
        />
      </div>
      <div
        className={classNames(
          styles.zoomContainer,
          styles.showOnMobileLandscape,
          "ms-3"
        )}
      >
        <div className="h-100 d-flex align-items-center justify-content-between">
          <Tooltip title="Phóng to">
            <button data-zoom-in className="d-flex py-1">
              <Image src={ZoomInIcon} alt="zoom in" />
            </button>
          </Tooltip>
          <Tooltip title="Thu nhỏ">
            <button data-zoom-out className="ms-3 d-flex">
              <Image src={ZoomOutIcon} alt="zoom out" />
            </button>
          </Tooltip>
        </div>
      </div>

      <div
        className={classNames(
          styles.actionContainer,
          styles.showOnMobileLandscape
        )}
      >
        <AgencyInfo
          userName={agency.fullName}
          isMobile={isMobile}
          closeAllOpenPopup={closeAllOpenPopup}
          isTabletOrMobile={isTabletOrMobile}
          email={agency.email}
          phoneNumber={agency.phone}
          isLoading={isLoadingStatus}
        />
        <Tooltip
          title={isAutoRotate ? "Tạm dừng tự động quay" : "Tự động quay"}
        >
          <button
            className={styles.btnBack}
            style={isViewOnMobileApp ? { marginLeft: "0px" } : {}}
            onClick={() => setAutoRotate(!isAutoRotate)}
          >
            <Image
              src={isAutoRotate ? PauseIcon : PlayIcon}
              alt="auto rotate control"
              width={21}
              height={20}
            />
          </button>
        </Tooltip>
        <Tooltip title="Chia sẻ">
          <button className={styles.btnBack} onClick={handleShare}>
            <Image src={ShareIcon} alt="share" width={21} height={20} />
          </button>
        </Tooltip>
        {onBack && (
          <Tooltip title="Trở về">
            <button className={styles.btnBack} onClick={onBack}>
              <FontAwesomeIcon icon={faBackward} width={21} height={20} />
            </button>
          </Tooltip>
        )}
      </div>
    </>
  );
};

export default BottomControls;
