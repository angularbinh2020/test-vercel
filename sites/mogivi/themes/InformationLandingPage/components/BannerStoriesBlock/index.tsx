import classNames from "classnames";
import useViewMode from "hooks/useViewMode";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IBannerStoryIntroduction } from "sites/mogivi/models/blocks/IBannerStoryIntroduction";
import styles from "./styles.module.scss";
import { useMemo } from "react";
interface BannerStoriesProps {
  block: IBannerStoryIntroduction;
}

const BannerStoriesBlock = (props: BannerStoriesProps) => {
  const {
    imageDesktop,
    imageMobile,
    imageText,
    links,
    qRCode,
    subtitle,
    title,
  } = props.block.fields;
  const { isMobileS } = useViewMode();

  const aboutUsImage = useMemo(() => {
    return (isMobileS && imageMobile) || imageDesktop;
  }, [isMobileS, imageMobile]);

  return (
    <div className={styles.bannerStoriesContainer}>
      <div className={styles.blockAboutUs}>
        <div className="container">
          {subtitle && (
            <div
              className={styles.introText}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            ></div>
          )}
          {imageText && (
            <div className={classNames("d-flex", styles.textImg)}>
              <Image
                src={imageText.fields.umbracoFile}
                title={imageText.system.name}
                alt="Image about us"
                width={imageText.fields.umbracoWidth}
                height={imageText.fields.umbracoHeight}
                quality={100}
                priority={true}
              />
            </div>
          )}

          <div className={styles.installAppBottom}>
            <div className={classNames(styles.appDownload, styles.appD)}>
              <div className={styles.appQR}>
                <h5 className={styles.appScanText}>SCAN</h5>
                {qRCode && (
                  <Image
                    src={qRCode.fields.umbracoFile}
                    width={100}
                    height={100}
                    title={qRCode.system.name}
                    alt={qRCode.system.name}
                    quality={100}
                  />
                )}
              </div>
              <div className={styles.appLink}>
                <h5 className={styles.appScanText}>GET ON :</h5>
                <div className={styles.appLinkInstall}>
                  {links?.map((item, i) => {
                    const url = item.fields.links[0]?.url
                      ? item.fields.links[0]?.url
                      : "#";
                    const image =
                      item.fields?.imageDesktop?.fields?.umbracoFile;
                    return (
                      <Link href={url} key={i}>
                        <a>
                          {image && (
                            <Image
                              src={image}
                              alt="Install ios"
                              className="icon-install"
                              quality={100}
                              height={
                                item.fields?.imageDesktop?.fields.umbracoHeight
                              }
                              width={
                                item.fields?.imageDesktop?.fields.umbracoWidth
                              }
                            />
                          )}
                        </a>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={classNames(styles.appM, styles.appDownload)}>
              <div className={styles.appLink}>
                <h5 className="app_scan_text d-none">Click để tải ứng dụng</h5>
                <div className={styles.appLinkInstall}>
                  {links?.map((item, i) => {
                    const url = item.fields.links[0]?.url
                      ? item.fields.links[0]?.url
                      : "#";
                    const image = item.fields?.imageMobile?.fields;
                    return (
                      <Link href={url} key={i}>
                        <a>
                          {image && (
                            <Image
                              src={image.umbracoFile}
                              alt="Install ios"
                              className="icon-install"
                              quality={100}
                              height={image.umbracoHeight}
                              width={image.umbracoWidth}
                            />
                          )}
                        </a>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.imgAbout}>
            {aboutUsImage && (
              <Image
                src={aboutUsImage.fields.umbracoFile}
                alt=" Image about us"
                width={aboutUsImage.fields.umbracoWidth}
                height={aboutUsImage.fields.umbracoHeight}
                quality={100}
                priority={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerStoriesBlock;
