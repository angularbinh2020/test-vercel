import React, { useEffect, useRef, useState } from "react";
import { Viewer, RectilinearView } from "marzipano";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import styles from "./styles.module.scss";

import PhotoSphereContainer from "sites/mogivi/themes/MogiversePage/components/VRTour/components/PhotoSphereContainer";
import ImageTitle from "../ImageTitle";
import DirectionArrow from "sites/mogivi/themes/MogiversePage/components/VRTour/components/DirectionArrow";
import { IHotSpot } from "sites/mogivi/models/ICommonHotSpotOption";
import { IVR360 } from "sites/mogivi/models/IVR360";
import { createViewConfig } from "sites/mogivi/utils/vr360";

interface Props {
  hotSpotConfig: IHotSpot;
  labelSetDefaultView: any;
  updateHotSpotConfig: any;
  tourDetail: IVR360;
}

const PreviewHotSpotTarget = (props: Props) => {
  const {
    hotSpotConfig,
    labelSetDefaultView,
    updateHotSpotConfig,
    tourDetail,
  } = props;
  const rooms = tourDetail.rooms;
  const containerRef = useRef();
  const [viewer, setViewer] = useState<any>(null);

  const getCurrentViewPosition = () => {
    const view = viewer.view();
    return {
      yaw: view.yaw(),
      pitch: view.pitch(),
    };
  };

  const initDefaultView = () => {
    const newSubHotSpot = {
      ...hotSpotConfig,
      defaultView: getCurrentViewPosition(),
    };
    updateHotSpotConfig(newSubHotSpot);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const roomMatch = rooms.find(
      (room) => hotSpotConfig.imageTarget?.id === room.id
    );
    const imageTargetSetting = tourDetail.tour_settings.Image360s.find(
      (img) => img.id === hotSpotConfig.imageTarget?.id
    );
    const defaultView =
      hotSpotConfig.defaultView || imageTargetSetting?.defaultView || {};

    //@ts-ignore
    const newViewer = viewer || new Viewer(containerRef.current);
    const { newSource, newGeometry, newLimiter } = createViewConfig(
      roomMatch?.imagesJsonParsed as any
    );
    //@ts-ignore
    const newView = new RectilinearView({ ...defaultView }, newLimiter);

    const newScene = newViewer.createScene({
      source: newSource,
      geometry: newGeometry,
      view: newView,
      pinFirstLevel: true,
    });

    //@ts-ignore
    newViewer.switchScene(newScene);
    setViewer(newViewer);
  }, [
    hotSpotConfig.id,
    hotSpotConfig.imageTarget,
    containerRef.current,
    rooms,
  ]);

  return (
    <Box className="position-relative mt-3">
      <PhotoSphereContainer ref={containerRef} />
      <ImageTitle>{`HotSpot: ${hotSpotConfig.imageTarget?.title}`}</ImageTitle>
      <DirectionArrow viewer={viewer} className={styles.viewMap} />
      <Button
        variant="contained"
        color="primary"
        onClick={initDefaultView}
        className={styles.initViewButton}
      >
        {labelSetDefaultView}
        {hotSpotConfig.defaultView && " - Đã thiết lập"}
      </Button>
    </Box>
  );
};

export default PreviewHotSpotTarget;
