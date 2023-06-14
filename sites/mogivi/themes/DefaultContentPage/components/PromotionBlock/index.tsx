import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import Image from "next/legacy/image";
import classNames from "classnames";
import { IImagePosition } from "sites/mogivi/models/IImagePosition";
import { IPromotionBlock } from "sites/mogivi/models/blocks/IPromotionBlock";

interface IPromotionBlockModel {
  block: IPromotionBlock;
}

const PromotionBlock = (props: IPromotionBlockModel) => {
  const { itemTitle, imagePosition, image, text } = props.block.fields;
  if (imagePosition.toLowerCase() === IImagePosition.LEFT.toLowerCase())
    return (
      <div className={styles.promotionContainer}>
        <div className="container">
          <div className={classNames(styles.promotionBox, "row")}>
            <div className="col-lg-6 col-sm-12">
              {image && (
                <div className={styles.prodImg}>
                  <Image
                    src={image.fields.umbracoFile}
                    width={700}
                    height={500}
                    objectFit="contain"
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className={styles.content}>
                {itemTitle && <h3>{itemTitle}</h3>}
                {text && (
                  <div
                    className={styles.text}
                    dangerouslySetInnerHTML={{ __html: text }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  if (imagePosition.toLowerCase() === IImagePosition.RIGHT.toLowerCase()) {
    return (
      <div className={styles.promotionContainer}>
        <div className="container">
          <div
            className={classNames(
              styles.promotionBox,
              styles.flexReverse,
              "row"
            )}
          >
            <div className="col-lg-6 col-sm-12">
              {image && (
                <div className={styles.prodImg}>
                  <Image
                    src={image.fields.umbracoFile}
                    width={700}
                    height={500}
                    objectFit="contain"
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className={styles.content}>
                {itemTitle && <h3>{itemTitle}</h3>}
                {text && (
                  <div
                    className={styles.text}
                    dangerouslySetInnerHTML={{ __html: text }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default PromotionBlock;
