import {
  createSlice,
  Dispatch,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";
import { RESULT_PER_PAGE } from "const/config";
import { ProjectSuggestionResult } from "../models/apis";
import { projectService } from "../services/project.service";
import { useDispatch } from "react-redux";

export enum SearchInputType {
  BUY_SEARCH_INPUT = "BUY_SEARCH_INPUT",
  RENT_SEARCH_INPUT = "RENT_SEARCH_INPUT",
  PROJECT_SEARCH_INPUT = "PROJECT_SEARCH_INPUT",
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
    setSearchInputType(
      state: IProjectState,
      action: PayloadAction<SearchInputType>
    ) {
      state.searchInputType = action.payload;
    },
  },
});

export const onGetAllProjects =
  (model: Models.ProjectModel, baseApi: string) =>
  (dispatch: Dispatch<AnyAction>) => {
    dispatch(setLoading(true));
    return projectService
      .getAllProjects(model, baseApi)
      .finally(() => dispatch(setLoading(false)))
      .then((response) => {
        if (response.data.items) {
          dispatch(setAllProjects(response.data.items));
          dispatch(setIsError(!response.data.items.length));
        }
        let totalPageNumber = 0;
        const totalItem: number = response.data.totalItems;
        if (totalItem) {
          const limit = model.limit || RESULT_PER_PAGE;
          totalPageNumber = Math.ceil(+totalItem / limit);
        }
        dispatch(setTotalPage(totalPageNumber));
      })
      .catch((ex) => {
        dispatch(setAllProjects([]));
        dispatch(setIsError(true));
        console.log(ex);
      });
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
} = projectSlice.actions;

export const useSetProjectListResultState = () => {
  const dispatch = useDispatch();
  const onError = () => {
    dispatch(setLoading(false));
    dispatch(setIsError(true));
    dispatch(setAllProjects([]));
  };

  return {
    onError,
  };
};

export default projectSlice.reducer;
