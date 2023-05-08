import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { IInfoGridBlock } from "sites/mogivi/models/blocks/IInfoGridBlock";
import styles from "./styles.module.scss";
interface DetailSectionProps {
  infoDetail: IInfoGridBlock;
}

const DetailSection = (props: DetailSectionProps) => {
  const {
    groupBlocks: infoDetailItems,
    itemTitle,
    subtitle,
  } = props.infoDetail.fields;
  const [activeKey, setActiveKey] = useState("");
  const handleOnClick = (e: any) => {
    if (activeKey) setActiveKey("");
    else setActiveKey("0");
  };
  return (
    <>
      <Accordion activeKey={activeKey}>
        <Accordion.Item eventKey="0">
          <Accordion.Header
            onClick={handleOnClick}
            data-tab-opened={activeKey ? "true" : "false"}
          >
            <h2 className={styles.sectionTitle}>
              {itemTitle} <span className={styles.placeViral}>{subtitle}</span>
            </h2>
          </Accordion.Header>
          <Accordion.Body>
            <div className="row">
              {infoDetailItems.map((item, idx) => {
                return (
                  <div key={idx} className="col-12 mb-3">
                    <div
                      className={classNames(
                        "d-flex justify-content-between border-bottom border-1"
                      )}
                    >
                      <span>{item.fields.label}</span>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.fields.text }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default DetailSection;
