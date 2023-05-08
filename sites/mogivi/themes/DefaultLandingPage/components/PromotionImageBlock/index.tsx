import React from "react";
import styles from "./promotion-image.module.scss";
import Image from "next/image";
import Link from "next/link";
import { IBannerImageLink } from "sites/mogivi/models/blocks/IBannerImageLink";

interface PromotionImageProps {
  block: IBannerImageLink;
}

const PromotionImage = (props: PromotionImageProps) => {
  const { image, imageLink, text, title } = props.block.fields;
  return (
    <div className={styles.promotionContainer}>
      <div className="container">
        <div className={styles.promotionBody}>
          {image && (
            <div className={styles.imgPromotion}>
              <Image
                src={image.fields?.umbracoFile}
                width={600}
                height={600}
                alt="promotion"
                objectFit={"contain"}
                title={image.system.name}
              />
            </div>
          )}
          <div className={styles.promotionInfo}>
            {title && <h1 className={styles.title}>{title}</h1>}
            {text && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: text }}
              ></div>
            )}
            {imageLink && imageLink?.length && (
              <div className={styles.appContainer}>
                {imageLink.map((imageItem, idx) => (
                  <div key={idx} className={styles.icDownload}>
                    <Link href={imageItem.fields.link?.url ?? "#"}>
                      <a
                        target={
                          imageItem.fields.link?.target
                            ? imageItem.fields.link?.target
                            : "_self"
                        }
                      >
                        {imageItem.fields?.image && (
                          <Image
                            src={imageItem.fields?.image.fields.umbracoFile}
                            alt={imageItem.fields?.image.system.name}
                            title={imageItem.fields?.image.system.name}
                            width={150}
                            height={50}
                            objectFit="contain"
                          />
                        )}
                      </a>
                    </Link>
                  </div>
                ))}

                {/* <div className={`${styles.icDownload} ms-2`}>
                  <Link href="#">
                    <Image src={icDownloadGooglePlay} alt="download google play" />
                  </Link>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionImage;
