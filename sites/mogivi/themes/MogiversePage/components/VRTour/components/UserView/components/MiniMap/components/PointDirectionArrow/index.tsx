import React, { useState, useEffect } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

import { convertYawToDegrees } from "sites/mogivi/utils/vr360";

const PointDirectionArrow = (props: any) => {
  const { viewer, className, initDirection, initNorthDeg, ...restProps } =
    props;
  const [viewYaw, setViewYaw] = useState(initDirection.yaw);
  useEffect(() => {
    if (viewer)
      viewer.addEventListener("viewChange", function () {
        setViewYaw(viewer.view().yaw());
      });
  }, [viewer]);

  return (
    <span
      className={classNames(styles.container, "position-absolute", className)}
      {...restProps}
    >
      .
      <div
        className={classNames(styles.directionArrow)}
        style={{
          transform: `rotate(${convertYawToDegrees(
            viewYaw - initNorthDeg
          )}deg)`,
        }}
      ></div>
    </span>
  );
};

export default PointDirectionArrow;
