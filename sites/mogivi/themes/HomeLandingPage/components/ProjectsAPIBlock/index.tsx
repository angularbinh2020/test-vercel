import { PROJECT_API_THEME } from "const/project-api-theme";
import React, { useMemo } from "react";
import { IProjectsAPI } from "sites/mogivi/models/blocks/IProjectsAPI";
import ArticleListView from "../ArticleListViewBlock";
import ArticleVariant from "../ArticleVariantBlock";
import CarouselStandard from "../CarouselStandardblock";
import ListText from "../ListTextBlock";

interface ProjectsAPIProps {
  block: IProjectsAPI;
}

const ProjectsAPI = (props: ProjectsAPIProps) => {
  const { themes, dataResult } = props.block.fields;
  const listData = useMemo(() => {
    return dataResult || [];
  }, [dataResult]);

  switch (themes) {
    case PROJECT_API_THEME.carousel:
      return (
        <CarouselStandard {...props.block.fields} articleList={listData} />
      );
    case PROJECT_API_THEME.news:
      return <ArticleVariant {...props.block.fields} list={listData} />;
    case PROJECT_API_THEME.listText:
      return <ListText {...props.block.fields} list={listData} />;
    default:
      return <ArticleListView articleList={listData} {...props.block.fields} />;
  }
};

export default ProjectsAPI;
