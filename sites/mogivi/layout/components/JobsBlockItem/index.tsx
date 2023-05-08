import classNames from "classnames";
import React from "react";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import { IJobsBlock } from "sites/mogivi/models/blocks/IJobsBlock";
import styles from "./styles.module.scss";

export interface JobsBlockItemProps {
  block: IJobsBlock;
}

const JobsBlockItem = (props: JobsBlockItemProps) => {
  const { itemTitle, tabItems } = props.block?.fields;
  return (
    <div className={styles.jobsContainer}>
      <h2>{itemTitle}</h2>
      <Tabs
        defaultActiveKey="0"
        id="tab-control"
        className={classNames("mb-3", styles.tabPanel)}
      >
        {tabItems.map((item, idx) => {
          const tabs = item.fields.jobTabItem ? item.fields.jobTabItem : [];
          return (
            tabs && (
              <Tab key={idx} eventKey={idx} title={item.fields.title}>
                <Accordion defaultActiveKey="0">
                  {item.fields.jobTabItem?.map((job, tabIdx: number) => {
                    return (
                      <Accordion.Item
                        key={tabIdx}
                        className={styles.accordionItem}
                        eventKey={tabIdx.toString()}
                      >
                        <Accordion.Header className={styles.accordionHeader}>
                          {job.fields.jobName}
                        </Accordion.Header>
                        <Accordion.Body
                          className={styles.accordionBody}
                          dangerouslySetInnerHTML={{
                            __html: job.fields.jobDescription,
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
export default JobsBlockItem;
