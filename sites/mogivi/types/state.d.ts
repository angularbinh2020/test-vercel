import { IDocumentsState } from "../redux/documents.slice";
import { IProjectState } from "../redux/project.slice";
import { IToastState } from "sites/mogivi/models/IToastState";
import { IInvestorState } from "../redux/investor.slice";
import { IPageDataState } from "../redux/pageData.slice";
import { ILoadingFullScreenState } from "../models/ILoadingFullScreenState";
import { ISearchState } from "../redux/search.slice";
import { IConfirmModalState } from "../models/IConfirmModalState";

export type RootState = {
  project: IProjectState;
  documents: IDocumentsState;
  toast: IToastState;
  investor: IInvestorState;
  pageData: IPageDataState;
  loadingFullScreen: ILoadingFullScreenState;
  search: ISearchState;
  confirmModal: IConfirmModalState;
};
