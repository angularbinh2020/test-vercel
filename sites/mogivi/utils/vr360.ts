import { CUSTOM_HTML_DATA, DATA_ID } from "./../const/vr360";
import { copyToClipboard } from "./index";
import { ITourSettings, IVR360 } from "./../models/IVR360";
import {
  HotSpotTemplateCssSelector,
  HotSpotTemplateIdDataName,
  HotSpotElementPropertyIdName,
  AdsTypes,
  HTML_ELEMENT_ID,
} from "sites/mogivi/const/vr360";
import { ICommonHotSpotOption, IHotSpot } from "../models/ICommonHotSpotOption";
import { isMobile } from "react-device-detect";
import { IImageJson, Image360, IRoom, IYawPitch } from "../models/IVR360";
import Hammer from "hammerjs";
import $ from "jquery";
import {
  ImageUrlSource,
  RectilinearView,
  autorotate,
  Viewer,
  ElementPressControlMethod,
  CubeGeometry,
} from "marzipano";
import { IHotSpotIcon } from "models/IHotSpotIcon";
import { TagHotspotTypes } from "../const/tag-hotspot-types";
import { ITagYoutubeHotspot } from "../models/ITagYoutubeHotspot";
import { ITagTikTokHotspot } from "../models/ITagTikTokHotspot";
import { ITagPdfHotspot } from "../models/ITagPdfHotspot";
import { ITagMenuHotspot } from "../models/ITagMenuHotspot";
import { ITagInstagramHotspot } from "../models/ITagInstagramHotspot";
import { ITagGoogleMapHotspot } from "../models/ITagGoogleMapHotspot";
import { ITagFeedbackHotspot } from "../models/ITagFeedbackHotspot";
import { ITagFacebookHotspot } from "../models/ITagFacebookHotspot";
import { ITagIFrameHotspot } from "../models/ITagIFrameHotspot";
import { ITagTextHotspot } from "../models/ITagTextHotspot";
import { ITagVideoHotspot } from "../models/ITagVideoHotspot";
import { rebuildThisPage } from "utils";

export const getHotSpotTemplate = (cssSelector: string) => {
  const htmlTemplate = document.querySelector(cssSelector)?.cloneNode(true);
  (htmlTemplate as HTMLElement)?.removeAttribute(HotSpotTemplateIdDataName);
  return htmlTemplate as HTMLElement;
};

export const getHotSpotById = (viewer: any, hotSpotId: string) => {
  const hotSpotContainer = viewer.scene().hotspotContainer();
  const listHotspots = hotSpotContainer.listHotspots();
  const hotSpotMatch = listHotspots.find((x: any) => {
    const hotSpotHtmlElement = x.domElement();
    return (
      hotSpotHtmlElement.getAttribute(HotSpotElementPropertyIdName) ===
      hotSpotId
    );
  });
  return hotSpotMatch;
};

export const hideHotSpot = (viewer: any, hotSpotId: string) => {
  const hotSpot = getHotSpotById(viewer, hotSpotId);
  hotSpot?.hide();
};

export const showHotSpot = (viewer: any, hotSpotId: string) => {
  const hotSpot = getHotSpotById(viewer, hotSpotId);
  hotSpot?.show();
};

export const removeHotSpotById = (viewer: any, hotSpotId: string) => {
  const hotSpotContainer = viewer.scene().hotspotContainer();
  const hotSpotMatch = getHotSpotById(viewer, hotSpotId);
  if (hotSpotMatch) hotSpotContainer.destroyHotspot(hotSpotMatch);
};

export const getCurrentViewOptions = function (viewer: any) {
  var currentView = viewer.view();
  return currentView
    ? {
        yaw: currentView.yaw(),
        pitch: currentView.pitch(),
        fov: currentView.fov(),
      }
    : null;
};

export const getDeepCopy = (obj: any) => JSON.parse(JSON.stringify(obj));

