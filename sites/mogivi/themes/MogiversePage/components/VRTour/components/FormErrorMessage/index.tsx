//@ts-check
import React from "react";

//--- Styles
import styles from "./styles.module.scss";

//--- Others
import PropTypes from "prop-types";

const FormErrorMessage = (props: any) => {
  const { errorMessage } = props;

  if (!errorMessage) return null;

  return <div className={styles.errorMessage}>{errorMessage}</div>;
};

FormErrorMessage.propTypes = {
  errorMessage: PropTypes.any,
};

export default FormErrorMessage;
