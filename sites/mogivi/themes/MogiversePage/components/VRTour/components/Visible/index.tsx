import PropTypes from "prop-types";
import React from "react";

const Visible = (props: any) => {
  const { condition, children } = props;
  if (!condition) return null;
  return children;
};

Visible.propTypes = {
  children: PropTypes.any,
  condition: PropTypes.any,
};

export default Visible;
