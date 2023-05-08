import classNames from "classnames";
import React from "react";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import { IFaqsBlock } from "sites/mogivi/models/blocks/IFaqsBlock";
import styles from "./styles.module.scss";

export interface FAQBlockItemProps {
  block: IFaqsBlock;
}

const FAQBlockItem = (props: FAQBlockItemProps) => {
  const { itemTitle, tabItems } = props.block?.fields;
  return (
    <div className={styles.faqsContainer}>
      <h2>{itemTitle}</h2>
      <Tabs
        defaultActiveKey="0"
        id="tab-control"
        className={classNames("mb-3", styles.tabPanel)}
      >
        {tabItems.map((item, idx) => {
          const tabs = item.fields.faqItem ? item.fields.faqItem : [];
          return (
            tabs && (
              <Tab key={idx} eventKey={idx} title={item.fields.title}>
                <Accordion defaultActiveKey="0">
                  {item.fields.faqItem?.map((faq, tabIdx: number) => {
                    return (
                      <Accordion.Item
                        key={tabIdx}
                        className={styles.accordionItem}
                        eventKey={tabIdx.toString()}
                      >
                        <Accordion.Header className={styles.accordionHeader}>
                          {faq.fields.question}
                        </Accordion.Header>
                        <Accordion.Body
                          className={styles.accordionBody}
                          dangerouslySetInnerHTML={{
                            __html: faq.fields.answer,
                          }}
                        ></Accordion.Body>
                      </Accordion.Item>
                    );
                  })}
                </Accordion>
              </Tab>
            )
          );
        })}
      </Tabs>
    </div>
  );
};
export default FAQBlockItem;
