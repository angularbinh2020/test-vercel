import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import TextField from "@material-ui/core/TextField";
import styles from "./styles.module.scss";
import Box from "@material-ui/core/Box";
import FormErrorMessage from "../FormErrorMessage";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  error: {
    border: "1px solid red",
  },
}));

const TextInputStyled = (props: any) => {
  const { className, label, errorMsg, ...restProps } = props;
  const classes = useStyles();

  return (
    <>
      {label && (
        <Box fontSize="14px" color="#424345">
          {label}
        </Box>
      )}
      <TextField
        className={classNames(
          "mb-3",
          styles.input,
          errorMsg && classes.error,
          className
        )}
        {...restProps}
      />
      <FormErrorMessage errorMessage={errorMsg} />
    </>
  );
};

TextInputStyled.propTypes = {
  className: PropTypes.any,
  value: PropTypes.any,
  InputProps: PropTypes.any,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string,
  label: PropTypes.string,
  errorMsg: PropTypes.any,
  multiline: PropTypes.any,
  rows: PropTypes.any,
  defaultValue: PropTypes.any,
  min: PropTypes.any,
  max: PropTypes.any,
};

export default TextInputStyled;
