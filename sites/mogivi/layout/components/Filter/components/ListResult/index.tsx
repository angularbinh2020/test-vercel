import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./list-project.module.scss";
import classNames from "classnames";
import { PaginationBlock } from "sites/mogivi/layout/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { ProjectModel } from "sites/mogivi/models/apis";
import {
  onGetAllProjects,
  useSetProjectListResultState,
} from "sites/mogivi/redux/project.slice";
import { START_PAGE_INDEX } from "const/config";
import { Card } from "react-bootstrap";
import { useRouter } from "next/router";
import useViewMode from "hooks/useViewMode";
import { ErrorBlock } from "sites/mogivi/layout/components/ErrorBlock";
import LinkItem from "components/LinkItem";
import icLocation from "sites/mogivi/assets/icons/ic-location.svg";
import API_URL from "const/api-url";
import { TAB_VALUES } from "../FilterOption";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import { useGetPageDataContext } from "context/page-data.context";

let projectModel: ProjectModel = {
  page: 1,
  limit: 10,
  keyword: "",
  siteId: "",
};

interface ProjectModelProps {
  serviceSearch: IETSearchService[];
  serviceId: string;
  apiSecretKey: string;
  resultApi: string;
}

const ListResult = (props: ProjectModelProps) => {
  const { allProjects, totalPages, isError, loading } = useSelector(
    (state: RootState) => state.project
  );
  const pageData = useGetPageDataContext();
  const { serviceId, apiSecretKey, resultApi } = props;
  const [currentNumber, setCurrentNumber] = useState(START_PAGE_INDEX);
  const { isMobileApp } = useViewMode();
  const dispatch = useDispatch();
  const router = useRouter();
  const { onError } = useSetProjectListResultState();
  const { baseApi, pageIndex, limit, defaultKeyword, method, siteId } =
    useMemo(() => {
      let baseApi = API_URL.SITE_PROJECT_SEARCH_RESULT;
      let pageIndex = 1;
      let limit = 10;
      let defaultKeyword = "";
      let method = "get";
      let siteId: any = 0;
      if (pageData) {
        const defaultCMSKey =
          pageData.currentNode?.fields?.defaultFilterLocation?.node.system
            ?.urlSegment;
        if (defaultCMSKey && defaultCMSKey !== "") {
          defaultKeyword = defaultCMSKey;
        }
        siteId = pageData.siteId;
      }
      if (resultApi && resultApi !== "") {
        baseApi = resultApi;
      }

      return { baseApi, pageIndex, limit, defaultKeyword, method, siteId };
    }, [pageData, resultApi]);

  const { urlKeyword, urlPageNumber, baseUrl } = useMemo(() => {
    let urlKeyword = defaultKeyword;
    let urlPageNumber = String(currentNumber);
    const asPath = router.asPath;
    let baseUrl = asPath.split("/page-")[0];
    if (asPath.includes("?ViewMobileApp=1")) {
      baseUrl = baseUrl.replace("?ViewMobileApp=1", "");
    }
    const slug = router.query.slug;
    const asPathGroup = asPath.split("/");

    if (slug && slug?.length < 2) {
      asPathGroup.slice(1).forEach((pathItem) => {
        if (slug && pathItem !== slug[0]) {
          if (pathItem.includes("page")) {
            if (isMobileApp) {
              const page = pathItem.replace("?ViewMobileApp=1", "");
              urlPageNumber = page.replace("page-", "");
            } else {
              urlPageNumber = pathItem.replace("page-", "");
            }
          } else {
            urlPageNumber = String(START_PAGE_INDEX);
            if (
              pathItem !== TAB_VALUES.BuyHouse &&
              pathItem !== TAB_VALUES.RentHouse &&
              pathItem !== TAB_VALUES.Project
            ) {
              urlKeyword = pathItem;
            }
            if (isMobileApp) {
              urlKeyword = pathItem.replace("?ViewMobileApp=1", "");
            }
          }
        }
      });
    } else {
      asPathGroup.slice(1).forEach((pathItem) => {
        if (slug && pathItem !== slug[0] && pathItem !== slug[1]) {
          if (pathItem.includes("page")) {
            if (isMobileApp) {
              const page = pathItem.replace("?ViewMobileApp=1", "");
              urlPageNumber = page.replace("page-", "");
            } else {
              urlPageNumber = pathItem.replace("page-", "");
            }
          } else {
            urlPageNumber = String(START_PAGE_INDEX);
            urlKeyword = pathItem;
            if (isMobileApp) {
              urlKeyword = pathItem.replace("?ViewMobileApp=1", "");
            }
          }
        }
      });
    }

    return { urlKeyword, urlPageNumber, baseUrl };
  }, [currentNumber, isMobileApp, router.asPath, router.query.slug]);

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

  const getResult = useCallback(
    (pageNumber: number, keyword: string) => {
      setCurrentNumber(pageNumber);
      backToTop();
      if (serviceId && apiSecretKey) {
        dispatch(
          onGetAllProjects(
            {
              ...projectModel,
              serviceType: serviceId,
              page: pageNumber,
              keyword: keyword,
              limit: 12,
              apiSecretKey: apiSecretKey,
            },
            baseApi
          ) as any
        );
        return;
      }
      onError();
    },
    [apiSecretKey, baseApi, dispatch, serviceId]
  );

  useEffect(() => {
    getResult(+urlPageNumber, urlKeyword);
  }, [urlPageNumber, getResult, urlKeyword]);

  return (
    <div>
      <div className="row gy-4">
        {allProjects?.map((item: any, idx: number) => {
          return (
            <div key={idx} className="col-12 col-md-6 col-lg-4 col-xl-4">
              <Card className={styles.cardContainer}>
                <Card.Body>
                  {item.logo && (
                    <LinkItem url={item.pageURL}>
                      <div className="w-100 position-relative">
                        <Image
                          src={item.logo.logoUrl}
                          alt={item.logo.description}
                          title={item.logo.description}
                          width={520}
                          height={300}
                        />
                      </div>
                    </LinkItem>
                  )}

                  {item.name && (
                    <LinkItem url={item.pageURL}>
                      <Card.Title className={styles.cardTitle}>
                        {item.name}
                      </Card.Title>
                    </LinkItem>
                  )}

                  {item?.addressText && (
                    <div className="d-flex align-items-center gap-2">
                      <div className={styles.addressIcon}>
                        <Image
                          src={icLocation}
                          width={15}
                          height={15}
                          alt={"icon"}
                        />
                      </div>
                      <p className={styles.cardAddress}>{item?.addressText}</p>
                    </div>
                  )}
                </Card.Body>
                {Boolean(item.listOfInfo?.length) && (
                  <Card.Footer className={styles.cardFooter}>
                    <div
                      className={classNames(
                        "w-100 d-flex align-items-end gap-3",
                        styles.cardSubDescription
                      )}
                    >
                      {item.listOfInfo
                        .slice(0, -1)
                        .map((infoItem: any, idx: number) => (
                          <div
                            key={idx}
                            className={classNames(
                              "d-flex align-items-center gap-1",
                              styles.briefInfoBox
                            )}
                          >
                            {infoItem?.icon && (
                              <>
                                <div>
                                  <Image
                                    src={infoItem.icon.logoUrl}
                                    width={15}
                                    height={15}
                                    objectFit={"contain"}
                                    alt={"icon"}
                                  />
                                </div>
                                <div
                                  className={styles.briefInfoText}
                                  dangerouslySetInnerHTML={{
                                    __html: infoItem?.text,
                                  }}
                                ></div>
                              </>
                            )}
                          </div>
                        ))}
                    </div>
                    {item.listOfInfo[item.listOfInfo?.length - 1] && (
                      <div
                        className={styles.price}
                        dangerouslySetInnerHTML={{
                          __html:
                            item.listOfInfo[item.listOfInfo?.length - 1].text,
                        }}
                      ></div>
                    )}
                  </Card.Footer>
                )}
              </Card>
            </div>
          );
        })}
        {loading && allProjects?.length === 0 && (
          <div className="w-100">
            <span className="info-loader2"></span>
            <span className="info-loader2"></span>
            <span className="info-loader2"></span>
          </div>
        )}
        {isError && allProjects?.length === 0 && <ErrorBlock />}
      </div>

      {Boolean(allProjects?.length) && totalPages && (
        <PaginationBlock
          baseUrl={baseUrl}
          currentNumber={+urlPageNumber}
          totalPages={totalPages}
          pageSize={projectModel.limit}
        />
      )}
    </div>
  );
};

export default ListResult;
