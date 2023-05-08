import classNames from "classnames";
import Image from "next/image";
import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { IETDownloadGoogleDriveItem } from "sites/mogivi/models/IETDownloadGoogleDriveItem";
import { IETTab } from "sites/mogivi/models/IETTab";

import styles from "./styles.module.scss";

interface DocumentSectionProps {
  tab: IETTab;
}

const DocumentSection = (props: DocumentSectionProps) => {
  const tab = props.tab.fields;
  const { itemTitle, subtitle, groupBlocks } = tab.blocksInTab[0]?.fields;

  return (
    <>
      <div className="col-12 col-lg-8" id={tab.anchorID}>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h2 className={styles.sectionTitle}>
                {itemTitle}{" "}
                <span className={styles.placeViral}>{subtitle}</span>
              </h2>
            </Accordion.Header>
            <Accordion.Body>
              <div data-tab-anchor-id={tab.anchorID}>
                <div className="row">
                  <div className="col-12 mb-4">
                    <div className={styles.downloadContentItem}>
                      {groupBlocks &&
                        groupBlocks?.map(
                          (item: IETDownloadGoogleDriveItem, idx: number) => {
                            const {
                              itemTitle,
                              pageSummary,
                              googleDriveURL,
                              cover,
                            } = item.fields;
                            return (
                              <div key={idx} className="row mb-3">
                                <div
                                  className={classNames(
                                    "col-4 col-md-4 col-lg-3",
                                    styles.documentImg
                                  )}
                                >
                                  <Image
                                    className="img-fluid"
                                    alt={itemTitle}
                                    src={cover.fields.umbracoFile}
                                    title={itemTitle}
                                    width={1000}
                                    height={1000}
                                  />
                                </div>
                                <div className="col-8 col-md-8 col-lg-9">
                                  <h4>{itemTitle}</h4>
                                  <p>{pageSummary}</p>
                                  <p>
                                    <a
                                      href={googleDriveURL.url}
                                      className={classNames(
                                        "btn mt-3 mt-md-3 mt-lg-4",
                                        styles.downloadBtn
                                      )}
                                      target={googleDriveURL.target}
                                    >
                                      Tải tài liệu
                                    </a>
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="col-0 col-lg-4"></div>
    </>
  );
};

export default DocumentSection;
