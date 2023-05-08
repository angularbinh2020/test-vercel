import axios from "apis/axios";
import { AxiosResponse } from "axios";
import classNames from "classnames";
import LinkItem from "components/LinkItem";
import { useGetPageDataContext } from "context/page-data.context";
import useViewMode from "hooks/useViewMode";
import { IDeviceDetected } from "models/IDeviceDetected";
import Image from "next/image";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { SuggestionList } from "sites/mogivi/layout/components/Banner/SuggestionList";
import { ProjectSuggestionResult } from "sites/mogivi/models/apis";
import { ICustomHeaderContentProjectPageBlock } from "sites/mogivi/models/blocks/ICustomHeaderContentProjectPageBlock";
import styles from "./styles.module.scss";
import { getImgWidthHeightDisplay } from "sites/mogivi/utils";

interface BlockProps extends IDeviceDetected {
  block: ICustomHeaderContentProjectPageBlock;
  site: string;
}

const CustomHeaderContentProjectPageBlock = (props: BlockProps) => {
  const { site } = props;
  const { leftImage, middleImage, itemTitle, aPISearchSettings, apiSearchUrl } =
    props.block.fields;
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchResult, setSearchResult] = useState<ProjectSuggestionResult[]>(
    []
  );
  const searchTimeoutId = useId();
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [onInputFocus, setOnInputFocus] = useState<boolean>(false);
  const [loadingSearchBar, setLoadingSearchBar] = useState<boolean>(false);
  const pageData = useGetPageDataContext();
  const siteId = pageData?.siteId ?? 0;
  const { isMobileApp, isReady } = useViewMode();

  const handleOnFocus = useCallback(() => {
    setOnInputFocus(true);
  }, []);

  const handleOnBlur = useCallback(() => {
    setOnInputFocus(false);
  }, []);

  const showResults = useCallback((items: any) => {
    setSearchResult(items);
    setShowSuggestion(true);
  }, []);
  const handleSearch = useCallback(() => {
    const oldTimeoutId = window[searchTimeoutId as keyof typeof window];
    if (oldTimeoutId) {
      clearTimeout(oldTimeoutId);
      setLoadingSearchBar(true);
    }
    //@ts-ignore
    window[searchTimeoutId] = setTimeout(() => {
      //@ts-ignore
      window[searchTimeoutId] = null;
      const currentSearchKeyword = searchRef.current?.value.trim();
      const apiSetting = aPISearchSettings[0]?.fields;
      if (currentSearchKeyword && apiSetting) {
        const onGetResponse = (response: AxiosResponse) => {
          showResults(response.data);
          setLoadingSearchBar(false);
        };
        const onError = (error: any) => {
          setSearchResult([]);
        };
        const searchKeyword = apiSetting.parameters[0]?.fields.key;
        if (apiSetting.method.trim().toUpperCase() === "GET") {
          const searchParams = new URLSearchParams();
          if (searchKeyword) {
            searchParams.append(searchKeyword, currentSearchKeyword);
            searchParams.append("pageIndex", "1");
            searchParams.append("pageSize", "30");
          }
          if (currentSearchKeyword?.length >= 2) {
            setShowSuggestion(true);
            axios
              .get(apiSearchUrl + "/" + siteId + "?" + searchParams.toString())
              .then(onGetResponse)
              .catch(onError);
          } else {
            setLoadingSearchBar(false);
          }
        } else {
          const data: any = {};
          if (searchKeyword) {
            data[searchKeyword] = currentSearchKeyword;
          }
          axios.post(apiSearchUrl, data).then(onGetResponse).catch(onError);
        }
      } else {
        setSearchResult([]);
        setLoadingSearchBar(false);
      }
    }, 500);
  }, [aPISearchSettings, apiSearchUrl, searchTimeoutId, showResults, siteId]);

  useEffect(() => {
    if (onInputFocus) {
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
    }
  }, [onInputFocus]);
  if (isMobileApp && isReady) return null;
  return (
    <div className={classNames(styles.header, !isReady && "opacity-0")}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6 col-md-3 col-lg-3">
            <div className="mogivi-logo">
              <LinkItem url="/">
                <Image
                  src={leftImage.fields.umbracoFile}
                  alt={site ?? process.env.NEXT_PUBLIC_BUILD_SITE}
                  title={site}
                  {...getImgWidthHeightDisplay(
                    150,
                    40,
                    leftImage.fields.umbracoWidth,
                    leftImage.fields.umbracoHeight
                  )}
                />
              </LinkItem>
            </div>
          </div>
          <div className="col-6 col-md-3 col-lg-3">
            <div className="text-center mb-3">
              <picture>
                <Image
                  className="logo logo-color"
                  alt={middleImage.system.name}
                  title={site}
                  {...getImgWidthHeightDisplay(
                    150,
                    80,
                    middleImage.fields.umbracoWidth,
                    middleImage.fields.umbracoHeight
                  )}
                  src={middleImage.fields.umbracoFile}
                />
              </picture>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 text-right">
            <div className="search-container">
              <div className="input-group position-relative">
                {loadingSearchBar ? (
                  <div className={styles.spinner}>
                    <div
                      className={classNames("spinner-border text-secondary")}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <SvgIcon className={styles.searchIcon} icon="search" />
                )}
                <input
                  type="text"
                  className="form-control form-control-input rounded-0"
                  id="headerSearchInput"
                  placeholder={itemTitle}
                  ref={searchRef}
                  onChange={handleSearch}
                  onBlur={handleOnBlur}
                  onFocus={handleOnFocus}
                />
                {Boolean(searchResult?.length) && showSuggestion && (
                  <SuggestionList
                    handleOnBlur={handleOnBlur}
                    handleOnFocus={handleOnFocus}
                    suggestionList={searchResult}
                    suggestionName="dự án"
                    className={styles.customSuggestionList}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomHeaderContentProjectPageBlock;
