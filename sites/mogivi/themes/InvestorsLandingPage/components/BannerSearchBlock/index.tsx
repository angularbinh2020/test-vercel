import API_URL from "const/api-url";
import { useGetPageDataContext } from "context/page-data.context";
import useViewMode from "hooks/useViewMode";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BannerSearch } from "sites/mogivi/layout/components/Banner/BannerSearch";
import { BannerSearchNoBackground } from "sites/mogivi/layout/components/Banner/BannerSearchNoBackground";
import { IBannerSubpageProps } from "sites/mogivi/layout/components/Banner/BannerSubpage";
import { IProjectsAPI } from "sites/mogivi/models/blocks/IProjectsAPI";
import {
  clearInvestorsSuggestion,
  onGetInvestorsSuggestion,
  setLoadingSearchBar,
  setSearchKey,
} from "sites/mogivi/redux/investor.slice";

let searchModels = {
  page: 1,
  limit: 5,
  keyword: "",
  siteId: "",
};

type RecentlySearchTag = {
  name: string;
  url: string;
};

interface ProjectSearchBlockProps {
  block: IProjectsAPI;
}

const BannerSearchBlock = (props: ProjectSearchBlockProps) => {
  const { searchKey } = useSelector((state: Types.RootState) => state.investor);
  const pageData = useGetPageDataContext();
  const dispatch = useDispatch();
  const [onInputFocus, setOnInputFocus] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [showSuggestionList, setShowSuggestionList] = useState<boolean>(false);
  const { isMobile } = useViewMode();
  const { settingAPI } = props.block.fields;

  const { baseApi, pageIndex, limit, defaultKeyword, method } = useMemo(() => {
    let baseApi = "";
    let pageIndex = 1;
    let limit = 10;
    let defaultKeyword = "";
    let method = "";
    if (settingAPI?.length) {
      baseApi =
        settingAPI[1].fields.aPIKeyTag?.node.fields.itemTitle ||
        API_URL.SITE_PROJECT_SEARCH_SUGGESTION;
      pageIndex = settingAPI[1].fields.parameters[0].fields.value;
      limit = settingAPI[1].fields.parameters[1].fields.value;
      method = settingAPI[1].fields.method?.toLowerCase() || "get";
    }

    return { baseApi, pageIndex, limit, defaultKeyword, method };
  }, [settingAPI]);

  searchModels = {
    page: pageIndex,
    limit: limit,
    keyword: defaultKeyword,
    siteId: String(pageData?.siteId),
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceInputChange = useCallback(
    debounce((value: string) => {
      dispatch(setSearchKey(value.trim()));
      dispatch(setLoadingSearchBar(false));
    }, 300),
    []
  );

  const onTextSearchChange = useCallback(
    (event: any) => {
      const { value } = event.target;
      dispatch(setLoadingSearchBar(true));
      setKeyword(value);
      debounceInputChange(value);
    },
    [debounceInputChange, dispatch]
  );

  const updateData = (model: Models.ProjectModel) => {
    dispatch(onGetInvestorsSuggestion(model, baseApi) as any);
  };

  const handleOnFocus = () => {
    setOnInputFocus(true);
  };
  const handleOnBlur = () => {
    setOnInputFocus(false);
  };

  const handleSaveKeyword = (name: string, url: string) => {
    if (localStorage.getItem("recentlySearchInvestors")) {
      let recentlySearchKeysList: RecentlySearchTag[] =
        JSON.parse(localStorage.getItem("recentlySearchInvestors") as string) ||
        [];
      if (name !== "" && url !== "") {
        const recentlySearchInvestors = {
          name: name,
          url: url,
        };
        recentlySearchKeysList.forEach((item) => {
          if (item.url !== recentlySearchInvestors.url) {
            recentlySearchKeysList.unshift(recentlySearchInvestors);
          }
        });

        const uniqueList = recentlySearchKeysList.filter((uniqueItem, i) => {
          return (
            i ===
            recentlySearchKeysList.findIndex(
              (item) =>
                uniqueItem.url === item.url && uniqueItem.name === item.name
            )
          );
        });

        localStorage.setItem(
          "recentlySearchInvestors",
          JSON.stringify(uniqueList)
        );
      }
    } else {
      const recentlySearchKeysList = [];
      const recentlySearchInvestors = {
        name: name,
        url: url,
      };
      recentlySearchKeysList.push(recentlySearchInvestors);
      localStorage.setItem(
        "recentlySearchInvestors",
        JSON.stringify(recentlySearchKeysList)
      );
    }
  };

  useEffect(() => {
    setKeyword(defaultKeyword);
    dispatch(setSearchKey(defaultKeyword));
  }, [defaultKeyword, dispatch]);

  useEffect(() => {
    if (keyword.length >= 2) {
      updateData({
        ...searchModels,
        siteId: pageData?.siteId ?? 0,
        keyword: searchKey,
        method: method,
      });
      // setShowSuggestionList(true);
    } else {
      dispatch(clearInvestorsSuggestion());
    }
  }, [dispatch, searchKey]);

  useEffect(() => {
    if (onInputFocus) {
      setShowSuggestionList(true);
    } else {
      setShowSuggestionList(false);
    }
  }, [onInputFocus]);

  return (
    <BannerSearchNoBackground
      handleOnBlur={handleOnBlur}
      handleOnFocus={handleOnFocus}
      onTextSearchChange={onTextSearchChange}
      handleSaveKeyword={handleSaveKeyword}
      defaultKey={keyword}
      showSuggestionList={showSuggestionList}
      block={props.block}
    />
  );
};

export default BannerSearchBlock;
