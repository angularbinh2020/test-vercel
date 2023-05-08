import useBoolean from "sites/mogivi/hooks/useBoolean";
import {
  CUSTOM_HTML_DATA,
  DATA_ID,
  HTML_ELEMENT_ID,
} from "sites/mogivi/const/vr360";
import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import PdfView from "../../../PdfView";
import { closeAllOpenPopup } from "sites/mogivi/utils/vr360";

interface Props {
  viewer: any;
}

const TagInfoModal = ({ viewer }: Props) => {
  const [isViewTagInfoMode, closeViewTagInfoMode, openTagInfoMode] =
    useBoolean();
  const [pdfUrl, setPdfUrl] = useState("");
  const contentRef = useRef<any>();
  const pdfOpenBtnRef = useRef<any>();
  const shareBtnContainerRef = useRef<any>();
  const toggleVisibleContent = useCallback(() => {
    const cssSelectors = [
      `[class^="bottom-controls_bottomActionsBar"]`,
      `[class^="top-navigation_topActionsBar"]`,
      '[class^="styles_hotSpotLinkTooltip"]',
    ];
    document.querySelectorAll(cssSelectors.join(", ")).forEach((element) => {
      element.classList.toggle("d-none");
    });
    document
      .querySelector('[class*="styles_canvasContainer"]')
      ?.classList.toggle(styles.screenTagMode);
    closeAllOpenPopup();
  }, []);

  const onOpenTagInfoMode = useCallback(() => {
    setPdfUrl("");
    openTagInfoMode();
    if (!isViewTagInfoMode) toggleVisibleContent();
  }, [isViewTagInfoMode]);

  const onCloseTagInfoMode = useCallback(() => {
    contentRef.current.innerHTML = "";
    closeViewTagInfoMode();
    toggleVisibleContent();
    setPdfUrl("");
  }, []);

  const onOpenPdfTagInfoMode = useCallback(() => {
    contentRef.current.innerHTML = "";
    openTagInfoMode();
    if (!isViewTagInfoMode) toggleVisibleContent();
    const newPdfUrl = pdfOpenBtnRef.current.getAttribute(
      CUSTOM_HTML_DATA.pdfUrl
    );
    setPdfUrl(newPdfUrl);
  }, [isViewTagInfoMode]);

  useEffect(() => {
    const viewNotInitYet = !viewer;
    if (viewNotInitYet) return;
    setTimeout(() => {
      viewer.updateSize();
    }, 600);
  }, [isViewTagInfoMode]);

  return (
    <>
      <div
        className={classNames(
          styles.container,
          isViewTagInfoMode && styles.show
        )}
      >
        <div
          className={classNames(
            "d-flex justify-content-between px-3 py-2",
            styles.header
          )}
        >
          <FontAwesomeIcon
            icon={faClose}
            width={18}
            style={{ cursor: "pointer" }}
            title="Đóng"
            data-id="close"
            onClick={onCloseTagInfoMode}
          />
          <div
            data-id={DATA_ID.SHARE_BTN_CONTAINER_TAG_MODAL}
            ref={shareBtnContainerRef}
          ></div>
        </div>
        <div
          data-id={DATA_ID.CONTENT_CONTAINER_TAG_MODAL}
          ref={contentRef}
        ></div>
        {pdfUrl && <PdfView pdfUrl={pdfUrl} />}
      </div>
      <button
        hidden
        onClick={onOpenTagInfoMode}
        id={HTML_ELEMENT_ID.showTagInfoBtn}
      ></button>
      <button
        hidden
        onClick={onOpenPdfTagInfoMode}
        id={HTML_ELEMENT_ID.showPdfTagInfoBtn}
        ref={pdfOpenBtnRef}
      ></button>
    </>
  );
};

export default TagInfoModal;
