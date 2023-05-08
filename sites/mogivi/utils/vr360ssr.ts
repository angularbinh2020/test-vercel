import { ITourSettings, IVR360 } from "./../models/IVR360";
import { IRoom } from "../models/IVR360";
import { IHotSpotIcon } from "models/IHotSpotIcon";
import PlaceholderImage from "sites/mogivi/assets/images/cuate.png";
import { IHotSpot } from "../models/ICommonHotSpotOption";

export const isHotSpotLinkedToRoom = (room: IRoom, hotSpot: IHotSpot) => {
  return (
    room.id === hotSpot.imageTargetId || room.id === hotSpot.imageTarget?.id
  );
};

export const getVr360Data = (
  rawData: IVR360,
  defaultHotSpotIcon: IHotSpotIcon
) => {
  const iVr360Data: IVR360 = JSON.parse(JSON.stringify(rawData));
  const tour_settings: ITourSettings = JSON.parse(
    iVr360Data.tour_settings as any
  );
  iVr360Data.rooms.forEach((room: IRoom) => {
    room.imagesJsonParsed = JSON.parse(room.images_json);
  });
  if (!tour_settings.tourHotSpotIcon) {
    tour_settings.tourHotSpotIcon = defaultHotSpotIcon;
  }
  if (!tour_settings.title) {
    tour_settings.title = rawData.title;
  }
  if (!tour_settings.full_name) {
    tour_settings.full_name = rawData.full_name;
  }
  if (!tour_settings.description) {
    tour_settings.description = rawData.title;
  }
  tour_settings.Image360s.forEach((image) => {
    if (!image.title) {
      const roomMatch: any = iVr360Data.rooms.find(
        (room) => room.id === image.id
      );
      image.title = roomMatch.title;
    }
  });
  tour_settings.Image360s.forEach((image) => {
    image.customHotSpots.forEach((hotSpot) => {
      const roomMatch: any = iVr360Data.rooms.find((room) =>
        isHotSpotLinkedToRoom(room, hotSpot)
      );
      const imageMatch = tour_settings.Image360s.find(
        (img) => img.id === roomMatch.id
      );
      const thumbnailUrl =
        roomMatch?.imagesJsonParsed.roomPreview ||
        roomMatch.panorama_url_preview ||
        PlaceholderImage.src;
      hotSpot.icon = tour_settings.tourHotSpotIcon;
      hotSpot.imageTarget = {
        title: imageMatch?.title || roomMatch.title,
        thumbnailUrl: thumbnailUrl,
        id: roomMatch.id,
      };
    });
  });
  iVr360Data.tour_settings = tour_settings;
  return iVr360Data;
};
