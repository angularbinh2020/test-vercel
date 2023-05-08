import React, { useEffect, useMemo, useRef, useState } from "react";
import { Viewer, RectilinearView } from "marzipano";
import classNames from "classnames";

import styles from "./styles.module.scss";

import {
  createDragAbleInfoHotSpot,
  createEmbeddedHotSpot,
  createFooterCoverHotSpot,
  createHotSpot,
  createViewConfig,
  getDefaultCoverFooterSetting,
  createTagHotSpotConfig,
  isHotSpotHaveCoords,
  removeHotSpotById,
} from "sites/mogivi/utils/vr360";
import { useSetConfirmModalState } from "sites/mogivi/redux/confirmModal.slice";

import LabelTabs from "sites/mogivi/themes/MogiversePage/components/VRTour/components/LabelTabs";
import PhotoSphereContainer from "sites/mogivi/themes/MogiversePage/components/VRTour/components/PhotoSphereContainer";
import InputTextModal from "sites/mogivi/themes/MogiversePage/components/VRTour/components/InputTextModal";
import CoverFooterSetting from "sites/mogivi/themes/MogiversePage/components/VRTour/components/CoverFooterSetting";
import EditCustomHotSpotImage from "../EditCustomHotSpotImage";
import PreviewHotSpotTarget from "../PreviewHotSpotTarget";
import HotSpotList from "../HotSpotList";
import ImageTitle from "../ImageTitle";
import DirectionArrow from "../../../../../DirectionArrow";
import AdsInputText from "../../../../../AdsInputText";
import SliderInput from "../../../SliderInput";
import { useSetToastState } from "sites/mogivi/redux/toast.slice";
import {
  Image360,
  IRoom,
  ITourSettings,
  IVR360,
  IYawPitch,
} from "sites/mogivi/models/IVR360";
import { IHotSpotIcon } from "models/IHotSpotIcon";
import { IAdsData } from "models/IAdsData";
import {
  IHotSpot,
  IImageTarget,
} from "sites/mogivi/models/ICommonHotSpotOption";
import PanaromaIcon from "sites/mogivi/assets/icons/panorama-camera.svg";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SelectHotSpotIcon from "../SelectHotSpotIcon";
import EditTagHotSpotModal from "../EditTagHotSpotModal";

interface Props {
  imageSetting: Image360;
  tagIcons: IHotSpotIcon[];
  updateImageSetting: any;
  adsAvailable: IAdsData[];
  tourDetail: IVR360;
  footerImages: IHotSpotIcon[];
  hotSpotIcons: IHotSpotIcon[];
  tourHotSpotIcon: IHotSpotIcon;
  handleChangeHotSpotIcon: any;
  tourSetting: ITourSettings;
}

