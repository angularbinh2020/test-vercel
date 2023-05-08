import axios from "axios";
import { PROJECT_API_THEME } from "const/project-api-theme";
import React, { useCallback, useEffect, useState } from "react";
import { IProjectsAPI } from "sites/mogivi/models/blocks/IProjectsAPI";
import ArticleListView from "../ArticleListViewBlock";
import ArticleVariant from "../ArticleVariantBlock";
import CarouselStandard from "../CarouselStandardblock";
import ListText from "../ListTextBlock";

interface ProjectsAPIProps {
  block: IProjectsAPI;
}

const ProjectsAPI = (props: ProjectsAPIProps) => {
  const { themes, settingAPI } = props.block.fields;
  const api = settingAPI[0].fields.aPIKeyTag.node.fields.itemTitle || "";
  const [listData, setListData] = useState([]);

  const fetchData = useCallback(async () => {
    const response = await axios.get(api);

    if (response?.data?.length) {
      setListData(response?.data);
    }
  }, [api]);

  useEffect(() => {
    if (api && api !== "") {
      fetchData();
    }
  }, [api, fetchData]);

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
