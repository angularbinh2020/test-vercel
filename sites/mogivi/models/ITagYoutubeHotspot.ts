import {
  getHotSpotTemplate,
  setIframeModalSize,
  handleCopyByPressBtn,
  showTagInfoModal,
} from "./../utils/vr360";
import { TagHotspotTypes } from "../const/tag-hotspot-types";
import { HotSpotTemplateCssSelector } from "./../const/vr360";
import { isMobile } from "react-device-detect";

export class ITagYoutubeHotspot {
  embedContent: string;
  shareUrl: string;
  type = TagHotspotTypes.YOUTUBE;
  static _type = TagHotspotTypes.YOUTUBE;
  constructor(embedContent: string = "", shareUrl: string = "") {
    this.embedContent = embedContent;
    this.shareUrl = shareUrl;
  }

  createHtmlElementContent() {
    const contentElement = document.createElement("div");
    contentElement.setAttribute("data-id", "htmlContent");
    const isContentEmpty = !this.embedContent;
    if (isContentEmpty) {
      contentElement.innerText = "Không có dữ liệu để hiển thị";
    }
    if (this.embedContent) {
      contentElement.innerHTML = this.embedContent;
    }
    return contentElement;
  }

  showPopupContent() {
    if (!this.embedContent) return;
    const youtubeModal = getHotSpotTemplate(
      HotSpotTemplateCssSelector.youtubeModal
    );
    const closeBtn = youtubeModal.querySelector('[data-id="close"]');
    const shareBtn = youtubeModal.querySelector('[data-id="share"]');
    const contentContainer = youtubeModal.querySelector('[data-id="youtube"]');
    if (contentContainer) {
      contentContainer.innerHTML = this.embedContent;
      const iframeElement = contentContainer.querySelector("iframe");
      if (iframeElement) {
        setIframeModalSize(iframeElement);
      }
      closeBtn?.addEventListener("click", () => {
        youtubeModal.remove();
      });
      document.body.appendChild(youtubeModal);
    }
    if (this.shareUrl) {
      shareBtn?.addEventListener("click", () => {
        handleCopyByPressBtn(this.shareUrl, shareBtn, "text-light");
      });
      return;
    }
    shareBtn?.remove();
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

  renderOnMobile() {
    if (!this.embedContent) return;
    const contentContainer = document.createElement("div");
    const shareBtn = getHotSpotTemplate(HotSpotTemplateCssSelector.shareBtn);
    contentContainer.innerHTML = this.embedContent;
    const iframeElement = contentContainer.querySelector("iframe");
    const shareBtns: any[] = [];
    if (iframeElement) {
      setIframeModalSize(iframeElement);
    }

    if (this.shareUrl && shareBtn) {
      shareBtn.addEventListener("click", () => {
        handleCopyByPressBtn(this.shareUrl, shareBtn, "text-success");
      });
      shareBtns.push(shareBtn);
    }
    showTagInfoModal(contentContainer, shareBtns);
  }

  renderViewMode(hotSpotElement: HTMLDivElement) {
    const hotSpotImg = hotSpotElement.querySelector("img");
    hotSpotImg?.addEventListener("click", () => {
      if (isMobile) {
        this.renderOnMobile();
        return;
      }
      this.showPopupContent();
    });
  }
}
