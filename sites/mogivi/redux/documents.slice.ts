import {
  createSlice,
  Dispatch,
  PayloadAction,
  AnyAction,
  AnyListenerPredicate,
} from "@reduxjs/toolkit";
import { RESULT_PER_PAGE } from "const/config";
import { documentsService } from "../services/documents.service";

export interface IDocumentsState {
  loading: boolean;
  filterResult: any;
}

const initialState = {
  loading: false,
  filterResult: [],
} as IDocumentsState;

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setLoading(state: IDocumentsState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setFiltersResult(state: IDocumentsState, action: PayloadAction<any>) {
      state.filterResult = action.payload;
    },
    clearFiltersResult(state: IDocumentsState) {
      state.filterResult = [];
    },
  },
});

export const onGetFilterResult =
  (model: Models.DocumentModel) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(setLoading(true));
    return documentsService
      .getFilterResult(model)
      .finally(() => dispatch(setLoading(false)))
      .then((response) => {
        dispatch(setFiltersResult(response.data));
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

// Action creators are generated for each case reducer function
export const { setLoading, setFiltersResult } = documentsSlice.actions;

export default documentsSlice.reducer;
