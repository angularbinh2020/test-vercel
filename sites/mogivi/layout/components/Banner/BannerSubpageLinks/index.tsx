import LinkItem from "components/LinkItem";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React from "react";
import { IBannerSubpageBlock } from "sites/mogivi/models/blocks/IBannerSubpageBlock";

import styles from "./styles.module.scss";
import classNames from "classnames";

export interface IBannerSubpageLinksProps {
  block: IBannerSubpageBlock;
}

export const BannerSubpageLinks = (props: IBannerSubpageLinksProps) => {
  const { itemTitle, image, subtitle, links, textBackground } =
    props.block.fields;
  const router = useRouter();

  return (
    <section className="section section--banner-text">
      <div className={styles.bannerSlider}>
        <Image
          src={image?.fields.umbracoFile}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="img"
        />

        <div className="container">
          <div
            className={classNames(
              "inner",
              textBackground ? styles.textBackground : ""
            )}
          >
            <div className={styles.contentWrapper}>
              <h1 className="text-white">{itemTitle}</h1>
              <div className="mb-sm">
                <div
                  className="subtitle"
                  dangerouslySetInnerHTML={{ __html: subtitle }}
                ></div>
              </div>{" "}
            </div>
            {links && (
              <div className={styles.btnBannerContainer}>
                {links.map((item, idx: number) => {
                  const pathname = router.asPath.slice(1);
                  const isActive = item?.url.includes(
                    pathname.replace("?ViewMobileApp=1", "")
                  );
                  return (
                    <LinkItem
                      key={idx}
                      target={item.target}
                      className={"btn-white--outline"}
                      activeClasses={isActive ? styles.active : ""}
                      url={item.url}
                    >
                      {item.name}
                    </LinkItem>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
