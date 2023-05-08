import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InputLabel from "@material-ui/core/InputLabel";
import FormLabel from "@material-ui/core/FormLabel";
import styles from "./styles.module.scss";
import { isHotSpotHaveCoords } from "sites/mogivi/utils/vr360";

import DropdownStyled from "sites/mogivi/themes/MogiversePage/components/VRTour/components/DropdownStyled";
import PreviewImageSelected from "../PreviewImageSelected";
import ButtonMG from "sites/mogivi/themes/MogiversePage/components/VRTour/components/ButtonMG";
import { Image360, IRoom } from "sites/mogivi/models/IVR360";
import {
  IHotSpot,
  IImageTarget,
} from "sites/mogivi/models/ICommonHotSpotOption";
import { IHotSpotIcon } from "models/IHotSpotIcon";

interface Props {
  handleCancel: any;
  handleSave: any;
  image360s: IRoom[];
  imageSetting: Image360;
  beingEditedCustomHotSpot: IHotSpot;
  hotSpotIcons: IHotSpotIcon[];
  imageSettings: Image360[];
}

export default function EditCustomHotSpotImage(props: Props) {
  const {
    handleCancel,
    handleSave,
    image360s,
    imageSetting,
    beingEditedCustomHotSpot,
    hotSpotIcons,
    imageSettings,
  } = props;
  const currentRoom = useMemo(() => {
    return image360s.find((room) => room.id === imageSetting.id);
  }, [image360s, imageSetting]);
  const [defaultView, setDefaultView] = useState(
    beingEditedCustomHotSpot.defaultView || hotSpotIcons[0]
  );

  const [imageTargetSelected, setImageTargetSelected] = useState(
    beingEditedCustomHotSpot.imageTarget || null
  );

  const [imageOptions, setImageOptions] = useState<IRoom[]>([]);

  const isNotCompletedYet = !imageTargetSelected || !defaultView;

  const handleChangeImageTarget = useCallback((room: IRoom) => {
    const newImageTarget: IImageTarget = {
      id: room.id,
      title: room.title,
      thumbnailUrl: room.panorama_url_preview,
    };
    setImageTargetSelected(newImageTarget);
  }, []);

  useEffect(() => {
    const listOptionsIdHide = [imageSetting.id];
    const mainHotSpot = ["nextMarkerPosition", "previousMarkerPosition"];
    mainHotSpot.map((propertyName) => {
      //@ts-ignore
      const hotspot = imageSetting[propertyName] as any;
      if (isHotSpotHaveCoords(hotspot)) {
        hotspot?.imageTarget?.id &&
          listOptionsIdHide.push(hotspot?.imageTarget?.id);
      }
    });
    imageSetting.customHotSpots?.map((hotSpotConfig) => {
      hotSpotConfig?.imageTarget?.id &&
        listOptionsIdHide.push(hotSpotConfig?.imageTarget?.id);
    });
    const newOptions = image360s
      .filter((x) => !listOptionsIdHide.includes(x.id))
      .map((option) => {
        const imgSettingMatch = imageSettings.find(
          (img) => img.id === option.id
        );
        return { ...option, title: imgSettingMatch?.title || "" };
      });
    setImageOptions(newOptions);
  }, []);

  return (
    <Dialog
      open
      maxWidth={"sm"}
      fullWidth
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Custom hotspot
        <IconButton
          aria-label="close"
          className={styles.closeButton}
          onClick={handleCancel}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormLabel>Room</FormLabel>
        <DropdownStyled
          placeholder="Chọn nguồn ảnh cho hotspot"
          value={imageTargetSelected}
          options={imageOptions}
          onChange={handleChangeImageTarget}
          getOptionLabel={(option: IRoom) => option.title}
          menuShouldScrollIntoView={false}
          styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
          getOptionValue={(option: IRoom) => option.id}
        />
        {imageTargetSelected && (
          <PreviewImageSelected
            imageTargetSelected={imageTargetSelected}
            defaultView={defaultView}
            setDefaultView={setDefaultView}
            labelSetDefaultView={`${currentRoom?.title} tới ${imageTargetSelected.title}`}
            image360s={image360s}
          />
        )}
        <InputLabel
          error={isNotCompletedYet}
          className={classNames("mt-2", styles.guideInfo)}
        >
          (*) Vui lòng chọn nguồn ảnh và góc nhìn mặc định trước khi tiếp tục
        </InputLabel>
      </DialogContent>
      <DialogActions className="mb-3">
        <ButtonMG onClick={handleCancel} color="primary">
          Hủy
        </ButtonMG>
        <ButtonMG
          onClick={() => handleSave(imageTargetSelected, defaultView)}
          disabled={isNotCompletedYet}
          className="mr-3"
        >
          Lưu lại
        </ButtonMG>
      </DialogActions>
    </Dialog>
  );
}

EditCustomHotSpotImage.propTypes = {
  handleCancel: PropTypes.any,
  handleSave: PropTypes.any,
  image360s: PropTypes.any,
};
