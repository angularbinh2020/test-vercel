import React from "react";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import { IBlock } from "models/blocks/IBlock";
import { IDeviceDetected } from "models/IDeviceDetected";
import { useHiddenOnDevice } from "hooks/useHiddenOnViewMode";

const ComponentBlockRender =
  require(`sites/${process.env.NEXT_PUBLIC_BUILD_SITE}/components/BlockRender`).default;

interface BlockRenderProps extends IDeviceDetected {
  block?: IBlock;
  theme: string;
}

const BlockRender = (props: BlockRenderProps) => {
  const isHidden = useHiddenOnDevice(props.block);
  const Component = ComponentBlockRender || DefaultMissingBlock;
  if (isHidden) return null;
  return <Component {...props} />;
};

export default BlockRender;
