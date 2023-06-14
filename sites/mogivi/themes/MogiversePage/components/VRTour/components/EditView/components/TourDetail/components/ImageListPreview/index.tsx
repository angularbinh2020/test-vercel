import React, { Fragment, useMemo } from "react";

import styles from "./styles.module.scss";
import { Image360, IRoom } from "sites/mogivi/models/IVR360";
import Grid from "@material-ui/core/Grid";
import Image from "next/legacy/image";

interface Props {
  rooms: IRoom[];
  openEditMode: any;
  imagesSetting: Image360[];
}

const ImageListPreview = ({ rooms, openEditMode, imagesSetting }: Props) => {
  const roomsDisplay = useMemo(() => {
    const mergeResult: IRoom[] = JSON.parse(JSON.stringify(rooms));
    mergeResult.forEach((room) => {
      const imageMatch = imagesSetting.find((img) => img.id === room.id);
      if (imageMatch) room.title = imageMatch.title;
    });
    return mergeResult;
  }, [rooms, imagesSetting]);
  return (
    <Fragment>
      {roomsDisplay.map((room, roomIndex) => (
        <Grid
          item
          xs={2}
          key={`image-360-preview-id-${room.id}-index-${roomIndex}`}
        >
          <div className={styles.tourDetailItem}>
            <div className={styles.imgTourDetail}>
              <Image
                alt={room.title}
                src={
                  room.imagesJsonParsed.roomPreview ?? room.panorama_url_preview
                }
                onClick={() => openEditMode(room.id)}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h6>
              {roomIndex + 1}. {room.title}
            </h6>
          </div>
        </Grid>
      ))}
    </Fragment>
  );
};

export default React.memo(ImageListPreview);