export const createInfoHotSpot = (options: ICommonHotSpotOption) => {
  const { hotSpotConfig, scene } = options;
  const hotSpotId = hotSpotConfig?.id;

  const infoHotSpotEditingTemplate = getHotSpotTemplate(
    HotSpotTemplateCssSelector.infoHotSpot
  ) as HTMLElement;

  infoHotSpotEditingTemplate.setAttribute(
    HotSpotElementPropertyIdName,
    hotSpotId
  );

  const imgHotspot = infoHotSpotEditingTemplate.querySelector(
    "img"
  ) as HTMLImageElement;
  imgHotspot.src = hotSpotConfig?.icon?.file?.logoUrl || "";
  imgHotspot.addEventListener("click", () => {
    scene.lookTo(hotSpotConfig, {
      transitionDuration: 500,
    });
  });
  const tagHotSpotConfig = hotSpotConfig?.tagHotSpotConfig;
  if (tagHotSpotConfig) {
    const tagHotSpotControl: any = createTagHotSpotConfig(
      tagHotSpotConfig.type,
      tagHotSpotConfig
    );
    tagHotSpotControl?.renderViewMode(infoHotSpotEditingTemplate);
  }
  const position = {
    yaw: hotSpotConfig?.yaw,
    pitch: hotSpotConfig?.pitch,
  };
  const currentScene = scene;
  const currentHotSpotContainer = currentScene.hotspotContainer();
  const newHotSpot = currentHotSpotContainer.createHotspot(
    infoHotSpotEditingTemplate,
    position
  );

  return {
    hotSpot: newHotSpot,
    id: hotSpotId,
    domElement: infoHotSpotEditingTemplate,
    coords: position,
  };
};

export const isHotSpotHaveCoords = (hotSpot: any) => {
  return typeof hotSpot.yaw === "number" && typeof hotSpot.pitch === "number";
};

export const createEmbeddedHotSpot = (options: ICommonHotSpotOption) => {
  const { viewer, hotSpotConfig, ads, scene } = options;
  const domElement = document.createElement("div");
  domElement.style.width = `${hotSpotConfig?.width}px`;
  domElement.style.height = `${hotSpotConfig?.height}px`;
  const hotSpotCoords = {
    yaw: hotSpotConfig?.yaw,
    pitch: hotSpotConfig?.pitch,
  };
  domElement.setAttribute(HotSpotElementPropertyIdName, hotSpotConfig?.id);
  const perspective = {
    perspective: { radius: hotSpotConfig?.radius, extraTransforms: "" },
  };
  if (hotSpotConfig?.rotateX)
    perspective.perspective.extraTransforms += `rotateX(${hotSpotConfig.rotateX}deg) `;
  if (hotSpotConfig?.rotateY)
    perspective.perspective.extraTransforms += `rotateY(${hotSpotConfig.rotateY}deg) `;
  if (hotSpotConfig?.rotateZ)
    perspective.perspective.extraTransforms += `rotateZ(${hotSpotConfig.rotateZ}deg) `;

  switch (ads?.type) {
    case AdsTypes.Video:
      {
        const videoElement = document.createElement("video");
        const sourceElement = document.createElement("source");
        videoElement.autoplay = true;
        videoElement.playsInline = true;
        videoElement.muted = true;
        videoElement.loop = true;
        sourceElement.src = ads.url;
        sourceElement.type = "video/mp4";
        videoElement.appendChild(sourceElement);
        videoElement.style.width = `${hotSpotConfig?.width}px`;
        videoElement.style.height = `${hotSpotConfig?.height}px`;
        videoElement.setAttribute("webkit-playsinline", "");
        domElement.appendChild(videoElement);
      }
      break;
    case AdsTypes.Youtube:
      {
        const iframeElement = document.createElement("iframe");
        iframeElement.src = `https://www.youtube.com/embed/${ads.YoutubeId}?autoplay=1&mute=1&loop=1&playlist=${ads.YoutubeId}`;
        iframeElement.width = `${hotSpotConfig?.width}px`;
        iframeElement.height = `${hotSpotConfig?.height}px`;
        domElement.appendChild(iframeElement);
      }
      break;
    default: {
      const imageElement = document.createElement("img");
      imageElement.src = ads?.url || "";
      imageElement.style.width = `${hotSpotConfig?.width}px`;
      imageElement.style.height = `${hotSpotConfig?.height}px`;
      domElement.appendChild(imageElement);
    }
  }
  const currentScene = scene || viewer.scene();
  const currentHotSpotContainer = currentScene.hotspotContainer();
  domElement.classList.add("pointer-none-event");
  const newHotSpot = currentHotSpotContainer.createHotspot(
    domElement,
    hotSpotCoords,
    perspective
  );

  return {
    hotSpot: newHotSpot,
    id: hotSpotConfig?.id,
    domElement: domElement,
    coords: hotSpotCoords,
  };
};

