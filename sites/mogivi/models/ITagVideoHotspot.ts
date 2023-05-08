import { TagHotspotTypes } from "../const/tag-hotspot-types";
import { HotSpotTemplateCssSelector } from "./../const/vr360";
import {
  getHotSpotTemplate,
  handleCopyByPressBtn,
  showTagInfoModal,
} from "./../utils/vr360";
import { isMobile } from "react-device-detect";

export class ITagVideoHotspot {
  resourceUrl: string;
  type = TagHotspotTypes.VIDEO;
  static _type = TagHotspotTypes.VIDEO;
  constructor(resourceUrl: string = "") {
    this.resourceUrl = resourceUrl;
  }

  createHtmlElementContent() {
    const contentElement = document.createElement("div");
    contentElement.setAttribute("data-id", "htmlContent");
    const isContentEmpty = !this.resourceUrl;
    if (isContentEmpty) {
      contentElement.innerText = "Không có dữ liệu để hiển thị";
    }
    if (this.resourceUrl) {
      const videoElement = document.createElement("video");
      videoElement.controls = true;
      videoElement.src = this.resourceUrl;
      videoElement.width = 500;
      contentElement.appendChild(videoElement);
    }
    return contentElement;
  }

  showPopupContent() {
    if (!this.resourceUrl) return;
    const youtubeModal = getHotSpotTemplate(
      HotSpotTemplateCssSelector.videoModal
    );
    const shareBtn = youtubeModal.querySelector('[data-id="share"]');
    const closeBtn = youtubeModal.querySelector('[data-id="close"]');
    const videoElement = youtubeModal.querySelector("video");
    shareBtn?.addEventListener("click", () => {
      handleCopyByPressBtn(this.resourceUrl, shareBtn, "text-light");
    });

    if (videoElement) {
      videoElement.src = this.resourceUrl;
      closeBtn?.addEventListener("click", () => {
        youtubeModal.remove();
      });
      document.body.appendChild(youtubeModal);
    }
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
    const videoElement = document.createElement("video");
    const shareBtn = getHotSpotTemplate(HotSpotTemplateCssSelector.shareBtn);
    videoElement.controls = true;
    const shareBtns: any[] = [];
    videoElement.src = this.resourceUrl;
    if (this.resourceUrl && shareBtn) {
      shareBtn.addEventListener("click", () => {
        handleCopyByPressBtn(this.resourceUrl, shareBtn, "text-success");
      });
      shareBtns.push(shareBtn);
    }
    showTagInfoModal(videoElement, shareBtns);
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
