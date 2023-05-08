import classNames from "classnames";
import { useCallback, useState, useRef } from "react";
import { CUSTOM_HTML_DATA, HTML_ELEMENT_ID } from "sites/mogivi/const/vr360";
import useBoolean from "sites/mogivi/hooks/useBoolean";
import PdfView from "../PdfView";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes, faClose } from "@fortawesome/free-solid-svg-icons";
import { copyToClipboard } from "sites/mogivi/utils";

const MobilePdfModal = () => {
  const [isShow, closeModal, showModal] = useBoolean();
  const [pdfUrl, setPdfUrl] = useState("");
  const shareBtnRef = useRef<any>();
  const handleCloseModal = useCallback(() => {
    setPdfUrl("");
    closeModal();
  }, []);

  const getCurrentPdfUrl = useCallback(() => {
    return document
      .getElementById(HTML_ELEMENT_ID.mobilePdfViewModalShowBtn)
      ?.getAttribute(CUSTOM_HTML_DATA.pdfUrl);
  }, []);

  const handleClickShowModal = useCallback(() => {
    const currentPdfUrl = getCurrentPdfUrl();
    if (currentPdfUrl) {
      setPdfUrl(currentPdfUrl);
      showModal();
    }
  }, []);

  const handleCopyUrl = useCallback(() => {
    const currentPdfUrl = getCurrentPdfUrl();
    if (currentPdfUrl) {
      copyToClipboard(currentPdfUrl).then(() => {
        const shareBtn: any = shareBtnRef.current;
        shareBtn.classList.add("d-none");
        const msgElement = document.createElement("span");
        msgElement.classList.add("text-success", "fw-semibold");
        msgElement.innerText = "Đã copy";
        shareBtn.parentElement?.insertBefore(msgElement, shareBtn);
        setTimeout(() => {
          shareBtn.classList.remove("d-none");
          msgElement.remove();
        }, 1000);
      });
    }
  }, []);

  return (
    <>
      <div className={classNames(styles.container, isShow && "d-block")}>
        <div className="text-end pe-3 pt-2">
          <FontAwesomeIcon
            icon={faShareNodes}
            width={18}
            style={{ cursor: "pointer" }}
            title="Chia sẻ"
            className={styles.closeModal}
            data-id="share"
            ref={shareBtnRef}
            onClick={handleCopyUrl}
          />
          <FontAwesomeIcon
            icon={faClose}
            width={18}
            style={{ cursor: "pointer" }}
            title="Đóng"
            className={classNames(styles.closeModal, "ms-2")}
            data-id="close"
            onClick={handleCloseModal}
          />
        </div>
        <div className={styles.pdfView}>
          {pdfUrl && <PdfView pdfUrl={pdfUrl} />}
        </div>
      </div>
      <button
        className="d-none"
        id={HTML_ELEMENT_ID.mobilePdfViewModalShowBtn}
        onClick={handleClickShowModal}
      ></button>
    </>
  );
};

export default MobilePdfModal;
