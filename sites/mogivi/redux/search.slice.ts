import {
  createSlice,
  Dispatch,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";
import { ProjectSuggestionResult } from "../models/apis";
import { projectService } from "../services/project.service";
import { useDispatch } from "react-redux";

export enum SearchInputType {
  BUY_SEARCH_INPUT = "BUY_SEARCH_INPUT",
  RENT_SEARCH_INPUT = "RENT_SEARCH_INPUT",
  PROJECT_SEARCH_INPUT = "PROJECT_SEARCH_INPUT",
}

export interface ISearchStatePayload {
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
}

export interface ISearchState {
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
  loading: false,
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
} as ISearchState;

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setLoading(state: ISearchState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLoadingSearchBar(state: ISearchState, action: PayloadAction<boolean>) {
      state.loadingSearchBar = action.payload;
    },
    setIsError(state: ISearchState, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
    setSearchKey(state: ISearchState, action: PayloadAction<string>) {
      state.searchKey = action.payload;
    },
    setAllProjects(state: ISearchState, action: PayloadAction<any>) {
      state.allProjects = action.payload;
    },
    setProjectsSuggestion(
      state: ISearchState,
      action: PayloadAction<Models.ProjectSuggestionResult[]>
    ) {
      state.projectSuggestion = action.payload;
    },
    clearProjectsSuggestion(state: ISearchState) {
      state.projectSuggestion = [];
    },
    setTotalPage(state: ISearchState, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setResultKeyword(state: ISearchState, action: PayloadAction<string>) {
      state.resultKeyword = action.payload;
    },
    setSearchInputType(
      state: ISearchState,
      action: PayloadAction<SearchInputType>
    ) {
      state.searchInputType = action.payload;
    },
    setState(state: ISearchState, action: PayloadAction<ISearchStatePayload>) {
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
} = searchSlice.actions;

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

export const useSetSearchState = () => {
  const dispatch = useDispatch();
  const setSearchState = (payload: ISearchStatePayload) =>
    dispatch(setState(payload));
  return { setSearchState };
};

export default searchSlice.reducer;
