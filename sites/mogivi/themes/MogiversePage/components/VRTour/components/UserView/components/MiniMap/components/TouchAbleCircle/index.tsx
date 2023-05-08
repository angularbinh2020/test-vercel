import classNames from "classnames";
import React, { useMemo } from "react";

import styles from "./styles.module.scss";

const configPosition = {
  left: 3,
  top: 3,
};

const TouchAbleCircle = (props: any) => {
  const { position, touchRadius, aspectRatio, isShowBorder, ...restProps } =
    props;
  const circleWidth = useMemo(() => {
    return `${2 * touchRadius}px`;
  }, [touchRadius]);
  const { left, top } = useMemo(() => {
    const leftPosition =
      aspectRatio * position.centerX - touchRadius + configPosition.left;
    const topPosition =
      aspectRatio * position.centerY - touchRadius + configPosition.top;
    return {
      left: `${leftPosition}px`,
      top: `${topPosition}px`,
    };
  }, [position, touchRadius, aspectRatio]);
  return (
    <div
      className={classNames(styles.touchAbleCircle, {
        [styles.showBorder]: isShowBorder,
        ["hover-pointer"]: !isShowBorder,
      })}
      style={{
        width: circleWidth,
        height: circleWidth,
        borderRadius: `${touchRadius}px`,
        top,
        left,
      }}
      {...restProps}
    ></div>
  );
};

export default TouchAbleCircle;
