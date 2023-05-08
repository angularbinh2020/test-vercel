import PropTypes from "prop-types";
import React, { Fragment } from "react";
import classNames from "classnames";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

import TextInputStyled from "sites/mogivi/themes/MogiversePage/components/VRTour/components/TextInputStyled";
import FormErrorMessage from "../FormErrorMessage";

const useStyles = makeStyles((theme) => ({
  txtSetupAds: {
    marginBottom: "0 !important",
    backgroundColor: "#F3F2F7",
    borderRadius: 4,

    "& .MuiInputBase-root": {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),

      "&::before": {
        content: "none",
      },

      "&::after": {
        content: "none",
      },
    },
  },
  error: {
    border: "1px solid red",
  },
}));

const AdsInputText = (props: any) => {
  const {
    label,
    iconUrl,
    className,
    iconAlt,
    gridOneProps,
    gridTwoProps,
    error,
    errorMsg,
    ...inputProps
  } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item xs={4} {...gridOneProps}>
        <Box display="flex" alignItems="center">
          {iconUrl && <img src={iconUrl} alt={iconAlt} className="mr-2" />}
          <Box fontSize="14px" color="#424345">
            {label}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={8} {...gridTwoProps}>
        <TextInputStyled
          className={classNames(
            classes.txtSetupAds,
            (error || errorMsg) && classes.error,
            className
          )}
          {...inputProps}
        />
      </Grid>
      <FormErrorMessage errorMessage={errorMsg} />
    </Fragment>
  );
};

AdsInputText.propTypes = {
  InputProps: PropTypes.any,
  className: PropTypes.any,
  error: PropTypes.any,
  gridOneProps: PropTypes.any,
  gridTwoProps: PropTypes.any,
  iconAlt: PropTypes.any,
  iconUrl: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  errorMsg: PropTypes.any,
};

export default AdsInputText;
