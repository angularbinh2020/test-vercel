import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./project-search.module.scss";
import classNames from "classnames";
import Form from "react-bootstrap/Form";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProjectsSuggestion,
  onGetProjectsSuggestion,
  setLoadingSearchBar,
  setResultKeyword,
  setSearchKey,
} from "sites/mogivi/redux/project.slice";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { IProjectsAPI } from "sites/mogivi/models/blocks/IProjectsAPI";
import API_URL from "const/api-url";
import useViewMode from "hooks/useViewMode";
import { useGetPageDataContext } from "context/page-data.context";
import LinkItem from "components/LinkItem";

let searchModels = {
  page: 1,
  limit: 5,
  keyword: "",
  siteId: "",
};

interface ProjectSearchBlockProps {
  block: IProjectsAPI;
}

const ProjectSearchBlock = (props: ProjectSearchBlockProps) => {
  const { loadingSearchBar, searchKey, projectSuggestion } = useSelector(
    (state: Types.RootState) => state.project
  );
  const pageData = useGetPageDataContext();
  const { settingAPI } = props.block.fields;
  const dispatch = useDispatch();
  const [onInputFocus, setOnInputFocus] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [showSuggestionList, setShowSuggestionList] = useState<boolean>(false);
  const { isMobile } = useViewMode();

  const { baseApi, pageIndex, limit, defaultKeyword, method } = useMemo(() => {
    let baseApi = API_URL.SITE_PROJECT_SEARCH_SUGGESTION;
    let pageIndex = 1;
    let limit = 10;
    let defaultKeyword = "";
    let method = "";
    if (settingAPI?.length) {
      baseApi =
        settingAPI[1].fields.aPIKeyTag?.node.fields.itemTitle ||
        API_URL.SITE_PROJECT_SEARCH_SUGGESTION;
      pageIndex = settingAPI[1].fields.parameters[0].fields.value;
      limit = settingAPI[1].fields.parameters[1].fields.value;
      method = settingAPI[1].fields.method?.toLowerCase() || "get";
    }

    return { baseApi, pageIndex, limit, defaultKeyword, method };
  }, [settingAPI]);

  searchModels = {
    page: pageIndex,
    limit: limit,
    keyword: defaultKeyword,
    siteId: String(pageData?.siteId),
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceInputChange = useCallback(
    debounce((value: string) => {
      dispatch(setSearchKey(value.trim()));
      dispatch(setLoadingSearchBar(false));
    }, 300),
    []
  );

  const handleSaveKeyword = (name: string, url: string) => {
    if (localStorage.getItem("recentlySearchKeys")) {
      // @ts-ignore
      const recentlySearchKeysList =
        JSON.parse(localStorage.getItem("recentlySearchKeys") as string) || [];
      if (name !== "" && url !== "") {
        const recentlySearchKeys = {
          name: name,
          url: url,
        };
        recentlySearchKeysList.unshift(recentlySearchKeys);
        localStorage.setItem(
          "recentlySearchKeys",
          JSON.stringify(recentlySearchKeysList)
        );
      }
    } else {
      const recentlySearchKeysList = [];
      const recentlySearchKeys = {
        name: name,
        url: url,
      };
      recentlySearchKeysList.push(recentlySearchKeys);
      localStorage.setItem(
        "recentlySearchKeys",
        JSON.stringify(recentlySearchKeysList)
      );
    }
    setShowSuggestionList(false);
  };

  const handleResultKeyword = useCallback(
    (keyword: string) => {
      dispatch(setResultKeyword(keyword));
    },
    [dispatch]
  );

  const onTextSearchChange = useCallback(
    (event: any) => {
      const { value } = event.target;
      dispatch(setLoadingSearchBar(true));
      setKeyword(value);
      debounceInputChange(value);
    },
    [debounceInputChange, dispatch]
  );

  const updateData = (model: Models.ProjectModel) => {
    dispatch(onGetProjectsSuggestion(model, baseApi) as any);
  };

  const handleOnFocus = () => {
    setOnInputFocus(true);
  };
  const handleOnBlur = () => {
    if (!isMobile) {
      setOnInputFocus(false);
    }
  };

  useEffect(() => {
    setKeyword(defaultKeyword);
    dispatch(setSearchKey(defaultKeyword));
  }, [defaultKeyword, dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tagListItem: string[] = JSON.parse(
        localStorage.getItem("recentlySearchKeys") || "[]"
      );
      setTagList(tagListItem);
    }
  }, []);

  useEffect(() => {
    if (keyword.length >= 2) {
      updateData({
        ...searchModels,
        siteId: pageData?.siteId ?? 0,
        keyword: searchKey,
        method: method,
      });
      setShowSuggestionList(true);
    } else {
      dispatch(clearProjectsSuggestion());
    }
  }, [dispatch, searchKey]);

  useEffect(() => {
    if (onInputFocus) {
      setShowSuggestionList(true);
    } else {
      setShowSuggestionList(false);
    }
  }, [onInputFocus]);

  return (
    <div className={styles.projectSearchContainer}>
      <h2 className="mt-5 text-center fw-bold">
        TÌM HIỂU CÁC DỰ ÁN BẤT ĐỘNG SẢN MỚI NHẤT
      </h2>
      <div className="container ps-lg-5 pe-lg-5 py-3 py-lg-5">
        <div className="row">
          <Form.Group
            className={classNames(
              "col-xs-12 p-0 col-md-12 col-xl-12",
              styles.searchInput
            )}
          >
            {loadingSearchBar ? (
              <div className={styles.spinner}>
                <div
                  className={classNames("spinner-border text-secondary")}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className={styles.searchIcon}>
                <SvgIcon icon="search" />
              </div>
            )}

            <Form.Control
              type="search"
              placeholder="Nhập địa điểm hoặc tên dự án (3 ký tự)..."
              className={classNames(styles.input, "shadow-sm")}
              value={keyword}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              onChange={(e) => onTextSearchChange(e)}
            />
            {tagList && !isMobile && (
              <div className={styles.recentlySearchTag}>
                <ul className={styles.recentlySearchTagBox}>
                  {tagList.slice(0, 3)?.map(
                    (tagItem: any, idx) =>
                      tagItem.name !== "" &&
                      tagItem.url !== "" && (
                        <li key={idx}>
                          <LinkItem url={tagItem.url}>{tagItem.name}</LinkItem>
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}
            {projectSuggestion &&
              projectSuggestion?.length !== 0 &&
              showSuggestionList && (
                <div
                  className={classNames(styles.suggestionList, "scrollbar")}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                >
                  <ul>
                    {projectSuggestion?.map((item: any, idx: number) => {
                      return (
                        <li key={idx} className={styles.suggestionItem}>
                          <h6>{item.labelLevel}</h6>
                          <ul>
                            {item.suggestions?.map(
                              (suggestionItem: any, suggestionIdx: number) => (
                                <li
                                  onClick={() => {
                                    handleResultKeyword(
                                      suggestionItem.fullKeyUrl
                                    );
                                    handleSaveKeyword(
                                      suggestionItem.text,
                                      `${suggestionItem.fullKeyUrl}`
                                    );
                                  }}
                                  key={`suggestion item - ${suggestionIdx}`}
                                  className={styles.suggestionSubitem}
                                >
                                  <LinkItem url={suggestionItem.fullKeyUrl}>
                                    <div>
                                      {suggestionItem.text}{" "}
                                      <strong>{`(${suggestionItem.totalResult} dự án)`}</strong>
                                    </div>
                                  </LinkItem>
                                </li>
                              )
                            )}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default ProjectSearchBlock;
