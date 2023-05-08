import React from "react";

import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";

import SwitchStyled from "sites/mogivi/themes/MogiversePage/components/VRTour/components/SwitchStyled/input";
import AdsInputText from "sites/mogivi/themes/MogiversePage/components/VRTour/components/AdsInputText";
import GuideTooltip from "sites/mogivi/themes/MogiversePage/components/VRTour/components/GuideTooltip";
import Visible from "sites/mogivi/themes/MogiversePage/components/VRTour/components/Visible";
import FormErrorMessage from "sites/mogivi/themes/MogiversePage/components/VRTour/components/FormErrorMessage";
import { MAXIMUM_WIDTH_SUGGESTION } from "sites/mogivi/const/vr360";
import IconWidth from "sites/mogivi/assets/icons/ic-width.svg";
import IconRadius from "sites/mogivi/assets/icons/ic-radius.svg";
import DropdownStyled from "sites/mogivi/themes/MogiversePage/components/VRTour/components/DropdownStyled";
import { IHotSpotIcon } from "models/IHotSpotIcon";

const CoverFooterSetting = (props: any) => {
  const {
    imageFooterCoverSetting,
    handleOnSwitchUsedCoverFooter,
    handleChangeFooterCoverWidth,
    handleChangeFooterCoverRadius,
    footerImages,
    handleChangeFooterImage,
  } = props;
  const isImageWidthOverMaximum =
    imageFooterCoverSetting.width > MAXIMUM_WIDTH_SUGGESTION;

  return (
    <div className="p-2">
      <SwitchStyled
        checked={imageFooterCoverSetting.isUsed}
        onChange={handleOnSwitchUsedCoverFooter}
        name="checkedA"
        label={
          <div className="d-flex">
            <span className="me-2">Sử dụng ảnh che chân đế chụp</span>
            <GuideTooltip />
          </div>
        }
      />

      <Collapse in={imageFooterCoverSetting.isUsed}>
        <Grid spacing={2} container alignItems="center">
          <Grid item xs={12}>
            <DropdownStyled
              placeholder="Chọn ảnh che chân đế"
              value={imageFooterCoverSetting.icon}
              options={footerImages}
              onChange={handleChangeFooterImage}
              getOptionLabel={(option: IHotSpotIcon) => option.name}
              menuShouldScrollIntoView={false}
              styles={{
                menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
              }}
              menuPortalTarget={document.body}
              getOptionValue={(option: IHotSpotIcon) => option.nodeId}
              className="w-full py-2"
            />
          </Grid>
          <AdsInputText
            type="number"
            iconUrl={IconWidth.src}
            label="Đường kính chân đế"
            value={imageFooterCoverSetting.width}
            onChange={handleChangeFooterCoverWidth}
            gridOneProps={{ xs: 7 }}
            gridTwoProps={{ xs: 5 }}
            error={isImageWidthOverMaximum}
          />
          <AdsInputText
            type="number"
            iconUrl={IconRadius.src}
            label="Thu nhỏ"
            value={imageFooterCoverSetting.radius}
            onChange={handleChangeFooterCoverRadius}
            gridOneProps={{ xs: 7 }}
            gridTwoProps={{ xs: 5 }}
          />
          <Visible condition={isImageWidthOverMaximum}>
            <Grid item xs={12}>
              <FormErrorMessage
                errorMessage={`(*) Đường kính chân đế vượt quá ${MAXIMUM_WIDTH_SUGGESTION}, một số
              thiết bị Ios có thể gặp lỗi khi zoom.`}
              />
            </Grid>
          </Visible>
        </Grid>
      </Collapse>
    </div>
  );
};

export default CoverFooterSetting;
