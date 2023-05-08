import { TOAST_TYPE } from "../const/toast-type";

export interface IToast {
  type: TOAST_TYPE;
  message: string;
  id: string;
}

export interface IToastState {
  toasts: IToast[];
}
