import React from "react";
import MogiviLogo from "sites/mogivi/assets/icons/mogivi-logo.png";
import Image from "next/image";

import styles from "./styles.module.scss";

const LoadingView = () => {
  return (
    <div className={styles.container}>
      <div>
        <Image src={MogiviLogo} alt="mogivi" />
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};

export default LoadingView;
