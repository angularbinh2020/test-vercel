import React from "react";
import { IDeviceDetected } from "models/IDeviceDetected";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import dynamic from "next/dynamic";

interface SearchResultsLandingPage extends IDeviceDetected {
  block: any;
}

const FilterBlock = dynamic(() => import("./components/FilterBlock"));

const Blocks = {
  searchModule: FilterBlock,
};

const SearchResultsLandingPage = (props: SearchResultsLandingPage) => {
  const { block } = props;
  const Component =
    Blocks[block.system.contentType as keyof typeof Blocks] ||
    DefaultMissingBlock;
  //@ts-ignore
  return <Component {...props} />;
};

export default SearchResultsLandingPage;
