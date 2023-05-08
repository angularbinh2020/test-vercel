import React from "react";
import { IDeviceDetected } from "models/IDeviceDetected";
import ListProjectBlock from "./components/ListProjectBlock";
import ProjectSearchBlock from "./components/ProjectSearchBlock";
import useViewMode from "hooks/useViewMode";
import Header from "sites/mogivi/layout/components/Header";
import Footer from "sites/mogivi/layout/components/Footer";
import { useGetPageDataContext } from "context/page-data.context";

interface ProjectsLandingPage extends IDeviceDetected {
  block: any;
}

const ProjectsLandingPage = (props: ProjectsLandingPage) => {
  const { isMobileApp } = useViewMode();
  const pageData: any = useGetPageDataContext();
  const { rootNode, siteLanguageNode } = pageData;
  return (
    <>
      {!isMobileApp && (
        <Header rootNode={rootNode} siteLanguageNode={siteLanguageNode} />
      )}
      <ProjectSearchBlock {...props} />
      <ListProjectBlock {...props} />
      {!isMobileApp && (
        <Footer rootNode={rootNode} siteLanguageNode={siteLanguageNode} />
      )}
      {/* <PromotionStatisticBlock />
      <ListProjectAnalyticBlock /> */}
    </>
  );
};

export default ProjectsLandingPage;
