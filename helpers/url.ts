export const removeTLD = (oldUrl: any, isMobileApp: boolean) => {
  if (!oldUrl || oldUrl.startsWith("/")) {
    if (isMobileApp) {
      return removeVNSuffix(oldUrl) + "?ViewMobileApp=1";
    }
    return removeVNSuffix(oldUrl);
  }
  let newUrl = oldUrl.split("/");

  newUrl = newUrl.splice(3, newUrl.length);
  newUrl = newUrl.join("/");
  newUrl = "/" + newUrl;

  if (isMobileApp) return newUrl + "?ViewMobileApp=1";
  return newUrl;
};

export const removeVNSuffix = (oldUrl: string) => {
  if (!oldUrl || oldUrl.startsWith("/vn")) {
    const newUrl = oldUrl?.slice(3);
    return newUrl;
  }
  return oldUrl;
};

export const appendViewMobileApp = (isMobileApp: boolean, url: string) => {
  if (isMobileApp) {
    return url + "?ViewMobileApp=1";
  }
  return url;
};
