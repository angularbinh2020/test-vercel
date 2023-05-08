import classNames from "classnames";
import React, { useState } from "react";
import styles from "./images-list.module.scss";
import {
  hiddenButtonChatAgency,
  showButtonChatAgency,
} from "sites/mogivi/utils/vr360";
import IconImages from "sites/mogivi/assets/icons/ic-images.svg";
import { IImageList } from "sites/mogivi/models/IVR360";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Image from "next/image";

interface Props {
  isTabletOrMobile: boolean;
  isMobile: boolean;
  handleGoToImageSettingByImageId: any;
  closeAllOpenPopup: any;
  images: IImageList[];
}

const ImagesList = (props: Props) => {
  const {
    images,
    handleGoToImageSettingByImageId,
    isMobile,
    closeAllOpenPopup,
    isTabletOrMobile,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event: any) => {
    const isOpen = !open;
    if (isOpen && isTabletOrMobile) {
      closeAllOpenPopup();
      isMobile && hiddenButtonChatAgency();
    } else {
      showButtonChatAgency();
    }
    setAnchorEl(event.currentTarget);
    setOpen(isOpen);
  };

  return (
    <div className={styles.imageList}>
      <button
        onClick={handleClick}
        className={classNames({ "popup-image-list-open": open })}
      >
        <img src={IconImages.src} alt="images" width="24px" height="22px" />
        <span className={classNames({ "mobile-hidden": isMobile })}>
          Ảnh liên kết room
        </span>
      </button>

      <Popper
        open={open}
        anchorEl={anchorEl}
        // anchorOrigin={{
        //   vertical: "top",
        //   horizontal: "center",
        // }}
        // transformOrigin={{
        //   vertical: "top",
        //   horizontal: "left",
        // }}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              className={classNames(styles.imageListContainer, "scroll-styled")}
            >
              <div className="h-100 image-list-container-ref">
                {images.map((imageSetting: IImageList, imageIndex: number) => (
                  <Grid
                    key={`image-items-image-id-${imageSetting.id}-index-${imageIndex}`}
                    container
                    className={styles.imagePreview}
                    onClick={() => {
                      setOpen(false);
                      handleGoToImageSettingByImageId(imageSetting.id);
                    }}
                  >
                    <Grid xs={5}>
                      <div className={styles.imgPlaceholder}>
                        <Image
                          src={imageSetting.thumbnailUrl}
                          alt={imageSetting.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </Grid>
                    <Grid xs={7}>
                      <h5>{imageSetting.title}</h5>
                    </Grid>
                  </Grid>
                ))}
              </div>
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default ImagesList;
