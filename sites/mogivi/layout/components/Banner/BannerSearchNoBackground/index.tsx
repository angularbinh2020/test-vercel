import classNames from "classnames";
import LinkItem from "components/LinkItem";
import { useGetPageDataContext } from "context/page-data.context";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { IProjectsAPI } from "sites/mogivi/models/blocks/IProjectsAPI";
import { SuggestionList } from "../SuggestionList";

import styles from "./styles.module.scss";

type RecentlySearchTag = {
  name: string;
  url: string;
};
export interface IBannerSearchProps {
  onTextSearchChange: Function;
  handleSaveKeyword: Function;
  handleOnFocus: () => void;
  handleOnBlur: () => void;
  showSuggestionList: boolean;
  defaultKey: string;
  block: IProjectsAPI;
}

export const BannerSearchNoBackground = (props: IBannerSearchProps) => {
  const { loadingSearchBar, investorsSuggestion } = useSelector(
    (state: Types.RootState) => state.investor
  );
  const { itemTitle, subtitle } = props.block.fields;
  const {
    onTextSearchChange,
    handleOnFocus,
    handleOnBlur,
    showSuggestionList,
    defaultKey,
    handleSaveKeyword,
  } = props;
  const [tagList, setTagList] = useState<RecentlySearchTag[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tagListItem: RecentlySearchTag[] = JSON.parse(
        localStorage.getItem("recentlySearchInvestors") || "[]"
      );
      const uniqueList = tagListItem.filter((uniqueItem, i) => {
        return (
          i ===
          tagListItem.findIndex(
            (item) =>
              uniqueItem.url === item.url && uniqueItem.name === item.name
          )
        );
      });
      setTagList(uniqueList);
    }
  }, []);

  return (
    <div className={classNames(styles.bannerNoImageContainer, "container")}>
      <div className={styles.contentWrapper}>
        {itemTitle && <h1>{itemTitle}</h1>}
        {subtitle && (
          <div className="mb-sm">
            <div
              className="subtitle"
              dangerouslySetInnerHTML={{ __html: subtitle }}
            ></div>
          </div>
        )}
      </div>
      {/* {links && links.length !== 0 && (
        <div className={styles.btnBannerContainer}>
          <LinkItem className="btn-white--outline" url={links[0]?.url || ""}>
            {links[0]?.name}
          </LinkItem>
        </div>
      )} */}
      <div className={styles.searchForm}>
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
          onChange={(e) => onTextSearchChange(e)}
          id="search-input"
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          value={defaultKey}
          type="search"
          autoComplete="off"
          placeholder="Nhập tên chủ đầu tư"
          name="keyword"
        />

        {investorsSuggestion &&
          investorsSuggestion?.length !== 0 &&
          showSuggestionList && (
            <SuggestionList
              handleOnBlur={handleOnBlur}
              handleOnFocus={handleOnFocus}
              handleSaveKeyword={handleSaveKeyword}
              suggestionList={investorsSuggestion}
              suggestionName="chủ đầu tư"
            />
          )}
      </div>
      <div className={styles.recentlySearchTag}>
        <ul className={styles.recentlySearchTagBox}>
          {tagList.slice(0, 3)?.map(
            (tagItem: any, idx) =>
              tagItem.name !== "" &&
              tagItem.url !== "" && (
                <li key={idx}>
                  <LinkItem url={tagItem.url}>{tagItem.name}</LinkItem>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};
