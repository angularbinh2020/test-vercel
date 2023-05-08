import React from "react";
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

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
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
