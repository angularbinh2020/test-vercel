import classNames from "classnames";
import LinkItem from "components/LinkItem";
import { START_PAGE_INDEX } from "const/config";
import { useGetPageDataContext } from "context/page-data.context";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorBlock } from "sites/mogivi/layout/components/ErrorBlock";
import { PaginationBlock } from "sites/mogivi/layout/components/Pagination";
import { ProjectModel } from "sites/mogivi/models/apis";
import { IProjectsAPI } from "sites/mogivi/models/blocks/IProjectsAPI";
import {
  onGetAllInvestor,
  setResultKeyword,
} from "sites/mogivi/redux/investor.slice";
import { RootState } from "store";
import BannerSearchBlock from "../BannerSearchBlock";
import styles from "./styles.module.scss";
import LoadingPlaceholder from "./components/LoadingPlaceholder";

let projectModel: ProjectModel = {
  page: 1,
  limit: 10,
  keyword: "",
  siteId: "",
};

interface ListArticlesProps {
  block: IProjectsAPI;
}

const ListArticlesBlock = (props: ListArticlesProps) => {
  const { settingAPI } = props.block.fields;
  const { allInvestors, totalPages, loading, isError } = useSelector(
    (state: RootState) => state.investor
  );
  const pageData = useGetPageDataContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentNumber, setCurrentNumber] = useState(START_PAGE_INDEX);
  const pathName = pageData?.currentNode?.fields?.umbracoUrlAlias ?? "";

  const { baseApi, pageIndex, limit, defaultKeyword, method, siteId } =
    useMemo(() => {
      let baseApi = "";
      let pageIndex = 1;
      let limit = 10;
      let defaultKeyword = "";
      let method = "get";
      let siteId: any = 0;
      if (pageData) {
        const defaultCMSKey =
          pageData.currentNode.fields?.defaultFilterLocation?.node.system
            ?.urlSegment;
        defaultKeyword = defaultCMSKey;
        siteId = pageData?.siteId;
      }
      if (settingAPI?.length) {
        baseApi = settingAPI[0].fields.aPIKeyTag?.node.fields.itemTitle;
        pageIndex = settingAPI[0].fields.parameters[0].fields.value;
        limit = settingAPI[0].fields.parameters[1].fields.value;
        method = settingAPI[0].fields.aPIKeyTag?.method?.toLowerCase() || "get";
      }

      return { baseApi, pageIndex, limit, defaultKeyword, method, siteId };
    }, [pageData, settingAPI]);

  projectModel = {
    page: pageIndex,
    limit: limit,
    keyword: defaultKeyword,
    siteId: siteId,
    method: method,
  };

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const { urlKeyword, urlPageNumber, baseUrl } = useMemo(() => {
    let urlKeyword = "";
    let urlPageNumber = String(currentNumber);
    const asPath = router.asPath;
    let baseUrl = asPath.split("/page-")[0];
    if (asPath.includes("?ViewMobileApp=1")) {
      baseUrl = baseUrl.replace("?ViewMobileApp=1", "");
    }
    const slug = router.query.slug;
    const asPathGroup = asPath.split("/");
    const urlParameter = asPathGroup[asPathGroup.length - 1];

    if (slug && slug?.length < 2) {
      asPathGroup.slice(1).forEach((pathItem) => {
        if (pathItem.includes("page")) {
          if (pathItem.includes("?ViewMobileApp")) {
            const page = urlParameter.replace("?ViewMobileApp=1", "");
            urlPageNumber = page.replace("page-", "");
          } else {
            urlPageNumber = urlParameter.replace("page-", "");
          }
        } else {
          urlPageNumber = String(START_PAGE_INDEX);
          if (
            !pathItem.includes(pathName) &&
            !pathItem.includes("?ViewMobileApp")
          ) {
            urlKeyword = pathItem;
          } else if (
            pathItem.includes("?ViewMobileApp") &&
            !pathItem.includes(pathName)
          ) {
            urlKeyword = pathItem.replace("?ViewMobileApp=1", "");
          }
        }
      });
    }

    return { urlKeyword, urlPageNumber, baseUrl };
  }, [currentNumber, pathName, router.asPath, router.query.slug]);

  const handleOnInvestorClick = useCallback(
    (keyword: string) => {
      dispatch(setResultKeyword(keyword));
    },
    [dispatch]
  );

  const getResult = useCallback(
    (pageNumber: number, keyword: string) => {
      setCurrentNumber(pageNumber);
      dispatch(
        onGetAllInvestor(
          { ...projectModel, page: pageNumber, keyword: keyword },
          baseApi
        ) as any
      );
      backToTop();
    },
    [dispatch]
  );

  useEffect(() => {
    getResult(+urlPageNumber, urlKeyword);
    setCurrentNumber(+urlPageNumber);
  }, [getResult, urlKeyword, urlPageNumber]);

  return (
    <div className={"container"}>
      <BannerSearchBlock {...props} />
      <div className={styles.listArticlesContainer}>
        <ul className={styles.listBox}>
          {allInvestors?.map((item: any, idx: number) => (
            <li
              onClick={() => handleOnInvestorClick(item.keyword)}
              key={idx}
              className={classNames("row", styles.articleItem)}
            >
              <div
                className={classNames("col-md-4 col-lg-4", styles.articleLeft)}
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
                className={classNames("col-md-8 col-lg-8, styles.articleRight")}
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
                      <li className={styles.viewMore}>
                        <LinkItem url={item.pageURL}>... Xem thêm</LinkItem>
                      </li>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
          {loading && <LoadingPlaceholder pageSize={projectModel.limit} />}
          {isError && allInvestors && <ErrorBlock />}
        </ul>
        {Boolean(allInvestors?.length) && (
          <PaginationBlock
            baseUrl={baseUrl}
            currentNumber={+urlPageNumber}
            totalPages={totalPages}
            pageSize={projectModel.limit}
          />
        )}
      </div>
    </div>
  );
};

export default ListArticlesBlock;
