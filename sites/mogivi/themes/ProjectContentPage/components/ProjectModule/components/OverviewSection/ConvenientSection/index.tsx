import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { IInfoGridBlock } from "sites/mogivi/models/blocks/IInfoGridBlock";
import styles from "./styles.module.scss";

interface ConvenientSectionProps {
  infoDetail: IInfoGridBlock;
}

const ConvenientSection = (props: ConvenientSectionProps) => {
  const {
    groupBlocks: utilitiesItems,
    itemTitle,
    subtitle,
  } = props.infoDetail?.fields;

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
            <div className={styles.utilities}>
              <ul className={styles.utilitiesItem}>
                {utilitiesItems.map((item, idx) => {
                  return <li key={idx}>{item.fields.text}</li>;
                })}
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default ConvenientSection;
