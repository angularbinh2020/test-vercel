import React from "react";
import { Nav, Tab } from "react-bootstrap";
import styles from "./styles.module.scss";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import { SearchFilterOption } from "../../../SearchFilterOption";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import classNames from "classnames";
import { TABS_SEARCH } from "sites/mogivi/const/search";
import { getFirstSlug } from "utils";

interface Props {
  currentService: string;
  servicesSearch: IETSearchService[];
  handleRouter: (url: string) => void;
  slug: string[];
}

const DesktopFilterOption = ({
  currentService,
  servicesSearch,
  handleRouter,
  slug,
}: Props) => {
  return (
    <div className={classNames(styles.rootContainer, "desktopVisible")}>
      <div className={styles.container}>
        <div className={styles.tabsContainer}>
          {currentService && (
            <Tab.Container
              id="search-tabs"
              key={currentService}
              defaultActiveKey={currentService}
            >
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
                        <div>
                          <SvgIcon icon={TABS_SEARCH[i].icon} />
                        </div>
                        {item.fields.serviceType?.contentName && (
                          <span className={styles.tabTile}>
                            {item.fields.serviceType?.contentName}
                          </span>
                        )}
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              <Tab.Content className={styles.tabs}>
                {servicesSearch?.map((item, i) => {
                  const serviceType =
                    item.fields.serviceType?.node?.system?.urlSegment;
                  const resetPath = `/${getFirstSlug(slug)}/${serviceType}`;
                  return (
                    <Tab.Pane key={i} eventKey={serviceType}>
                      <div className={styles.tab}>
                        <SearchFilterOption
                          data={item}
                          slug={slug}
                          resetPath={resetPath}
                        />
                      </div>
                    </Tab.Pane>
                  );
                })}
              </Tab.Content>
            </Tab.Container>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopFilterOption;
