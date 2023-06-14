import { useRef, useCallback, useEffect } from "react";
import { I3DModel } from "sites/mogivi/models/I3DModel";
import { useRenderTour3D } from "sites/mogivi/hooks/useRenderTour3D";
import classNames from "classnames";
import LoadingView from "./components/LoadingView";
import MobileMenu from "./components/MobileMenu";
import Image from "next/legacy/image";
import PhoneRotateImage from "sites/mogivi/assets/images/mogiverse/rotate.png";
import MoveBtnImage from "sites/mogivi/assets/icons/WASD.webp";
import EscBtnImage from "sites/mogivi/assets/icons/esc.webp";
import MogiviLogo from "sites/mogivi/assets/icons/mogivi-logo.png";

import styles from "./styles.module.scss";
import DesktopMenu from "./components/DesktopMenu";

interface Props {
  models: I3DModel[];
  setModels: any;
}

const View3D = ({ models, setModels }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockerRef = useRef<HTMLDivElement>(null);
  const {
    startRender,
    renderModel,
    isRenderReady,
    isLoadingModel,
    startViewTour,
    isViewing,
    isTouchDevice,
    isUsingMeasureTool,
    toggleUseMeasureTools,
  } = useRenderTour3D(styles.measurementLabel);

  const handleStartViewTour = useCallback((newModels: any) => {
    setModels(newModels);
    startViewTour();
  }, []);

  useEffect(() => {
    if (isRenderReady) {
      const activeModel = models.find((model) => model.isView);
      if (activeModel) renderModel(activeModel?.fileUrl, true);
    }
  }, [isRenderReady, models]);

  useEffect(() => {
    if (containerRef.current && blockerRef.current) {
      startRender(containerRef.current, blockerRef.current);
    }
  }, []);

  return (
    <div className={styles.tourContainer}>
      <div
        className={classNames(
          styles.heightSlider,
          isViewing && styles.displayBlock,
          isTouchDevice && styles.mobileRange
        )}
      >
        <input type="range" step="0.1" id="slider" />
        <span>Chiều cao camera</span>
      </div>
      <div
        className={classNames(styles.blocker, isLoadingModel && "d-none")}
        ref={blockerRef}
      >
        <DesktopMenu rooms={models} startViewTour={handleStartViewTour} />
      </div>
      <div className={styles.container} ref={containerRef}></div>
      {isTouchDevice && (
        <>
          <div className={styles.mogiviLogo}>
            <Image src={MogiviLogo} alt="mogivi logo" />
          </div>
          <div className={styles.joystick} id="left_joystick"></div>
          <div className={styles.portraitBlock}>
            <div className="phone">
              <Image src={PhoneRotateImage} alt="phone rotate image" />
            </div>
          </div>
          <MobileMenu rooms={models} startViewTour={handleStartViewTour} />
        </>
      )}
      {isLoadingModel && <LoadingView />}
      {isViewing && !isTouchDevice && !isLoadingModel && (
        <>
          <div className={styles.escBtn}>
            <Image src={EscBtnImage} />
          </div>
          <div className={styles.moveBtn}>
            <Image src={MoveBtnImage} />
          </div>
          <div
            className={classNames(
              styles.rulerBtn,
              isUsingMeasureTool && styles.isUsingMeasureTool
            )}
            onClick={toggleUseMeasureTools}
          >
            <svg
              className="icon-tool-ruler"
              width="35px"
              height="34px"
              viewBox="0 0 35 34"
            >
              <g strokeWidth="1" fillRule="evenodd" strokeLinecap="round">
                <g transform="translate(-5.000000, -7.000000)">
                  <g>
                    <g transform="translate(8.800000, 8.800000)">
                      <path
                        className="svg-body-fill svg-body-stroke"
                        d="M9.99819487,-0.90839301 L16.7215895,-0.90839301 C17.2738742,-0.90839301 17.7215895,-0.46067776 17.7215895,0.0916069897 L17.7215895,26.0982949 C17.7215895,26.6505797 17.2738742,27.0982949 16.7215895,27.0982949 L9.99819487,27.0982949 C9.44591012,27.0982949 8.99819487,26.6505797 8.99819487,26.0982949 L8.99819487,0.0916069897 C8.99819487,-0.46067776 9.44591012,-0.90839301 9.99819487,-0.90839301 Z"
                        id="Rectangle-path"
                        stroke="#4BB0C0"
                        fill="#4BB0C0"
                        transform="translate(13.359892, 13.094951) rotate(-45.000000) translate(-13.359892, -13.094951) "
                      ></path>
                      <line
                        className="svg-detail-stroke"
                        x1="10.4452174"
                        y1="9.41217391"
                        x2="12.9704348"
                        y2="6.88695652"
                        id="Shape"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      ></line>
                      <line
                        className="svg-detail-stroke"
                        x1="20.2017391"
                        y1="19.1686957"
                        x2="22.7269565"
                        y2="16.6434783"
                        id="Shape"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      ></line>
                      <line
                        className="svg-detail-stroke"
                        x1="17.1026087"
                        y1="16.0695652"
                        x2="19.6278261"
                        y2="13.5443478"
                        id="Shape"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      ></line>
                      <path
                        className="svg-detail-stroke"
                        d="M12.5113043,13.8886957 C14.0519126,12.4418764 15.3087331,11.2056836 16.2817658,10.1801171"
                        id="Shape"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        className="svg-detail-stroke"
                        d="M18.9167616,20.4134004 C20.4573699,18.9665812 21.7141904,17.7303884 22.6872231,16.7048219"
                        id="Shape"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        className="svg-detail-stroke"
                        d="M6.03556944,7.45460788 C7.57617775,6.00778863 8.83299824,4.77159578 9.80603093,3.74602932"
                        id="Shape"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default View3D;
