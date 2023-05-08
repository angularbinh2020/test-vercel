//@ts-check
import React from "react";
import PropTypes from "prop-types";

//--- Material UI
import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import classNames from "classnames";

import styles from "./styles.module.scss";
import { IHotSpotIcon } from "models/IHotSpotIcon";
import { IHotSpot } from "sites/mogivi/models/ICommonHotSpotOption";
import Image from "next/image";
function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`label-tabpanel-${index}`}
      aria-labelledby={`label-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="h3">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `label-tab-${index}`,
    "aria-controls": `label-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  labelTabContainer: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    "& .MuiAppBar-root": {
      backgroundColor: "#ffffff",
      color: "#2f2f2b",
      boxShadow: "none",
      "& .MuiTabs-root": {
        "& .MuiTab-root": {
          textTransform: "none",
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "#ff4e00",
          height: 3,
        },
      },
    },
  },

  labelListItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
    "& span": {
      marginLeft: 10,
      width: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
}));

interface Props {
  tagIcons: IHotSpotIcon[];
  onClickTagIcon: any;
  onClickExistedLabel: any;
  tagHotSpots: IHotSpot[];
}

const LabelTabs = (props: Props) => {
  const { tagIcons, onClickTagIcon, onClickExistedLabel, tagHotSpots } = props;
  const classes = useStyles();

  //--- Change tab
  const [valueTab, setValueTab] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValueTab(newValue);
  };

  return (
    <div className={classes.labelTabContainer}>
      <AppBar position="static">
        <Tabs value={valueTab} onChange={handleChange} aria-label="label tabs">
          <Tab label="Nhãn dán" {...a11yProps(0)} />
          <Tab label="Danh sách đã tạo" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={valueTab} index={0}>
        <Grid container spacing={2} className="pt-4">
          {tagIcons.map((tagIcon: IHotSpotIcon) => (
            <Grid
              item
              xs={3}
              key={`tag-icon-select-code-${tagIcon.keyword}`}
              className={classNames("text-center", styles.hoverZoomIn)}
              onClick={() => onClickTagIcon(tagIcon)}
            >
              <Tooltip title={tagIcon.name}>
                <Image
                  src={tagIcon.file.logoUrl}
                  alt="Info"
                  width={25}
                  height={25}
                  title={tagIcon.name}
                />
              </Tooltip>
            </Grid>
          ))}
          {tagIcons.length === 0 && <p>Không có dữ liệu để hiển thị</p>}
        </Grid>
      </TabPanel>
      <TabPanel value={valueTab} index={1}>
        <div className="pt-4">
          {tagHotSpots.map((tag, tagIndex) => (
            <div
              key={`tag-hotspot-existed-id-${tag.id}`}
              className={classNames(classes.labelListItem, styles.labelExisted)}
              onClick={() => onClickExistedLabel(tag)}
            >
              <Image
                src={tag.icon?.file.logoUrl || ""}
                alt={`tag-${tagIndex}`}
                width={40}
                height={40}
              />
              <span>{`Tag - ${tagIndex}`}</span>
            </div>
          ))}
          {!tagHotSpots.length && <p>Chưa có nhãn nào được khởi tạo</p>}
        </div>
      </TabPanel>
    </div>
  );
};

LabelTabs.propTypes = {
  onClickExistedLabel: PropTypes.func.isRequired,
  onClickTagIcon: PropTypes.func.isRequired,
  tagHotSpots: PropTypes.array.isRequired,
  tagIcons: PropTypes.array.isRequired,
};

export default LabelTabs;
