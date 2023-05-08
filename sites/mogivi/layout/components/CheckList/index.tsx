import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { IChecklistBlock } from "sites/mogivi/models/blocks/IChecklistBlock";

import styles from "./styles.module.scss";

export interface CheckListProps {
  block: IChecklistBlock;
}

export const CheckList = (props: CheckListProps) => {
  const { itemTitle, icons, checklistItems } = props.block.fields;
  return (
    <div className={classNames(styles.checkListContainer, "section-container")}>
      <div className="container">
        <div className={styles.serviceIntro}>
          <h2>{itemTitle}</h2>
          <div className={classNames(styles.checkListWrapper)}>
            {icons.map((item, idx) => {
              const { icon, title, text } = item?.fields;
              return (
                <div key={idx} className={classNames(styles.checkListItem)}>
                  {icon && (
                    <div className="mb-sm">
                      <Image
                        className="mx-auto"
                        src={icon.fields?.umbracoFile}
                        width={70}
                        height={70}
                        alt={icon.system.name}
                        objectFit={"cover"}
                      />
                    </div>
                  )}
                  <h3 className={styles.titleLg}>{title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: text }}></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={classNames("box-shadow", styles.rounded)}>
          <div className={styles.pdWrap}>
            <div className={classNames(styles.checkList)}>
              <div className={styles.checkListBody}>
                {checklistItems.map((item, idx) => {
                  return (
                    <div key={idx} className={styles.checkListBodyItem}>
                      <div className={styles.checkListBodyItemText}>
                        <p>{item}</p>
                      </div>
                      <div className={styles.checkListIcon}>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 14 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 1L4.75 9.25L1 5.5"
                            stroke="#f05023"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.checkListBorder}>
                <span className={styles.checkListBorderTitle}>Mogivi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
