import axios from "apis/axios";
import API_URL from "const/api-url";

class DocumentsService {
  getFilterOptions = (id: string): Promise<any> => {
    return axios.get(API_URL.GET_FILTER_OPTIONS.replace(":filterOptionId", id));
  };
  getFilterResult = (model: Models.DocumentModel): Promise<any> => {
    const { siteId, requestParam, apiUrl } = model;
    if (siteId) {
      return axios.get(`${apiUrl}/${String(siteId)}?${requestParam}`);
    } else {
      return axios.get(`${apiUrl}?${requestParam}`);
    }
  };
}

export const documentsService = new DocumentsService();
