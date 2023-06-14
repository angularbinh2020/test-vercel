import Image from "next/image";
import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { IInfoGridBlock } from "sites/mogivi/models/blocks/IInfoGridBlock";
import styles from "./styles.module.scss";

interface InvestorSectionProps {
  infoDetail: IInfoGridBlock;
}

const InvestorSection = (props: InvestorSectionProps) => {
  const {
    investorsTags: investorItems,
    itemTitle,
    subtitle,
  } = props.infoDetail?.fields || {};

  return (
    <Accordion className={styles.container}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h2 className={styles.sectionTitle}>
            {itemTitle} <span className={styles.placeViral}>{subtitle}</span>
          </h2>
        </Accordion.Header>
        <Accordion.Body>
          <div className={styles.investorContent}>
            {investorItems?.map((item, idx) => {
              const { investorLogo, itemTitle, introductionText } =
                item.node.fields.blocks[0].fields;
              if (!investorLogo) return null;
              const { fields, system } = investorLogo;
              return (
                <div key={idx} className="row">
                  <div className="col-12 col-md-4 col-lg-3 mb-4">
                    <Image
                      src={fields?.umbracoFile}
                      alt={system?.name}
                      width={fields?.umbracoWidth || 150}
                      height={fields?.umbracoHeight || 90}
                      layout="responsive"
                    />
                  </div>
                  <div className="col-12 col-md-8 col-lg-8">
                    <div className={styles.investorContentItem}>
                      <h6>
                        <a rel="noopener" href={item.contentSegmentUrl}>
                          <strong>{itemTitle}</strong>
                        </a>
                      </h6>
                      <div
                        className="investor__content-item--body"
                        dangerouslySetInnerHTML={{
                          __html: introductionText,
                        }}
                      ></div>
                      <p>
                        <a rel="noopener" href={item.contentSegmentUrl}>
                          Xem thêm
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default InvestorSection;
