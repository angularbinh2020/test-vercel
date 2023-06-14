import { START_PAGE_INDEX } from "const/config";
import { usePagination } from "hooks/usePagination";
import useViewMode from "hooks/useViewMode";
import React, { useCallback } from "react";
import Pagination from "react-bootstrap/Pagination";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface IPaginationBlock {
  currentNumber: number;
  totalPages: number;
  pageSize: number;
  baseUrl?: string;
  getResult?: Function;
  nextPrevHandler?: Function;
}

export const PaginationBlock = (props: IPaginationBlock) => {
  const {
    currentNumber,
    pageSize,
    baseUrl,
    totalPages,
    getResult,
    nextPrevHandler,
  } = props;
  const siblingCount = 1;
  const lastPage = totalPages;
  const { isMobileApp } = useViewMode();
  const router = useRouter();
  const paginationRange = usePagination({
    currentPage: currentNumber,
    pageSize,
    siblingCount,
    totalPages: totalPages,
  });

  const getPageFullUrl = useCallback(
    (pageIndex: any) => {
      return isMobileApp
        ? `${baseUrl}/page-${pageIndex}?ViewMobileApp=1`
        : `${baseUrl}/page-${pageIndex}`;
    },
    [isMobileApp]
  );

  const goToPage = useCallback(
    (pageIndex: any, e: any) => {
      e.preventDefault();
      e.stopPropagation();
      const navigateUrl = getPageFullUrl(pageIndex);
      router.push(navigateUrl);
    },
    [getPageFullUrl]
  );
  if (+currentNumber === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  return (
    <div className={styles.paginationContainer}>
      {baseUrl && baseUrl !== "" ? (
        <Pagination>
          <Pagination.Prev
            disabled={+currentNumber === START_PAGE_INDEX}
            href={getPageFullUrl(+currentNumber - 1)}
            onClick={(e) => goToPage(+currentNumber - 1, e)}
          />
          {paginationRange?.map((pageNumber, idx) => {
            if (pageNumber === "...") {
              return <Pagination.Item key={idx}>{"..."}</Pagination.Item>;
            }
            return (
              <Pagination.Item
                key={idx}
                active={+pageNumber === +currentNumber}
                href={getPageFullUrl(pageNumber)}
                onClick={(e) => goToPage(pageNumber, e)}
              >
                {pageNumber}
              </Pagination.Item>
            );
          })}
          <Pagination.Next
            disabled={+currentNumber === lastPage}
            href={getPageFullUrl(+currentNumber + 1)}
            onClick={(e) => goToPage(+currentNumber + 1, e)}
          />
        </Pagination>
      ) : (
        nextPrevHandler &&
        getResult && (
          <Pagination>
            <Pagination.Prev
              disabled={+currentNumber === START_PAGE_INDEX}
              onClick={() => nextPrevHandler("prev")}
            />
            {paginationRange?.map((pageNumber, idx) => {
              if (pageNumber === "...") {
                return <Pagination.Item key={idx}>{"..."}</Pagination.Item>;
              }
              return (
                <Pagination.Item
                  key={idx}
                  active={+pageNumber === +currentNumber}
                  onClick={() => getResult(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              disabled={+currentNumber === lastPage}
              onClick={() => nextPrevHandler("next")}
            />
          </Pagination>
        )
      )}
    </div>
  );
};
