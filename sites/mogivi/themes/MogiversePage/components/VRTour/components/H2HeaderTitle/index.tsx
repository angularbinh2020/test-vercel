import classNames from "classnames";
import React from "react";

import styles from "./styles.module.scss";

interface Props {
  children: any;
  className?: string;
}

const H2HeaderTitle = ({ children, className, ...restProps }: Props) => {
  return (
    <h2
      className={classNames("mt-0 mb-0", styles.h2Styled, className)}
      {...restProps}
    >
      {children}
    </h2>
  );
};

export default H2HeaderTitle;
