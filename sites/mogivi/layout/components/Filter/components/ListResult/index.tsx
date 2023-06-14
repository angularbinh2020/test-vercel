import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useDeferredValue,
} from "react";
import { PaginationBlock } from "sites/mogivi/layout/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { ProjectModel } from "sites/mogivi/models/apis";
import {
  onGetAllProjects,
  useSetProjectListResultState,
} from "sites/mogivi/redux/project.slice";
import { PAGE_PREFIX, START_PAGE_INDEX } from "const/config";
import { useRouter } from "next/router";
import useViewMode from "hooks/useViewMode";
import { ErrorBlock } from "sites/mogivi/layout/components/ErrorBlock";
import API_URL from "const/api-url";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import { useGetPageDataContext } from "context/page-data.context";
import { useGetCurrentPathInfo } from "hooks/useGetCurrentPathInfo";
import ProjectResult from "./components/ProjectResult";
import RentBuyResult from "./components/RentBuyResult";
import { TAB_VALUES } from "sites/mogivi/const/search";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { MOGIVI_CONTENT_TYPE } from "sites/mogivi/const/content-type";
import SortOptions from "../SortOptions";
import { getSortOptions } from "sites/mogivi/utils";

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
  const {
    allProjects,
    totalPages,
    isError,
    loading,
    isBuyOrRentSearch,
    totalResult,
    currentService,
  } = useSelector((state: RootState) => state.project);
  const pageData = useGetPageDataContext();
  const { serviceId, apiSecretKey, resultApi, serviceSearch } = props;
  const [currentNumber, setCurrentNumber] = useState(START_PAGE_INDEX);
  const { isMobileApp, isDesktop } = useViewMode();
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug, pageIndex } = useGetCurrentPathInfo();
  const { onError, setProjectListResultState } = useSetProjectListResultState();
  const slugDeferred = useDeferredValue(slug);
  const apiSecretKeyDeferred = useDeferredValue(apiSecretKey);

  const { baseApi, limit, defaultKeyword, method, siteId } = useMemo(() => {
    let baseApi = API_URL.SITE_PROJECT_SEARCH_RESULT_FILTER;
    let limit = 10;
    let defaultKeyword = "";
    let method = "get";
    let siteId: any = 0;
    if (pageData) {
      const defaultCMSKey =
        pageData.currentNode?.fields?.defaultFilterLocation?.node.system
          ?.urlSegment;
      if (defaultCMSKey?.trim()) {
        defaultKeyword = defaultCMSKey;
      }
      siteId = pageData.siteId;
    }
    if (resultApi) {
      baseApi = resultApi;
    }
    if (serviceSearch?.length && serviceId) {
      method = serviceSearch.find(
        (sv) => sv.fields?.serviceType?.node?.system?.id === serviceId
      )?.fields.apiSearchSettings[0]?.fields?.method;
    }
    return { baseApi, limit, defaultKeyword, method, siteId };
  }, [pageData, resultApi, serviceSearch, serviceId]);

  const { baseUrl } = useMemo(() => {
    const asPath = router.asPath;
    let baseUrl = asPath.split("/page-")[0];
    if (asPath.includes("?ViewMobileApp=1")) {
      baseUrl = baseUrl.replace("?ViewMobileApp=1", "");
    }
    return { baseUrl };
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
    (pageNumber: number, keyword: string, filters: string = "") => {
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
              isSearchPage: true,
              filters,
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
    const slug = [...slugDeferred];
    const apiSecretKey = apiSecretKeyDeferred;
    if (slug.length && apiSecretKey) {
      const sortOptions = getSortOptions(serviceSearch, currentService);
      const isMissingSortUrlSegment =
        sortOptions &&
        !slug.find((slg) =>
          sortOptions.find((option: any) => option.value === slg)
        );
      if (isMissingSortUrlSegment) {
        slug.push(sortOptions[0].value);
      }
      let keyword = "";
      let filters = "";
      const initBuyOrRentSearch = Boolean(
        slug.find(
          (slg) => slg === TAB_VALUES.BuyHouse || slg === TAB_VALUES.RentHouse
        )
      );
      let filtersCount = 0;
      const addFilter = (nodeId: string, isFilter: boolean = false) => {
        filters += filters ? `;${nodeId}` : nodeId;
        if (isFilter) filtersCount++;
      };
      const serviceSearchTabConfig = serviceSearch.find(
        (service) => service.fields?.apiSecretKey === apiSecretKey
      );
      if (!serviceSearchTabConfig) return;
      const tabValues = Object.values(TAB_VALUES);
      const hasKeyword = slug.length > 2 && tabValues.includes(slug[2] as any);
      if (hasKeyword) {
        keyword = slug[1];
      }
      const filterTypeIndex = slug.findIndex((slg) =>
        tabValues.includes(slg as any)
      );
      const tabConfig = serviceSearch.find(
        (search) => search.fields.apiSecretKey === apiSecretKey
      );
      const shouldMappingFilterNode =
        filterTypeIndex && filterTypeIndex < slug.length - 1 && tabConfig;
      if (shouldMappingFilterNode) {
        const filtersSlug: string[] = [];
        let slugIndex = filterTypeIndex + 1;
        while (slug[slugIndex]) {
          const slugValue = slug[slugIndex];
          if (!slugValue.includes(PAGE_PREFIX)) filtersSlug.push(slugValue);
          slugIndex++;
        }
        if (filtersSlug.length) {
          filtersSlug.forEach((slug) => {
            tabConfig.fields.filtersOptions?.forEach((filterOption: any) => {
              const options = [
                ...(filterOption?.fields?.options || []),
                ...(filterOption?.fields?.filterOptions || []),
              ];
              const isFilter =
                filterOption.system?.contentType !==
                MOGIVI_CONTENT_TYPE.eTSortTagsItem;
              options.forEach((option: any) => {
                if (slug === option.node?.system?.urlSegment) {
                  addFilter(option.node?.system?.id, isFilter);
                }
              });
            });
          });
        }
      }
      setProjectListResultState({
        isBuyOrRentSearch: initBuyOrRentSearch,
        filtersCount,
        allProjects: [],
      });
      getResult(pageIndex, keyword, filters);
    }
  }, [slugDeferred]);

  return (
    <div
      className={classNames(styles.container, isBuyOrRentSearch && "container")}
    >
      <div className="row">
        <div className="d-flex justify-content-between align-items-center mb-3 col-12">
          <div
            className={classNames(
              styles.resultCount,
              !totalResult && "opacity-0"
            )}
          >
            {totalResult.toLocaleString("vi")} kết quả được tìm thấy
          </div>
          <div>
            <SortOptions
              currentService={currentService}
              servicesSearch={serviceSearch}
            />
          </div>
        </div>
      </div>
      <div className="row gy-4">
        {!isBuyOrRentSearch && (
          <ProjectResult
            allProjects={allProjects}
            isLoading={loading}
            pageSize={projectModel.limit}
          />
        )}
        {isBuyOrRentSearch && (
          <RentBuyResult
            allProjects={allProjects}
            isLoading={loading}
            pageSize={projectModel.limit}
            isDesktop={isDesktop}
          />
        )}
        {isError && allProjects?.length === 0 && <ErrorBlock />}
      </div>

      {Boolean(allProjects?.length) && totalPages && (
        <PaginationBlock
          baseUrl={baseUrl}
          currentNumber={pageIndex}
          totalPages={totalPages}
          pageSize={projectModel.limit}
        />
      )}
    </div>
  );
};

export default ListResult;
