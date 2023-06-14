import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import useViewMode from "hooks/useViewMode";
import { debounce } from "lodash";
import {
  clearProjectsSuggestion,
  onGetProjectsSuggestion,
  setLoadingSearchBar,
  setSearchKey,
} from "sites/mogivi/redux/project.slice";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import API_URL from "const/api-url";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import { useGetPageDataContext } from "context/page-data.context";
import LinkItem from "components/LinkItem";
import { SearchInputType } from "sites/mogivi/redux/project.slice";

let searchModels = {
  page: 1,
  limit: 5,
  keyword: "",
  siteId: "",
};

interface ServiceTabProps {
  block: IETSearchService;
}

export const ServiceTab = (props: ServiceTabProps) => {
  const { filtersOptions, apiSecretKey, serviceType } = props.block.fields;
  const { loadingSearchBar, searchKey, projectSuggestion, searchInputType } =
    useSelector((state: Types.RootState) => state.project);
  const pageData = useGetPageDataContext();
  const siteId = pageData?.siteId || 1119;
  const countLabel = useMemo(() => {
    return searchInputType === SearchInputType.PROJECT_SEARCH_INPUT
      ? "dự án"
      : "tin đăng";
  }, [searchInputType]);
  const serviceId = serviceType?.node?.system?.id ?? "";
  const suggestionAPI =
    filtersOptions[0].fields.apiSettings[0].fields.apiKeyTag.node.fields
      .itemTitle ?? "";

  const [keyword, setKeyword] = useState<string>("");
  const [onInputFocus, setOnInputFocus] = useState<boolean>(false);
  const [showSuggestionList, setShowSuggestionList] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isMobile } = useViewMode();
  const debounceInputChange = useCallback(
    debounce((value: string) => {
      dispatch(setSearchKey(value.trim()));
      dispatch(setLoadingSearchBar(false));
    }, 300),
    []
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

  const updateData = useCallback(
    (model: Models.ProjectModel) => {
      if (suggestionAPI && suggestionAPI !== "") {
        dispatch(onGetProjectsSuggestion(model, suggestionAPI) as any);
      } else {
        dispatch(
          onGetProjectsSuggestion(
            model,
            API_URL.SITE_PROJECT_SEARCH_SUGGESTION
          ) as any
        );
      }
    },
    [dispatch, suggestionAPI]
  );

  const handleOnFocus = () => {
    setOnInputFocus(true);
  };

  const handleOnBlur = useCallback(() => {
    if (!isMobile) {
      setOnInputFocus(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (keyword.length >= 2) {
      updateData({
        ...searchModels,
        siteId: siteId || 1119,
        keyword: keyword,
        method: "GET",
        serviceType: serviceId,
        apiSecretKey: apiSecretKey,
      });
      setShowSuggestionList(true);
    } else {
      dispatch(clearProjectsSuggestion());
    }
  }, [apiSecretKey, dispatch, searchKey, serviceId, siteId, updateData]);

  useEffect(() => {
    if (onInputFocus) {
      setShowSuggestionList(true);
    } else {
      setShowSuggestionList(false);
    }
  }, [onInputFocus]);

  useEffect(() => {
    setKeyword("");
    dispatch(setSearchKey(""));
  }, [dispatch, searchInputType]);
  return (
    <>
      <div className={classNames(styles.projectSearchContainer, "mb-3")}>
        <div>
          <Form.Group className={classNames(styles.searchInput)}>
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

            {Boolean(projectSuggestion?.length) &&
              keyword?.trim() &&
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
                                  key={`suggestion item - ${suggestionIdx}`}
                                  className={styles.suggestionSubitem}
                                >
                                  <LinkItem url={suggestionItem.fullKeyUrl}>
                                    {suggestionItem.text}{" "}
                                    <strong>{`(${suggestionItem.totalResult} ${countLabel})`}</strong>
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
    </>
  );
};

export default ServiceTab;
