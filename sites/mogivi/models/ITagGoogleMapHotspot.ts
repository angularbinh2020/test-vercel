import { TagHotspotTypes } from "../const/tag-hotspot-types";
import {
  addCloseBtnToFloatContent,
  getHotSpotTemplate,
  handleCopyByPressBtn,
  handleShowFloatContent,
  showTagInfoModal,
} from "../utils/vr360";
import { DATA_ID, HotSpotTemplateCssSelector } from "./../const/vr360";
import { isMobile } from "react-device-detect";

export class ITagGoogleMapHotspot {
  shareUrl: string;
  title: string;
  body: string;
  embedContent: string;
  type = TagHotspotTypes.GOOGLE_MAP;
  static _type = TagHotspotTypes.GOOGLE_MAP;
  constructor(
    shareUrl: string = "",
    title: string = "",
    body: string = "",
    embedContent: string = ""
  ) {
    this.shareUrl = shareUrl;
    this.title = title;
    this.body = body;
    this.embedContent = embedContent;
  }

  createHtmlElementContent() {
    const htmlContentElement = document.createElement("div");
    const contentElement = document.createElement("div");
    htmlContentElement.setAttribute("data-id", "htmlContent");
    contentElement.setAttribute("data-id", "contentContainer");
    const isContentEmpty = !this.title && !this.body && !this.embedContent;

    if (isContentEmpty) {
      contentElement.innerText = "Không có dữ liệu để hiển thị";
    }

    if (this.embedContent) {
      const headerContainer = document.createElement("div");
      const iframeContainer = document.createElement("div");
      iframeContainer.innerHTML = this.embedContent;
      const iframeElement = iframeContainer.querySelector("iframe");
      const shareBtn = getHotSpotTemplate(HotSpotTemplateCssSelector.shareBtn);
      const fullScreenBtn = getHotSpotTemplate(
        HotSpotTemplateCssSelector.fullScreenBtn
      );
      headerContainer.setAttribute("data-id", "shareButtonContainer");
      shareBtn.addEventListener("click", () => {
        handleCopyByPressBtn(this.shareUrl, shareBtn);
      });
      if (!this.shareUrl) {
        shareBtn.remove();
      }
      headerContainer.classList.add("border-bottom", "mb-3");
      fullScreenBtn.addEventListener("click", () => {
        iframeElement?.requestFullscreen();
      });
      headerContainer.appendChild(shareBtn);
      headerContainer.appendChild(fullScreenBtn);
      contentElement.appendChild(headerContainer);
      contentElement.appendChild(iframeContainer);
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
