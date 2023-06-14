import classNames from "classnames";
import Image from "next/legacy/image";
import React from "react";
import { IBannerFeature } from "sites/mogivi/models/blocks/IBannerFeature";
import styles from "./styles.module.scss";

interface BannerFeatureProps {
  block: IBannerFeature;
}

const BannerFeatureBlock = (props: BannerFeatureProps) => {
  const { leftContent, middleContent, rightContent, subtitle } =
    props.block.fields;
  return (
    <div className={styles.bannerFeatureContainer}>
      <div className={classNames(styles.blockFeature, styles.mainBlock)}>
        <div className="container">
          <div
            className={styles.commonTitle}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          ></div>

          <div className={classNames(styles.mainContentFeature)}>
            <div className={classNames(styles.pathFeature, styles.leftContent)}>
              {leftContent?.map((leftContentItem, i) => (
                <div key={i} className={styles.itemFeature}>
                  {leftContentItem && (
                    <div className={styles.blockImgFeature}>
                      <Image
                        src={leftContentItem.fields.icon.fields?.umbracoFile}
                        width={40}
                        height={40}
                        alt="Image feature"
                        quality={100}
                      />
                    </div>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: leftContentItem.fields.text,
                    }}
                  ></div>
                </div>
              ))}
            </div>

            {middleContent && (
              <div className={styles.middleContentFeature}>
                <Image
                  src={middleContent.fields.umbracoFile}
                  width={middleContent.fields.umbracoWidth}
                  height={middleContent.fields.umbracoHeight}
                  layout="responsive"
                  alt="Image feature"
                />
              </div>
            )}

            <div
              className={classNames(styles.pathFeature, styles.rightContent)}
            >
              {rightContent?.map((rightContentItem, i) => (
                <div key={i} className={styles.itemFeature}>
                  {rightContentItem && (
                    <div className={styles.blockImgFeature}>
                      <Image
                        src={rightContentItem.fields.icon.fields?.umbracoFile}
                        width={40}
                        height={40}
                        alt="Image feature"
                        quality={100}
                      />
                    </div>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: rightContentItem.fields.text,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerFeatureBlock;
