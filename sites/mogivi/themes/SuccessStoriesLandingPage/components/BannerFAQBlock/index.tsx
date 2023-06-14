import classNames from "classnames";
import Image from "next/legacy/image";
import React from "react";
import { Accordion } from "react-bootstrap";
import { IMogiviPartnerFAQ } from "sites/mogivi/models/blocks/IMogiviPartnerFAQ";
import styles from "./styles.module.scss";

interface BannerFAQProps {
  block: IMogiviPartnerFAQ;
}

const BannerFAQBlock = (props: BannerFAQProps) => {
  const { adviceText, fAQs, image, title } = props.block.fields;
  return (
    <div className={styles.bannerFAQContainer}>
      <div className={classNames(styles.mainBlock, styles.blockFAQ)}>
        <div className="container">
          <div
            className={styles.commonTitle}
            dangerouslySetInnerHTML={{ __html: title }}
          >
            {/* <h3>
              <span>Một số câu hỏi</span> <br />
              <span className="fw-bold">thường gặp</span> về App <span className="fw-bold">Mogivi:</span>
            </h3> */}
          </div>

          <div className={classNames(styles.mainFAQ, "d-flex")}>
            <div className={styles.leftContentFAQ}>
              <div className={styles.listFAQ}>
                <Accordion>
                  {fAQs &&
                    fAQs.map((faqItem, i) => (
                      <Accordion.Item
                        key={i}
                        className={styles.itemFAQ}
                        eventKey={String(i)}
                      >
                        <Accordion.Header className={styles.collapsible}>
                          {faqItem.fields.question}
                        </Accordion.Header>
                        <Accordion.Body className={styles.detailContentFAQ}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: faqItem.fields.answer,
                            }}
                          ></div>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                </Accordion>
              </div>
              {adviceText && (
                <div
                  className="noti"
                  dangerouslySetInnerHTML={{ __html: adviceText }}
                ></div>
              )}
            </div>
            {image && (
              <div className={styles.rightImgFAQ}>
                <Image
                  src={image.fields.umbracoFile}
                  alt="Image FAQ"
                  className="img-FAQ"
                  quality={100}
                  layout="responsive"
                  width={image.fields.umbracoWidth}
                  height={image.fields.umbracoHeight}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerFAQBlock;
