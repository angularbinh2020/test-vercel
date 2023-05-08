import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import IPageData from "models/IPageData";

export interface IPageDataState {
  loading: boolean;
  pageData: IPageData;
}

const initialState = {
  loading: false,
  pageData: {},
} as IPageDataState;

export const investorSlice = createSlice({
  name: "pageData",
  initialState,
  reducers: {
    setLoading(state: IPageDataState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading } = investorSlice.actions;

export default investorSlice.reducer;
