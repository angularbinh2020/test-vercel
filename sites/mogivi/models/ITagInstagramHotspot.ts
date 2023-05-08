import { TagHotspotTypes } from "../const/tag-hotspot-types";
import {
  getHotSpotTemplate,
  handleCopyByPressBtn,
  showTagInfoModal,
  getCloneScriptElement,
} from "./../utils/vr360";
import { HotSpotTemplateCssSelector } from "./../const/vr360";
import { isMobile } from "react-device-detect";

export class ITagInstagramHotspot {
  embedContent: string;
  shareUrl: string;
  type = TagHotspotTypes.INSTAGRAM;
  static _type = TagHotspotTypes.INSTAGRAM;
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
      const scriptElement = getCloneScriptElement(
        contentElement.querySelector("script")
      );
      if (scriptElement) {
        contentElement.appendChild(scriptElement);
        setTimeout(() => {
          window.instgrm?.Embeds.process();
        }, 250);
      }
    }
    return contentElement;
  }

  showPopupContent() {
    if (!this.embedContent) return;
    const youtubeModal = getHotSpotTemplate(
      HotSpotTemplateCssSelector.instagramModal
    );
    const closeBtn = youtubeModal.querySelector('[data-id="close"]');
    const shareBtn = youtubeModal.querySelector('[data-id="share"]');
    const contentContainer = youtubeModal.querySelector('[data-id="content"]');
    if (contentContainer) {
      contentContainer.innerHTML = this.embedContent;
      const scriptElement = getCloneScriptElement(
        contentContainer.querySelector("script")
      );
      if (scriptElement) {
        contentContainer.appendChild(scriptElement);
      }
      closeBtn?.addEventListener("click", () => {
        youtubeModal.remove();
      });
      document.body.appendChild(youtubeModal);
      window.instgrm?.Embeds.process();
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
    const fullScreenBtn = getHotSpotTemplate(
      HotSpotTemplateCssSelector.fullScreenBtn
    );
    contentContainer.innerHTML = this.embedContent;
    const shareBtns: any[] = [];
    const scriptElement = getCloneScriptElement(
      contentContainer.querySelector("script")
    );
    if (scriptElement) {
      contentContainer.appendChild(scriptElement);
    }

    if (this.shareUrl && shareBtn) {
      shareBtn.addEventListener("click", () => {
        handleCopyByPressBtn(this.shareUrl, shareBtn, "text-success");
      });
      shareBtns.push(shareBtn);
    }
    fullScreenBtn.addEventListener("click", () => {
      this.showPopupContent();
    });
    shareBtns.push(fullScreenBtn);
    showTagInfoModal(contentContainer, shareBtns);
    window.instgrm?.Embeds.process();
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
