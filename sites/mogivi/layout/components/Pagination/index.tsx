import { START_PAGE_INDEX } from "const/config";
import { usePagination } from "hooks/usePagination";
import useViewMode from "hooks/useViewMode";
import React from "react";
import Pagination from "react-bootstrap/Pagination";
import styles from "./styles.module.scss";

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

  const paginationRange = usePagination({
    currentPage: currentNumber,
    pageSize,
    siblingCount,
    totalPages: totalPages,
  });

  if (+currentNumber === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  return (
    <div className={styles.paginationContainer}>
      {baseUrl && baseUrl !== "" ? (
        <Pagination>
          <Pagination.Prev
            disabled={+currentNumber === START_PAGE_INDEX}
            href={
              isMobileApp
                ? `${baseUrl}/page-${+currentNumber - 1}?ViewMobileApp=1`
                : `${baseUrl}/page-${+currentNumber - 1}`
            }
          />
          {paginationRange?.map((pageNumber, idx) => {
            if (pageNumber === "...") {
              return <Pagination.Item key={idx}>{"..."}</Pagination.Item>;
            }
            return (
              <Pagination.Item
                key={idx}
                active={+pageNumber === +currentNumber}
                href={
                  isMobileApp
                    ? `${baseUrl}/page-${pageNumber}?ViewMobileApp=1`
                    : `${baseUrl}/page-${pageNumber}`
                }
              >
                {pageNumber}
              </Pagination.Item>
            );
          })}
          <Pagination.Next
            disabled={+currentNumber === lastPage}
            href={
              isMobileApp
                ? `${baseUrl}/page-${+currentNumber + 1}?ViewMobileApp=1`
                : `${baseUrl}/page-${+currentNumber + 1}`
            }
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
