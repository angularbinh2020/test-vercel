import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAME } from "sites/mogivi/const/slice-name";
import { useSelector, useDispatch } from "react-redux";
import { ILoadingFullScreenState } from "../models/ILoadingFullScreenState";

const initialState: ILoadingFullScreenState = {
  isLoading: false,
};

export const loadingFullScreenSlice = createSlice({
  name: SLICE_NAME.LOADING_FULL_SCREEN,
  initialState,
  reducers: {
    setLoadingFullScreenState: (state, action) => {
      state.isLoading = Boolean(action?.payload);
    },
  },
});

export const { setLoadingFullScreenState } = loadingFullScreenSlice.actions;

export const useGetLoadingFullScreenState = (): ILoadingFullScreenState =>
  useSelector((state: any) => state[loadingFullScreenSlice.name]);

export const useSetLoadingFullScreenState = () => {
  const dispatch = useDispatch();
  const showLoading = () => {
    dispatch(setLoadingFullScreenState(true));
  };
  const closeLoading = () => {
    dispatch(setLoadingFullScreenState(false));
  };

  return {
    showLoading,
    closeLoading,
  };
};

export default loadingFullScreenSlice.reducer;
