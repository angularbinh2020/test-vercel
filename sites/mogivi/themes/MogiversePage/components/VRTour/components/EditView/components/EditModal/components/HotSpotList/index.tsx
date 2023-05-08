import React, { Fragment, useMemo } from "react";

import styles from "./styles.module.scss";

import { isHotSpotHaveCoords } from "sites/mogivi/utils/vr360";

import HotSpotItem from "../HotSpotItem";
import ButtonMG from "sites/mogivi/themes/MogiversePage/components/VRTour/components/ButtonMG";
import H2HeaderTitle from "sites/mogivi/themes/MogiversePage/components/VRTour/components/H2HeaderTitle";
import { Image360, IRoom } from "sites/mogivi/models/IVR360";
import { IHotSpot } from "sites/mogivi/models/ICommonHotSpotOption";

interface Props {
  imageSetting: Image360;
  createNewCustomHotSpot: any;
  handleFocusHotSpot: any;
  currentViewHotSpot?: IHotSpot;
  rooms: IRoom[];
}

const HotSpotList = (props: Props) => {
  const {
    imageSetting,
    createNewCustomHotSpot,
    handleFocusHotSpot,
    currentViewHotSpot,
    rooms,
  } = props;
  const {
    nextMarkerPosition,
    previousMarkerPosition,
    customHotSpots,
    hotspotIdsDetectedFail,
  } = imageSetting;
  const hotSpotDetectFail: any[] = useMemo(() => {
    return hotspotIdsDetectedFail.map((roomId) =>
      rooms.find((room) => room.id === roomId)
    );
  }, [hotspotIdsDetectedFail, rooms]);
  return (
    <Fragment>
      <H2HeaderTitle>Hot Spot</H2HeaderTitle>
      <div className="mt-4 mb-3 text-end">
        <ButtonMG onClick={createNewCustomHotSpot}>Tạo mới hotspot</ButtonMG>
      </div>
      {isHotSpotHaveCoords(nextMarkerPosition) && (
        <HotSpotItem
          hotSpotConfig={nextMarkerPosition}
          isActive={nextMarkerPosition.id === currentViewHotSpot?.id}
          onClick={() => handleFocusHotSpot(nextMarkerPosition)}
          title={`[Tiếp theo] ${nextMarkerPosition?.imageTarget?.title}`}
        />
      )}
      {isHotSpotHaveCoords(previousMarkerPosition) && (
        <HotSpotItem
          hotSpotConfig={previousMarkerPosition}
          isActive={previousMarkerPosition.id === currentViewHotSpot?.id}
          onClick={() => handleFocusHotSpot(previousMarkerPosition)}
          title={`[Trước đó] ${previousMarkerPosition?.imageTarget?.title}`}
        />
      )}
      <div className={styles.customHotSpotContainer}>
        {customHotSpots?.map((hotSpotConfig) => (
          <HotSpotItem
            key={`hotspot-item-id-${hotSpotConfig.id}`}
            hotSpotConfig={hotSpotConfig}
            isActive={hotSpotConfig.id === currentViewHotSpot?.id}
            onClick={() => handleFocusHotSpot(hotSpotConfig)}
            title={hotSpotConfig.imageTarget?.title || ""}
            isHotSpotLinked
          />
        ))}
        {hotSpotDetectFail.map((room) => (
          <HotSpotItem
            key={`hotspot-item-id-${room.id}`}
            onClick={() => createNewCustomHotSpot(room)}
            title={room.title || ""}
            isDetectedFail={true}
            previewImage={room.panorama_url_preview}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default HotSpotList;
