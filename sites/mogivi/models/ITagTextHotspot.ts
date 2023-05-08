import { TagHotspotTypes } from "../const/tag-hotspot-types";
import {
  addCloseBtnToFloatContent,
  handleShowFloatContent,
  showTagInfoModal,
} from "../utils/vr360";
import { isMobile } from "react-device-detect";
import { DATA_ID } from "../const/vr360";

export class ITagTextHotspot {
  title: string;
  body: string;
  type = TagHotspotTypes.TEXT;
  static _type = TagHotspotTypes.TEXT;
  constructor(title = "", body = "") {
    this.title = title;
    this.body = body;
  }

  createHtmlElementContent() {
    const htmlContentElement = document.createElement("div");
    const contentElement = document.createElement("div");
    htmlContentElement.setAttribute("data-id", "htmlContent");
    contentElement.setAttribute("data-id", "contentContainer");
    const isContentEmpty = !this.title && !this.body;
    if (isContentEmpty) {
      contentElement.innerText = "Không có dữ liệu để hiển thị";
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
      hotSpotImg?.addEventListener("click", () => {
        showTagInfoModal(htmlContainer);
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
