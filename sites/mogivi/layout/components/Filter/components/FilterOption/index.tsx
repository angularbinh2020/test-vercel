import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import { useDispatch } from "react-redux";
import {
  SearchInputType,
  setSearchInputType,
} from "sites/mogivi/redux/search.slice";
import { useGetCurrentPathInfo } from "hooks/useGetCurrentPathInfo";
import { TAB_VALUES } from "sites/mogivi/const/search";
import DesktopFilterOption from "./components/DesktopFilterOption";
import MobileFilterOption from "./components/MobileFilterOption";
import {
  useGetSetProjectListResultState,
  useSetProjectListResultState,
} from "sites/mogivi/redux/project.slice";
import { getFirstSlug } from "utils";

interface FilterOptionProps {
  servicesSearch: IETSearchService[];
}

export const FilterOption = (props: FilterOptionProps) => {
  const { servicesSearch } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const { setProjectListResultState } = useSetProjectListResultState();
  const { currentService } = useGetSetProjectListResultState();
  const { slug } = useGetCurrentPathInfo();
  const handleRouter = useCallback(
    (url: string) => {
      if (router.asPath.includes(url)) {
        dispatch(setSearchInputType(SearchInputType.PROJECT_SEARCH_INPUT));
      }
      const redirectUrl = `/${getFirstSlug(slug)}/${url}`;
      router.push(redirectUrl, undefined, { shallow: true });
    },
    [dispatch, router, slug]
  );

  useEffect(() => {
    if (slug?.length) {
      const currentServiceType: any = slug.find((slug: any) =>
        Object.values(TAB_VALUES).includes(slug)
      );
      setProjectListResultState({
        currentService: currentServiceType ?? TAB_VALUES.BuyHouse,
      });
    }
  }, [slug]);

  return (
    <>
      <DesktopFilterOption
        currentService={currentService}
        servicesSearch={servicesSearch}
        handleRouter={handleRouter}
        slug={slug}
      />
      <MobileFilterOption
        currentService={currentService}
        servicesSearch={servicesSearch}
        handleRouter={handleRouter}
        slug={slug}
      />
    </>
  );
};
