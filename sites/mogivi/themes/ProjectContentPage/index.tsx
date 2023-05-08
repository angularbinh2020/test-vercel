import React from "react";
import dynamic from "next/dynamic";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import { IDeviceDetected } from "models/IDeviceDetected";

const BreadcrumbsProjectPageBlock = dynamic(
  () => import("./components/BreadcrumbsProjectPageBlock")
);

const ImageCardsBlock = dynamic(() => import("./components/ImageCardsBlock"));

const ProjectModule = dynamic(() => import("./components/ProjectModule"));

const CustomHeaderContentProjectPageBlock = dynamic(
  () => import("./components/CustomHeaderContentProjectPageBlock")
);

const Blocks = {
  customHeaderContentProjectPageBlock: CustomHeaderContentProjectPageBlock,
  breadcrumbsProjectPageBlock: BreadcrumbsProjectPageBlock,
  imageCardsBlock: ImageCardsBlock,
  projectModule: ProjectModule,
};

interface ProjectContentPage extends IDeviceDetected {
  block: any;
}

const ProjectContentPage = (props: ProjectContentPage) => {
  const { block } = props;
  const Component =
    Blocks[block.system.contentType as keyof typeof Blocks] ||
    DefaultMissingBlock;
  //@ts-ignore
  return <Component {...props} />;
};

export default ProjectContentPage;
