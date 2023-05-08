import React, { useState, useEffect } from "react";

import styles from "./styles.module.scss";

import { convertYawToDegrees } from "sites/mogivi/utils/vr360";
import classNames from "classnames";

const DirectionArrow = (props: any) => {
  const { viewer, className, initDirection, initNorthDeg } = props;
  const [viewYaw, setViewYaw] = useState(initDirection.yaw);
  useEffect(() => {
    if (viewer)
      viewer.addEventListener("viewChange", function () {
        setViewYaw(viewer.view().yaw());
      });
  }, [viewer]);

  return (
    <div className={classNames(styles.container, className)}>
      <div>
        <div
          className={styles.directionArrow}
          style={{
            transform: `rotate(${convertYawToDegrees(
              viewYaw - initNorthDeg
            )}deg)`,
          }}
        ></div>
      </div>
    </div>
  );
};

DirectionArrow.defaultProps = {
  initNorthDeg: 0,
  initDirection: { yaw: 0 },
};

export default DirectionArrow;
