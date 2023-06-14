import { useState, useCallback, useMemo, useEffect } from "react";
import { ETProjectAPISetting } from "sites/mogivi/models/ETProjectAPISetting";
import { PAGE_PREFIX, START_PAGE_INDEX } from "const/config";
import { projectService } from "sites/mogivi/services/project.service";
import useBoolean from "sites/mogivi/hooks/useBoolean";
import { useRouter } from "next/router";
import useViewMode from "hooks/useViewMode";
import { useGetPageDataContext } from "context/page-data.context";
import { useGetCurrentPathInfo } from "./useGetCurrentPathInfo";

export const useGetSearchPageResult = (settingAPI: ETProjectAPISetting[]) => {
  const { slug } = useGetCurrentPathInfo();
  const [{ items, pageIndex, totalPages, pageSize }, setResult] = useState({
    items: [],
    pageIndex: START_PAGE_INDEX,
    totalPages: 0,
    pageSize: 10,
  });
  const pageData = useGetPageDataContext();
  const { isMobileApp } = useViewMode();
  const router = useRouter();
  const { baseUrl } = useMemo(() => {
    const asPath = router.asPath;
    let baseUrl = asPath.split("/page-")[0];
    if (asPath.includes("?ViewMobileApp=1")) {
      baseUrl = baseUrl.replace("?ViewMobileApp=1", "");
    }
    return { baseUrl };
  }, [isMobileApp, router.asPath, router.query.slug]);
  const [isLoading, closeLoading, showLoading] = useBoolean(true);
  const isError = items?.length === 0;
  const getSearchPageDataResult = useCallback(async function (
    settingAPI: ETProjectAPISetting[],
    slugs: string[],
    siteId: any,
    rawUrlBuild: string
  ) {
    showLoading();
    try {
      if (settingAPI && settingAPI[0]) {
        const pageIndexSlug = slugs
          .find((slug) => slug.startsWith(PAGE_PREFIX))
          ?.replace(PAGE_PREFIX, "");
        const fields = settingAPI[0].fields;
        const baseApi = fields?.aPIKeyTag?.node.fields.itemTitle;
        const pageIndex = Number(pageIndexSlug ?? START_PAGE_INDEX);
        const limit = fields?.parameters[1].fields.value ?? 10;
        const method = fields?.aPIKeyTag?.method?.toLowerCase() || "get";
        let keyword = "";
        slugs.forEach((slug, slugIndex) => {
          if (
            slugIndex &&
            !slug.includes(rawUrlBuild) &&
            !slug.startsWith(PAGE_PREFIX)
          )
            keyword = slug;
        });

        const requestParams = {
          page: pageIndex,
          limit: limit,
          keyword: keyword,
          siteId: siteId,
          method: method,
          isSearchPage: true,
        };
        const response = await projectService.getAllProjects(
          requestParams,
          baseApi
        );
        closeLoading();
        if (!response || !response.data?.items?.length) {
          setResult({
            items: [],
            totalPages: 0,
            pageIndex: START_PAGE_INDEX,
            pageSize: 10,
          });
          return;
        }
        setResult({
          items: response?.data?.items || [],
          totalPages: Math.ceil((response?.data?.totalItems || 0) / limit),
          pageIndex,
          pageSize: limit,
        });
      }
    } catch (e) {
      console.error(e);
      closeLoading();
      setResult({
        items: [],
        totalPages: 0,
        pageIndex: START_PAGE_INDEX,
        pageSize: 10,
      });
    }
  },
  []);

  useEffect(() => {
    const rawUrlBuild = pageData?.rawUrlBuild;
    if (router.isReady && rawUrlBuild && settingAPI && slug.length) {
      getSearchPageDataResult(settingAPI, slug, pageData.siteId, rawUrlBuild);
    }
  }, [router, slug]);
  return {
    items,
    pageIndex,
    totalPages,
    pageSize,
    isLoading,
    isError,
    baseUrl,
  };
};
