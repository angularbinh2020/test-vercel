import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { HIDDEN_CONFIRM_ACTION_ID } from "../const/vr360";

const initialState = {
  open: false,
  message: "",
  modalTitle: "",
};

export const confirmModalSlice = createSlice({
  name: "confirmModal",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.open = false;
      state.message = "";
      state.modalTitle = "";
    },
    openModal: (state, action) => {
      const { message, modalTitle } = action.payload;
      state.open = true;
      state.message = message;
      state.modalTitle = modalTitle;
    },
  },
});

const { closeModal, openModal } = confirmModalSlice.actions;

export const createSetConfirmModalDispatch = (dispatch: any) => {
  const closeConfirmModal = () => dispatch(closeModal());
  const openConfirmModal = ({ message, modalTitle, onAccept }: any) => {
    const buttonAction = document.getElementById(HIDDEN_CONFIRM_ACTION_ID);
    if (buttonAction) buttonAction.onclick = onAccept;
    dispatch(openModal({ message, modalTitle }));
  };

  return {
    closeConfirmModal,
    openConfirmModal,
  };
};

export const useSetConfirmModalState = () => {
  const dispatch = useDispatch();
  return createSetConfirmModalDispatch(dispatch);
};

export const useGetConfirmModalState = () => {
  const open = useSelector((state: Types.RootState) => state.confirmModal.open);
  const message = useSelector(
    (state: Types.RootState) => state.confirmModal.message
  );
  const modalTitle = useSelector(
    (state: Types.RootState) => state.confirmModal.modalTitle
  );
  return { open, message, modalTitle };
};

export default confirmModalSlice.reducer;
