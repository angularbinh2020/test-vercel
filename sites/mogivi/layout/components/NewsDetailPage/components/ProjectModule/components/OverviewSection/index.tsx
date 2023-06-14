import React, { useState } from "react";
import SocialShare from "sites/mogivi/components/SocialShare";
import styles from "./styles.module.scss";
import classNames from "classnames";

import { IETKeyValueItem } from "sites/mogivi/models/IETKeyValueItem";
import GallerySection from "./GallerySection";
import DetailSection from "./DetailSection";
import ConvenientSection from "./ConvenientSection";
import BuildingSection from "./BuildingSection";
import InvestorSection from "./InvestorSection";
import { IETTab } from "sites/mogivi/models/IETTab";
import useViewMode from "hooks/useViewMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
interface OverviewSectionProps {
  tab: IETTab;
}

const OverviewSection = (props: OverviewSectionProps) => {
  const tab = props.tab.fields;
  const overviewItems = tab.blocksInTab[0] || [];
  const introItems = tab.blocksInTab[1] || {};
  const imageItems = tab.blocksInTab[2] || [];
  const detailItems = tab.blocksInTab[3] || [];
  const utilityItems = tab.blocksInTab[4] || [];
  const buildingItems = tab.blocksInTab[5] || [];
  const investorItems = tab.blocksInTab[6] || [];
  const [isReadMore, setIsReadMore] = useState(true);
  const { itemTitle, subtitle, introductionText } = introItems?.fields;
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const { isMobileApp } = useViewMode();

  return (
    <div className="mt-4" id={tab.anchorID} data-tab-anchor-id={tab.anchorID}>
      <div className={classNames("row", styles.detailInfo)}>
        {!isMobileApp ? (
          <div className="col-12 col-md-9 col-lg-9">
            <div className="project-summary__info border-right">
              <div className="row">
                {overviewItems?.fields.groupBlocks?.length !== 0 &&
                  overviewItems.fields.groupBlocks.map(
                    (item: IETKeyValueItem) => (
                      <div
                        className="col-12 col-md-6 col-lg-6"
                        key={`overview-item-id-${item.system.id}`}
                      >
                        <div className="row">
                          <div className="col-12 col-md-12 col-lg-4">
                            <span>{item.fields.label}</span>
                          </div>
                          <div
                            className="col-12 col-md-12 col-lg-8"
                            dangerouslySetInnerHTML={{
                              __html: item.fields.text,
                            }}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        ) : (
          <div className="col-12">
            {overviewItems &&
              overviewItems?.fields.groupBlocks?.map(
                (item: IETKeyValueItem) => (
                  <div
                    className={classNames(
                      "d-flex align-items-center",
                      styles.detailField
                    )}
                    key={`overview-item-id-${item.system.id}`}
                  >
                    <h4>{item.fields.label}</h4>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.fields.text }}
                    ></div>
                  </div>
                )
              )}
          </div>
        )}

        <div className="col-12 d-md-none">
          <SocialShare
            iconSize={30}
            className={classNames("mt-2 text-center", styles.socialShare)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className={styles.introductionTitle + " border-top mt-3 pt-3"}>
            <h2 className={styles.sectionTitle + " sectionTitleFirst"}>
              {itemTitle} <span className={styles.placeViral}>{subtitle}</span>
            </h2>
            <div
              className={classNames(
                "mt-4",
                isReadMore ? styles.briefText : styles.fullText
              )}
              dangerouslySetInnerHTML={{
                __html: introductionText,
              }}
            ></div>
            <div className={styles.collapseBtn}>
              <span onClick={toggleReadMore}>
                {isReadMore ? "Xem thêm" : "Thu gọn"}
              </span>
              <FontAwesomeIcon
                className={styles.collapseIcon}
                icon={isReadMore ? faAngleDown : faAngleUp}
              />
            </div>
          </div>
          <GallerySection infoDetail={imageItems} />
          <DetailSection infoDetail={detailItems} />
          <ConvenientSection infoDetail={utilityItems} />
          <BuildingSection infoDetail={buildingItems} />
          <InvestorSection infoDetail={investorItems} />
        </div>
        <div className="col-0 col-lg-4"></div>
      </div>
    </div>
  );
};

export default OverviewSection;
