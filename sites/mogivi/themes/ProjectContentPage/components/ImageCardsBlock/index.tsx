import classNames from "classnames";
import useViewMode from "hooks/useViewMode";
import { IDeviceDetected } from "models/IDeviceDetected";
import Image from "next/legacy/image";
import React, { useState, useCallback, useMemo } from "react";
import Slider from "components/ReactSlickSlider";
import { IImageCardsBlock } from "sites/mogivi/models/blocks/IImageCardsBlock";
import styles from "./styles.module.scss";
import { useGetPageDataContext } from "context/page-data.context";
import { IBlock } from "models/blocks/IBlock";
import { CONTENT_TYPE } from "const/content-type";
import ITag from "models/ITag";
import { MOGIVI_CONTENT_TYPE } from "sites/mogivi/const/content-type";
import { IProjectModule } from "sites/mogivi/models/blocks/IProjectModule";

interface BlockProps extends IDeviceDetected {
  block: IImageCardsBlock;
}

const ImageCardsBlock = (props: BlockProps) => {
  const { isMobile } = props;
  const groupBlocks = props.block.fields.groupBlocks;
  const maxImageIndexDisplay = isMobile ? 1 : 3;
  const { isMobileApp } = useViewMode();

  const pageData = useGetPageDataContext();
  const { mobileAppBlocks } = pageData?.currentNode?.fields || {};
  const mobileBlocks: any =
    mobileAppBlocks?.filter(
      (block: IBlock) => block.system.contentType === CONTENT_TYPE.eTTextItem
    ) || [];

  const getFieldConfig = useCallback(
    (fieldName: any) =>
      //@ts-ignore
      pageData?.currentNode?.fields[fieldName],
    [pageData]
  );
  const socialMediaImage = getFieldConfig("socialMediaImage");
  const menuTitle: string = getFieldConfig("menuTitle");
  const productsTags: ITag[] = getFieldConfig("productsTags");

  const blocks: IBlock[] = getFieldConfig("blocks");
  const projectModule = (blocks?.find((block) => {
    if (block.system.contentType === MOGIVI_CONTENT_TYPE.projectModuleBlock) {
      return block;
    }
  }) ?? {}) as IProjectModule;
  const tabs = projectModule?.fields?.tabs ?? [];
  const blocksInTabGroupBlocks =
    tabs[0]?.fields?.blocksInTab[0]?.fields?.groupBlocks;
  const price = Array.isArray(blocksInTabGroupBlocks)
    ? blocksInTabGroupBlocks[blocksInTabGroupBlocks.length - 1]?.fields?.text
    : undefined;
  const address = tabs[1]?.fields?.blocksInTab[0]?.fields?.addressText;

  const [settings] = useState({
    swipeToSlide: false,
    slideToShow: 3,
    slideToScroll: 1,
    arrows: false,
    fade: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  return isMobileApp ? (
    <>
      {Boolean(mobileBlocks?.length) ? (
        <div className={styles.singleBanner}>
          {socialMediaImage && (
            <Image
              src={socialMediaImage?.fields?.umbracoFile}
              width={750}
              height={650}
              objectFit="cover"
              alt="banner"
            />
          )}
          <div className={styles.imageBox}>
            <div className={styles.imageTag}>
              <div className={styles.imageTagItem}>
                {menuTitle && menuTitle !== "" && menuTitle}
                {Boolean(productsTags?.length) && (
                  <>
                    <br />
                    <small>{productsTags[0].contentName}</small>
                  </>
                )}
              </div>
              <div
                className={classNames(
                  styles.imageTagItem,
                  styles.imageTagColor
                )}
              >
                {mobileBlocks[0]?.fields?.text}
              </div>
              {price && price?.length !== 0 && (
                <div
                  className={classNames(
                    styles.imageTagItem,
                    styles.imageTagColor
                  )}
                  dangerouslySetInnerHTML={{ __html: price }}
                ></div>
              )}
            </div>
          </div>
          {address && address !== "" && (
            <div className={styles.address}>
              <small>{address}</small>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.imageSlider}>
          <div className={styles.frame}></div>
          <Slider {...settings}>
            {groupBlocks.map((image, imageIndex) => (
              <div
                key={image.system.id}
                className={classNames("position-relative")}
              >
                {image.fields.image && (
                  <div
                    data-src={image.fields.image.fields.umbracoFile}
                    data-fancybox="images"
                    className={classNames(styles.img, "d-block")}
                  >
                    <Image
                      title={image.fields.description}
                      alt={image.fields.description}
                      src={image.fields.image.fields.umbracoFile}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      priority={!imageIndex}
                    />
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  ) : (
    <div
      className={classNames(
        "row position-relative no-gutters",
        styles.imgCardsContent
      )}
    >
      {groupBlocks.map((image, imageIndex) => (
        <div
          key={image.system.id}
          className={classNames(
            "col-6 col-md-4 col-lg-3 position-relative px-0",
            imageIndex > maxImageIndexDisplay && "d-none"
          )}
        >
          {image.fields.image && (
            <div
              data-src={image.fields.image.fields.umbracoFile}
              data-fancybox="images"
              className="position-relative"
            >
              <Image
                className={classNames("img-fluid", styles.img)}
                title={image.fields.description}
                alt={image.fields.description}
                src={image.fields.image.fields.umbracoFile}
                width={747}
                height={500}
                priority={!imageIndex}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageCardsBlock;
