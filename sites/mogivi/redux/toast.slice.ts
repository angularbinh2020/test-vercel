import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAME } from "sites/mogivi/const/slice-name";
import { useSelector, useDispatch } from "react-redux";
import { IToast, IToastState } from "sites/mogivi/models/IToastState";
import { v4 as uuidv4 } from "uuid";
import { TOAST_TYPE } from "../const/toast-type";

const TOAST_SHOW_TIME = 3000;

const initialState: IToastState = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: SLICE_NAME.TOAST,
  initialState,
  reducers: {
    addToast: (state, action) => {
      if (action?.payload) {
        const toast = action?.payload;
        state.toasts = [...state.toasts, toast];
      }
    },
    removeToast: (state, action) => {
      if (action?.payload) {
        const toastId: string = action?.payload;
        const newToast = state.toasts.filter((toast) => toast.id !== toastId);
        state.toasts = newToast;
      }
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export const useGetToastState = (): IToastState =>
  useSelector((state: any) => state[toastSlice.name]);

export const useSetToastState = () => {
  const dispatch = useDispatch();
  const hideToast = (toastId: string) => {
    dispatch(removeToast(toastId));
  };
  const showErrorToast = (message: string) => {
    const toastId = uuidv4();
    const toast: IToast = {
      type: TOAST_TYPE.ERROR,
      message,
      id: toastId,
    };
    dispatch(addToast(toast));
    setTimeout(() => {
      hideToast(toastId);
    }, TOAST_SHOW_TIME);
  };

  const showInfoToast = (message: string) => {
    const toastId = uuidv4();
    const toast: IToast = {
      type: TOAST_TYPE.SUCCESS,
      message,
      id: toastId,
    };
    dispatch(addToast(toast));
    setTimeout(() => {
      hideToast(toastId);
    }, TOAST_SHOW_TIME);
  };

  return {
    showErrorToast,
    hideToast,
    showInfoToast,
  };
};

export default toastSlice.reducer;
