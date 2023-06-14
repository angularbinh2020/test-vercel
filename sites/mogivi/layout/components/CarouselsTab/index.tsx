import classNames from "classnames";
import Image from "next/legacy/image";
import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";

import Tab from "react-bootstrap/Tab";
import { ICarouselsBlock } from "sites/mogivi/models/blocks/ICarouselsBlock";

import styles from "./styles.module.scss";

interface ICarouselsTabProps {
  block: ICarouselsBlock;
}

export const CarouselsTab = (props: ICarouselsTabProps) => {
  const { itemTitle, items } = props.block.fields;

  return (
    <div
      className={classNames(styles.carouselsTabContainer, "section-container")}
    >
      <div className="container">
        <div className={styles.headerTitle}>
          <h2 className="title-wrap">{itemTitle}</h2>
          <p>
            Thay vì phải tự chọn tìm môi giới để có khách hàng, Mogivi giúp chủ
            nhà kết nối 1:1 với Môi giới uy tín và khách mua phù hợp, có tiềm
            năng chốt giao dịch cao.{" "}
          </p>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey={"0"}>
          <Nav variant="pills" className={styles.tabPanel}>
            {items.map((tabItem, index) => {
              const iconImg = tabItem.fields?.icon?.fields?.umbracoFile;
              const iconTitle = tabItem.fields?.labelIcon || "";
              return (
                <Nav.Item key={index}>
                  <Nav.Link eventKey={index}>
                    <div className={styles.featureTabs}>
                      {iconImg && (
                        <Image
                          alt={iconTitle}
                          src={iconImg}
                          width={100}
                          height={100}
                        />
                      )}
                      <h4 className={classNames(styles.tabName)}>
                        {iconTitle}
                      </h4>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
          <Tab.Content className={styles.tabContent}>
            {items.map((tabItem, index) => {
              const { subtitle, description, cover } = tabItem?.fields;

              return (
                <Tab.Pane eventKey={index} key={index}>
                  <div
                    className={classNames(
                      "row justify-content-center",
                      styles.tabContentContainer
                    )}
                  >
                    <div className="col-sm-12 col-md-5 col-lg-5">
                      <div className={styles.contentWrapper}>
                        {subtitle && <h3>{subtitle}</h3>}
                        {description && (
                          <div
                            dangerouslySetInnerHTML={{ __html: description }}
                          ></div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-7 col-lg-7">
                      <div className={styles.contentImg}>
                        {cover && (
                          <Image
                            src={cover.fields?.umbracoFile}
                            alt={cover.system?.name}
                            width={605}
                            height={400}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
              );
            })}
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};
