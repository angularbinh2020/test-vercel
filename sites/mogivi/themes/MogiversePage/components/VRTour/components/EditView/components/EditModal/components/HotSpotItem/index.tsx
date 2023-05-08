import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import styles from "./styles.module.scss";
import { IHotSpot } from "sites/mogivi/models/ICommonHotSpotOption";
import Tooltip from "@material-ui/core/Tooltip";
import Image from "next/image";

interface Props {
  title: string;
  hotSpotConfig?: IHotSpot;
  isActive?: boolean;
  isDetectedFail?: boolean;
  onClick: any;
  previewImage?: string;
  isHotSpotLinked?: any;
}

const HotSpotItem = (props: Props) => {
  const {
    title,
    hotSpotConfig,
    previewImage,
    isActive,
    onClick,
    isDetectedFail,
    isHotSpotLinked,
  } = props;
  return (
    <div
      className={classNames("mt-2", styles.hotSpotItem)}
      onClick={onClick}
      data-is-hot-spot-linked={isHotSpotLinked}
    >
      <div className={styles.imgPlaceholder}>
        <Image
          src={previewImage || hotSpotConfig?.imageTarget?.thumbnailUrl || ""}
          alt="Thumbnail image"
          width={50}
          height={50}
          layout="fixed"
        />
      </div>

      <div className="text-truncate w-100">{title}</div>
      {isDetectedFail ? (
        <Tooltip title="AI không xác định được tọa độ">
          <ErrorIcon className={styles.svgMogiviColor} />
        </Tooltip>
      ) : (
        <>
          {isActive ? (
            <VisibilityIcon className={styles.svgMogiviColor} />
          ) : (
            <VisibilityOffIcon className={styles.svgMogiviColor1} />
          )}
        </>
      )}
    </div>
  );
};

HotSpotItem.propTypes = {
  hotSpotConfig: PropTypes.shape({
    imageTarget: PropTypes.shape({
      ThumbnailUrl: PropTypes.any,
    }),
  }),
  isActive: PropTypes.any,
  onClick: PropTypes.any,
  title: PropTypes.any,
};

export default HotSpotItem;
