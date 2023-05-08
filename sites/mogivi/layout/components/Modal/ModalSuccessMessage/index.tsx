import classNames from "classnames";
import { useGetPageDataContext } from "context/page-data.context";
import Link from "next/link";
import React from "react";
import { Modal } from "react-bootstrap";
import styles from "./styles.module.scss";

interface DialogPopupMessageProps {
  showDialog: boolean;
  handleCloseDialog: () => void;
}

export const DialogPopupMessage = (props: DialogPopupMessageProps) => {
  const { handleCloseDialog, showDialog } = props;
  const pageData = useGetPageDataContext();
  const mogiviHotline = pageData?.siteLanguageNode?.fields?.phone;

  return (
    <div>
      <Modal
        className={styles.modalSuccessContainer}
        backdrop
        centered
        show={showDialog}
      >
        <Modal.Header
          className={classNames(
            "border-0 justify-content-center",
            styles.modalHeader
          )}
        >
          <Modal.Title>Liên hệ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.thanksMessageContainer}>
            <p>
              Cảm ơn bạn đã gửi thông tin về{" "}
              <span className={styles.logo}>MOGIVI</span> . Chúng tôi sẽ liên hệ
              lại với bạn trong thời gian sớm nhất! Hoặc bạn có thể gọi trực
              tiếp vào Hotline (24/7)
              <br />
            </p>
            <Link href={`tel:${mogiviHotline}`}>{mogiviHotline}</Link>
          </div>
        </Modal.Body>
        <Modal.Footer
          className={classNames("border-0", styles.btnCloseContainer)}
        >
          <button
            onClick={handleCloseDialog}
            className={classNames(styles.btnClose, "w-100", "btn-orange")}
          >
            Đóng
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
