//@ts-check
import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useState, useEffect, useMemo } from "react";

import styles from "./styles.module.scss";

import PointDirectionArrow from "./components/PointDirectionArrow";
import TouchAbleCircle from "./components/TouchAbleCircle";

const MiniMap = (props: any) => {
  const {
    tourDetail,
    className,
    viewer,
    initDirection,
    initNorthDeg,
    position,
    miniMapSetting,
    handleGoToImageSettingByImageId,
  } = props;
  const miniMapDisplayWidth = 165;
  const [toucheAbleCircles, setToucheAbleCircles] = useState([]);
  const positionOffSet = {
    left: 5,
    top: -6,
  };

  const aspectRatio = useMemo(() => {
    if (!tourDetail || !tourDetail.MiniMap || !tourDetail.MiniMap[0]) return 1;
    return (
      miniMapDisplayWidth / tourDetail.MiniMap[0].ResolutionOriginalUrl.Width
    );
  }, [tourDetail]);

  const currentPosition = useMemo<any>(() => {
    const rawPosition = miniMapSetting || position || { left: 0, top: 0 };
    return {
      left: `${aspectRatio * rawPosition.left + positionOffSet.left}px`,
      top: `${aspectRatio * rawPosition.top + positionOffSet.top}px`,
    };
  }, [miniMapSetting, position]);

  useEffect(() => {
    if (!tourDetail) return;
    const newCircles = tourDetail.TourSettings.imagesSetting.map(
      (imageSetting: any) => {
        if (!imageSetting.miniMapSetting) return null;
        const miniMapSetting = imageSetting.miniMapSetting;
        const circleConfig = {
          touchRadius: miniMapSetting.touchRadius || 0,
          position: miniMapSetting,
          onClick: () => handleGoToImageSettingByImageId(imageSetting.Id),
        };
        return circleConfig;
      }
    );
    setToucheAbleCircles(newCircles.filter((x: any) => x));
  }, [tourDetail]);

  if (
    !tourDetail ||
    !tourDetail.MiniMap ||
    !tourDetail.MiniMap[0] ||
    !miniMapSetting
  )
    return null;

  return (
    <div className={classNames(styles.miniMapContainer, className)}>
      <div className="position-relative">
        <img src={tourDetail.MiniMap[0].OriginalUrl} className="w-100" />
        <PointDirectionArrow
          viewer={viewer}
          initDirection={initDirection}
          initNorthDeg={initNorthDeg}
          style={{ ...currentPosition }}
        />
        {toucheAbleCircles.map((touchCircle: any, touchCircleIndex) => (
          <TouchAbleCircle
            key={`touch-circle-${touchCircle.position.id}-index-${touchCircleIndex}`}
            aspectRatio={aspectRatio}
            {...touchCircle}
          />
        ))}
      </div>
    </div>
  );
};

MiniMap.propTypes = {
  className: PropTypes.any,
  handleGoToImageSettingByImageId: PropTypes.func,
  initDirection: PropTypes.any,
  initNorthDeg: PropTypes.any,
  miniMapSetting: PropTypes.shape({
    touchRadius: PropTypes.number,
  }),
  position: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }),
  toucheAbleCircles: PropTypes.shape({
    map: PropTypes.func,
  }),
  tourDetail: PropTypes.shape({
    MiniMap: PropTypes.any,
    Minimap: PropTypes.shape({
      OriginalUrl: PropTypes.any,
      ResolutionOriginalUrl: PropTypes.shape({
        Width: PropTypes.any,
      }),
    }),
    TourSettings: PropTypes.shape({
      imagesSetting: PropTypes.array,
    }),
  }),
  viewer: PropTypes.any,
};

MiniMap.defaulProps = {
  touchRadius: 0,
};

export default MiniMap;
