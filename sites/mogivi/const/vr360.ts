export const FOOTER_IMAGE_DEFAULT_SETTING = {
  isUsed: true,
  yaw: 0,
  pitch: Math.PI / 2,
  width: 320,
  height: 320,
  radius: 1000,
  id: `footer-cover-id-${new Date().getTime()}`,
};

export const HotSpotTemplateCssSelector = {
  hotSpotLink: '[data-template-id="hotspot-link-template"]',
  hotSpotLinkWithToolTip: '[data-template-id="link-hotspot-with-tooltip"]',
  infoHotSpotEditing: '[data-template-id="hotspot-info-template-editing"]',
  infoHotSpot: '[data-template-id="hotspot-info-template"]',
  coverFooterHotSpot: '[data-template-id="hot-spot-cover-footer"]',
  shareBtn: '[data-template-id="share-btn"]',
  fullScreenBtn: '[data-template-id="request-fullscreen"]',
  closeBtn: '[data-template-id="close-btn"]',
  youtubeModal: '[data-template-id="youtube-modal"]',
  instagramModal: '[data-template-id="instagram-modal"]',
  tiktokModal: '[data-template-id="tiktok-modal"]',
  videoModal: '[data-template-id="video-modal"]',
  feedbackItem: '[data-template-id="feedback"]',
  menuTag: '[data-template-id="menu"]',
  mobileFullScreenModal: '[data-template-id="mobile-fullscreen-modal"]',
};

export const HotSpotTemplateIdDataName = "data-template-id";

export const HotSpotElementPropertyIdName = "data-hotspot-id";

export enum AdsTypes {
  Video = "Mp4",
  Gif = "Gif",
  Youtube = "Youtube",
}

export const HTML_ELEMENT_ID = {
  chatButtonId: "chatButtonId",
  mobilePdfViewModalShowBtn: "mobilePdfViewModalShowBtn",
  showTagInfoBtn: "showTagInfoBtn",
  showPdfTagInfoBtn: "showPdfTagInfoBtn",
};

export const ConversationGroupType = {
  DEFAULT: 0,
  TWO_CUSTOMER_BROKER: 1,
  TWO_BROKER_BROKER: 2,
  TWO_BROKER_SUPPORT: 3,
  GROUP: 4,
  TWO_CUSTOMER_SUPPORT: 5,
};

export const MAXIMUM_WIDTH_SUGGESTION = 500;

export const COLORS = {
  Mogivi: "#ff4e00",
  Warning: "#ffc107",
  MogiviBlur: "#f7a683",
};

export const HIDDEN_CONFIRM_ACTION_ID = "confirm-modal-action-id";

export enum TOUR_STATUS {
  PUBLISH = 1,
}

export const CUSTOM_HTML_DATA = {
  pdfUrl: "data-pdf-url",
  toggleDisplayFloatContent: "data-toggle-display-float-content",
  cssClassName: "data-css-class-name",
};

export const DATA_ID = {
  SHARE_BTN_CONTAINER: "shareButtonContainer",
  HTML_CONTENT: "htmlContent",
  CONTENT_CONTAINER: "contentContainer",
  SHARE_BTN_CONTAINER_TAG_MODAL: "shareButtonContainerTagModal",
  CONTENT_CONTAINER_TAG_MODAL: "contentContainerTagModal",
};
