import PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { COLORS } from "sites/mogivi/const/vr360";

const MogiviSwitch = (props: any) => {
  const { label, ...switchProps } = props;
  return (
    <FormControlLabel control={<Switch {...switchProps} />} label={label} />
  );
};

MogiviSwitch.propTypes = {
  checked: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any,
  onChange: PropTypes.any,
};

const SwitchStyled = withStyles({
  switchBase: {
    color: COLORS.MogiviBlur,
    "&$checked": {
      color: COLORS.Mogivi,
    },
    "&$checked + $track": {
      backgroundColor: COLORS.Mogivi,
    },
  },
  checked: {},
  track: {},
})(MogiviSwitch);

export default SwitchStyled;
