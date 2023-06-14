import API_URL from "const/api-url";
import { PAGE_PREFIX, REVALIDATE_TOKEN } from "const/config";
import { PANAROMA_GET_DETAIL_API } from "const/panaroma-get-detail-apis";
import { UPDATE_PANORAMA_TOUR_URL } from "const/update-panorama-tour";
import VR_TOUR_API_URL from "const/vr-tour-api-url";
import { MOGIVI_CONTENT_TYPE } from "sites/mogivi/const/content-type";

export const isString = (val: any): boolean => typeof val === "string";

export const getFullApiUrl = (apiUrl: string): string => {
  const apiHost = process.env.NEXT_PUBLIC_API_HOST;
  if (
    apiUrl.startsWith("http:") ||
    apiUrl.startsWith("https:") ||
    !isString(apiUrl) ||
    !apiHost
  )
    return apiUrl;

  if (!apiHost.endsWith("/") && !apiUrl.startsWith("/"))
    return `${apiHost}/${apiUrl}`;
  if (apiHost.endsWith("/") && apiUrl.startsWith("/"))
    return apiHost + apiUrl.slice(1);

  return apiHost + apiUrl;
};

export const isServer = () => typeof window === "undefined";

export const rebuildThisPage = (
  path?: string,
  onFinally?: any,
  onError?: any,
  onSuccess?: any
) => {
  rebuildPage(path)
    .then(() => {
      console.log(`rebuild ${location.pathname} success`);
      onSuccess && onSuccess();
    })
    .catch((e) => {
      onError && onError(e);
      console.log(e);
    })
    .finally(() => {
      onFinally && onFinally();
    });
};

export const rebuildPage = (path?: string) => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set("secret", REVALIDATE_TOKEN);
  urlSearchParams.set("path", path || location.pathname);
  const requestUrl = `${
    location.origin
  }/api/revalidate?${urlSearchParams.toString()}`;
  return fetch(requestUrl);
};

export const openNewTab = (redirectUrl: string) => {
  const linkElement = document.createElement("a");
  linkElement.href = redirectUrl;
  linkElement.target = "_blank";
  linkElement.click();
};

export const isMogiverseNode = (firstSlug: string) => "mogiverse" === firstSlug;

export const getPanoramaTourApis = (type: any) => {
  return PANAROMA_GET_DETAIL_API[type as keyof typeof PANAROMA_GET_DETAIL_API];
};

export const isPanoramaTour = (mogiversePageType: string | undefined) =>
  [
    MOGIVI_CONTENT_TYPE.vrTourPlaceholder,
    MOGIVI_CONTENT_TYPE.thetaTourPlaceholder,
    MOGIVI_CONTENT_TYPE.instaTourPlaceholder,
  ].includes(mogiversePageType || "");

export const getTourSettingUpdateApi = (
  mogiversePageType: string | undefined
) => {
  return UPDATE_PANORAMA_TOUR_URL[
    mogiversePageType as keyof typeof UPDATE_PANORAMA_TOUR_URL
  ];
};

export const getUrlWithoutPagination = (slugs: string[]) => {
  let pageUrl = slugs.join("/");
  let pageIndex = undefined;
  let isUrlHasPageIndex = false;
  const lastSlug = slugs[slugs.length - 1];
  const isPaginationUrl = slugs.length > 1 && lastSlug.startsWith(PAGE_PREFIX);
  if (isPaginationUrl) {
    pageIndex = Number(lastSlug.replace(PAGE_PREFIX, ""));
    pageUrl = slugs.slice(0, slugs.length - 1).join("/");
    isUrlHasPageIndex = true;
  }
  return {
    pageUrl,
    pageIndex,
    isUrlHasPageIndex,
  };
};

export const removeAllFields = ({
  object,
  exceptionFields,
  removeFields,
}: {
  object: any;
  exceptionFields?: string[];
  removeFields?: string[];
}) => {
  if (object && typeof object === "object") {
    if (exceptionFields)
      for (let propertyName in object) {
        if (!exceptionFields.includes(propertyName)) {
          delete object[propertyName as keyof typeof object];
        }
      }
    if (removeFields)
      for (let propertyName in object) {
        if (removeFields.includes(propertyName)) {
          delete object[propertyName as keyof typeof object];
        }
      }
  }
};

export const getPhoneHidden = (phone: string) => {
  if (typeof phone === "string")
    return phone.slice(0, phone.length - 3) + "***";
  return phone;
};

export const getFirstSlug = (slug: string[]) => (slug?.length ? slug[0] : "");

export const getVrTourCheckStatusApi = (pageData: any) => {
  const options = {
    [MOGIVI_CONTENT_TYPE.vrTourPlaceholder]:
      VR_TOUR_API_URL.GET_MOBILE_TOUR_AI_DETAIL_AND_STATUS,
    [MOGIVI_CONTENT_TYPE.thetaTourPlaceholder]:
      VR_TOUR_API_URL.GET_THETA_TOUR_AI_DETAIL_AND_STATUS,
  };
  const baseApi = options[pageData?.mogiversePageType ?? ""];
  return baseApi ? baseApi + pageData.mogiverserId : "";
};
