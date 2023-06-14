import React, { useCallback, useMemo } from "react";
import styles from "./styles.module.scss";
import arrow from "sites/mogivi/assets/icons/arrow.svg";
import classNames from "classnames";
import { IBannerSubpageBlock } from "sites/mogivi/models/blocks/IBannerSubpageBlock";
import Image from "next/legacy/image";
import LinkItem from "components/LinkItem";
import { useRouter } from "next/router";

export interface IBannerSubpageProps {
  block: IBannerSubpageBlock;
}

const BannerSubpage = (props: IBannerSubpageProps) => {
  const {
    itemTitle,
    image,
    links,
    subtitle,
    contentBgColour,
    textBackground,
    backgroundImageSize,
    backgroundImagePosition,
    contentPosition,
    buttonArrow,
  } = props.block.fields;

  const backgroundStyle = useMemo(() => {
    const styles: any = {
      color: `#${contentBgColour !== "" ? contentBgColour : "fff"}`,
    };
    if (backgroundImageSize) styles.backgroundSize = backgroundImageSize;
    if (backgroundImagePosition)
      styles.backgroundPosition = backgroundImagePosition;
    return styles;
  }, []);

  const router = useRouter();

  const handleContentPosition = useCallback((position: string) => {
    if (position) {
      if (position === "center") {
        return styles.positionCenter;
      }
      if (position === "right") {
        return styles.positionRight;
      }
    }
    return "";
  }, []);

  return (
    <>
      <div className={styles.bannerContainer} style={backgroundStyle}>
        {image?.fields?.umbracoFile && (
          <div
            className={classNames(
              "position-absolute w-100 h-100",
              styles.imgBanner
            )}
          >
            <div className="position-relative w-100 h-100">
              <Image
                src={image?.fields?.umbracoFile}
                quality={100}
                layout="fill"
                alt="banner"
                priority
                objectFit="cover"
              />
            </div>
          </div>
        )}
        <div className="container">
          <div className={styles.bannerContent}>
            <div
              className={classNames(
                textBackground ? styles.bgPadding : "",
                handleContentPosition(contentPosition)
              )}
            >
              <div
                className={classNames(
                  textBackground ? styles.bannerContentCover : ""
                )}
              >
                {itemTitle && <h1>{itemTitle}</h1>}
                {subtitle && (
                  <div
                    className={styles.subtitle}
                    dangerouslySetInnerHTML={{ __html: subtitle }}
                  ></div>
                )}
                <div className={styles.linkContainer}>
                  {links?.map((item, idx: any) => {
                    const linkUrl = item.url || "#";
                    const onClickHandle = linkUrl.startsWith("#")
                      ? (
                          e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                        ) => {
                          e.preventDefault();
                          e.stopPropagation();
                          document.querySelector(linkUrl)?.scrollIntoView();
                        }
                      : () => {};
                    return buttonArrow ? (
                      <LinkItem
                        key={idx}
                        url={linkUrl}
                        className={classNames(styles.btnLink)}
                        target={item?.target}
                        onClick={onClickHandle}
                      >
                        <span>{item?.name}</span>{" "}
                        <div className={styles.arrowIcon}>
                          <Image
                            src={arrow}
                            width={30}
                            height={30}
                            objectFit="contain"
                            alt="icon"
                          />
                        </div>
                      </LinkItem>
                    ) : (
                      <LinkItem
                        key={idx}
                        url={linkUrl}
                        onClick={onClickHandle}
                        className={classNames(
                          "btn-white--outline",
                          item?.url?.includes(router?.asPath)
                            ? styles.linkActive
                            : ""
                        )}
                        target={item?.target}
                      >
                        <span>{item.name}</span>
                      </LinkItem>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BannerSubpage;
