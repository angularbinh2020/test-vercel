import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { IBannerDetailFeature } from "sites/mogivi/models/blocks/IBannerDetailFeature";
import styles from "./styles.module.scss";

interface BannerDetailFeatureProps {
  block: IBannerDetailFeature;
}

const BannerDetailFeatureBlock = (props: BannerDetailFeatureProps) => {
  const {
    image,
    itemHighlightFeature,
    secondHighlightFeature,
    subtitle,
    title,
  } = props.block.fields;
  return (
    <div className={styles.bannerDetailFeatureContainer}>
      <div
        className={classNames(styles.mainBlock, styles.blockHighlightFeature)}
      >
        <div className="container">
          <div
            className={styles.commonTitle}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          >
            {/* <h3>
              Giới thiệu chi tiết <span className="black-title fw-bold">các tính năng</span> <br />
              <span className="fw-bold">nổi bật</span> nổi bật <span className="fw-bold">Mogivi</span>
            </h3> */}
          </div>

          <div className={styles.mainHighlightFeature}>
            <div className={styles.itemHighlightFeature}>
              {itemHighlightFeature && (
                <>
                  <div
                    className={styles.titleHighlight}
                    dangerouslySetInnerHTML={{
                      __html: itemHighlightFeature[0].fields.title,
                    }}
                  ></div>
                  <div className={styles.smallContentHighlight}>
                    {itemHighlightFeature[0].fields.textBlocks.map(
                      (item, i) => (
                        <div
                          key={i}
                          className={classNames(styles.pathHighlight)}
                          dangerouslySetInnerHTML={{ __html: item.fields.text }}
                        ></div>
                      )
                    )}
                  </div>
                </>
              )}
            </div>

            <div className={styles.blockSecondHighlight}>
              <div className={styles.blockTextHighlight}>
                {secondHighlightFeature.map((secondFeatureItem) => (
                  <div
                    key={`${secondFeatureItem.system.id}`}
                    className={styles.itemHighlightFeature}
                  >
                    <div
                      className={styles.titleHighlight}
                      dangerouslySetInnerHTML={{
                        __html: secondFeatureItem.fields.title,
                      }}
                    ></div>
                    <div className={styles.smallContentHighlight}>
                      {secondFeatureItem.fields.textBlocks.map(
                        (textBlock, i) => (
                          <div
                            key={i}
                            className={classNames(styles.pathHighlight)}
                            dangerouslySetInnerHTML={{
                              __html: textBlock.fields.text,
                            }}
                          ></div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {image && (
                <div className={styles.blockImgHighlight}>
                  <Image
                    src={image.fields.umbracoFile}
                    alt="Image highlight"
                    className="img-hightlight"
                    width={image.fields.umbracoWidth}
                    height={image.fields.umbracoHeight}
                    quality={100}
                    layout="responsive"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerDetailFeatureBlock;
