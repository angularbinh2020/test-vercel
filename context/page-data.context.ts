import IPageData from "models/IPageData";
import React, { useContext } from "react";

export const PageDataContext = React.createContext<IPageData | undefined>(
  undefined
);

export const useGetPageDataContext = () => useContext(PageDataContext);
