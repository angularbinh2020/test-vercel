import { IBlock } from "models/blocks/IBlock";
import { IDeviceDetected } from "models/IDeviceDetected";
import React from "react";
import dynamic from "next/dynamic";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import IPageData from "models/IPageData";

const ProjectContentPage = dynamic(
  () => import("../../themes/ProjectContentPage")
);

const DefaultLandingPage = dynamic(
  () => import("../../themes/DefaultLandingPage")
);

const InvestorsLandingPage = dynamic(
  () => import("../../themes/InvestorsLandingPage")
);

const MogiverseLidarPage = dynamic(
  () => import("../../themes/MogiverseLidarPage")
);

const InvestorsContentPage = dynamic(
  () => import("../../themes/InvestorsContentPage")
);

const ErrorContentPage = dynamic(() => import("../../themes/ErrorContentPage"));

const HomeLandingPage = dynamic(() => import("../../themes/HomeLandingPage"));

const DefaultContentPage = dynamic(
  () => import("../../themes/DefaultContentPage")
);

const ProjectsLandingPage = dynamic(
  () => import("../../themes/ProjectsLandingPage")
);

const SearchResultsLandingPage = dynamic(
  () => import("../../themes/SearchResultsLandingPage")
);

const DownloadsLandingPage = dynamic(
  () => import("../../themes/DownloadsLandingPage")
);

const SuccessStoriesLandingPage = dynamic(
  () => import("../../themes/SuccessStoriesLandingPage")
);

const InformationLandingPage = dynamic(
  () => import("../../themes/InformationLandingPage")
);

const ArticleLandingPage = dynamic(
  () => import("../../themes/ArticleLandingPage")
);

const ArticleContentPage = dynamic(
  () => import("../../themes/ArticleContentPage")
);

const ComingSoonPage = dynamic(() => import("../../themes/ComingSoonPage"));

const Themes = {
  projectContentPage: ProjectContentPage,
  defaultLandingPage: DefaultLandingPage,
  investorsLandingPage: InvestorsLandingPage,
  mogiverseLidarPage: MogiverseLidarPage,
  investorContentPage: InvestorsContentPage,
  errorContentPage: ErrorContentPage,
  homeLandingPage: HomeLandingPage,
  defaultContentPage: DefaultContentPage,
  projectsLandingPage: ProjectsLandingPage,
  searchResultsLandingPage: SearchResultsLandingPage,
  downloadsLandingPage: DownloadsLandingPage,
  successStoriesLandingPage: SuccessStoriesLandingPage,
  informationLandingPage: InformationLandingPage,
  articlesLandingPage: ArticleLandingPage,
  articleItem: ArticleContentPage,
  comingSoonPage: ComingSoonPage,
};
interface BlockRenderProps extends IDeviceDetected {
  block?: IBlock;
  theme: string;
}

const MogiviBlockRender = (props: BlockRenderProps) => {
  const { theme, ...restProps } = props;
  const Component = Themes[theme as keyof typeof Themes] || DefaultMissingBlock;
  //@ts-ignore
  return <Component {...restProps} />;
};

export default MogiviBlockRender;
