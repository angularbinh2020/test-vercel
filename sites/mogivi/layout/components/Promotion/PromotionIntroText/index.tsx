import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { ITextBlock } from "sites/mogivi/models/blocks/ITextBlock";
import styles from "./styles.module.scss";

export interface PromotionIntroTextProps {
  block: ITextBlock;
}

export const PromotionIntroText = (props: PromotionIntroTextProps) => {
  const { itemTitle, content, buttons } = props.block.fields;
  return (
    <div className={styles.promotionIntroContainer}>
      <div className={styles.promotionIntroTextGroup}>
        <div className="container">
          <div
            className={classNames(
              "row align-items-center",
              styles.promotionBox
            )}
          >
            <div className={classNames("col-md-7 col-lg-7 p-0")}>
              <div
                className={styles.leftContent}
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </div>
            <div className={classNames("col-md-5 col-lg-5 p-0")}>
              <div className={styles.rightContent}>
                <h2>{itemTitle}</h2>
                {buttons && (
                  <div className={styles.btnAction}>
                    <Link href={buttons[0].url}>
                      <a>
                        <button className="btn-orange">
                          {buttons[0].name}
                        </button>
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