export const createFooterCoverHotSpot = (options: ICommonHotSpotOption) => {
  const { scene, hotSpotConfig, viewer } = options;
  const currentScene = scene || viewer.scene();
  const domElement = document
    .querySelector(HotSpotTemplateCssSelector.coverFooterHotSpot)
    ?.cloneNode(true) as HTMLImageElement;
  domElement.style.width = `${hotSpotConfig?.width}px`;
  domElement.style.height = `${hotSpotConfig?.height}px`;
  const footerImage = hotSpotConfig?.icon?.file?.logoUrl;
  if (footerImage) {
    domElement.src = footerImage;
  }
  const hotSpotCoords = {
    yaw: hotSpotConfig?.yaw,
    pitch: hotSpotConfig?.pitch,
  };
  domElement.setAttribute(HotSpotElementPropertyIdName, hotSpotConfig?.id);
  const perspective = {
    perspective: { radius: hotSpotConfig?.radius, extraTransforms: "" },
  };

  const currentHotSpotContainer = currentScene.hotspotContainer();
  const newHotSpot = currentHotSpotContainer.createHotspot(
    domElement,
    hotSpotCoords,
    perspective
  );

  return {
    hotSpot: newHotSpot,
    id: hotSpotConfig?.id,
    domElement: domElement,
    coords: hotSpotCoords,
  };
};

export const createLinkHotSpot = (options: ICommonHotSpotOption) => {
  const { viewer, hotSpotConfig, scene } = options;
  const hotSpotId = hotSpotConfig?.id || new Date().getTime();
  const imageTarget = hotSpotConfig?.imageTarget;
  const domElement = getHotSpotTemplate(
    HotSpotTemplateCssSelector.hotSpotLinkWithToolTip
  );
  const imgHotspot = domElement?.querySelector("img") as HTMLImageElement;
  imgHotspot.src =
    hotSpotConfig?.icon?.file.logoUrl || "/images/default-hotspot.svg";
  domElement.setAttribute(HotSpotElementPropertyIdName, hotSpotId);

  if (hotSpotConfig?.onClick) {
    imgHotspot.classList.add("hoverOpenDoor");
    imgHotspot.addEventListener("click", hotSpotConfig.onClick);
  }

  if (hotSpotConfig?.width) {
    imgHotspot.setAttribute(
      "style",
      `width:${hotSpotConfig.width}px; height:${hotSpotConfig.width}px`
    );
  }

  if (isMobile) {
    const oldStyle = imgHotspot.getAttribute("style");
    const transform = `transform: scale(${
      (hotSpotConfig?.mobileScale || 100) / 100
    })`;
    imgHotspot.setAttribute("style", `${oldStyle}; ${transform}`);
  }

  const hotSpotTitle = domElement.querySelector("p") as HTMLParagraphElement;
  hotSpotTitle.innerHTML = imageTarget?.title || "";
  const previewTargetElement = domElement.querySelector(
    '[data-element="previewImage"]'
  ) as HTMLImageElement;
  previewTargetElement.src = imageTarget?.thumbnailUrl || "";
  previewTargetElement.alt = imageTarget?.title || "";

  const centerViewerPosition: any = scene ? {} : getCurrentViewOptions(viewer);

  const position = {
    yaw: hotSpotConfig?.yaw || centerViewerPosition?.yaw || 0,
    pitch: hotSpotConfig?.pitch || centerViewerPosition?.pitch || 0,
  };

  const currentScene = scene || viewer?.scene();

  const currentHotSpotContainer = currentScene.hotspotContainer();
  const newHotSpot = currentHotSpotContainer.createHotspot(
    domElement,
    position
  );
  return {
    hotSpot: newHotSpot,
    id: hotSpotId,
    domElement: domElement,
    coords: position,
  };
};

