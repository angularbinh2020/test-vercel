import PropTypes from "prop-types";
import React from "react";

import styles from "./styles.module.scss";

const ImageTitle = (props: any) => {
  const { children } = props;
  return <div className={styles.imageTitle}>{children}</div>;
};

ImageTitle.propTypes = {
  children: PropTypes.any,
};

export default ImageTitle;
