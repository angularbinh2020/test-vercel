import { IBlock } from "models/blocks/IBlock";
import React from "react";

interface BlankBlock {
  blockName?: string;
  props?: any;
  block?: IBlock;
}

const BlankBlock = () => {
  return <></>;
};

export default BlankBlock;
