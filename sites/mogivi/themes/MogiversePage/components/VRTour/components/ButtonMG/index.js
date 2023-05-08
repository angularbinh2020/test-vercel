import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";

import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./styles.module.scss";

const ButtonMG = (props) => {
  const { children, className, color, disabled, isLoading, ...restProps } =
    props;

  return (
    <button
      disabled={disabled || isLoading}
      className={classNames(styles.button, color && styles[color], className)}
      {...restProps}
    >
      {children}
      {isLoading && <CircularProgress size={10} className="ml-2" />}
    </button>
  );
};

ButtonMG.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.oneOf(["primary"]),
  disabled: PropTypes.any,
  isLoading: PropTypes.any,
  onClick: PropTypes.any,
};

export default ButtonMG;
