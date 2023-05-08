import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import arrow from "sites/mogivi/assets/icons/arrow.svg";
import { IBannerCoverModel } from "sites/mogivi/themes/DefaultContentPage/components/BannerCover";
import Image from "next/image";

const BannerCover = (props: IBannerCoverModel) => {
  const { itemTitle, image, links, text, contentBgColour } = props.block.fields;

  return (
    <>
      <div
        className={styles.bannerContainer}
        style={{
          backgroundImage: `url(${image?.fields?.umbracoFile || ""})`,
          color: `#${contentBgColour}`,
        }}
      >
        <div className="container">
          <div className={styles.bannerContent}>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                {itemTitle && <h1>{itemTitle}</h1>}
                {text && (
                  <div
                    className={styles.subtitle}
                    dangerouslySetInnerHTML={{ __html: text }}
                  ></div>
                )}
                {links &&
                  links.map((item, idx) => (
                    <Link key={idx} href={item?.url}>
                      <a
                        className={styles.btnLink}
                        target={item?.target ? item?.target : "_self"}
                      >
                        {item.name && (
                          <>
                            <span>{item?.name}</span>
                            <div className={styles.arrowIcon}>
                              <Image
                                src={arrow}
                                width={30}
                                height={30}
                                objectFit="contain"
                                alt="icon"
                              />
                            </div>
                          </>
                        )}
                      </a>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BannerCover;
