import {
  createSlice,
  Dispatch,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";
import { RESULT_PER_PAGE } from "const/config";
import { ProjectSuggestionResult } from "../models/apis";
import { projectService } from "../services/project.service";
import { investorsService } from "../services/investors.service";

export interface IInvestorState {
  loading: boolean;
  loadingSearchBar: boolean;
  isError: boolean;
  searchKey: string;
  investorData: any;
  investorsSuggestion: ProjectSuggestionResult[];
  allInvestors: any;
  investor: any;
  totalPages: number;
  pageData: any;
  resultKeyword: string;
  topInvestors: any;
}

const initialState = {
  loading: true,
  loadingSearchBar: false,
  isError: false,
  searchKey: "",
  investorData: [],
  investorsSuggestion: [],
  allInvestors: [],
  investor: {},
  totalPages: 0,
  pageData: {},
  resultKeyword: "",
  topInvestors: [],
} as IInvestorState;

export const investorSlice = createSlice({
  name: "investor",
  initialState,
  reducers: {
    setLoading(state: IInvestorState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLoadingSearchBar(state: IInvestorState, action: PayloadAction<boolean>) {
      state.loadingSearchBar = action.payload;
    },
    setIsError(state: IInvestorState, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
    setSearchKey(state: IInvestorState, action: PayloadAction<string>) {
      state.searchKey = action.payload;
    },
    setAllInvestor(state: IInvestorState, action: PayloadAction<string>) {
      state.allInvestors = action.payload;
    },
    setInvestorsSuggestion(
      state: IInvestorState,
      action: PayloadAction<Models.ProjectSuggestionResult[]>
    ) {
      state.investorsSuggestion = action.payload;
    },
    clearInvestorsSuggestion(state: IInvestorState) {
      state.investorsSuggestion = [];
    },
    setTotalPage(state: IInvestorState, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setResultKeyword(state: IInvestorState, action: PayloadAction<string>) {
      state.resultKeyword = action.payload;
    },
    setInvestor(state: IInvestorState, action: PayloadAction<any>) {
      state.investor = action.payload;
    },
    setTopInvestors(state: IInvestorState, action: PayloadAction<any>) {
      state.topInvestors = action.payload;
    },
  },
});

export const onGetAllInvestor =
  (model: Models.ProjectModel, baseApi: string) =>
  (dispatch: Dispatch<AnyAction>) => {
    dispatch(setLoading(true));
    return projectService
      .getAllProjects(model, baseApi)
      .finally(() => dispatch(setLoading(false)))
      .then((response) => {
        if (response.data.items) {
          dispatch(setAllInvestor(response.data.items));
        }
        let totalPageNumber = 0;
        const totalItem: number = response.data.totalItems;
        if (totalItem)
          totalPageNumber = Math.ceil(+totalItem / RESULT_PER_PAGE);
        dispatch(setTotalPage(totalPageNumber));
        dispatch(setIsError(false));
      })
      .catch((ex) => {
        dispatch(setIsError(true));
        console.log(ex);
      });
  };

export const onGetInvestor =
  (model: Models.ProjectModel, baseApi: string) =>
  (dispatch: Dispatch<AnyAction>) => {
    dispatch(setLoading(true));
    return projectService
      .getAllProjects(model, baseApi)
      .finally(() => dispatch(setLoading(false)))
      .then((response) => {
        dispatch(setInvestor(response.data.items[0]));
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

export const onGetInvestorsSuggestion =
  (model: Models.ProjectModel, baseApi: string) =>
  (dispatch: Dispatch<AnyAction>) => {
    dispatch(setLoadingSearchBar(true));
    return projectService
      .getProjectsSuggestion(model, baseApi)
      .finally(() => dispatch(setLoadingSearchBar(false)))
      .then((response) => {
        if (response.data) {
          dispatch(setInvestorsSuggestion(response.data));
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

export const onGetTopInvestor =
  (quantity: number) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(setLoading(true));
    return investorsService
      .getTopInvestor(quantity)
      .finally(() => dispatch(setLoading(false)))
      .then((response) => {
        if (response.data) {
          dispatch(setTopInvestors(response.data.items));
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setIsError,
  setSearchKey,
  setAllInvestor,
  setInvestorsSuggestion,
  setTotalPage,
  clearInvestorsSuggestion,
  setResultKeyword,
  setInvestor,
  setTopInvestors,
  setLoadingSearchBar,
} = investorSlice.actions;

export default investorSlice.reducer;
