import React from "react";
import Slider from "@material-ui/core/Slider";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import styles from "./styles.module.scss";

const SliderInput = (props: any) => {
  const { value, handleChange, title, label, icon, iconUrl, ...sliderProps } =
    props;
  return (
    <Grid container>
      <Grid item xs={5}>
        <Box display="flex" alignItems="center">
          {iconUrl && <img src={iconUrl} alt={title} className="mr-2" />}
          <Box fontSize="14px" color="#424345">
            {label}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={7}>
        <Slider
          value={value}
          classes={{ root: styles.root }}
          onChange={handleChange}
          {...sliderProps}
        />
      </Grid>
    </Grid>
  );
};

export default SliderInput;
