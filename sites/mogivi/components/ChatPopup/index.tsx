import React, { forwardRef, useRef } from "react";
import { Box, Popper, Fade } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import styles from "./styles.module.scss";
import useDetectDeviceByScreen from "sites/mogivi/hooks/useDetectDeviceByScreen";
import ChatContent from "./components/ChatContent";
import ChatHeader from "./components/ChatContent/components/ChatHeader";
import classNames from "classnames";

const Transition = forwardRef(function Transition(props, ref) {
  //@ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  isOpen: boolean;
  handleClose: any;
  fullName: string;
  avatar: string;
  anchorEl?: any;
  agencyPhoneNumber: string;
}

const ChatPopupContainer = (props: Props) => {
  const { isOpen, handleClose, fullName, avatar, anchorEl, agencyPhoneNumber } =
    props;
  const { isMobile } = useDetectDeviceByScreen();
  if (isMobile)
    return (
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        //@ts-ignore
        TransitionComponent={Transition}
        className={styles.mobileContainer}
      >
        <AppBar className={styles.appBar}>
          <Toolbar>
            <div className={styles.title}>
              <ChatHeader
                avatar={avatar}
                fullName={fullName}
                styles={styles}
                isMobile={isMobile}
              />
            </div>

            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              className={styles.icClose}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <ChatContent agencyPhoneNumber={agencyPhoneNumber} />
      </Dialog>
    );
  if (anchorEl)
    return (
      <>
        <Popper
          open={isOpen}
          anchorEl={anchorEl}
          placement="top-end"
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Box className={styles.chatPopupContainer}>
                <div className={styles.headerContainer}>
                  <ChatHeader
                    avatar={avatar}
                    fullName={fullName}
                    styles={styles}
                    isMobile={isMobile}
                  />
                  <IconButton title="Đóng cửa sổ chat" onClick={handleClose}>
                    <CloseIcon htmlColor="white" />
                  </IconButton>
                </div>
                <ChatContent agencyPhoneNumber={agencyPhoneNumber} />
              </Box>
            </Fade>
          )}
        </Popper>
      </>
    );
  if (isOpen)
    return (
      <Box
        className={classNames(
          styles.chatPopupContainer,
          "shadow px-0",
          styles.desktopHook
        )}
      >
        <div className={styles.headerContainer}>
          <ChatHeader
            avatar={avatar}
            fullName={fullName}
            styles={styles}
            isMobile={isMobile}
          />
          <IconButton title="Đóng cửa sổ chat" onClick={handleClose}>
            <CloseIcon htmlColor="white" />
          </IconButton>
        </div>
        <ChatContent agencyPhoneNumber={agencyPhoneNumber} />
      </Box>
    );

  return null;
};

export default ChatPopupContainer;
