//@ts-check
import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import styles from "./top-navigation.module.scss";
import LeftArrowIcon from "sites/mogivi/assets/icons/ic-chevron-left-white.svg";
import RightArrowIcon from "sites/mogivi/assets/icons/ic-chevron-right-white.svg";
import Image from "next/legacy/image";
interface Props {
  currentIndex: number;
  handleGoToImageSetting: any;
  isDisabledPreviousButton: boolean;
  isDisabledNextButton: boolean;
  roomTitle: string;
}

const TopNavigation = ({
  currentIndex,
  handleGoToImageSetting,
  isDisabledPreviousButton,
  isDisabledNextButton,
  roomTitle,
}: Props) => {
  return (
    <>
      <div className={styles.topActionsBar}>
        <div
          className={classNames(
            styles.previewMainAction,
            styles.actionContainer
          )}
        >
          <div className="d-flex align-items-center justify-content-between">
            <button
              onClick={() => handleGoToImageSetting(currentIndex - 1)}
              disabled={isDisabledPreviousButton}
              className="d-flex align-items-center"
            >
              <Image src={LeftArrowIcon} alt="Previous" width="7" height="11" />
              <span className="ms-2 mobile-hidden">Trước</span>
            </button>
            <h3 className="mt-0 mb-0 text-white text-truncate">{roomTitle}</h3>
            <button
              onClick={() => handleGoToImageSetting(currentIndex + 1)}
              disabled={isDisabledNextButton}
              className="d-flex align-items-center"
            >
              <span className="mobile-hidden me-2">Tiếp theo</span>
              <Image src={RightArrowIcon} alt="Next" width="7" height="11" />
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => handleGoToImageSetting(currentIndex - 1)}
        disabled={isDisabledPreviousButton}
        className={classNames(
          "align-items-center",
          styles.showOnMobileLandscape,
          styles.previous
        )}
      >
        <Image src={LeftArrowIcon} alt="Previous" width="7" height="11" />
        <span className="ms-2 mobile-hidden">Trước</span>
      </button>
      <button
        onClick={() => handleGoToImageSetting(currentIndex + 1)}
        disabled={isDisabledNextButton}
        className={classNames(
          "align-items-center",
          styles.showOnMobileLandscape,
          styles.next
        )}
      >
        <span className="mobile-hidden me-2">Tiếp theo</span>
        <Image src={RightArrowIcon} alt="Next" width="7" height="11" />
      </button>
    </>
  );
};

TopNavigation.propTypes = {
  currentIndex: PropTypes.number,
  handleGoToImageSetting: PropTypes.func,
  isDisabledNextButton: PropTypes.any,
  isDisabledPreviousButton: PropTypes.any,
};

export default TopNavigation;
