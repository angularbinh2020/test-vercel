/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import Modal from "react-bootstrap/Modal";
import Overlay from "react-bootstrap/Overlay";
import Fade from "react-bootstrap/Fade";
import Button from "react-bootstrap/Button";
import styles from "./chat-popup.module.scss";
import { ConversationGroupType } from "sites/mogivi/const/vr360";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Carousel from "react-bootstrap/Carousel";
import CloseIcon from "sites/mogivi/assets/icons/ic-close.svg";
import UserIcon from "sites/mogivi/assets/icons/ic-user-info.svg";
import Image from "next/image";
import MogiviLogo from "images/mogivi-logo.png";

const Transition = forwardRef(function Transition(props, ref) {
  //@ts-ignore
  return <Carousel direction="up" ref={ref} {...props} />;
});

const ChatPopup = (props: any) => {
  const {
    children,
    open,
    anchorEl,
    handleClick,
    isMobile,
    chatInfo,
    agencyFullName,
    agencyAvatar,
  } = props;
  const imageBroker = () => {
    if (chatInfo?.type === ConversationGroupType.TWO_CUSTOMER_SUPPORT) {
      return (
        <>
          <Image
            src={UserIcon}
            alt=""
            style={{ borderRadius: "20px" }}
            className={styles.logo}
            width={40}
            height={40}
          />
          <span
            style={
              !isMobile
                ? { position: "absolute", marginLeft: "50px" }
                : {
                    position: "absolute",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }
            }
          >
            {" "}
            {"Support Mogivi"}
          </span>
        </>
      );
    }
    if (agencyAvatar)
      return (
        <>
          <Image
            src={UserIcon}
            width={40}
            height={40}
            style={{ borderRadius: "20px" }}
            className={styles.logo}
            alt="user avatar"
          />

          <span
            style={
              !isMobile
                ? { position: "absolute", marginLeft: "50px" }
                : {
                    position: "absolute",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }
            }
          >
            {" "}
            {agencyFullName}
          </span>
        </>
      );
    return <Image src={MogiviLogo} alt="" className={styles.logo} />;
  };

  if (isMobile)
    return (
      <Modal
        fullScreen
        open={open}
        onClose={handleClick}
        TransitionComponent={Transition}
        className={styles.mobileContainer}
      >
        <Navbar className={styles.appBar}>
          <Navbar.Brand>
            <div className={styles.title}>{imageBroker()}</div>

            <Button
              color="inherit"
              onClick={handleClick}
              aria-label="close"
              className={styles.icClose}
            >
              <img src={CloseIcon} alt="close" />
            </Button>
          </Navbar.Brand>
        </Navbar>
        {children}
      </Modal>
    );

  return (
    <Overlay show={open} target={anchorEl} placement="top-end" transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Card className={styles.chatPopupContainer}>
            <div className={styles.headerContainer}>
              {imageBroker()}
              <Button title="Đóng cửa sổ chat" onClick={handleClick}>
                <CloseIcon />
              </Button>
            </div>
            {children}
          </Card>
        </Fade>
      )}
    </Overlay>
  );
};

ChatPopup.propTypes = {
  anchorEl: PropTypes.any,
  children: PropTypes.any,
  handleClick: PropTypes.any,
  isMobile: PropTypes.any,
  open: PropTypes.any,
};

export default ChatPopup;
