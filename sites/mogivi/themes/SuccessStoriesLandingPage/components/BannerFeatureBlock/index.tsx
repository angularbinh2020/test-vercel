import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { IBannerFeature } from "sites/mogivi/models/blocks/IBannerFeature";
import styles from "./styles.module.scss";

interface BannerFeatureProps {
  block: IBannerFeature;
}

const BannerFeatureBlock = (props: BannerFeatureProps) => {
  const { leftContent, middleContent, rightContent, subtitle, title } =
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
              {leftContent &&
                leftContent.map((leftContentItem, i) => (
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
              {leftContent?.map((rightContentItem, i) => (
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
              {/* <div className={styles.itemFeature}>
                <div className={styles.blockImgFeature}>
                  <img src="https://mogivi.vn/Styles/mogivi-app-intro/images/feature-4.png" alt="Image feature" />
                </div>
                <p>
                  Cung cấp các <span className="fw-bold">dự án hot, tin tức</span> thị trường bất động sản
                  <span className="fw-bold">24/7</span>
                </p>
              </div>

              <div className={styles.itemFeature}>
                <div className={styles.blockImgFeature}>
                  <img src="https://mogivi.vn/Styles/mogivi-app-intro/images/feature-5.png" alt="Image feature" />
                </div>
                <p>
                  Kết nối
                  <span className="fw-bold">cộng đồng môi giới bất động sản uy tín</span>
                  trên toàn quốc để cùng kinh doanh
                </p>
              </div>

              <div className={styles.itemFeature}>
                <div className={styles.blockImgFeature}>
                  <img src="https://mogivi.vn/Styles/mogivi-app-intro/images/feature-6.png" alt="Image feature" />
                </div>
                <p>
                  Dữ liệu <span className="fw-bold">tự động,</span>
                  bộ lọc tìm kiếm <span className="fw-bold">dễ dàng,</span>
                  thao tác <span className="fw-bold">nhanh chóng</span>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerFeatureBlock;
