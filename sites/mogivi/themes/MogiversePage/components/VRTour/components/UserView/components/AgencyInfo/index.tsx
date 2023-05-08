import React, { useState } from "react";
import classNames from "classnames";
import styles from "./agency-info.module.scss";
import {
  hiddenButtonChatAgency,
  showButtonChatAgency,
} from "sites/mogivi/utils/vr360";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import CloseIcon from "@material-ui/icons/Close";
import CallIcon from "@material-ui/icons/Call";
import MogiviAvatar from "sites/mogivi/assets/images/mogivi-avatar.png";
import Image from "next/image";

interface Props {
  userName: string;
  email: string;
  phoneNumber: string;
  isMobile: boolean;
  isTabletOrMobile: boolean;
  closeAllOpenPopup: any;
}

const AgencyInfo = (props: Props) => {
  const {
    userName,
    isMobile,
    closeAllOpenPopup,
    isTabletOrMobile,
    email,
    phoneNumber,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event: any) => {
    const isOpen = !open;
    if (isOpen && isTabletOrMobile) {
      closeAllOpenPopup();
      isMobile && hiddenButtonChatAgency();
    } else {
      showButtonChatAgency();
    }
    setAnchorEl(event.currentTarget);
    setOpen(isOpen);
  };

  return (
    <div
      className={classNames(styles.userInfo, {
        "popup-agency-info-open": open,
      })}
      onClick={handleClick}
    >
      <div className={classNames(styles.avatar, "d-inline-block")}>
        <Image
          src={MogiviAvatar.src}
          className={classNames(styles.avatar)}
          alt={userName}
          quality={100}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h1 className={classNames({ "mobile-hidden": isMobile })}>{userName}</h1>

      <Popper open={open} anchorEl={anchorEl} placement="top-start" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={styles.userDetail}>
              <IconButton className={styles.closeButton} onClick={handleClick}>
                <CloseIcon />
              </IconButton>
              <div>
                <div className={styles.information}>
                  <div className={styles.icAvatar}>
                    <Image
                      src={MogiviAvatar.src}
                      layout="fill"
                      objectFit="cover"
                      alt="avatar"
                      quality={100}
                    />
                  </div>
                  <div>
                    <h1 className="pe-5">{userName}</h1>
                  </div>
                </div>
                <div className={styles.information}>
                  <div className={styles.icon}>
                    <CallIcon />
                  </div>
                  <div>
                    <h2>
                      <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                    </h2>
                  </div>
                </div>
                <div className={styles.information}>
                  <div className={styles.icon}>
                    <MailIcon />
                  </div>
                  <div>
                    <h6>
                      <a href={`mailto:${email}`}>{email}</a>
                    </h6>
                  </div>
                </div>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default AgencyInfo;
