import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { IBannerReason } from "sites/mogivi/models/blocks/IBannerReason";
import styles from "./styles.module.scss";

interface BannerReasonProps {
  block: IBannerReason;
}

const BannerReasonBlock = (props: BannerReasonProps) => {
  const { image, subtitle, title } = props.block.fields;
  return (
    <div className={styles.bannerReasonContainer}>
      <div className={classNames(styles.blockReason, styles.mainBlock)}>
        <div className="container">
          <div
            className={styles.commonTitle}
            dangerouslySetInnerHTML={{ __html: title }}
          >
            {/* <h3 className={styles.bigTitle}>
              <span>Những lý do Môi giới</span> <br />
              <strong>nên chọn </strong> sử dụng App <strong>Mogivi</strong>
            </h3> */}
          </div>

          <div className={styles.mainContentReason}>
            <div
              className={styles.blockTextReason}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            ></div>
            {image && (
              <div className={styles.blockImgReason}>
                <Image
                  src={image.fields.umbracoFile}
                  width={image.fields.umbracoWidth}
                  height={image.fields.umbracoHeight}
                  alt="reason"
                  className="img-reason"
                  quality={100}
                  layout="responsive"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerReasonBlock;
