import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useDeferredValue,
} from "react";
import useBoolean from "./useBoolean";
import {
  SearchInputType,
  useGetSetProjectListResultState,
} from "../redux/project.slice";
import { useSelector, useDispatch } from "react-redux";
import API_URL from "const/api-url";
import { useGetPageDataContext } from "context/page-data.context";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import { TAB_VALUES } from "../const/search";
import { useGetCurrentPathInfo } from "hooks/useGetCurrentPathInfo";
import {
  useSetSearchState,
  onGetProjectsSuggestion,
} from "../redux/search.slice";

interface Params {
  servicesSearch: IETSearchService[];
}

enum ServiceType {
  BUY_SERVICE = 0,
  RENT_SERVICE = 1,
  PROJECT_SERVICE = 2,
}

export const useSearchSuggestion = ({ servicesSearch }: Params) => {
  const { loadingSearchBar, searchKey, projectSuggestion } = useSelector(
    (state: Types.RootState) => state.search
  );
  const { currentService } = useGetSetProjectListResultState();
  const { slug } = useGetCurrentPathInfo();
  const pageData = useGetPageDataContext();
  const searchKeyDeferred = useDeferredValue(searchKey);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState<string>("");
  const [isInputFocus, onBlur, onFocus] = useBoolean(false);
  const [isShowSuggestion, hideSuggestions, showSuggestions] =
    useBoolean(false);
  const { setSearchState } = useSetSearchState();
  const [serviceConfig, setServiceConfig] = useState({
    serviceType: 0,
    serviceId: "",
    apiSecretKey: "",
  });
  const { suggestionAPI, resultAPI } = useMemo(() => {
    let suggestionAPI = "";
    let resultAPI = "";
    const { serviceType } = serviceConfig;
    if (typeof serviceType === "number") {
      suggestionAPI =
        servicesSearch[serviceType].fields.filtersOptions[0].fields
          .apiSettings[0].fields.apiKeyTag.node.fields.itemTitle;
      resultAPI =
        servicesSearch[serviceType].fields.apiSearchSettings[0].fields.apiKeyTag
          .node.fields.itemTitle;
    }
    return { suggestionAPI, resultAPI };
  }, [serviceConfig.serviceType, servicesSearch]);
  const tabSlug = useMemo(() => {
    if (slug.length) {
      return (
        slug.find((slg: any) => Object.values(TAB_VALUES).includes(slg)) ?? ""
      );
    }
    return "";
  }, [slug]);

  const onInputSearchKeyword = useCallback(
    (event: any) => {
      const { value } = event.target;
      setSearchState({
        searchKey: value.trim(),
      });
      setKeyword(value);
    },
    [setSearchState]
  );

  useEffect(() => {
    if (isInputFocus) {
      showSuggestions();
    } else {
      hideSuggestions();
    }
  }, [isInputFocus]);

  useEffect(() => {
    if (keyword.length >= 2) {
      setSearchState({
        loadingSearchBar: true,
      });
      const model = {
        page: 1,
        limit: 5,
        siteId: pageData?.siteId || 0,
        keyword: searchKeyDeferred,
        method: "GET",
        serviceType: serviceConfig.serviceId,
        apiSecretKey: serviceConfig.apiSecretKey,
      };
      if (suggestionAPI) {
        dispatch(onGetProjectsSuggestion(model, suggestionAPI) as any);
      } else {
        dispatch(
          onGetProjectsSuggestion(
            model,
            API_URL.SITE_PROJECT_SEARCH_SUGGESTION
          ) as any
        );
      }

      showSuggestions();
    } else {
      setSearchState({
        projectSuggestion: [],
      });
    }
  }, [searchKeyDeferred]);
  useEffect(() => {
    onInputSearchKeyword({
      target: {
        value: "",
      },
    });
  }, [currentService]);
  useEffect(() => {
    if (!slug?.length) return;
    const buyServiceId = servicesSearch[0].fields.serviceType.node.system.id;
    const rentServiceId = servicesSearch[1].fields.serviceType.node.system.id;
    const projectServiceId =
      servicesSearch[2].fields.serviceType.node.system.id;

    const buyApiSecretKey = servicesSearch[0].fields.apiSecretKey;
    const rentApiSecretKey = servicesSearch[1].fields.apiSecretKey;
    const projectApiSecretKey = servicesSearch[2].fields.apiSecretKey;
    const config = {
      [TAB_VALUES.BuyHouse]: {
        config: {
          serviceType: ServiceType.BUY_SERVICE,
          serviceId: buyServiceId,
          apiSecretKey: buyApiSecretKey,
        },
        searchInputType: SearchInputType.BUY_SEARCH_INPUT,
      },
      [TAB_VALUES.RentHouse]: {
        config: {
          serviceType: ServiceType.RENT_SERVICE,
          serviceId: rentServiceId,
          apiSecretKey: rentApiSecretKey,
        },
        searchInputType: SearchInputType.RENT_SEARCH_INPUT,
      },
      [TAB_VALUES.Project]: {
        config: {
          serviceType: ServiceType.PROJECT_SERVICE,
          serviceId: projectServiceId,
          apiSecretKey: projectApiSecretKey,
        },
        searchInputType: SearchInputType.PROJECT_SEARCH_INPUT,
      },
    };
    for (let tabValue in config) {
      if (slug.includes(tabValue)) {
        const tabConfig = config[tabValue as keyof typeof config];
        setSearchState({
          searchInputType: tabConfig.searchInputType,
        });
        setServiceConfig(tabConfig.config);
        break;
      }
    }
  }, [slug]);

  return {
    onBlur,
    onFocus,
    onInputSearchKeyword,
    keyword,
    loadingSearchBar,
    projectSuggestion,
    isShowSuggestion,
    resultAPI,
    serviceConfig,
    tabSlug,
    slug,
  };
};