export const hideAllHotSpot = (scene: any) => {
  scene
    ?.hotspotContainer()
    .listHotspots()
    .map((hotSpot: any) => hotSpot.hide());
};

export const showAllHotSpot = (scene: any) => {
  scene
    ?.hotspotContainer()
    .listHotspots()
    .map((hotSpot: any) => hotSpot.show());
};

export const convertYawToDegrees = (yaw: number) => {
  let yaw_degrees = (yaw * 180.0) / Math.PI;
  if (yaw_degrees < 0) yaw_degrees += 360.0;
  return yaw_degrees;
};

export const hiddenButtonChatAgency = () => {
  document
    .getElementById(HTML_ELEMENT_ID.chatButtonId)
    ?.setAttribute("style", "opacity:0");
};

export const showButtonChatAgency = () => {
  document
    .getElementById(HTML_ELEMENT_ID.chatButtonId)
    ?.removeAttribute("style");
};

export const createInfoHotSpotEditAble = (options: ICommonHotSpotOption) => {
  const { viewer, hotSpotConfig: hotSpotDefaultConfig } = options;
  const centerViewerPosition = getCurrentViewOptions(viewer);
  const hotSpotId = hotSpotDefaultConfig?.id || new Date().getTime();
  const isLinkHotSpot = Boolean(hotSpotDefaultConfig?.title);
  const infoHotSpotEditingTemplate = getHotSpotTemplate(
    HotSpotTemplateCssSelector.infoHotSpotEditing
  );

  infoHotSpotEditingTemplate.setAttribute(
    HotSpotElementPropertyIdName,
    hotSpotId
  );

  const imgHotspot = infoHotSpotEditingTemplate.querySelector(
    "img"
  ) as HTMLImageElement;
  const hotSpotTitle = infoHotSpotEditingTemplate.querySelector(
    "h1"
  ) as HTMLDivElement;
  imgHotspot.src =
    hotSpotDefaultConfig?.icon?.file.logoUrl || "/images/default-hotspot.svg";
  if (isLinkHotSpot) {
    imgHotspot.setAttribute("data-is-link-hotspot", "");
  }
  if (hotSpotDefaultConfig?.width) {
    imgHotspot.setAttribute(
      "style",
      `width:${hotSpotDefaultConfig.width}px; height:${hotSpotDefaultConfig.width}px`
    );
  }

  if (hotSpotDefaultConfig?.title) {
    hotSpotTitle.innerText = hotSpotDefaultConfig.title;
  } else {
    hotSpotTitle.remove();
  }
  const tagHotSpotConfig = hotSpotDefaultConfig?.tagHotSpotConfig;
  if (tagHotSpotConfig) {
    const tagHotSpotControl: any = createTagHotSpotConfig(
      tagHotSpotConfig.type,
      tagHotSpotConfig
    );
    tagHotSpotControl?.renderEditMode(infoHotSpotEditingTemplate);
  }

  const buttonRemove = infoHotSpotEditingTemplate.querySelector(
    "[data-button-type='remove']"
  ) as HTMLButtonElement;

  buttonRemove.addEventListener("click", () =>
    options.onClickRemoveHotSpot(options.hotSpotConfig)
  );

  const buttonEdit = infoHotSpotEditingTemplate.querySelector(
    "[data-button-type='edit']"
  ) as HTMLButtonElement;

  buttonEdit.addEventListener("click", () =>
    options.onClickEditHotSpot(options.hotSpotConfig)
  );

  const position = {
    yaw: hotSpotDefaultConfig?.yaw || centerViewerPosition?.yaw,
    pitch: hotSpotDefaultConfig?.pitch || centerViewerPosition?.pitch,
  };

  const currentHotSpotContainer = viewer.scene().hotspotContainer();
  const newHotSpot = currentHotSpotContainer.createHotspot(
    infoHotSpotEditingTemplate,
    position
  );

  buttonEdit.addEventListener("click", () =>
    options.onClickEditHotSpot({
      ...options.hotSpotConfig,
      ...newHotSpot.position(),
    })
  );
  return {
    hotSpot: newHotSpot,
    id: hotSpotId,
    domElement: infoHotSpotEditingTemplate,
    coords: position,
  };
};

