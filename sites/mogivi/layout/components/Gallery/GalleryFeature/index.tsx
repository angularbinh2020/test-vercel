import classNames from "classnames";
import Image from "next/legacy/image";
import React from "react";
import { IFeaturesBlock } from "sites/mogivi/models/blocks/IFeaturesBlock";
import styles from "./styles.module.scss";

export interface GalleryFeatureProps {
  block: IFeaturesBlock;
}

export const GalleryFeature = (props: GalleryFeatureProps) => {
  const { title, subtitle, icons } = props.block.fields;
  return (
    <div className={styles.galleryFeatureContainer}>
      <div className={styles.galleryFeatureTextGroup}>
        <div className="container">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
          <div
            className={classNames("row align-items-center", styles.textCard)}
          >
            {icons &&
              icons.map((item, idx) => {
                const image = item.fields.icon.fields?.umbracoFile;
                const title = item.fields.title || "";
                const text = item.fields.text || "";

                return (
                  <div
                    key={idx}
                    className={classNames(
                      "col-sm-12 col-md-4 col-lg-4 p-0",
                      styles.cardImgContainer
                    )}
                  >
                    <div className={styles.cardImgBox}>
                      <div className={styles.cardImg}>
                        {image && (
                          <Image
                            className="lazyloaded"
                            alt="icon"
                            src={image}
                            width={75}
                            height={75}
                            objectFit="cover"
                          />
                        )}
                      </div>
                      <h1>{title}</h1>
                    </div>
                    <div className={styles.cardDescription}>
                      <h1>{title}</h1>
                      {text && (
                        <div dangerouslySetInnerHTML={{ __html: text }}></div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
