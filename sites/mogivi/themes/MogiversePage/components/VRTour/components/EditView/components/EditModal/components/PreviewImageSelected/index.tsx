import React, { useEffect, useState, useRef } from "react";
import { Viewer, RectilinearView } from "marzipano";

import Button from "@material-ui/core/Button";

import styles from "./styles.module.scss";

import PhotoSphereContainer from "sites/mogivi/themes/MogiversePage/components/VRTour/components/PhotoSphereContainer";
import { IImageTarget } from "sites/mogivi/models/ICommonHotSpotOption";
import { IRoom } from "sites/mogivi/models/IVR360";
import { createViewConfig } from "sites/mogivi/utils/vr360";

interface Props {
  imageTargetSelected: IImageTarget;
  labelSetDefaultView: any;
  defaultView: any;
  setDefaultView: any;
  image360s: IRoom[];
}

const PreviewImageSelected = (props: Props) => {
  const {
    imageTargetSelected,
    labelSetDefaultView,
    defaultView,
    setDefaultView,
    image360s,
  } = props;
  const containerRef = useRef();
  const [viewer, setViewer] = useState<any>(null);

  const getCurrentViewPosition = () => {
    const view = viewer.view();
    return {
      yaw: view.yaw(),
      pitch: view.pitch(),
    };
  };

  const initHotSpotDefaultView = () => {
    setDefaultView(getCurrentViewPosition());
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const roomTarget = image360s.find(
      (img) => img.id === imageTargetSelected.id
    );
    const newViewer = viewer || new Viewer(containerRef.current);
    const { newSource, newGeometry, newLimiter } = createViewConfig(
      roomTarget?.imagesJsonParsed as any
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
    setViewer(newViewer);
  }, [imageTargetSelected, containerRef.current]);
  return (
    <div>
      <h6 className="mt-2">
        Xem trước {defaultView ? "(Đã thiết lập)" : "(Chưa thiết lập)"}
      </h6>
      <div className="position-relative">
        <PhotoSphereContainer ref={containerRef} />
        <Button
          variant="contained"
          color="primary"
          onClick={initHotSpotDefaultView}
          className={styles.initViewButton}
        >
          {`Đặt góc nhìn ${labelSetDefaultView}`}
        </Button>
      </div>
    </div>
  );
};

export default PreviewImageSelected;
