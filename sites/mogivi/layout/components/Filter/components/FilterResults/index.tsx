import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import classNames from "classnames";
import styles from "./filter-results.module.scss";
import { useDispatch, useSelector } from "react-redux";
import useViewMode from "hooks/useViewMode";
import { debounce } from "lodash";
import {
  clearProjectsSuggestion,
  onGetProjectsSuggestion,
  SearchInputType,
  setLoadingSearchBar,
  setResultKeyword,
  setSearchInputType,
  setSearchKey,
} from "sites/mogivi/redux/search.slice";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import API_URL from "const/api-url";
import { useRouter } from "next/router";
import { TAB_VALUES } from "../FilterOption";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import ListResult from "../ListResult";
import { useGetPageDataContext } from "context/page-data.context";
import LinkItem from "components/LinkItem";

let searchModels = {
  page: 1,
  limit: 5,
  keyword: "",
  siteId: "",
};

enum ServiceType {
  BUY_SERVICE = 0,
  RENT_SERVICE = 1,
  PROJECT_SERVICE = 2,
}

interface FilterResultsProps {
  servicesSearch: IETSearchService[];
}

export const FilterResults = (props: FilterResultsProps) => {
  const { loadingSearchBar, searchKey, projectSuggestion, searchInputType } =
    useSelector((state: Types.RootState) => state.search);
  const pageData = useGetPageDataContext();
  const showSearchInput = useMemo(
    () =>
      searchInputType &&
      searchInputType === SearchInputType.PROJECT_SEARCH_INPUT,
    [searchInputType]
  );
  const [serviceType, setServiceType] = useState<number>(0);
  const { servicesSearch } = props;
  const siteId = pageData?.siteId ?? 0;

  const buyServiceId = servicesSearch[0].fields.serviceType.node.system.id;
  const rentServiceId = servicesSearch[1].fields.serviceType.node.system.id;
  const projectServiceId = servicesSearch[2].fields.serviceType.node.system.id;

  const buyApiSecretKey = servicesSearch[0].fields.apiSecretKey;
  const rentApiSecretKey = servicesSearch[1].fields.apiSecretKey;
  const projectApiSecretKey = servicesSearch[2].fields.apiSecretKey;

  const suggestionAPI = useMemo(() => {
    if (serviceType) {
      return servicesSearch[serviceType].fields.filtersOptions[0].fields
        .apiSettings[0].fields.apiKeyTag.node.fields.itemTitle;
    } else {
      return "";
    }
  }, [serviceType, servicesSearch]);

  const resultAPI = useMemo(() => {
    if (serviceType) {
      return servicesSearch[serviceType].fields.apiSearchSettings[0].fields
        .apiKeyTag.node.fields.itemTitle;
    } else {
      return "";
    }
  }, [serviceType, servicesSearch]);

  const [keyword, setKeyword] = useState<string>("");
  const [parentsUrl, setParentsUrl] = useState<string>("");
  const [onInputFocus, setOnInputFocus] = useState<boolean>(false);
  const [showSuggestionList, setShowSuggestionList] = useState<boolean>(false);
  const [serviceId, setServiceId] = useState("");
  const [apiSecretKey, setApiSecretKey] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { isMobile, isMobileApp } = useViewMode();
  // const [showSort, setShowSort] = useState(false);
  // const [sort, setSort] = useState("asc");
  // const [conditionSort, setConditionSort] = useState("Mặc định");

  // const handleClick = (event: any) => {
  //   setShowSort(!showSort);
  // };

  // const onClickSortMode = (action: string) => {
  //   setSort(action);
  // };

  // const onClickConditionSort = (action: string) => {
  //   setConditionSort(action);
  // };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleResultKeyword = useCallback(
    (keyword: string) => {
      dispatch(setResultKeyword(keyword));
      setShowSuggestionList(false);
    },
    [dispatch]
  );

  const updateData = useCallback(
    (model: Models.ProjectModel) => {
      if (suggestionAPI) {
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
    [dispatch]
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
        siteId: siteId,
        keyword: searchKey,
        method: "GET",
        serviceType: serviceId,
        apiSecretKey: apiSecretKey,
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

  useEffect(() => {
    setKeyword("");
    dispatch(setSearchKey(""));
  }, [dispatch]);

  useEffect(() => {
    if (router && router.asPath) {
      const urlSegment = router.asPath.split("/");
      setParentsUrl(urlSegment[1] + "/" + urlSegment[2]);
    }
  }, [router]);

  useEffect(() => {
    if (router.asPath.includes(TAB_VALUES.BuyHouse)) {
      dispatch(setSearchInputType(SearchInputType.BUY_SEARCH_INPUT));
      setServiceType(ServiceType.BUY_SERVICE);
      setServiceId(buyServiceId);
      setApiSecretKey(buyApiSecretKey);
    } else if (router.asPath.includes(TAB_VALUES.RentHouse)) {
      dispatch(setSearchInputType(SearchInputType.RENT_SEARCH_INPUT));
      setServiceType(ServiceType.RENT_SERVICE);
      setApiSecretKey(rentApiSecretKey);
      setServiceId(rentServiceId);
    } else if (router.asPath.includes(TAB_VALUES.Project)) {
      dispatch(setSearchInputType(SearchInputType.PROJECT_SEARCH_INPUT));
      setServiceType(ServiceType.PROJECT_SERVICE);
      setApiSecretKey(projectApiSecretKey);
      setServiceId(projectServiceId);
    }
  }, [dispatch, router.asPath]);

  return (
    <>
      {showSearchInput && (
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
              {/* {tagList && !isMobile && (
                      <div className={styles.recentlySearchTag}>
                        <ul className={styles.recentlySearchTagBox}>
                          {tagList.slice(0, 3)?.map(
                            (tagItem: any, idx) =>
                              tagItem.name !== "" &&
                              tagItem.url !== "" && (
                                <li key={idx}>
                                  <Link href={tagItem.url}>
                                    <a>{tagItem.name}</a>
                                  </Link>
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    )} */}
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
                                (
                                  suggestionItem: any,
                                  suggestionIdx: number
                                ) => (
                                  <li
                                    onClick={() =>
                                      handleResultKeyword(
                                        suggestionItem.fullKeyUrl
                                      )
                                    }
                                    key={`suggestion item - ${suggestionIdx}`}
                                    className={styles.suggestionSubitem}
                                  >
                                    <LinkItem url={suggestionItem.fullKeyUrl}>
                                      {suggestionItem.text}{" "}
                                      <strong>{`(${suggestionItem.totalResult} dự án)`}</strong>
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
      )}
      <div className={styles.filterResultContainer}>
        {/* <div className={styles.header}>
          <div className={styles.quantity}>Hiển thị 16 kết quả</div>

          <div className="d-flex align-items-center">
            <div className={styles.sortName}>Sắp xếp:</div>
            <div className={styles.mainSort}>
              <div onClick={handleClick} className="d-flex align-items-center">
                <span className={styles.titleSort}>{conditionSort}</span>
                <Image src={icCaretDown} alt="caret down" />
              </div>

              {showSort && (
                <div className={styles.popover}>
                  <div className="d-flex align-items-center">
                    <div
                      className={classNames(styles.popoverHeader, sort === "asc" && styles.activeSort)}
                      onClick={() => onClickSortMode("asc")}
                    >
                      Tăng dần
                    </div>
                    <div
                      className={classNames(styles.popoverHeader, sort === "desc" && styles.activeSort)}
                      onClick={() => onClickSortMode("desc")}
                    >
                      Giảm dần
                    </div>
                  </div>

                  <div className={styles.filterOption}>
                    <div
                      className={classNames(styles.itemContent, conditionSort === "Mặc định" && styles.activeContent)}
                      onClick={() => onClickConditionSort("Mặc định")}
                    >
                      Mặc định
                      {conditionSort === "Mặc định" && <Image src={icCompleted} alt="completed" />}
                    </div>
                    <div
                      className={classNames(
                        styles.itemContent,
                        conditionSort === "Giá cả (m2)" && styles.activeContent
                      )}
                      onClick={() => onClickConditionSort("Giá cả (m2)")}
                    >
                      <span>Giá cả (m2)</span>
                      {conditionSort === "Giá cả (m2)" && <Image src={icCompleted} alt="completed" />}
                    </div>
                    <div
                      className={classNames(styles.itemContent, conditionSort === "Diện tích" && styles.activeContent)}
                      onClick={() => onClickConditionSort("Diện tích")}
                    >
                      Diện tích
                      {conditionSort === "Diện tích" && <Image src={icCompleted} alt="completed" />}
                    </div>
                    <div
                      className={classNames(
                        styles.itemContent,
                        conditionSort === "Số phòng ngủ" && styles.activeContent
                      )}
                      onClick={() => onClickConditionSort("Số phòng ngủ")}
                    >
                      Số phòng ngủ
                      {conditionSort === "Số phòng ngủ" && <Image src={icCompleted} alt="completed" />}
                    </div>
                    <div
                      className={classNames(
                        styles.itemContent,
                        conditionSort === "Số phòng tắm" && styles.activeContent
                      )}
                      onClick={() => onClickConditionSort("Số phòng tắm")}
                    >
                      Số phòng tắm
                      {conditionSort === "Số phòng tắm" && <Image src={icCompleted} alt="completed" />}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div> */}

        <ListResult
          resultApi={resultAPI}
          apiSecretKey={apiSecretKey}
          serviceSearch={servicesSearch}
          serviceId={serviceId}
        />
      </div>
    </>
  );
};

export default FilterResults;
