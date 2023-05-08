import { TagHotspotTypes } from "../const/tag-hotspot-types";
import {
  addCloseBtnToFloatContent,
  getHotSpotTemplate,
  handleShowFloatContent,
  showTagInfoModal,
} from "./../utils/vr360";
import { HotSpotTemplateCssSelector } from "./../const/vr360";
import { isMobile } from "react-device-detect";

export interface IFeedback {
  star: number;
  quote: string;
  fullName: string;
  avatar: string;
  redirectUrl: string;
  description: string;
  id: any;
  guid: string;
}

export class ITagFeedbackHotspot {
  feedbacks: IFeedback[];
  type = TagHotspotTypes.FEEDBACK;
  static _type = TagHotspotTypes.FEEDBACK;
  constructor(feedbacks: IFeedback[] = []) {
    this.feedbacks = feedbacks;
  }

  getStarCount(feedback: IFeedback) {
    if (typeof feedback.star === "number") {
      if (feedback.star < 0) {
        return 0;
      }
      if (feedback.star > 5) {
        return 5;
      }
      return Math.floor(feedback.star);
    }
    return 0;
  }

  createHtmlElementContent() {
    const htmlContentElement = document.createElement("div");
    const contentElement = document.createElement("div");
    htmlContentElement.setAttribute("data-id", "htmlContent");
    contentElement.setAttribute("data-id", "contentContainer");
    const isContentEmpty = !this.feedbacks.length;
    if (isContentEmpty) {
      contentElement.innerText = "Không có dữ liệu để hiển thị";
    }
    this.feedbacks.forEach((feedback) => {
      const feedbackTemplate = getHotSpotTemplate(
        HotSpotTemplateCssSelector.feedbackItem
      );
      const starCount = this.getStarCount(feedback);
      const starContainer = feedbackTemplate.querySelector('[data-id="star"]');
      const fullNameElement: any = feedbackTemplate.querySelector(
        '[data-id="fullName"]'
      );
      const descriptionElement: any = feedbackTemplate.querySelector(
        '[data-id="description"]'
      );
      const avatarElement: any =
        feedbackTemplate.querySelector('[data-id="avatar"]');
      const quoteElement: any =
        feedbackTemplate.querySelector('[data-id="quote"]');
      starContainer?.childNodes.forEach((element, index) => {
        if (index >= starCount) {
          element.remove();
        }
      });
      quoteElement.innerText = feedback.quote;
      if (feedback.avatar) {
        avatarElement.src = feedback.avatar;
      }
      if (feedback.fullName) {
        fullNameElement.innerText = feedback.fullName;
        fullNameElement.href = feedback.redirectUrl || "#";
      }
      if (feedback.description) {
        descriptionElement.innerText = feedback.description;
      }
      contentElement.append(feedbackTemplate);
    });
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
        hotSpotImg?.addEventListener("click", () => {
          showTagInfoModal(htmlContainer);
        });
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