export const createDragAbleInfoHotSpot = (options: ICommonHotSpotOption) => {
  const {
    viewer,
    hotSpotConfig: hotSpotDefaultConfig,
    onChangeHotPosition,
    onClickEditHotSpot,
  } = options;

  const currentView = viewer.view();

  const { hotSpot, id, domElement, coords } = createInfoHotSpotEditAble({
    viewer,
    hotSpotConfig: hotSpotDefaultConfig,
    onClickRemoveHotSpot: options.onClickRemoveHotSpot,
    onClickEditHotSpot: onClickEditHotSpot,
  });

  const isCreateNew = typeof hotSpotDefaultConfig?.yaw !== "number";
  isCreateNew &&
    onChangeHotPosition &&
    onChangeHotPosition({
      id: id,
      ...hotSpotDefaultConfig,
      ...coords,
    });

  const addEventDragable = (domElement: HTMLElement) => {
    let isDragging: any, lastPosX: any, lastPosY: any;
    const element = domElement.querySelector("img") as HTMLImageElement;
    element.classList.add("cursor-grab");
    const handleDrag = function (ev: any) {
      if (!isDragging) {
        isDragging = true;
        lastPosX = domElement.offsetLeft;
        lastPosY = domElement.offsetTop;
        element.classList.add("cursor-grabbing");
        viewer.controls().disable();
      }
      const posX = ev.deltaX + lastPosX;
      const posY = ev.deltaY + lastPosY;
      domElement.style.left = posX + "px";
      domElement.style.top = posY + "px";
      if (ev.isFinal) {
        isDragging = false;
        const anotherPosition = $(domElement).position();
        const currentPosition = {
          x: anotherPosition.left,
          y: anotherPosition.top,
        };
        const newHsPos = currentView.screenToCoordinates(currentPosition);
        hotSpot.setPosition(newHsPos);
        onChangeHotPosition &&
          onChangeHotPosition({
            id: id,
            ...hotSpotDefaultConfig,
            ...newHsPos,
          });
        domElement.style.left = "0px";
        domElement.style.top = "0px";
        element.classList.remove("cursor-grabbing");
        viewer.controls().enable();
      }
    };

    const dragObject = new Hammer(element);

    dragObject.add(
      new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 })
    );

    dragObject.on("pan", handleDrag);
  };

  addEventDragable(domElement);
  return { hotSpot, id, domElement, coords };
};

export const getDefaultCoverFooterSetting = (
  imageSetting: Image360,
  defaultFooterImage: IHotSpotIcon
) => ({
  isUsed: false,
  yaw: 0,
  pitch: Math.PI / 2,
  width: imageSetting.originalWidth / 16,
  height: imageSetting.originalWidth / 16,
  radius: imageSetting.originalWidth / 8,
  id: `footer-cover-id-${new Date().getTime()}`,
  icon: defaultFooterImage,
});

