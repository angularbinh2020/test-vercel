import classNames from "classnames";
import Image from "next/image";
import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { IInfoGridBlock } from "sites/mogivi/models/blocks/IInfoGridBlock";
import styles from "./styles.module.scss";

interface BuildingSectionProps {
  infoDetail: IInfoGridBlock;
}

const BuildingSection = (props: BuildingSectionProps) => {
  const {
    groupBlocks: buildingItems,
    itemTitle,
    subtitle,
  } = props.infoDetail?.fields;
  const [activeKey, setActiveKey] = useState("");
  const handleOnClick = (e: any) => {
    if (activeKey) setActiveKey("");
    else setActiveKey("0");
  };

  return (
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
          <div className={styles.buildingContent}>
            <div className="row">
              {buildingItems?.map((item, idx) => {
                const { image, procedure, block, moreInfo } = item.fields;
                return (
                  <div key={idx} className="col-12 col-md-4 col-lg-4 mb-3">
                    <div className={styles.buildingContentItem}>
                      <div
                        className={classNames(
                          styles.buildingContentItemBody,
                          "p-3 shadow"
                        )}
                      >
                        <Image
                          src={image?.fields?.umbracoFile}
                          alt={image?.system?.name}
                          width={250}
                          height={"100%"}
                        />
                        <h4>{block}</h4>
                        <p className={styles.textOrange}>
                          {procedure.contentName}
                        </p>
                        {moreInfo.map((infoItem, idxItem) => {
                          return (
                            <div key={idxItem}>
                              <div
                                className={styles.textOrange}
                                dangerouslySetInnerHTML={{
                                  __html: infoItem.fields.label,
                                }}
                              ></div>
                              <h6
                                dangerouslySetInnerHTML={{
                                  __html: infoItem.fields.text,
                                }}
                              ></h6>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default BuildingSection;
