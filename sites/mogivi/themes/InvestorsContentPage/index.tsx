import React from "react";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import { IDeviceDetected } from "models/IDeviceDetected";
import { IntroductionBlock } from "./components/IntroductionBlock";

const Blocks = {
  introductionIInvestorBlock: IntroductionBlock,
};

interface InvestorsContentPage extends IDeviceDetected {
  block: any;
}

const InvestorsContentPage = (props: InvestorsContentPage) => {
  const { block } = props;
  const Component =
    Blocks[block.system.contentType as keyof typeof Blocks] ||
    DefaultMissingBlock;
  //@ts-ignore
  return <Component {...props} />;
};

export default InvestorsContentPage;