export const createViewConfig = (imagesJsonParsed: IImageJson) => {
  //@ts-ignore
  const newSource = new ImageUrlSource((tile: any) => {
    const imageCoord = `${tile.face}_${tile.x}_${tile.y}`;
    if (tile.z) {
      const imageMatch = imagesJsonParsed.titleImages.find((imageUrl: string) =>
        imageUrl.includes(imageCoord)
      );

      return {
        url: imageMatch,
      };
    }
    const imageMatch = imagesJsonParsed.preview;
    const mapY = "bdflru".indexOf(tile.face) / 6;
    return {
      url: imageMatch,
      rect: { x: 0, y: mapY, width: 1, height: 1 / 6 },
    };
  });

  const newGeometry = new CubeGeometry([
    {
      tileSize: imagesJsonParsed.titleSize,
      size: imagesJsonParsed.titleSize,
      //@ts-ignore
      fallbackOnly: true,
    },
    {
      tileSize: imagesJsonParsed.titleSize,
      size: imagesJsonParsed.originalWidth / 4,
    },
  ]);

  const newLimiter = RectilinearView.limit.traditional(
    imagesJsonParsed.originalWidth / 4,
    (100 * Math.PI) / 180
  );

  return {
    newSource,
    newGeometry,
    newLimiter,
  };
};

export const createHotSpot = (options: ICommonHotSpotOption) => {
  const { viewer, hotSpotConfig: hotSpotDefaultConfig, scene } = options;
  const hotSpotId = hotSpotDefaultConfig?.id || new Date().getTime();
  const domElement = getHotSpotTemplate(HotSpotTemplateCssSelector.hotSpotLink);
  const imgHotspot = domElement.querySelector("img") as HTMLImageElement;
  imgHotspot.src =
    hotSpotDefaultConfig?.icon?.file.logoUrl || "/images/default-hotspot.svg";
  domElement.setAttribute(HotSpotElementPropertyIdName, hotSpotId);
  imgHotspot.setAttribute(
    "title",
    hotSpotDefaultConfig?.imageTarget?.title || ""
  );

  if (hotSpotDefaultConfig?.width) {
    imgHotspot.setAttribute(
      "style",
      `width:${hotSpotDefaultConfig.width}px; height:${hotSpotDefaultConfig.width}px`
    );
  }

  const centerViewerPosition: any = scene ? {} : getCurrentViewOptions(viewer);

  const position = {
    yaw: hotSpotDefaultConfig?.yaw || centerViewerPosition?.yaw,
    pitch: hotSpotDefaultConfig?.pitch || centerViewerPosition?.pitch,
  };

  const currentScene = scene || viewer.scene();

  const currentHotSpotContainer = currentScene.hotspotContainer();
  const newHotSpot = currentHotSpotContainer.createHotspot(
    domElement,
    position
  );
  return {
    hotSpot: newHotSpot,
    id: hotSpotId,
    domElement: domElement,
    coords: position,
  };
};

export const createTagHotSpotConfig = (
  tagType?: TagHotspotTypes,
  defaultValues?: any
) => {
  const tagClass = [
    ITagFacebookHotspot,
    ITagFeedbackHotspot,
    ITagGoogleMapHotspot,
    ITagIFrameHotspot,
    ITagInstagramHotspot,
    ITagMenuHotspot,
    ITagPdfHotspot,
    ITagTextHotspot,
    ITagTikTokHotspot,
    ITagVideoHotspot,
    ITagYoutubeHotspot,
  ];
  const defaultTagClass = tagClass.find((tgClass) => tgClass._type === tagType);
  const defaultTagHotSpotConfig = defaultTagClass
    ? new defaultTagClass()
    : null;
  if (defaultTagHotSpotConfig && defaultValues) {
    for (let propertyName in defaultValues) {
      const isPropertyInTagConfig =
        Object.hasOwn(defaultTagHotSpotConfig, propertyName) &&
        propertyName !== "type";
      if (isPropertyInTagConfig) {
        //@ts-ignore
        defaultTagHotSpotConfig[propertyName] = defaultValues[propertyName];
      }
    }
  }
  return defaultTagHotSpotConfig;
};

