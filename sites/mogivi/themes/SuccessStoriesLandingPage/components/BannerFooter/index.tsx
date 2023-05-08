import classNames from "classnames";
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IBannerFooterApp } from "sites/mogivi/models/blocks/IBannerFooterApp";
import styles from "./styles.module.scss";

interface BannerFooterProps {
  block: IBannerFooterApp;
}

const BannerFooter = (props: BannerFooterProps) => {
  const {
    backgroundImage,
    footerMobileImage,
    footerMobileLogo,
    links,
    qRCode,
    subtitle,
    subtitleMobile,
  } = props.block.fields;
  const bgImg = backgroundImage.fields?.umbracoFile
    ? backgroundImage.fields?.umbracoFile
    : "";
  return (
    <div className={styles.bannerFooterContainer}>
      {bgImg && (
        <Image
          quality={100}
          src={bgImg}
          objectFit="cover"
          layout="fill"
          alt=""
        />
      )}
      <div className={styles.footerD}>
        <div className="container">
          <div
            className={styles.titleFooter}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          >
            {/* <h3>
              Hãy để App <span className="big-style">Mogivi</span> là <span className="fw-bold">trợ thủ đắc lực</span>
              cho bạn trên con đường kiếm được <span className="fw-bold">nguồn thu nhập không giới hạn</span>
              từ bất động sản!
            </h3> */}
          </div>
        </div>

        <div className={classNames(styles.blockInstall, styles.appDownload)}>
          {qRCode && (
            <div className={styles.appQR}>
              <h5>Scan</h5>
              <Image
                src={qRCode.fields.umbracoFile}
                width={120}
                height={120}
                alt={qRCode.system.name}
                quality={100}
              />
            </div>
          )}
          <div className={styles.appLink}>
            <h5>Cài đặt ngay</h5>
            <div className={styles.appLinkInstall}>
              {links.map((item, i) => (
                <Link key={i} href={item.fields.links[0].url}>
                  <a
                    target={
                      item.fields.links[0].target
                        ? item.fields.links[0].target
                        : "_self"
                    }
                  >
                    <Image
                      quality={100}
                      src={item.fields.imageDesktop.fields.umbracoFile}
                      width={item.fields.imageDesktop.fields.umbracoWidth}
                      height={item.fields.imageDesktop.fields.umbracoHeight}
                      alt={item.fields.imageDesktop.system.name}
                    />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerM}>
        <div className="app_f">
          <div className="container">
            {subtitleMobile ? (
              <div
                className={styles.titleFooter}
                dangerouslySetInnerHTML={{ __html: subtitleMobile }}
              ></div>
            ) : (
              <div className={styles.titleFooter}>
                <h3>
                  <span className="big-style">Tải MOGIVI APP</span> để tham gia,
                  trao đổi và chia sẻ giỏ hàng và cập nhật tin tức trong cộng
                  đồng <span className="fw-bold">Môi giới bất động sản</span>
                </h3>
              </div>
            )}
          </div>
          <div className={styles.appFooterMobile}>
            {footerMobileImage && (
              <div className={styles.appFooterMobileLeft}>
                <Image
                  src={footerMobileImage.fields.umbracoFile}
                  className={styles.appFooterPhone}
                  alt="img"
                  width={footerMobileImage.fields.umbracoWidth}
                  height={footerMobileImage.fields.umbracoHeight}
                />
              </div>
            )}
            <div className={styles.appFooterMobileRight}>
              {footerMobileLogo && (
                <Image
                  src={footerMobileLogo.fields.umbracoFile}
                  width={footerMobileLogo.fields.umbracoWidth}
                  height={footerMobileLogo.fields.umbracoHeight}
                  alt=""
                  layout="responsive"
                  quality={100}
                />
              )}
              <h5>
                Click để tải ứng dụng MOGIVI tại AppStore và Google Play Store,
                hoàn toàn miễn phí.
              </h5>
              <div className={styles.appLinkInstall}>
                {links.map((item, i) => (
                  <Link key={i} href={item.fields.links[0].url}>
                    <a
                      target={
                        item.fields.links[0].target
                          ? item.fields.links[0].target
                          : "_self"
                      }
                    >
                      <Image
                        src={item.fields.imageDesktop.fields.umbracoFile}
                        width={item.fields.imageDesktop.fields.umbracoWidth}
                        height={item.fields.imageDesktop.fields.umbracoHeight}
                        alt={item.fields.imageDesktop.system.name}
                        quality={100}
                      />
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="container">
            <div
              className={styles.titleFooter}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerFooter;
