export const mapBaseApiUrl = (API_URL: any, baseUrl: string | undefined) => {
  let apiHost = baseUrl;

  if (apiHost && apiHost[apiHost.length - 1] !== "/") {
    apiHost += "/";
  }

  for (let property in API_URL) {
    API_URL[property as keyof typeof API_URL] =
      apiHost + API_URL[property as keyof typeof API_URL];
  }
};
