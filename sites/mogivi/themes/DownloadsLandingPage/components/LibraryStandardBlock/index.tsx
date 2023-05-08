import API_URL from "const/api-url";
import { START_PAGE_INDEX } from "const/config";
import { useGetPageDataContext } from "context/page-data.context";
import { get } from "lodash";
import Router, { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DocumentItem } from "sites/mogivi/layout/components/DownloadItem";
import { PaginationBlock } from "sites/mogivi/layout/components/Pagination";
import { IDocumentsFiltersBlock } from "sites/mogivi/models/blocks/IDocumentsFiltersBlock";
import { IDocumentItem } from "sites/mogivi/models/IDocumentItem";
import { IETValuesFilterTagsItem } from "sites/mogivi/models/IETFilterTags";
import { onGetFilterResult } from "sites/mogivi/redux/documents.slice";
import { RootState } from "store";
import { BannerSubscribeEmailBlock } from "../BannerSubscribeEmail";
import FilterOption from "../../../../layout/components/FitlerOption";
import styles from "./styles.module.scss";

interface LibraryStandardBlockProps {
  block: IDocumentsFiltersBlock;
}

export const LibraryStandardBlock = (props: LibraryStandardBlockProps) => {
  const pageData = useGetPageDataContext();
  const { filterResult } = useSelector((state: RootState) => state.documents);
  const siteId = pageData?.siteId ?? 0;
  const { filtersOptions, resultsPerPage, apiSearchSettings } =
    props.block.fields;
  const intitFilterOptions = filtersOptions;
  const dispatch = useDispatch();
  const [filterOptions, setFilterOptions] = useState(intitFilterOptions);
  const [currentNumber, setCurrentNumber] = useState(START_PAGE_INDEX);
  const resultsList = filterResult.items;
  const totalPages = filterResult?.pagination?.pageCount;

  const getResult = useCallback(
    (pageIndex: number) => {
      setCurrentNumber(pageIndex);
      const requestParams = new URLSearchParams();
      requestParams.set("page", String(pageIndex));
      filterOptions.forEach((option) => {
        const parameter = option.fields.parameter;
        if (parameter) {
          if (option.filterOptions?.system.id) {
            requestParams.set(
              parameter,
              String(option.filterOptions?.system.id)
            );
          } else {
            requestParams.set(parameter, "");
          }
        }
      });

      const apiUrl = get(
        apiSearchSettings,
        "[0].fields.apiKeyTag.node.fields.itemTitle",
        ""
      );
      const model: Models.DocumentModel = {
        apiUrl: apiUrl,
        requestParam: requestParams.toString(),
        siteId: siteId,
      };
      dispatch(onGetFilterResult(model) as any);
    },
    [dispatch, filterOptions, siteId]
  );

  const handleChangeFilterOptions = useCallback(
    (newOptions: IETValuesFilterTagsItem) => {
      const newFilterOptions = filterOptions.map((options) => {
        if (newOptions.system.id === options.system.id) return newOptions;
        return options;
      });
      setFilterOptions(newFilterOptions);
    },
    [filterOptions]
  );

  const nextPrevHandler = (btnType: string) => {
    if (btnType === "next") {
      if (currentNumber !== filterResult.pagination.endPage) {
        let newNumber = currentNumber + 1;
        if (newNumber <= totalPages) {
          getResult(newNumber);
        }
      }
    } else if (
      currentNumber &&
      currentNumber !== filterResult.pagination.startPage
    ) {
      let newNumber = currentNumber - 1;
      getResult(newNumber);
    }
  };

  useEffect(() => {
    getResult(START_PAGE_INDEX);
  }, [filterOptions, getResult]);

  return (
    <div className={styles.downloadDocContainer}>
      <div className="container py-3 py-lg-5">
        <div className={styles.filterContainer}>
          {Boolean(filterOptions.length) &&
            filterOptions.map((options, idx) => (
              <FilterOption
                key={idx}
                filterItem={options}
                handleChangeFilterOptions={handleChangeFilterOptions}
              />
            ))}
        </div>
        <div className="mt-5">
          {resultsList && resultsList?.length !== 0 ? (
            resultsList.map((downloadItem: IDocumentItem, idx: number) => (
              <DocumentItem key={idx} {...downloadItem} />
            ))
          ) : (
            <h4>Không có tài liệu nào được tìm thấy</h4>
          )}
          <PaginationBlock
            currentNumber={currentNumber}
            pageSize={resultsPerPage}
            totalPages={totalPages}
            nextPrevHandler={nextPrevHandler}
            getResult={getResult}
          />
        </div>
        {/* <div className={styles.sectionGap}>
          <ListProjectBlock />
        </div> */}
      </div>
      <div className="banner-subscribe-email">
        <BannerSubscribeEmailBlock />
      </div>
    </div>
  );
};