export const setIframeModalSize = (iframeElement: HTMLIFrameElement) => {
  const originAspectRatio =
    Number(iframeElement.width) / Number(iframeElement.height);
  iframeElement.width = "100%";
  iframeElement.height = "";
  iframeElement.style.aspectRatio = String(originAspectRatio);
};

export const getCloneScriptElement = (
  scriptElementRaw?: HTMLScriptElement | null
) => {
  if (scriptElementRaw) {
    const scriptSrc = scriptElementRaw.src;
    const scriptElement = document.createElement("script");
    scriptElement.src = scriptSrc;
    scriptElementRaw.remove();
    return scriptElement;
  }
};

export const handleCopyByPressBtn = (
  msg: string,
  shareBtn: HTMLElement | Element,
  textColor: string = "text-success"
) => {
  copyToClipboard(msg).then(() => {
    shareBtn.classList.add("d-none");
    const msgElement = document.createElement("span");
    msgElement.classList.add(textColor, "fw-semibold");
    msgElement.innerText = "Đã copy";
    shareBtn.parentElement?.insertBefore(msgElement, shareBtn);
    setTimeout(() => {
      shareBtn.classList.remove("d-none");
      msgElement.remove();
    }, 1000);
  });
};

const closeAllFloatContent = () => {
  document
    .querySelectorAll(`[${CUSTOM_HTML_DATA.toggleDisplayFloatContent}]`)
    .forEach((element) => {
      const dataCssClassName =
        element.getAttribute(CUSTOM_HTML_DATA.cssClassName) || "";
      element.classList.add(dataCssClassName);
    });
};

const hoverIncreaseStickyContainerIndex = ({
  parentElement,
}: {
  parentElement: HTMLDivElement;
}) => {
  const stickyParent: any = parentElement.parentElement;

  parentElement.addEventListener("mouseenter", () => {
    stickyParent.style.zIndex = 1;
  });
  parentElement.addEventListener("mouseleave", () => {
    const dataCssClassName =
      parentElement.getAttribute(CUSTOM_HTML_DATA.cssClassName) || "";
    const isHoverToShow = parentElement.classList.contains(dataCssClassName);
    if (isHoverToShow) stickyParent.style.zIndex = "unset";
  });
};

export const handleShowFloatContent = ({
  hotSpotImg,
  parentElement,
}: {
  hotSpotImg?: HTMLImageElement | null;
  parentElement?: HTMLDivElement | null;
}) => {
  if (hotSpotImg && parentElement) {
    const dataCssClassName =
      parentElement.getAttribute(CUSTOM_HTML_DATA.cssClassName) || "";
    parentElement.setAttribute(CUSTOM_HTML_DATA.toggleDisplayFloatContent, "");
    hoverIncreaseStickyContainerIndex({ parentElement });
    hotSpotImg.addEventListener("click", () => {
      const isHoverToShowing =
        parentElement.classList.contains(dataCssClassName);
      const stickyParent: any = parentElement.parentElement;
      closeAllFloatContent();
      if (isHoverToShowing) {
        parentElement.classList.remove(dataCssClassName);
        stickyParent.style.zIndex = 1;
        return;
      }
      stickyParent.style.zIndex = "unset";
    });
  }
};

export const addCloseBtnToFloatContent = ({
  hotSpotImg,
  parentElement,
}: {
  hotSpotImg?: HTMLImageElement | null;
  parentElement?: HTMLDivElement | null;
}) => {
  if (hotSpotImg && parentElement) {
    const closeBtn = getHotSpotTemplate(HotSpotTemplateCssSelector.closeBtn);
    closeBtn.addEventListener("click", () => {
      const dataCssClassName =
        parentElement.getAttribute(CUSTOM_HTML_DATA.cssClassName) || "";
      const isHoverShowing = parentElement.classList.contains(dataCssClassName);
      if (!isHoverShowing) hotSpotImg.click();
      const htmlContent = parentElement.querySelector(
        `[data-id="${DATA_ID.HTML_CONTENT}"]`
      );
      htmlContent?.setAttribute("hidden", "");
      setTimeout(() => {
        htmlContent?.removeAttribute("hidden");
      }, 150);
    });
    const shareBtnContainer = parentElement.querySelector(
      `[data-id="${DATA_ID.SHARE_BTN_CONTAINER}"]`
    );
    shareBtnContainer?.appendChild(closeBtn);
    if (!shareBtnContainer) {
      const htmlContent = parentElement.querySelector(
        `[data-id="${DATA_ID.CONTENT_CONTAINER}"]`
      );
      const containerElement = document.createElement("div");
      containerElement.classList.add("justify-content-center");
      containerElement.setAttribute("data-id", DATA_ID.SHARE_BTN_CONTAINER);
      containerElement.appendChild(closeBtn);
      htmlContent?.append(containerElement);
    }
  }
};

