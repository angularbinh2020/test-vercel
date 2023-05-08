import { TagHotspotTypes } from "../const/tag-hotspot-types";
import { HotSpotTemplateCssSelector } from "./../const/vr360";
import {
  addCloseBtnToFloatContent,
  getHotSpotTemplate,
  handleShowFloatContent,
  showTagInfoModal,
} from "./../utils/vr360";
import { isMobile } from "react-device-detect";

export interface IMenu {
  imageUrl: string;
  redirectUrl: string;
  title: string;
  price: number;
  guid: string;
  id: number;
}

export class ITagMenuHotspot {
  menus: IMenu[];
  type = TagHotspotTypes.MENU;
  static _type = TagHotspotTypes.MENU;
  constructor(menus: IMenu[] = []) {
    this.menus = menus;
  }

  createHtmlElementContent() {
    const htmlContentElement = document.createElement("div");
    const contentElement = document.createElement("div");
    htmlContentElement.setAttribute("data-id", "htmlContent");
    contentElement.setAttribute("data-id", "contentContainer");
    const isContentEmpty = !this.menus.length;
    if (isContentEmpty) {
      contentElement.innerText = "Không có dữ liệu để hiển thị";
    }
    this.menus.forEach((menu) => {
      const htmlTemplate = getHotSpotTemplate(
        HotSpotTemplateCssSelector.menuTag
      );
      const imgElement: any = htmlTemplate.querySelector('[data-id="img"]');
      const titleElement: any = htmlTemplate.querySelector('[data-id="title"]');
      const priceElement: any = htmlTemplate.querySelector('[data-id="price"]');
      const orderElement: any = htmlTemplate.querySelector('[data-id="order"]');

      if (menu.imageUrl) {
        imgElement.src = menu.imageUrl;
      }
      if (menu.title) {
        titleElement.innerText = menu.title;
      }
      if (typeof menu.price === "number") {
        priceElement.innerText = menu.price.toLocaleString("vi") + " đ";
      }
      if (menu.redirectUrl) {
        orderElement.href = menu.redirectUrl;
      } else {
        orderElement?.remove();
      }
      contentElement.append(htmlTemplate);
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
