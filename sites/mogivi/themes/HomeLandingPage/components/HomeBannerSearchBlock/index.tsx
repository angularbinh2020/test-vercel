import React, { useCallback, useState } from "react";
import classNames from "classnames";
import styles from "./banner-search.module.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { IBannerSearch } from "sites/mogivi/models/blocks/IBannerSearch";
import homeBackground from "../../../../assets/images/homepage/img-banner-search.svg";
import ServiceTab from "./components/ServiceTab";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import {
  clearProjectsSuggestion,
  SearchInputType,
  setSearchInputType,
} from "sites/mogivi/redux/project.slice";
import { useDispatch } from "react-redux";

// enum TAB_VALES {
//   BuyHouse = "buyHouse",
//   RentHouse = "rentHouse",
//   Project = "project",
// }

const TABS = [
  {
    label: "Mua nhà",
    value: SearchInputType.BUY_SEARCH_INPUT,
  },
  {
    label: "Thuê nhà",
    value: SearchInputType.RENT_SEARCH_INPUT,
  },
  {
    label: "Dự án",
    value: SearchInputType.PROJECT_SEARCH_INPUT,
  },
];

interface IHomeBannerSearch {
  block: IBannerSearch;
}

const HomeBannerSearchBlock = (props: IHomeBannerSearch) => {
  const { bannerBackground, blocks, itemTitle } = props.block.fields;
  const [activeKey, setActiveKey] = useState<SearchInputType>(
    SearchInputType.BUY_SEARCH_INPUT
  );
  // const [searchValue, setSearchValue] = useState<IOptionProps | null>(null);
  const dispatch = useDispatch();

  // const handleChange = (selected: IOptionProps | null) => {
  //   setSearchValue(selected);
  // };

  // const CustomMenu = (props: any) => {
  //   return (
  //     <>
  //       <div className={styles.labelHistory}>Tìm kiếm gần đây</div>
  //       <components.MenuList {...props}></components.MenuList>
  //     </>
  //   );
  // };

  const changeSearchInput = useCallback(
    (tabActive: SearchInputType) => {
      dispatch(clearProjectsSuggestion());
      dispatch(setSearchInputType(tabActive));
    },
    [dispatch]
  );

  return (
    <div
      className={styles.bannerSearchContainer}
      style={{
        backgroundImage: `url(${
          bannerBackground
            ? bannerBackground?.fields?.umbracoFile
            : homeBackground
        })`,
      }}
    >
      <div className={classNames("container", styles.container)}>
        {itemTitle && <div className={styles.title}>{itemTitle}</div>}
        <div className={styles.tabsContainer}>
          <Tabs
            activeKey={activeKey}
            onSelect={(eventKey) => {
              setActiveKey(eventKey as SearchInputType);
              changeSearchInput(eventKey as SearchInputType);
            }}
            className={styles.tabs}
            transition={false}
          >
            {blocks.map((tabItem: IETSearchService, tabIndex: number) => {
              return (
                <Tab
                  eventKey={TABS[tabIndex].value}
                  title={tabItem.fields.itemTitle}
                  className={styles.tab}
                  key={tabIndex}
                >
                  <ServiceTab block={tabItem} />
                </Tab>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HomeBannerSearchBlock;