export const showMobilePdfModal = (pdfUrl: string) => {
  const openBtn = document.getElementById(
    HTML_ELEMENT_ID.mobilePdfViewModalShowBtn
  ) as HTMLButtonElement;
  if (openBtn && pdfUrl) {
    openBtn.setAttribute(CUSTOM_HTML_DATA.pdfUrl, pdfUrl);
    openBtn.click();
  }
};

export const appendShareContainerTagInfo = (
  shareElements?: (Element | null)[]
) => {
  const shareContainer = document.querySelector(
    `[data-id="${DATA_ID.SHARE_BTN_CONTAINER_TAG_MODAL}"]`
  );
  if (shareContainer) {
    shareContainer.innerHTML = "";
    if (shareElements?.length) {
      shareElements.forEach((element) => {
        element && shareContainer.appendChild(element);
      });
    }
  }
};

export const showTagInfoModal = (
  content: HTMLElement,
  shareElements?: (Element | null)[]
) => {
  document.getElementById(HTML_ELEMENT_ID.showTagInfoBtn)?.click();
  const modalContentContainer = document.querySelector(
    `[data-id="${DATA_ID.CONTENT_CONTAINER_TAG_MODAL}"]`
  );

  if (modalContentContainer) {
    modalContentContainer.innerHTML = "";
    modalContentContainer.append(content);
  }
  appendShareContainerTagInfo(shareElements);
};

export const closeAllOpenPopup = () => {
  const popupCssSelector = [
    "popup-agency-info-open",
    "popup-image-list-open",
    "popup-chat-with-agency-open",
  ];

  popupCssSelector.map((cssSelector) => {
    (document.querySelector(`.${cssSelector}`) as HTMLButtonElement)?.click();
  });
};

export const rebuildMogiverVrPage = (
  data: IVR360,
  onFinally: any,
  showInfoToastHandle?: any,
  showErrorToastHandle?: any
) => {
  const vr360ViewUrlPath = new URL(data.vr_tour_url_view);
  const onError = (e: any) => {
    showErrorToastHandle(
      "Rebuild page không thành công, vui lòng rebuild lại tour để áp dụng các thay đổi."
    );
    onFinally();
    console.log(e);
  };
  const showInfoToast =
    showInfoToastHandle ??
    function (msg: string) {
      console.log(msg);
    };
  showInfoToast(`Bắt đầu rebuild page view.`);
  rebuildThisPage(vr360ViewUrlPath.pathname, null, onError, () => {
    showInfoToast(`Rebuild page view thành công.`);
    const vr360EditUrlPath = new URL(data.vr_tour_url);
    showInfoToast(`Bắt đầu rebuild page edit.`);
    rebuildThisPage(vr360EditUrlPath.pathname, null, onError, () => {
      showInfoToast(`Rebuild page edit thành công.`);
      onFinally();
    });
  });
};

export default {
  getHotSpotById,
  hideHotSpot,
  showHotSpot,
  removeHotSpotById,
  getCurrentViewOptions,
  getDeepCopy,
  createInfoHotSpot,
  isHotSpotHaveCoords,
  createEmbeddedHotSpot,
  createFooterCoverHotSpot,
  createLinkHotSpot,
  hideAllHotSpot,
  showAllHotSpot,
};
