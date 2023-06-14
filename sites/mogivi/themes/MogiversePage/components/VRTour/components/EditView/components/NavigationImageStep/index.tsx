import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";
import IconChevronLeft from "sites/mogivi/assets/icons/ic-chevron-left.svg";
import IconChevronRight from "sites/mogivi/assets/icons/ic-chevron-right.svg";
import Image from "next/legacy/image";

interface Props {
  handleGoBack: any;
  isCanNotGoBack: boolean;
  children: any;
  handleGoNext: any;
  isCanNotGoNextSection: boolean;
  className?: string;
}

const NavigationImageStep = (props: Props) => {
  const {
    handleGoBack,
    isCanNotGoBack,
    children,
    handleGoNext,
    isCanNotGoNextSection,
    className,
  } = props;
  return (
    <div className={classNames(styles.setupStep, className)}>
      <button
        className={styles.setupPreviousStep}
        onClick={handleGoBack}
        disabled={isCanNotGoBack}
      >
        <Image src={IconChevronLeft} alt="Previous" />
        <span>Trước đó</span>
      </button>
      <div className={styles.setupStepInfo}>{children}</div>
      <button
        className={styles.setupNextStep}
        onClick={handleGoNext}
        disabled={isCanNotGoNextSection}
      >
        <span>Tiếp tục</span>
        <Image src={IconChevronRight} alt="Next" />
      </button>
    </div>
  );
};

export default NavigationImageStep;
