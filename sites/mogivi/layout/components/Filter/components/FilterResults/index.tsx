import React from "react";
import { Form } from "react-bootstrap";
import classNames from "classnames";
import styles from "./filter-results.module.scss";

import SvgIcon from "sites/mogivi/components/SvgIcon";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import ListResult from "../ListResult";
import { useSearchSuggestion } from "sites/mogivi/hooks/useSearchSuggestion";
import SuggestionList from "../SuggestionList";

interface FilterResultsProps {
  servicesSearch: IETSearchService[];
}

export const FilterResults = (props: FilterResultsProps) => {
  const { servicesSearch } = props;
  const {
    onBlur,
    onFocus,
    onInputSearchKeyword,
    keyword,
    loadingSearchBar,
    projectSuggestion,
    isShowSuggestion,
    resultAPI,
    tabSlug,
    serviceConfig,
    slug,
  } = useSearchSuggestion({ servicesSearch });

  return (
    <>
      <div
        className={classNames(
          styles.projectSearchContainer,
          "mb-3 desktopVisible"
        )}
      >
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
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={(e) => onInputSearchKeyword(e)}
            />
            <SuggestionList
              projectSuggestion={projectSuggestion}
              onFocus={onFocus}
              isShowSuggestion={isShowSuggestion}
              onBlur={onBlur}
              tabSlug={tabSlug}
              slug={slug}
            />
          </Form.Group>
        </div>
      </div>
      <div className={styles.filterResultContainer}>
        <ListResult
          resultApi={resultAPI}
          apiSecretKey={serviceConfig.apiSecretKey}
          serviceSearch={servicesSearch}
          serviceId={serviceConfig.serviceId}
        />
      </div>
    </>
  );
};

export default FilterResults;
