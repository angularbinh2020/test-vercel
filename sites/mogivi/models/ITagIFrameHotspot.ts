import { addCloseBtnToFloatContent, showTagInfoModal } from "./../utils/vr360";
import { DATA_ID, HotSpotTemplateCssSelector } from "./../const/vr360";
import { TagHotspotTypes } from "../const/tag-hotspot-types";
import { isMobile } from "react-device-detect";
import {
  getHotSpotTemplate,
  handleCopyByPressBtn,
  handleShowFloatContent,
} from "../utils/vr360";

export class ITagIFrameHotspot {
  resourceUrl: string;
  title: string;
  body: string;
  type = TagHotspotTypes.IFRAME;
  static _type = TagHotspotTypes.IFRAME;
  constructor(resourceUrl: string = "", title: string = "", body: string = "") {
    this.resourceUrl = resourceUrl;
    this.title = title;
    this.body = body;
  }

  createHtmlElementContent() {
    const contentElement = document.createElement("div");
    const htmlContentElement = document.createElement("div");
    htmlContentElement.setAttribute("data-id", "htmlContent");
    contentElement.setAttribute("data-id", "contentContainer");
    const isContentEmpty = !this.title && !this.body && !this.resourceUrl;

    if (isContentEmpty) {
      contentElement.innerText = "Không có dữ liệu để hiển thị";
    }

    if (this.resourceUrl) {
      const headerContainer = document.createElement("div");
      const iframeElement = document.createElement("iframe");
      const shareBtn = getHotSpotTemplate(HotSpotTemplateCssSelector.shareBtn);
      const fullScreenBtn = getHotSpotTemplate(
        HotSpotTemplateCssSelector.fullScreenBtn
      );
      headerContainer.setAttribute("data-id", "shareButtonContainer");
      shareBtn.addEventListener("click", () => {
        handleCopyByPressBtn(this.resourceUrl, shareBtn);
      });
      headerContainer.classList.add("border-bottom", "mb-3");
      iframeElement.src = this.resourceUrl;
      iframeElement.title = this.title || this.resourceUrl;
      iframeElement.width = "360";
      iframeElement.height = "203";
      iframeElement.allow = "autoplay; fullscreen";
      iframeElement.allowFullscreen = true;
      iframeElement.setAttribute("loading", "lazy");
      iframeElement.setAttribute(
        "sandbox",
        "allow-scripts allow-same-origin allow-popups allow-presentation"
      );
      fullScreenBtn.addEventListener("click", () => {
        iframeElement.requestFullscreen();
      });
      headerContainer.appendChild(shareBtn);
      headerContainer.appendChild(fullScreenBtn);
      contentElement.appendChild(headerContainer);
      contentElement.appendChild(iframeElement);
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

  renderViewMode(hotSpotElement: HTMLDivElement) {
    const parentElement = hotSpotElement.querySelector("div");
    const hotSpotImg = hotSpotElement.querySelector("img");
    const htmlContainer = this.createHtmlElementContent();
    if (isMobile) {
      const shareBtnContainer = htmlContainer.querySelector(
        `[data-id="${DATA_ID.SHARE_BTN_CONTAINER}"]`
      );
      hotSpotImg?.addEventListener("click", () => {
        showTagInfoModal(htmlContainer, [shareBtnContainer]);
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
