import { TagHotspotTypes } from "../const/tag-hotspot-types";
import {
  addCloseBtnToFloatContent,
  appendShareContainerTagInfo,
  getHotSpotTemplate,
  handleCopyByPressBtn,
  handleShowFloatContent,
  showMobilePdfModal,
} from "../utils/vr360";
import {
  CUSTOM_HTML_DATA,
  DATA_ID,
  HotSpotTemplateCssSelector,
  HTML_ELEMENT_ID,
} from "./../const/vr360";
import { isMobile } from "react-device-detect";

export class ITagPdfHotspot {
  resourceUrl: string;
  title: string;
  body: string;
  type = TagHotspotTypes.PDF;
  static _type = TagHotspotTypes.PDF;
  constructor(resourceUrl: string = "", title: string = "", body: string = "") {
    this.resourceUrl = resourceUrl;
    this.title = title;
    this.body = body;
  }

  createHtmlElementContent() {
    const htmlContentElement = document.createElement("div");
    const contentElement = document.createElement("div");
    htmlContentElement.setAttribute("data-id", "htmlContent");
    contentElement.setAttribute("data-id", "contentContainer");

    const isContentEmpty = !this.title && !this.body && !this.resourceUrl;

    if (isContentEmpty) {
      contentElement.innerText = "Không có dữ liệu để hiển thị";
    }

    if (this.resourceUrl) {
      const headerContainer = document.createElement("div");
      const objectElement = document.createElement("object");
      const shareBtn = getHotSpotTemplate(HotSpotTemplateCssSelector.shareBtn);
      const fullScreenBtn = getHotSpotTemplate(
        HotSpotTemplateCssSelector.fullScreenBtn
      );
      headerContainer.setAttribute("data-id", DATA_ID.SHARE_BTN_CONTAINER);
      shareBtn.addEventListener("click", () => {
        handleCopyByPressBtn(this.resourceUrl, shareBtn);
      });
      headerContainer.classList.add("border-bottom", "mb-3");
      objectElement.title = this.title || this.resourceUrl;
      objectElement.data = this.resourceUrl;
      objectElement.width = "500";
      objectElement.height = "300";
      fullScreenBtn.addEventListener("click", () => {
        objectElement.requestFullscreen();
      });
      headerContainer.appendChild(shareBtn);
      headerContainer.appendChild(fullScreenBtn);
      contentElement.appendChild(headerContainer);
      contentElement.appendChild(objectElement);
    }

    if (this.title) {
      const titleElement = document.createElement("h5");
      titleElement.innerText = this.title;
      contentElement.appendChild(titleElement);
    }
    if (this.body) {
      const bodyElement = document.createElement("p");
      bodyElement.innerHTML = this.body;
      contentElement.appendChild(bodyElement);
    }
    htmlContentElement.appendChild(contentElement);
    return htmlContentElement;
  }

  renderEditMode(hotSpotElement: HTMLDivElement) {
    const parentElement = hotSpotElement.querySelector("div");
    const htmlContainer = this.createHtmlElementContent();
    const visibleControlBtn = hotSpotElement.querySelector(
      '[data-button-type="visible"]'
    );
    htmlContainer.classList.add("d-none");
    visibleControlBtn?.classList.remove("d-none");
    visibleControlBtn?.addEventListener("click", () => {
      visibleControlBtn.querySelectorAll("svg").forEach((svgElement) => {
        svgElement.classList.toggle("d-none");
      });
      htmlContainer.classList.toggle("d-none");
    });
    parentElement?.append(htmlContainer);
  }

  renderMobileMode() {
    const viewPdfBtn = document.getElementById(
      HTML_ELEMENT_ID.showPdfTagInfoBtn
    );
    if (viewPdfBtn && this.resourceUrl) {
      const fullScreenBtn = getHotSpotTemplate(
        HotSpotTemplateCssSelector.fullScreenBtn
      );
      const shareBtn = getHotSpotTemplate(HotSpotTemplateCssSelector.shareBtn);
      shareBtn.addEventListener("click", () => {
        handleCopyByPressBtn(this.resourceUrl, shareBtn);
      });
      fullScreenBtn.addEventListener("click", () => {
        showMobilePdfModal(this.resourceUrl);
      });
      viewPdfBtn.setAttribute(CUSTOM_HTML_DATA.pdfUrl, this.resourceUrl);
      viewPdfBtn.click();
      appendShareContainerTagInfo([shareBtn, fullScreenBtn]);
    }
  }

  renderViewMode(hotSpotElement: HTMLDivElement) {
    const parentElement = hotSpotElement.querySelector("div");
    const hotSpotImg = hotSpotElement.querySelector("img");
    const htmlContainer = this.createHtmlElementContent();
    if (isMobile && this.resourceUrl) {
      hotSpotImg?.addEventListener("click", () => {
        this.renderMobileMode();
      });
      return;
    }
    parentElement?.append(htmlContainer);
    handleShowFloatContent({
      hotSpotImg,
      parentElement,
    });
    addCloseBtnToFloatContent({
      hotSpotImg,
      parentElement,
    });
  }
}
