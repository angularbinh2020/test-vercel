import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import FooterCoverImage from "sites/mogivi/assets/images/footerCover.png";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareNodes,
  faExpand,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import StarIcon from "sites/mogivi/assets/icons/star.svg";
import UserIcon from "sites/mogivi/assets/icons/ic-user-info.svg";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MobilePdfModal from "../../../MobilePdfModal";

const HotSpotTemplate = () => {
  return (
    <>
      <div hidden>
        <div data-template-id="hotspot-link-template">
          <img className={styles.hotSpotLink} alt="hotSpotLink" />
        </div>

        <div
          className={styles.hotSpotLinkTooltip}
          data-template-id="link-hotspot-with-tooltip"
        >
          <img className={styles.hotSpotLink} alt="hotSpotLink" />
          <div className={styles.tip}>
            <p>Go to the Furnace Room</p>
            <img
              className={styles.imagePreview}
              alt="hotSpotLink"
              data-element="previewImage"
            />
          </div>
        </div>

        <img
          data-template-id="hot-spot-cover-footer"
          src={FooterCoverImage.src}
          className={styles.coverFooter}
          alt="hotSpotLink"
        />

        <div data-template-id="hotspot-info-template-editing">
          <div
            className={classNames(
              "position-relative",
              styles.hotspotInfoTemplateEditing
            )}
          >
            <h1 className={styles.title}></h1>
            <img className={styles.hotSpotLink} alt="hotSpotLink" />
            <Tooltip title="Xóa">
              <IconButton
                aria-label="delete"
                size="small"
                className="position-absolute"
                data-button-type="remove"
                classes={{ root: styles.iconDelete }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sửa">
              <IconButton
                aria-label="edit"
                size="small"
                className="position-absolute"
                data-button-type="edit"
                classes={{ root: styles.iconEdit }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ẩn / hiện preview">
              <IconButton
                aria-label="visible"
                size="small"
                className="position-absolute d-none"
                data-button-type="visible"
                classes={{ root: styles.iconVisible }}
              >
                <VisibilityOffIcon />
                <VisibilityIcon className="d-none" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div data-template-id="hotspot-info-template">
          <div
            className={classNames(
              "position-relative",
              styles.hotspotInfoTemplateEditing,
              styles.hoverToShow
            )}
            data-css-class-name={styles.hoverToShow}
          >
            <img className={styles.hotSpotLink} alt="Hotspot link" />
          </div>
        </div>
        <FontAwesomeIcon
          icon={faExpand}
          title="Mở rộng"
          data-template-id="request-fullscreen"
        />
        <FontAwesomeIcon
          icon={faShareNodes}
          title="Chia sẻ"
          data-template-id="share-btn"
        />
        <FontAwesomeIcon
          icon={faClose}
          width={18}
          style={{ cursor: "pointer" }}
          data-template-id="close-btn"
          title="Đóng"
        />
        <div
          data-template-id="youtube-modal"
          className={classNames(
            "position-fixed top-0 start-0 d-flex justify-content-center align-items-center vw-100 vh-100",
            styles.youtubeModal
          )}
        >
          <div>
            <div className="text-end mb-2">
              <FontAwesomeIcon
                icon={faShareNodes}
                width={18}
                style={{ cursor: "pointer" }}
                title="Chia sẻ"
                className={styles.closeModal}
                data-id="share"
              />
              <FontAwesomeIcon
                icon={faClose}
                width={18}
                style={{ cursor: "pointer" }}
                title="Đóng"
                className={classNames(styles.closeModal, "ms-2")}
                data-id="close"
              />
            </div>
            <div data-id="youtube"></div>
          </div>
        </div>
        <div
          data-template-id="instagram-modal"
          className={classNames(
            "position-fixed top-0 start-0 d-flex justify-content-center align-items-center vw-100 vh-100",
            styles.instagramModal
          )}
        >
          <div>
            <div className="text-end mb-2">
              <FontAwesomeIcon
                icon={faShareNodes}
                width={18}
                style={{ cursor: "pointer" }}
                title="Chia sẻ"
                className={styles.closeModal}
                data-id="share"
              />
              <FontAwesomeIcon
                icon={faClose}
                width={18}
                style={{ cursor: "pointer" }}
                title="Đóng"
                className={classNames(styles.closeModal, "ms-2")}
                data-id="close"
              />
            </div>

            <div data-id="content"></div>
          </div>
        </div>
        <div
          data-template-id="tiktok-modal"
          className={classNames(
            "position-fixed top-0 start-0 d-flex justify-content-center align-items-center vw-100 vh-100",
            styles.tiktokModal
          )}
        >
          <div>
            <div className="text-end mb-2">
              <FontAwesomeIcon
                icon={faShareNodes}
                width={18}
                style={{ cursor: "pointer" }}
                title="Chia sẻ"
                className={styles.closeModal}
                data-id="share"
              />
              <FontAwesomeIcon
                icon={faClose}
                width={18}
                style={{ cursor: "pointer" }}
                title="Đóng"
                className={classNames(styles.closeModal, "ms-2")}
                data-id="close"
              />
            </div>
            <div data-id="content"></div>
          </div>
        </div>

        <div
          data-template-id="video-modal"
          className={classNames(
            "position-fixed top-0 start-0 d-flex justify-content-center align-items-center vw-100 vh-100",
            styles.videoModal
          )}
        >
          <div>
            <div className="text-end mb-2">
              <FontAwesomeIcon
                icon={faShareNodes}
                width={18}
                style={{ cursor: "pointer" }}
                title="Chia sẻ"
                className={styles.closeModal}
                data-id="share"
              />
              <FontAwesomeIcon
                icon={faClose}
                width={18}
                style={{ cursor: "pointer" }}
                title="Đóng"
                className={classNames(styles.closeModal, "ms-2")}
                data-id="close"
              />
            </div>
            <div data-id="content">
              <video controls></video>
            </div>
          </div>
        </div>

        <div data-template-id="feedback" className={styles.feedback}>
          <div
            data-id="star"
            className="d-flex justify-content-start align-items-center mb-3"
          >
            <img src={StarIcon.src} alt="star" />
            <img src={StarIcon.src} alt="star" />
            <img src={StarIcon.src} alt="star" />
            <img src={StarIcon.src} alt="star" />
            <img src={StarIcon.src} alt="star" />
          </div>
          <div data-id="quote"></div>
          <div className="d-flex">
            <img src={UserIcon.src} alt="avatar" data-id="avatar" />
            <div className="ms-2">
              <a data-id="fullName" href="#"></a>
              <br />
              <span data-id="description"></span>
            </div>
          </div>
        </div>

        <div data-template-id="menu" className={styles.menu}>
          <img alt="item" data-id="img" />
          <h3 data-id="title"></h3>
          <h4 data-id="price" className="mb-3"></h4>
          <a data-id="order" target="_blank" href="#">
            Đặt hàng
          </a>
        </div>

        <div
          data-template-id="mobile-fullscreen-modal"
          className={styles.mobileFullScreenModal}
        >
          <div className="text-end pe-3 py-3">
            <FontAwesomeIcon
              icon={faClose}
              width={18}
              style={{ cursor: "pointer" }}
              title="Đóng"
              className={classNames(styles.closeModal, "ms-2")}
              data-id="close"
            />
          </div>
          <div>
            <div data-id="content"></div>
          </div>
        </div>
      </div>
      <MobilePdfModal />
    </>
  );
};

export default React.memo(HotSpotTemplate);