const SettingImageCustom = (props: Props) => {
  const {
    imageSetting,
    tagIcons,
    updateImageSetting,
    adsAvailable,
    tourDetail,
    footerImages,
    hotSpotIcons,
    tourHotSpotIcon,
    handleChangeHotSpotIcon,
    tourSetting,
  } = props;
  const containerRef = useRef();
  const viewer = useRef<any>();
  const { openConfirmModal } = useSetConfirmModalState();
  const { showInfoToast } = useSetToastState();
  const [beingEditedTagHotSpot, setBeingEditedTagHotSpot] =
    useState<IHotSpot>();
  const [beingEditedCustomHotSpot, setBeingEditedCustomHotSpot] =
    useState<IHotSpot>();
  const [currentViewHotSpot, setCurrentViewHotSpot] = useState<IHotSpot>();
  const [mobileScale, setMobileScale] = useState(100);
  const [newTagHotSpot, setNewTagHotSpot] = useState<IHotSpot>();
  const imageSettingRef = useRef(imageSetting);
  const currentRoom = useMemo(() => {
    const tourMatch = tourDetail.rooms.find(
      (room) => room.id === imageSetting.id
    );
    return tourMatch;
  }, [imageSetting, tourDetail]);
  const [imageFooterCoverSetting, setImageFooterCoverSetting] = useState({
    isUsed: false,
    yaw: 0,
    pitch: Math.PI / 2,
    width: 320,
    height: 240,
    radius: 1000,
    id: `footer-cover-id-${new Date().getTime()}`,
  });

  const getDefaultViewHotSpot = () => {
    if (isHotSpotHaveCoords(imageSettingRef.current.nextMarkerPosition as any))
      return imageSettingRef.current.nextMarkerPosition;
    if (
      isHotSpotHaveCoords(imageSettingRef.current.previousMarkerPosition as any)
    )
      return imageSettingRef.current.previousMarkerPosition;
    if (imageSettingRef.current.customHotSpots?.length) {
      return imageSettingRef.current.customHotSpots[0];
    }
    return null;
  };

  const handleChangeFooterCoverRadius = (inputChangeEvent: any) => {
    const newCoverSetting = {
      ...imageFooterCoverSetting,
      radius: +inputChangeEvent.target.value,
    };
    const newImageSetting = {
      ...imageSettingRef.current,
      imageFooterCoverSetting: newCoverSetting,
    };
    updateImageSetting(newImageSetting);
    setImageFooterCoverSetting(newCoverSetting);
  };

  const handleChangeFooterCoverWidth = (inputChangeEvent: any) => {
    const newCoverSetting = {
      ...imageFooterCoverSetting,
      width: +inputChangeEvent.target.value,
      height: +inputChangeEvent.target.value,
    };
    const newImageSetting = {
      ...imageSettingRef.current,
      imageFooterCoverSetting: newCoverSetting,
    };
    updateImageSetting(newImageSetting);
    setImageFooterCoverSetting(newCoverSetting);
  };

  const handleChangeFooterImage = (icon: IHotSpotIcon) => {
    const newCoverSetting = {
      ...imageFooterCoverSetting,
      icon: icon,
    };
    const newImageSetting = {
      ...imageSettingRef.current,
      imageFooterCoverSetting: newCoverSetting,
    };
    updateImageSetting(newImageSetting);
    setImageFooterCoverSetting(newCoverSetting);
  };

  const createNewCustomHotSpot = (room?: IRoom) => {
    const newBeingEditedCustomHotSpot: IHotSpot = {
      id: `${imageSetting.id}-custom-hotspot-${new Date()}`,
      width: 40,
      ...getCurrentViewPosition(),
      icon: tourHotSpotIcon,
    };
    if (room?.id) {
      newBeingEditedCustomHotSpot.imageTarget = {
        id: room.id,
        thumbnailUrl: room.panorama_url_preview,
        title: room.title,
      };
      newBeingEditedCustomHotSpot.imageTargetId = room.id;
    }
    setBeingEditedCustomHotSpot(newBeingEditedCustomHotSpot);
  };

  const handleSaveCustomHotSpot = (
    newImageTarget: IImageTarget,
    newDefaultView: IYawPitch
  ) => {
    const newCustomHotSpot: IHotSpot = {
      ...beingEditedCustomHotSpot,
      defaultView: newDefaultView,
      imageTarget: newImageTarget,
      imageTargetId: newImageTarget.id,
    };
    const currentCustomHotSpots = imageSetting.customHotSpots || [];
    const newCustomHotSpots = [
      ...currentCustomHotSpots.filter((x) => x.id !== newCustomHotSpot.id),
      newCustomHotSpot,
    ];
    const newLinkedDetectFailHotSpot =
      imageSetting.hotspotIdsDetectedFail.filter(
        (hotSpotId) =>
          !newCustomHotSpots.find(
            (hotSpot) => hotSpot.imageTarget?.id === hotSpotId
          )
      );
    removeHotSpotById(viewer.current, beingEditedCustomHotSpot?.id);
    createDragAbleInfoHotSpot({
      viewer: viewer.current,
      hotSpotConfig: {
        ...newCustomHotSpot,
        title: newCustomHotSpot.imageTarget?.title,
      },
      onChangeHotPosition: handleOnChangeCustomHotSpotPosition,
      onClickRemoveHotSpot: handleOnClickRemoveCustomHotSpot,
      onClickEditHotSpot: handleOnEditCustomHotSpotTargetImage,
    });
    updateImageSetting({
      ...imageSetting,
      hotspotIdsDetectedFail: newLinkedDetectFailHotSpot,
      customHotSpots: newCustomHotSpots,
    });
    setCurrentViewHotSpot(newCustomHotSpot);
    showInfoToast("Tạo hotspot thành công");
    handleCancelEditCustomHotSpot();
  };

  const onChangeHotSpotWidth = (newWidthRaw: number) => {
    let newWidth = newWidthRaw;
    if (newWidth < 20) {
      newWidth = 20;
    }
    if (newWidth > 100) {
      newWidth = 100;
    }
    const newCurrentViewHotSpot = { ...currentViewHotSpot, width: newWidth };
    removeHotSpotById(viewer.current, newCurrentViewHotSpot.id);

    const currentCustomHotSpots = imageSetting.customHotSpots || [];
    let isCustomHotSpot = false;
    const newCustomHotSpots = currentCustomHotSpots.map((x) => {
      if (x.id === newCurrentViewHotSpot.id) {
        isCustomHotSpot = true;
        return newCurrentViewHotSpot;
      }
      return x;
    });
    let newNextMarkerPosition = imageSetting.nextMarkerPosition;
    if (
      newNextMarkerPosition &&
      newNextMarkerPosition.id === newCurrentViewHotSpot.id
    ) {
      newNextMarkerPosition = newCurrentViewHotSpot;
    }
    let newPreviousMarkerPosition = imageSetting.previousMarkerPosition;
    if (
      newPreviousMarkerPosition &&
      newPreviousMarkerPosition.id === newCurrentViewHotSpot.id
    ) {
      newPreviousMarkerPosition = newCurrentViewHotSpot;
    }

    if (isCustomHotSpot) {
      createDragAbleInfoHotSpot({
        viewer: viewer.current,
        hotSpotConfig: {
          ...newCurrentViewHotSpot,
          title: newCurrentViewHotSpot.imageTarget?.title,
        },
        onChangeHotPosition: handleOnChangeCustomHotSpotPosition,
        onClickRemoveHotSpot: handleOnClickRemoveCustomHotSpot,
        onClickEditHotSpot: handleOnEditCustomHotSpotTargetImage,
      });
    } else {
      createHotSpot({
        viewer: viewer.current,
        hotSpotConfig: { ...newCurrentViewHotSpot },
      });
    }

    updateImageSetting({
      ...imageSetting,
      nextMarkerPosition: newNextMarkerPosition,
      previousMarkerPosition: newPreviousMarkerPosition,
      customHotSpots: newCustomHotSpots,
    });
    setCurrentViewHotSpot(newCurrentViewHotSpot);
  };

  const handleCancelEditCustomHotSpot = () => {
    setBeingEditedCustomHotSpot(undefined);
  };

  const handleOnSwitchUsedCoverFooter = () => {
    const newCoverSetting = {
      ...imageFooterCoverSetting,
      isUsed: !imageFooterCoverSetting.isUsed,
    };
    const newImageSetting = {
      ...imageSettingRef.current,
      imageFooterCoverSetting: newCoverSetting,
    };
    updateImageSetting(newImageSetting);
    setImageFooterCoverSetting(newCoverSetting);
  };

  const handleOnChangeTagHotSpotPosition = (hotSpotData: IHotSpot) => {
    const newImageSetting = { ...imageSettingRef.current };
    const tagHotSpotTarget = newImageSetting.tagHotSpots.find(
      (x) => x.id === hotSpotData.id
    );
    tagHotSpotTarget.yaw = hotSpotData.yaw;
    tagHotSpotTarget.pitch = hotSpotData.pitch;
    updateImageSetting(newImageSetting);
  };

  const handleOnChangeCustomHotSpotPosition = (hotSpotData: IHotSpot) => {
    const newImageSetting = { ...imageSettingRef.current };
    const customHotSpotTarget = newImageSetting.customHotSpots.find(
      (x) => x.id === hotSpotData.id
    );
    if (customHotSpotTarget) {
      customHotSpotTarget.yaw = hotSpotData.yaw;
      customHotSpotTarget.pitch = hotSpotData.pitch;
      setCurrentViewHotSpot(customHotSpotTarget);
    }
    updateImageSetting(newImageSetting);
  };

  const handleFocusHotSpot = (hotSpotConfig: IHotSpot) => {
    setCurrentViewHotSpot(hotSpotConfig);
    focusHotSpot(hotSpotConfig);
  };

  const handleOnClickRemoveTagHotSpot = (hotSpotData: IHotSpot) => {
    const removeInfoHotSpot = () => {
      const newTagHotSpots = imageSettingRef.current.tagHotSpots.filter(
        (x) => x.id !== hotSpotData.id
      );
      removeHotSpotById(viewer.current, hotSpotData.id);
      updateImageSetting({ ...imageSetting, tagHotSpots: newTagHotSpots });
      showInfoToast("Xóa nhãn dán thành công");
    };
    openConfirmModal({
      message: "Bạn có chắc muốn xóa nhãn này chứ?",
      modalTitle: "Xóa nhãn dán",
      onAccept: removeInfoHotSpot,
    });
  };

  const handleOnClickRemoveCustomHotSpot = (hotSpotData: IHotSpot) => {
    const removeInfoHotSpot = () => {
      const customHotSpots = imageSettingRef.current.customHotSpots.filter(
        (x) => x.id !== hotSpotData.id
      );
      removeHotSpotById(viewer.current, hotSpotData.id);
      updateImageSetting({
        ...imageSettingRef.current,
        customHotSpots: customHotSpots,
      });
      // const defaultHotSpotView = getDefaultViewHotSpot(hotSpotData.id);
      // setCurrentViewHotSpot(defaultHotSpotView || undefined);
      setTimeout(() => {
        const focusHotSpotButton = document.querySelector(
          '[data-is-hot-spot-linked="true"]'
        ) as HTMLButtonElement;
        if (focusHotSpotButton) {
          focusHotSpotButton.click();
        } else {
          setCurrentViewHotSpot(undefined);
        }
      }, 100);
      showInfoToast("Xóa hotspot thành công");
    };
    openConfirmModal({
      message: "Bạn có chắc muốn xóa hotspot này chứ?",
      modalTitle: "Xóa hotspot",
      onAccept: removeInfoHotSpot,
    });
  };

  const handleChangeMobileScale = (newValue: number, isCommit = false) => {
    if (isCommit) {
      const newCurrentViewHotSpot: IHotSpot = {
        ...currentViewHotSpot,
        mobileScale: newValue,
      };

      const currentCustomHotSpots = imageSetting.customHotSpots || [];
      let isCustomHotSpot = false;
      const newCustomHotSpots = currentCustomHotSpots.map((x) => {
        if (x.id === newCurrentViewHotSpot.id) {
          isCustomHotSpot = true;
          return newCurrentViewHotSpot;
        }
        return x;
      });
      let newNextMarkerPosition = imageSetting.nextMarkerPosition;
      if (newNextMarkerPosition?.id === newCurrentViewHotSpot.id) {
        newNextMarkerPosition = newCurrentViewHotSpot;
      }
      let newPreviousMarkerPosition = imageSetting.previousMarkerPosition;
      if (newPreviousMarkerPosition?.id === newCurrentViewHotSpot.id) {
        newPreviousMarkerPosition = newCurrentViewHotSpot;
      }

      updateImageSetting({
        ...imageSetting,
        nextMarkerPosition: newNextMarkerPosition,
        previousMarkerPosition: newPreviousMarkerPosition,
        customHotSpots: newCustomHotSpots,
      });
      setCurrentViewHotSpot(newCurrentViewHotSpot);
    }
    setMobileScale(newValue);
  };

  const saveBeingEditedTagHotSpot = (tagHotSpotConfig: any) => {
    const newBeingEditedTagHotSpot: IHotSpot = {
      ...beingEditedTagHotSpot,
      tagHotSpotConfig,
    };
    const newTagHotSpots = imageSetting.tagHotSpots.map((x) => {
      if (x.id === beingEditedTagHotSpot?.id) {
        return newBeingEditedTagHotSpot;
      }
      return x;
    });
    removeHotSpotById(viewer.current, beingEditedTagHotSpot?.id);
    createDragAbleInfoHotSpot({
      viewer: viewer.current,
      hotSpotConfig: newBeingEditedTagHotSpot,
      onChangeHotPosition: handleOnChangeTagHotSpotPosition,
      onClickRemoveHotSpot: handleOnClickRemoveTagHotSpot,
      onClickEditHotSpot: handleOnEditTagHotSpotTitle,
    });
    updateImageSetting({ ...imageSetting, tagHotSpots: newTagHotSpots });
    showInfoToast("Chỉnh sửa nhãn thành công");
    cancelEditTagHotSpotTitle();
  };

  const handleOnEditTagHotSpotTitle = (hotSpotData: IHotSpot) => {
    setBeingEditedTagHotSpot(hotSpotData);
  };

  const handleOnEditCustomHotSpotTargetImage = (hotSpotData: IHotSpot) => {
    setBeingEditedCustomHotSpot(hotSpotData);
  };

  const cancelEditTagHotSpotTitle = () => {
    setBeingEditedTagHotSpot(undefined);
  };

  const cancelCreateNewTagHotSpot = () => {
    setNewTagHotSpot(undefined);
  };

  const initDefaultView = () => {
    const newImageSetting = {
      ...imageSetting,
      defaultView: getCurrentViewPosition(),
    };
    updateImageSetting(newImageSetting);
    showInfoToast("Thiết lập góc nhìn mặc định thành công");
  };

  const saveNewTagHotSpot = (tagHotSpotConfig: any) => {
    const newBeingEditedTagHotSpot = {
      ...newTagHotSpot,
      tagHotSpotConfig,
    };
    const newTagHotSpots = [
      ...imageSetting.tagHotSpots,
      newBeingEditedTagHotSpot,
    ];
    createDragAbleInfoHotSpot({
      viewer: viewer.current,
      hotSpotConfig: newBeingEditedTagHotSpot,
      onChangeHotPosition: handleOnChangeTagHotSpotPosition,
      onClickRemoveHotSpot: handleOnClickRemoveTagHotSpot,
      onClickEditHotSpot: handleOnEditTagHotSpotTitle,
    });
    updateImageSetting({ ...imageSetting, tagHotSpots: newTagHotSpots });
    showInfoToast("Tạo nhãn thành công");
    cancelCreateNewTagHotSpot();
  };

  const getCurrentViewPosition = () => {
    const view = viewer.current.view();
    return {
      yaw: view.yaw(),
      pitch: view.pitch(),
    };
  };

  const focusHotSpot = (hotSpotData: IHotSpot) => {
    const view = viewer.current?.view();
    view.setYaw(hotSpotData.yaw);
    view.setPitch(hotSpotData.pitch);
  };

  const updateHotSpotConfig = (newHotSpotConfig: IHotSpot) => {
    const newImageSetting = {
      ...imageSetting,
    };
    const updateDefaultView = (hotSpot: IHotSpot) => {
      if (newHotSpotConfig.id === hotSpot.id) {
        hotSpot.defaultView = newHotSpotConfig.defaultView;
      }
    };
    updateDefaultView(newImageSetting.nextMarkerPosition);
    updateDefaultView(newImageSetting.previousMarkerPosition);
    newImageSetting.customHotSpots?.map((hotSpot) =>
      updateDefaultView(hotSpot)
    );
    updateImageSetting(newImageSetting);
    showInfoToast("Thiết lập góc nhìn mặc định thành công");
  };

  const createNewTagHotSpot = (tagIcon: IHotSpotIcon) => {
    const tagHotSpotConfig: any = createTagHotSpotConfig(
      tagIcon.assetType?.keyword
    );
    const initNewTag = {
      id: `${imageSetting.id}-tag-${new Date()}`,
      icon: tagIcon,
      ...getCurrentViewPosition(),
      tagHotSpotConfig,
    };
    setNewTagHotSpot(initNewTag);
  };

  useEffect(() => {
    if (!viewer.current || !imageFooterCoverSetting) return;
    removeHotSpotById(viewer.current, imageFooterCoverSetting.id);
    if (imageFooterCoverSetting.isUsed) {
      createFooterCoverHotSpot({
        viewer: viewer.current,
        hotSpotConfig: imageFooterCoverSetting,
      });
    }
  }, [imageFooterCoverSetting]);

  useEffect(() => {
    if (viewer.current) {
      viewer.current.destroyAllScenes();
    }
    const roomMath = tourDetail.rooms.find(
      (room) => room.id === imageSetting.id
    );
    const { tagHotSpots, defaultView, customHotSpots } = imageSetting;

    //@ts-ignore
    const newViewer = viewer.current || new Viewer(containerRef.current);

    const { newGeometry, newLimiter, newSource } = createViewConfig(
      roomMath?.imagesJsonParsed as any
    );

    const newView = new RectilinearView({ ...defaultView }, newLimiter);

    const newScene = newViewer.createScene({
      source: newSource,
      geometry: newGeometry,
      view: newView,
      pinFirstLevel: true,
    });

    //@ts-ignore
    newViewer.switchScene(newScene);

    customHotSpots?.map((hotSpot) => {
      if (hotSpot && typeof hotSpot.yaw === "number") {
        createDragAbleInfoHotSpot({
          viewer: newViewer,
          hotSpotConfig: {
            ...hotSpot,
            title: hotSpot?.imageTarget?.title,
          },
          onChangeHotPosition: handleOnChangeCustomHotSpotPosition,
          onClickRemoveHotSpot: handleOnClickRemoveCustomHotSpot,
          onClickEditHotSpot: handleOnEditCustomHotSpotTargetImage,
        });
      }
    });

    tagHotSpots.map((infoHotSpot) => {
      createDragAbleInfoHotSpot({
        viewer: newViewer,
        hotSpotConfig: infoHotSpot,
        onChangeHotPosition: handleOnChangeTagHotSpotPosition,
        onClickRemoveHotSpot: handleOnClickRemoveTagHotSpot,
        onClickEditHotSpot: handleOnEditTagHotSpotTitle,
      });
    });
    if (adsAvailable?.length) {
      const isImageSettingHaveAds = imageSetting.ads?.length > 0;
      if (isImageSettingHaveAds) {
        const embeddedHotSpot = imageSetting.ads[0];
        const adsMatch = adsAvailable.find(
          (x) => x.keyword === embeddedHotSpot.adsCode
        );
        createEmbeddedHotSpot({
          viewer: newViewer,
          hotSpotConfig: embeddedHotSpot,
          ads: {
            //@ts-ignore
            type: adsMatch?.adsType.keyword,
            url: adsMatch?.url || "",
            //@ts-ignore
            YoutubeId: adsMatch?.nodeId || "",
          },
        });
      }
    }

    if (!viewer.current) viewer.current = newViewer;

    const newCoverFooterSetting =
      imageSetting.imageFooterCoverSetting ||
      getDefaultCoverFooterSetting(imageSetting, footerImages[0]);
    if (!newCoverFooterSetting.icon) {
      newCoverFooterSetting.icon = footerImages[0];
    }
    setImageFooterCoverSetting(newCoverFooterSetting);

    const newCurrentViewHotSpot = getDefaultViewHotSpot();
    //@ts-ignore
    setCurrentViewHotSpot(newCurrentViewHotSpot);
  }, [imageSetting.id]);

  useEffect(() => {
    imageSettingRef.current = imageSetting;
  }, [imageSetting]);

  useEffect(() => {
    if (currentViewHotSpot && currentViewHotSpot.mobileScale !== mobileScale) {
      setMobileScale(currentViewHotSpot.mobileScale || 100);
    }
  }, [currentViewHotSpot]);

  useEffect(() => {
    document.querySelectorAll("[data-is-link-hotspot]").forEach((img: any) => {
      img.src = tourHotSpotIcon.file.logoUrl;
    });
  }, [tourHotSpotIcon]);

  return (
    <>
      <Grid item xs={9}>
        <Box className="position-relative mt-3">
          <PhotoSphereContainer ref={containerRef} />
          <ImageTitle>{imageSetting?.title}</ImageTitle>
          <DirectionArrow viewer={viewer.current} className={styles.viewMap} />
        </Box>
        {currentViewHotSpot && (
          <PreviewHotSpotTarget
            hotSpotConfig={currentViewHotSpot}
            updateHotSpotConfig={updateHotSpotConfig}
            labelSetDefaultView={`Thiết lập góc nhìn mặc định: ${currentRoom?.title} tới ${currentViewHotSpot?.imageTarget?.title}`}
            tourDetail={tourDetail}
          />
        )}
      </Grid>

      <Grid item xs={3}>
        <Box className="mt-3">
          <div className={classNames(styles.hostpotAndLabelSection, "pt-0")}>
            <div className={classNames(styles.labelSection, "mb-4")}>
              <SelectHotSpotIcon
                hotSpotIconSelected={tourHotSpotIcon}
                hotSpotIcons={hotSpotIcons}
                handleChangeHotSpotIcon={handleChangeHotSpotIcon}
              />
            </div>
            <div className={styles.labelSection}>
              <CoverFooterSetting
                imageFooterCoverSetting={imageFooterCoverSetting}
                footerImages={footerImages}
                handleChangeFooterImage={handleChangeFooterImage}
                handleOnSwitchUsedCoverFooter={handleOnSwitchUsedCoverFooter}
                handleChangeFooterCoverWidth={handleChangeFooterCoverWidth}
                handleChangeFooterCoverRadius={handleChangeFooterCoverRadius}
              />
            </div>

            <div className={classNames("mt-4")}>
              <button className={styles.btnHotspot} onClick={initDefaultView}>
                <img src={PanaromaIcon.src} alt="Info" />
                <span>Đặt góc nhìn hiện tại làm mặc định</span>
              </button>
            </div>

            <div className={classNames("mt-4 p-3", styles.labelSection)}>
              <HotSpotList
                imageSetting={imageSetting}
                createNewCustomHotSpot={createNewCustomHotSpot}
                handleFocusHotSpot={handleFocusHotSpot}
                currentViewHotSpot={currentViewHotSpot}
                rooms={tourDetail.rooms}
              />
            </div>

            {currentViewHotSpot && (
              <div className={classNames("mt-4 p-3", styles.labelSection)}>
                <h4 className="m-1 mb-2">{`Hostpot tới ${currentViewHotSpot.imageTarget?.title}`}</h4>
                {currentViewHotSpot && (
                  <div className={styles.hotspotSection}>
                    <Grid container alignItems="center" className="mb-2">
                      <AdsInputText
                        value={currentViewHotSpot.width || 40}
                        onChange={(e) => onChangeHotSpotWidth(e.target.value)}
                        gridOneProps={{ xs: 5 }}
                        gridTwoProps={{ xs: 7 }}
                        type="number"
                        label="Hotspot width"
                      />
                    </Grid>
                    <SliderInput
                      label="Mobile scale (%)"
                      value={mobileScale}
                      min={20}
                      max={100}
                      handleChange={(e: any, vl: any) =>
                        handleChangeMobileScale(vl)
                      }
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      onChangeCommitted={(e: any, newValue: any) => {
                        handleChangeMobileScale(newValue, true);
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            <div className={classNames("mt-4 p-3", styles.labelSection)}>
              <LabelTabs
                tagIcons={tagIcons}
                tagHotSpots={imageSetting.tagHotSpots}
                onClickTagIcon={createNewTagHotSpot}
                onClickExistedLabel={focusHotSpot}
              ></LabelTabs>
            </div>
          </div>
        </Box>
      </Grid>
      {beingEditedCustomHotSpot && (
        <EditCustomHotSpotImage
          handleCancel={handleCancelEditCustomHotSpot}
          handleSave={handleSaveCustomHotSpot}
          image360s={tourDetail.rooms}
          imageSetting={imageSetting}
          beingEditedCustomHotSpot={beingEditedCustomHotSpot}
          hotSpotIcons={hotSpotIcons}
          imageSettings={tourSetting.Image360s}
        />
      )}
      {newTagHotSpot && (
        <EditTagHotSpotModal
          defaultValues={newTagHotSpot.tagHotSpotConfig}
          onClose={cancelCreateNewTagHotSpot}
          modalTitle="Tạo nhãn mới"
          onSave={saveNewTagHotSpot}
        />
      )}
      {beingEditedTagHotSpot && (
        <EditTagHotSpotModal
          defaultValues={beingEditedTagHotSpot.tagHotSpotConfig}
          onClose={cancelEditTagHotSpotTitle}
          modalTitle="Chỉnh sửa nhãn"
          onSave={saveBeingEditedTagHotSpot}
        />
      )}
    </>
  );
};

export default SettingImageCustom;
