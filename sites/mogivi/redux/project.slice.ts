import {
  createSlice,
  Dispatch,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";
import { DEFAULT_PAGE_SIZE, START_PAGE_INDEX } from "const/config";
import { ProjectSuggestionResult } from "../models/apis";
import { projectService } from "../services/project.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import axios from "apis/axios";

export enum SearchInputType {
  BUY_SEARCH_INPUT = "BUY_SEARCH_INPUT",
  RENT_SEARCH_INPUT = "RENT_SEARCH_INPUT",
  PROJECT_SEARCH_INPUT = "PROJECT_SEARCH_INPUT",
}

export interface IProjectPayload {
  loading?: boolean;
  loadingSearchBar?: boolean;
  isError?: boolean;
  searchKey?: string;
  projectData?: any;
  projectSuggestion?: ProjectSuggestionResult[];
  allProjects?: any;
  totalPages?: number;
  pageData?: any;
  resultKeyword?: string;
  searchInputType?: SearchInputType | null;
  isBuyOrRentSearch?: boolean;
  filtersCount?: number;
  totalResult?: number;
  currentService?: string;
}

export interface IProjectState {
  loading: boolean;
  loadingSearchBar: boolean;
  isError: boolean;
  searchKey: string;
  projectData: any;
  projectSuggestion: ProjectSuggestionResult[];
  allProjects: any;
  totalPages: number;
  pageData: any;
  resultKeyword: string;
  searchInputType: SearchInputType | null;
  isBuyOrRentSearch: boolean;
  filtersCount: number;
  totalResult: number;
  currentService: string;
}

const initialState = {
  loading: true,
  loadingSearchBar: false,
  isError: false,
  searchKey: "",
  projectData: [],
  projectSuggestion: [],
  allProjects: [],
  totalPages: 0,
  pageData: {},
  resultKeyword: "",
  searchInputType: null,
  isBuyOrRentSearch: false,
  filtersCount: 0,
  totalResult: 0,
  currentService: "",
} as IProjectState;

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setLoading(state: IProjectState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLoadingSearchBar(state: IProjectState, action: PayloadAction<boolean>) {
      state.loadingSearchBar = action.payload;
    },
    setIsError(state: IProjectState, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
    setSearchKey(state: IProjectState, action: PayloadAction<string>) {
      state.searchKey = action.payload;
    },
    setAllProjects(state: IProjectState, action: PayloadAction<any>) {
      state.allProjects = action.payload;
    },
    setProjectsSuggestion(
      state: IProjectState,
      action: PayloadAction<Models.ProjectSuggestionResult[]>
    ) {
      state.projectSuggestion = action.payload;
    },
    clearProjectsSuggestion(state: IProjectState) {
      state.projectSuggestion = [];
    },
    setTotalPage(state: IProjectState, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setResultKeyword(state: IProjectState, action: PayloadAction<string>) {
      state.resultKeyword = action.payload;
    },
    setSearchInputType(state: IProjectState, action: PayloadAction<any>) {
      state.searchInputType = action.payload;
    },
    setState(state: IProjectState, action: PayloadAction<IProjectPayload>) {
      const payload = action?.payload;
      if (payload) {
        for (let propertyName in payload) {
          if (Object.hasOwn(state, propertyName)) {
            //@ts-ignore
            state[propertyName] = payload[propertyName as keyof typeof payload];
          }
        }
      }
    },
  },
});

export const onGetAllProjects =
  (model: Models.ProjectModel, baseApi: string) =>
  async (dispatch: Dispatch<AnyAction>) => {
    dispatch(
      setState({
        loading: true,
        totalResult: 0,
      })
    );
    try {
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
      let requestApi = `${baseApi}?id=${siteId}&keyword=${keyword}&pageIndex=${page}&pageSize=${limit}`;
      if (isSearchPage) requestApi += "&isSearchPage=true";
      if (filters) requestApi += `&filters=${filters}`;
      var request;
      if (method?.toUpperCase() === "post".toUpperCase()) {
        request = axios.post(baseApi, {
          id: siteId,
          keyword: keyword ?? "",
          pageIndex: page ?? START_PAGE_INDEX,
          pageSize: limit ?? 20,
          serviceType: serviceType,
          apiSecretKey: apiSecretKey,
          filters: filters?.trim().length ? filters?.split(";") : [],
        });
      }
      if (!request && serviceType && apiSecretKey) {
        request = axios.get(
          `${requestApi}&serviceType=${serviceType}&apiSecretKey=${apiSecretKey}`
        );
      }
      if (!request && serviceType) {
        request = axios.get(`${requestApi}&serviceType=${serviceType}`);
      }
      if (!request) request = axios.get(requestApi);
      const data = (await request).data;
      if (data.items) {
        dispatch(
          setState({
            totalResult: data.totalItems,
            allProjects: data.items,
            isError: !data.items.length,
          })
        );
      }
      let totalPageNumber = 0;
      const totalItem: number = data.totalItems;
      if (totalItem) {
        const limit = model.limit || DEFAULT_PAGE_SIZE;
        totalPageNumber = Math.ceil(+totalItem / limit);
      }
      dispatch(setTotalPage(totalPageNumber));
    } catch (e) {
      dispatch(setAllProjects([]));
      dispatch(setIsError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onGetProjectsSuggestion =
  (model: Models.ProjectModel, baseApi: string) =>
  (dispatch: Dispatch<AnyAction>) => {
    dispatch(setLoadingSearchBar(true));
    return projectService
      .getProjectsSuggestion(model, baseApi)
      .finally(() => dispatch(setLoadingSearchBar(false)))
      .then((response) => {
        if (response.data) {
          dispatch(setProjectsSuggestion(response.data));
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setLoadingSearchBar,
  setIsError,
  setSearchKey,
  setAllProjects,
  setProjectsSuggestion,
  setTotalPage,
  clearProjectsSuggestion,
  setResultKeyword,
  setSearchInputType,
  setState,
} = projectSlice.actions;

export const useGetSetProjectListResultState = () => {
  return useSelector((state: RootState) => state.project);
};

export const useSetProjectListResultState = () => {
  const dispatch = useDispatch();
  const setProjectListResultState = (nextState: IProjectPayload) =>
    dispatch(setState(nextState));
  const onError = () => {
    setProjectListResultState({
      loading: false,
      isError: true,
      allProjects: [],
    });
  };

  return {
    onError,
    setProjectListResultState,
  };
};

export default projectSlice.reducer;
