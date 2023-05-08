import axios from "apis/axios";
import API_URL from "const/api-url";

export const suggestionProject = (limit: string, keyword: string) => {
  const urlParams = new URLSearchParams();
  urlParams.set("limit", limit);
  urlParams.set("name", keyword);
  const baseApi = "";
  const requestApiUrl = baseApi + "?" + urlParams.toString();
  return axios.get(requestApiUrl);
};

export const getUrlAlias = (url: string) => {
  const requestApiUrl = API_URL.GET_NODE_CONTENT_BY_URL + url;
  return axios.get(requestApiUrl);
};

export const updateTourSettingJson = (apiUrl: string, tourSetting: string) => {
  return axios.patch(apiUrl, {
    tour_settings: tourSetting,
  });
};

export const subscribeInfo = (model: Models.ContactModel) => {
  const requestApiUrl = API_URL.POST_SUBSCRIBE_EMAIL;
  return axios.post(requestApiUrl, model);
};

export const subscribeMoreInfo = (
  model: Models.ContactModel,
  apiUrl: string
) => {
  if (apiUrl && apiUrl !== "") {
    return axios.post(apiUrl, model);
  } else {
    const requestApiUrl = API_URL.POST_SUBSCRIBE_EMAIL_SUPPORT;
    return axios.post(requestApiUrl, model);
  }
};

export const submitLoan = (model: Models.LoanModel) => {
  const requestApiUrl = API_URL.POST_LOAN;
  return new Promise((resolve, reject) =>
    axios
      .post(requestApiUrl, model)
      .then((res) => {
        if (res.status === 200) resolve(true);
        else reject(false);
      })
      .catch(reject)
  );
};
