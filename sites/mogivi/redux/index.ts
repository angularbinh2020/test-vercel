import { combineReducers } from "@reduxjs/toolkit";
import project from "./project.slice";
import documents from "./documents.slice";
import toast from "./toast.slice";
import loadingFullScreen from "./loadingFullScreen.slice";
import investor from "./investor.slice";
import pageData from "./pageData.slice";
import search from "./search.slice";
import confirmModal from "./confirmModal.slice";

const rootReducer = combineReducers<Types.RootState>({
  project,
  documents,
  toast,
  investor,
  pageData,
  loadingFullScreen,
  search,
  confirmModal,
});

export default rootReducer;
