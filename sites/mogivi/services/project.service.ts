import axios from "apis/axios";
import { ProjectModel } from "../models/apis";

class ProjectService {
  getAllProjects = (model: ProjectModel, bassApi: string): Promise<any> => {
    const {
      limit,
      keyword,
      page,
      siteId,
      method,
      serviceType,
      apiSecretKey,
      isSearchPage,
      filters,
    } = model;
    let requestApi = `${bassApi}?id=${siteId}&keyword=${keyword}&pageIndex=${page}&pageSize=${limit}`;
    if (isSearchPage) requestApi += "&isSearchPage=true";
    if (filters) requestApi += `&filters=${filters}`;
    if (method?.toUpperCase() === "post".toUpperCase()) {
      return axios.post(`${requestApi}`);
    }
    if (serviceType && apiSecretKey) {
      return axios.get(
        `${requestApi}&serviceType=${serviceType}&apiSecretKey=${apiSecretKey}`
      );
    }
    if (serviceType) {
      return axios.get(`${requestApi}&serviceType=${serviceType}`);
    }
    return axios.get(requestApi);
  };
  getProjectsSuggestion = (
    model: ProjectModel,
    bassApi: string
  ): Promise<any> => {
    const { limit, keyword, page, siteId, method, serviceType, apiSecretKey } =
      model;
    const requestApi = `${bassApi}/${siteId}?keyword=${keyword}&pageIndex=${page}&pageSize=${limit}`;
    if (method === "post") {
      return axios.post(requestApi);
    } else {
      if (serviceType && apiSecretKey) {
        return axios.get(
          `${requestApi}&serviceType=${serviceType}&apiSecretKey=${apiSecretKey}`
        );
      } else if (serviceType) {
        return axios.get(`${requestApi}&serviceType=${serviceType}`);
      } else {
        return axios.get(requestApi);
      }
    }
  };
}

export const projectService = new ProjectService();
