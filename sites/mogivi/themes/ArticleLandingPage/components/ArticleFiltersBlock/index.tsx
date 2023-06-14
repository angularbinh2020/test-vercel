import axios from "axios";
import classNames from "classnames";
import LinkItem from "components/LinkItem";
import API_URL from "const/api-url";
import { START_PAGE_INDEX } from "const/config";
import { useGetPageDataContext } from "context/page-data.context";
import { get } from "lodash";
import Image from "next/legacy/image";
import React, { useCallback, useEffect, useState } from "react";
import { ArticleItem } from "sites/mogivi/layout/components/ArticleItem";
import { IArticleItem } from "sites/mogivi/models/blocks/IArticleItem";
import { IDocumentsFiltersBlock } from "sites/mogivi/models/blocks/IDocumentsFiltersBlock";
import { IETValuesFilterTagsItem } from "sites/mogivi/models/IETFilterTags";
import FilterOption from "../../../../layout/components/FitlerOption";
import styles from "./styles.module.scss";

interface ArticleFiltersProps {
  block: IDocumentsFiltersBlock;
}

const ArticleFiltersBlock = (props: ArticleFiltersProps) => {
  // const pageData = useGetPageDataContext();
  // const { filterResult } = useSelector((state: RootState) => state.documents);
  // const siteId = pageData?.siteId ?? 0;
  const { filtersOptions, apiSearchSettings } = props.block.fields;
  const intitFilterOptions = filtersOptions;
  const [filterOptions, setFilterOptions] = useState(intitFilterOptions);
  const [articleList, setArticleList] = useState<IArticleItem[]>([]);
  const [currPage, setCurrPage] = useState(START_PAGE_INDEX); // storing current page number
  const [isLastList, setIsLastList] = useState(false);

  const getResult = useCallback(
    async (pageIndex: number) => {
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
        `https://dev-multisite-cms-backend.euwest01.umbraco.io/api/listing/1489?`
      );

      const apiRequest = apiUrl + requestParams.toString();

      const response = await axios.get(apiRequest);

      if (!response.data.items.length) {
        setIsLastList(true);
        return;
      }

      setArticleList([...articleList, ...response.data.items]);
    },
    [apiSearchSettings, articleList, filterOptions]
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

  // const onScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;

  //     if (scrollTop + clientHeight === scrollHeight) {
  //       setCurrPage(currPage + 1);
  //     }
  //   }
  // };

  const handleLoadMore = () => {
    setCurrPage(currPage + 1);
  };

  useEffect(() => {
    getResult(currPage);
  }, [currPage, filterOptions]);

  return (
    <div className={styles.downloadDocContainer}>
      <div className="container py-3 py-lg-5">
        {articleList?.length && (
          <div className={styles.highlightArticle}>
            {articleList[0].image && (
              <div className={styles.highlightArticleImage}>
                <picture>
                  <img
                    src={articleList[0].image.fields?.umbracoFile}
                    alt={articleList[0].image.system.name}
                  />
                </picture>
              </div>
            )}
            <div className={styles.content}>
              {articleList[0].title && <h2>{articleList[0].title}</h2>}
              {articleList[0].url && (
                <LinkItem url={articleList[0].url}>
                  <div className={styles.btnReadMore}>
                    <button className="btn-outline">Xem thêm</button>
                  </div>
                </LinkItem>
              )}
            </div>
          </div>
        )}
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
          <div className={styles.articleItemContainer}>
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-8 p-0">
                  {/* @ts-ignore */}
                  <div className={styles.articleWrapper}>
                    {articleList.slice(1).map((item, idx: number) => (
                      <ArticleItem key={idx} item={item} />
                    ))}
                  </div>
                  {!isLastList && (
                    <div className={styles.loadMoreBtn}>
                      <button
                        onClick={handleLoadMore}
                        className={classNames("btn-outline")}
                      >
                        Xem thêm
                      </button>
                    </div>
                  )}
                </div>
                <div
                  className={classNames(
                    "col-sm-12 col-md-12 col-lg-4",
                    styles.articleRelatedContainer
                  )}
                >
                  <div className={styles.articleRelatedWrapper}>
                    <h4>Tin tức liên quan</h4>
                    <div className={styles.articleRelatedWrap}>
                      <LinkItem url="#">
                        <div className={styles.articleRelatedItem}>
                          <div className={styles.articleRelatedImage}>
                            <Image
                              src="https://cms.wallmarttech.com/media/blqcafba/phoi-canh-the-green-village.webp"
                              width={300}
                              height={300}
                              objectFit="cover"
                              alt="article-image"
                            />
                          </div>
                          <div className={styles.articleRelatedContent}>
                            <h3>How To Market Your Event</h3>
                            <small>Jan 17, 2023 · 1 min read</small>
                          </div>
                        </div>
                      </LinkItem>
                      <LinkItem url="#">
                        <div className={styles.articleRelatedItem}>
                          <div className={styles.articleRelatedImage}>
                            <Image
                              src="https://cms.wallmarttech.com/media/blqcafba/phoi-canh-the-green-village.webp"
                              width={300}
                              height={300}
                              objectFit="cover"
                              alt="article-image"
                            />
                          </div>
                          <div className={styles.articleRelatedContent}>
                            <h3>How To Market Your Event</h3>
                            <small>Jan 17, 2023 · 1 min read</small>
                          </div>
                        </div>
                      </LinkItem>
                      <LinkItem url="#">
                        <div className={styles.articleRelatedItem}>
                          <div className={styles.articleRelatedImage}>
                            <Image
                              src="https://cms.wallmarttech.com/media/blqcafba/phoi-canh-the-green-village.webp"
                              width={300}
                              height={300}
                              objectFit="cover"
                              alt="article-image"
                            />
                          </div>
                          <div className={styles.articleRelatedContent}>
                            <h3>How To Market Your Event</h3>
                            <small>Jan 17, 2023 · 1 min read</small>
                          </div>
                        </div>
                      </LinkItem>
                      <LinkItem url="#">
                        <div className={styles.articleRelatedItem}>
                          <div className={styles.articleRelatedImage}>
                            <Image
                              src="https://cms.wallmarttech.com/media/blqcafba/phoi-canh-the-green-village.webp"
                              width={300}
                              height={300}
                              objectFit="cover"
                              alt="article-image"
                            />
                          </div>
                          <div className={styles.articleRelatedContent}>
                            <h3>How To Market Your Event</h3>
                            <small>Jan 17, 2023 · 1 min read</small>
                          </div>
                        </div>
                      </LinkItem>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <ArticleList items={} /> */}
          {/* {resultsList && resultsList?.length !== 0 ? (
            resultsList.map((downloadItem: IDocumentItem, idx: number) => <DocumentItem key={idx} {...downloadItem} />)
          ) : (
            <h4>Không có tài liệu nào được tìm thấy</h4>
          )} */}
          {/* <PaginationBlock
            currentNumber={currentNumber}
            pageSize={resultsPerPage}
            totalPages={totalPages}
            nextPrevHandler={nextPrevHandler}
            getResult={getResult}
          /> */}
        </div>
        {/* <div className={styles.sectionGap}>
          <ListProjectBlock />
        </div> */}
      </div>
    </div>
  );
};

export default ArticleFiltersBlock;
