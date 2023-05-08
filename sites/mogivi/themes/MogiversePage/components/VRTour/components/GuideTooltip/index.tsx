//@ts-check
import PropTypes from "prop-types";
import React from "react";

import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";

import styles from "./styles.module.scss";

const GuideTooltip = (props: any) => {
  const { tooltip } = props;
  return (
    <Tooltip title={tooltip} classes={{ popper: styles.content }}>
      <HelpOutlineIcon className="ml-3 text-mogivi" fontSize="small" />
    </Tooltip>
  );
};

GuideTooltip.propTypes = {
  tooltip: PropTypes.any,
};

GuideTooltip.defaultProps = {
  tooltip: (
    <ul>
      <li>
        Giá trị các trường đường kính chân đế / width / height không nên vượt
        quá 500, vì có thể gây lỗi khi zoom in trên thiết bị Ios.
      </li>
      <li>Giảm giá trị zoom out (thu nhỏ) để tăng kích thước hiển thị</li>
      <li>
        X : Quay 3D dọc trục X{" "}
        <span className={`${styles.exampleSquare} ${styles.rotateX}`}></span>
      </li>
      <li>
        Y : Quay 3D dọc trục Y{" "}
        <span className={`${styles.exampleSquare} ${styles.rotateY}`}></span>
      </li>
      <li>
        Z : Quay 3D dọc trục Z{" "}
        <span className={`${styles.exampleSquare} ${styles.rotateZ}`}></span>
      </li>
    </ul>
  ),
};

export default GuideTooltip;
