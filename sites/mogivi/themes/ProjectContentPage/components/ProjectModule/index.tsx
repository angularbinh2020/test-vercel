import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { IProjectModule } from "sites/mogivi/models/blocks/IProjectModule";
import TabSectionRender from "./components/TabSectionRender";
import styles from "./styles.module.scss";
import { useGetPageDataContext } from "context/page-data.context";
import { IBlock } from "models/blocks/IBlock";
import useViewMode from "hooks/useViewMode";
import { Tab, Tabs } from "react-bootstrap";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkItem from "components/LinkItem";
import Image from "next/legacy/image";
import { CONTENT_TYPE } from "const/content-type";
import { IGoogleDriveDocuments } from "sites/mogivi/models/IGoogleDriveDocuments";
import { ILinkInfo } from "sites/mogivi/models/ILinkInfo";
import { IPDFDocuments } from "sites/mogivi/models/blocks/IPDFDocuments";
import { IETProgressReport } from "sites/mogivi/models/IETProgressReport";

interface BlockProps {
  block: IProjectModule;
}

const ProjectModule = (props: BlockProps) => {
  const tabs = props.block.fields.tabs;
  const { isMobileApp } = useViewMode();
  const [currentAnchorId, setCurrentAnchorId] = useState("");
  const handleClick = useCallback((anchorId: string) => {
    setCurrentAnchorId(anchorId);
    const tabSection = document.getElementById(anchorId);
    const linkElement = document.createElement("a");
    linkElement.href = `#${anchorId}`;
    document.body.appendChild(linkElement);
    if (tabSection) {
      const tabHeaders = tabSection.querySelectorAll("[data-tab-opened]");
      tabHeaders.forEach((tabHeader: any) => {
        const isTabClose =
          tabHeader.getAttribute("data-tab-opened") === "false";
        if (isTabClose) {
          const btnElement = tabHeader.querySelector("button");
          (btnElement || tabHeader).click();
        }
      });
    }
    linkElement.click();
    linkElement.remove();
  }, []);
  const isTabActive = useCallback(
    (anchorID: string, tabIndex: number) => {
      return currentAnchorId === anchorID || (!currentAnchorId && !tabIndex);
    },
    [currentAnchorId]
  );

  const pageData = useGetPageDataContext();
  const { mobileAppBlocks } = pageData?.currentNode?.fields || {};
  const mobileBlocks =
    mobileAppBlocks?.filter(
      (block: IBlock) => block.system.contentType === CONTENT_TYPE.eTTextItem
    ) || [];

  const getFieldConfig = useCallback(
    (fieldName: string, type: "filter" | "find") => {
      if (!mobileAppBlocks?.length) return {};
      if (type === "filter") {
        return mobileAppBlocks.filter(
          (block: IBlock) => block.system.contentType === fieldName
        );
      }
      if (type === "find") {
        return mobileAppBlocks.find(
          (block: IBlock) => block.system.contentType === fieldName
        );
      }
    },
    [mobileAppBlocks]
  );

  const pdfDocuments = getFieldConfig(
    "pDFDocuments",
    "filter"
  ) as IPDFDocuments[];
  const progressReport = getFieldConfig(
    "eTProgressReport",
    "find"
  ) as IETProgressReport;

  const googleDriveDocuments = getFieldConfig(
    "googleDriveDocuments",
    "find"
  ) as IGoogleDriveDocuments;
  const googleDriveUrl: ILinkInfo =
    googleDriveDocuments?.fields?.groupBlocks[0]?.fields?.googleDriveURL;
  const showMobileView =
    isMobileApp && mobileBlocks && mobileBlocks?.length !== 0;
  if (showMobileView)
    return (
      <div className={classNames("container", styles.tabsContainer)}>
        <Tabs
          defaultActiveKey="document"
          className={styles.tabs}
          transition={false}
        >
          <Tab eventKey="document" title={"Tài liệu"} className={styles.tab}>
            <div className={styles.documentContainer}>
              {googleDriveUrl && (
                <div className={styles.saleDocument}>
                  <LinkItem
                    url={googleDriveUrl?.url}
                    target={googleDriveUrl?.target}
                  >
                    {googleDriveUrl?.name}
                  </LinkItem>
                </div>
              )}
              {pdfDocuments &&
                pdfDocuments?.length !== 0 &&
                pdfDocuments.map((pdfDocument, pdfIdx) => (
                  <div key={pdfIdx} className={styles.juridicalDocuments}>
                    {pdfDocument.fields?.itemTitle !== "" && (
                      <h2>{pdfDocument?.fields?.itemTitle}</h2>
                    )}
                    {pdfDocument.fields.documents?.length !== 0 && (
                      <div className={styles.juridicalDocumentBox}>
                        {pdfDocument?.fields.documents.map((docItem, idx) => {
                          const { pdfFile } = docItem.fields;
                          return (
                            <LinkItem
                              url={pdfFile?.fields?.umbracoFile}
                              target="_blank"
                              className={styles.juridicalDocumentItem}
                              key={idx}
                            >
                              <FontAwesomeIcon
                                icon={faDownload}
                                className={styles.iconDownload}
                                width={30}
                                height={30}
                              />
                              <p>{pdfFile?.system?.name}</p>
                            </LinkItem>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </Tab>
          <Tab eventKey="progress" title={"Tiến độ"} className={styles.tab}>
            {progressReport?.fields && (
              <div className={styles.progressContainer}>
                {progressReport.fields.itemTitle && (
                  <h6>{progressReport?.fields?.itemTitle}</h6>
                )}
                {Boolean(progressReport.fields.images?.length) && (
                  <div className={styles.progressBox}>
                    {progressReport.fields.images?.map((imageItem, idx) => {
                      return (
                        <div key={idx} className={styles.progressItem}>
                          {imageItem?.fields?.description !== "" && (
                            <h6>{imageItem?.fields?.description}</h6>
                          )}
                          <div className={styles.progressItemImage}>
                            {imageItem?.fields?.image && (
                              <Image
                                src={
                                  imageItem?.fields?.image?.fields?.umbracoFile
                                }
                                width={1200}
                                height={750}
                                objectFit="cover"
                                alt={imageItem?.fields?.image?.system?.name}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    );
  return (
    <div className={classNames("container", styles.projectModuleContainer)}>
      <ul className="list-unstyled d-flex align-items-center mw-100 overflow-auto">
        {tabs.map((tab, tabIndex) => (
          <li
            key={`tab-header-${tab.fields.anchorID}`}
            onClick={() => {
              handleClick(tab.fields.anchorID);
            }}
            className={classNames(
              styles.tabHeader,
              "text-nowrap",
              isTabActive(tab.fields.anchorID, tabIndex) && styles.active
            )}
          >
            <span>{tab.fields.title}</span>
          </li>
        ))}
      </ul>
      {tabs.map((tab) => (
        <TabSectionRender tab={tab} key={`tab-body-${tab.fields.anchorID}`} />
      ))}
    </div>
  );
};

export default ProjectModule;
