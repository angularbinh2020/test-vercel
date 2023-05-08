import React, { useCallback, useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import styles from "./filter-option.module.scss";
import { useRouter } from "next/router";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import { BuyFilterOption } from "../BuyFilterOption";
import { ProjectFilterOption } from "../ProjectFilterOption";
import { RentFilterOption } from "../RentFilterOption";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { useDispatch } from "react-redux";
import {
  SearchInputType,
  setSearchInputType,
} from "sites/mogivi/redux/search.slice";

export enum TAB_VALUES {
  BuyHouse = "mua-ban",
  RentHouse = "cho-thue",
  Project = "du-an",
}

export const TABS_SEARCH = [
  {
    label: "Mua bán",
    value: TAB_VALUES.BuyHouse,
    url: "mua-ban",
    icon: "home",
    eventKey: "first",
  },
  {
    label: "Cho thuê",
    value: TAB_VALUES.RentHouse,
    url: "cho-thue",
    icon: "building",
    eventKey: "second",
  },
  {
    label: "Dự án",
    value: TAB_VALUES.Project,
    url: "du-an",
    icon: "city",
    eventKey: "third",
  },
];

interface FilterOptionProps {
  servicesSearch: IETSearchService[];
}

export const FilterOption = (props: FilterOptionProps) => {
  const { servicesSearch } = props;

  // const buyTab: IETSearchService = servicesSearch[0] || {};
  // const rentTab: IETSearchService = servicesSearch[1] || {};
  // const projectTab: IETSearchService = servicesSearch[2] || {};
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentService, setCurrentService] = useState<string>("");

  const handleRouter = useCallback(
    (url: string) => {
      if (router.asPath.includes(url)) {
        dispatch(setSearchInputType(SearchInputType.PROJECT_SEARCH_INPUT));
      }
      router.push(`/search/${url}`, undefined, { shallow: true });
    },
    [dispatch, router]
  );

  useEffect(() => {
    if (router.isReady) {
      const currentServiceType = router.asPath.split("/")[2];

      if (currentServiceType && currentServiceType !== "") {
        setCurrentService(currentServiceType);
      } else {
        setCurrentService(TAB_VALUES.BuyHouse);
      }
    }
  }, [router]);

  return (
    <div className={styles.rootContainer}>
      {/* <div className={styles.sectionHeader}>Kết quả tìm kiếm</div> */}
      <div className={styles.container}>
        <div className={styles.tabsContainer}>
          {currentService && currentService !== "" && (
            <Tab.Container id="search-tabs" defaultActiveKey={currentService}>
              <Nav variant="pills" className={styles.tabControl}>
                {servicesSearch.map((item, i) => (
                  <Nav.Item
                    key={i}
                    onClick={() =>
                      handleRouter(
                        item.fields.serviceType.node?.system?.urlSegment
                      )
                    }
                  >
                    <Nav.Link eventKey={TABS_SEARCH[i].url}>
                      <div className={styles.tabControlItem}>
                        <div className={styles.tabControlIcon}>
                          <SvgIcon icon={TABS_SEARCH[i].icon} />
                        </div>
                        {item.fields.serviceType?.contentName && (
                          <span>{item.fields.serviceType?.contentName}</span>
                        )}
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              <Tab.Content className={styles.tabs}>
                {servicesSearch &&
                  servicesSearch.map((item, i) => {
                    const serviceType =
                      item.fields.serviceType?.node?.system?.urlSegment;

                    if (serviceType === TAB_VALUES.BuyHouse) {
                      return (
                        <Tab.Pane key={i} eventKey={serviceType}>
                          <div className={styles.tab}>
                            <BuyFilterOption data={item} />
                          </div>
                        </Tab.Pane>
                      );
                    } else if (serviceType === TAB_VALUES.RentHouse) {
                      return (
                        <Tab.Pane key={i} eventKey={serviceType}>
                          <div className={styles.tab}>
                            <RentFilterOption data={item} />
                          </div>
                        </Tab.Pane>
                      );
                    } else if (serviceType === TAB_VALUES.Project) {
                      return (
                        <Tab.Pane key={i} eventKey={serviceType}>
                          <div className={styles.tab}>
                            <ProjectFilterOption data={item} />
                          </div>
                        </Tab.Pane>
                      );
                    }
                  })}
              </Tab.Content>
            </Tab.Container>
          )}
        </div>
      </div>
    </div>
  );
};
