import classNames from "classnames";
import LinkItem from "components/LinkItem";
import Image from "next/legacy/image";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ErrorBlock } from "sites/mogivi/layout/components/ErrorBlock";
import { PaginationBlock } from "sites/mogivi/layout/components/Pagination";
import { IProjectsAPI } from "sites/mogivi/models/blocks/IProjectsAPI";
import { setResultKeyword } from "sites/mogivi/redux/investor.slice";
import BannerSearchBlock from "../BannerSearchBlock";
import styles from "./styles.module.scss";
import { useGetSearchPageResult } from "hooks/useGetSearchPageResult";
import LoadingPlaceholder from "./components/LoadingPlaceholder";

interface ListArticlesProps {
  block: IProjectsAPI;
}

const ListArticlesBlock = (props: ListArticlesProps) => {
  const { settingAPI } = props.block.fields;
  const {
    items,
    pageIndex,
    totalPages,
    pageSize,
    isLoading,
    isError,
    baseUrl,
  } = useGetSearchPageResult(settingAPI);
  const dispatch = useDispatch();
  const handleOnInvestorClick = useCallback(
    (keyword: string) => {
      dispatch(setResultKeyword(keyword));
    },
    [dispatch]
  );

  return (
    <div className={"container"}>
      <BannerSearchBlock {...props} />
      <div className={styles.listArticlesContainer}>
        <ul className={styles.listBox}>
          {isLoading && <LoadingPlaceholder pageSize={pageSize} />}
          {!isLoading &&
            items?.map((item: any, idx: number) => (
              <li
                onClick={() => handleOnInvestorClick(item.keyword)}
                key={idx}
                className={classNames("row", styles.articleItem)}
              >
                <div
                  className={classNames(
                    "col-md-4 col-lg-4",
                    styles.articleLeft
                  )}
                >
                  <LinkItem url={item.pageURL}>
                    {item.logo && (
                      <Image
                        src={item.logo.logoUrl}
                        width={320}
                        height={260}
                        alt={item.logo.description}
                        title={item.logo.description}
                        objectFit="contain"
                      />
                    )}
                  </LinkItem>
                </div>
                <div
                  className={classNames(
                    "col-md-8 col-lg-8, styles.articleRight"
                  )}
                >
                  <div className={styles.mainContent}>
                    <h1 className={styles.articleTitle}>
                      <LinkItem url={item.pageURL}>{item.name}</LinkItem>
                    </h1>
                    <p className={styles.fullName}>{item.logo.description}</p>
                    <div className={styles.articleDescription}>
                      <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{
                          __html: item.shortDescription,
                        }}
                      ></div>{" "}
                      <LinkItem url={item.pageURL}>Xem thêm</LinkItem>
                    </div>
                    <div className={styles.listProjects}>
                      {item.projects
                        ?.slice(0, 4)
                        ?.map((project: any, projectIdx: number) => (
                          <div key={projectIdx} className={styles.projects}>
                            <LinkItem url={project.pageURL}>
                              {project.name}
                            </LinkItem>
                          </div>
                        ))}
                      {item.projects?.length > 4 && (
                        <div className={styles.viewMore}>
                          <LinkItem url={item.pageURL}>... Xem thêm</LinkItem>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          {!isLoading && isError && <ErrorBlock />}
        </ul>
        {Boolean(totalPages) && (
          <PaginationBlock
            baseUrl={baseUrl}
            currentNumber={pageIndex}
            totalPages={totalPages}
            pageSize={pageSize}
          />
        )}
      </div>
    </div>
  );
};

export default ListArticlesBlock;
