import IPageNode from "models/IPageNode";
import { IRootNode } from "models/IRootNode";

export const getCurrentPageUrl = (
  rootNode: IRootNode,
  currentNode: IPageNode
): string => {
  let websiteDomain = rootNode?.fields?.websiteDomain || "";
  let currentPageUrl = currentNode?.fields?.umbracoUrlAlias;

  if (websiteDomain?.endsWith("/")) {
    websiteDomain = websiteDomain.slice(0, websiteDomain.length - 1) || "";
  }

  if (currentPageUrl?.startsWith("/")) {
    currentPageUrl = currentPageUrl.slice(1, websiteDomain.length);
  }

  return `${websiteDomain}/${currentPageUrl}`;
};

export const getFullApiUrl = (apiUrl: string) => {
  const baseApiUrl = process.env.NEXT_PUBLIC_API_HOST;

  const isParamsValid =
    typeof apiUrl === "string" &&
    apiUrl.trim() &&
    !apiUrl.trim().startsWith("http");
  typeof baseApiUrl === "string" && Boolean(baseApiUrl.trim());
  if (isParamsValid) {
    let baseUrl = baseApiUrl || "";
    if (baseUrl?.endsWith("/")) {
      baseUrl = baseUrl.slice(0, baseUrl.length - 1);
    }
    if (!apiUrl.startsWith("/")) {
      baseUrl += "/";
    }
    return baseUrl + apiUrl.trim();
  }

  return apiUrl;
};

export const getUrlPathName = (url: string) => {
  if (url) {
    const urlParse = new URL(url);
    return urlParse.pathname;
  }
  return null;
};

export const copyToClipboard = (content: string) => {
  if (navigator.clipboard) return navigator.clipboard.writeText(content);
  return new Promise((resolve) => {
    const textAreaElement = document.createElement("input");
    document.body.append(textAreaElement);
    textAreaElement.value = content;
    textAreaElement.select();
    document.execCommand("copy");
    textAreaElement.remove();
    resolve(null);
  });
};

export const getImgWidthHeightDisplay = (
  maxWidth: number,
  maxHeight: number,
  imgWidth?: number,
  imgHeight?: number
) => {
  let width = maxWidth;
  let height = maxHeight;
  if (imgWidth && imgHeight) {
    width = imgWidth;
    height = imgHeight;
    if (imgWidth > maxWidth) {
      width = maxWidth;
      height = (maxWidth / imgWidth) * imgHeight;
    }
  }
  return {
    width,
    height,
  };
};
