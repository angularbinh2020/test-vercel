import React from "react";
import styles from "./list-image-info.module.scss";
import classNames from "classnames";
import { IBannerImageLink } from "sites/mogivi/models/blocks/IBannerImageLink";
import LinkItem from "components/LinkItem";
import Image from "next/legacy/image";

interface ListImageInfoProps {
  block: IBannerImageLink;
}

const ListImageInfo = (props: ListImageInfoProps) => {
  const { title, text, imageLink, link } = props.block.fields;
  let count = 0;

  return (
    <div className={styles.listImageInfoContainer}>
      <div className={classNames("container", styles.listImageInfoBody)}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {text && (
          <div
            className={styles.subTitle}
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        )}
        <div className={styles.imagesContainer}>
          <div className="container-fluid">
            <div className="row gy-4">
              {imageLink?.map((item, index: number) => {
                count++;
                if (count === 4) {
                  count = 0;
                }
                const gridNumber = count === 2 || count === 3 ? 8 : 4;
                const { link, image } = item.fields;
                return (
                  <div
                    className={`col-12 col-md-6 col-lg-${gridNumber} col-xl-${gridNumber}`}
                    key={index}
                  >
                    {link ? (
                      <LinkItem url={link.url} target={link.target}>
                        <div className={styles.imageItem}>
                          {image && (
                            <div className={styles.nextImage}>
                              <Image
                                src={image.fields.umbracoFile}
                                alt={image.system.name}
                                layout="fill"
                                quality={100}
                              />
                            </div>
                          )}
                          <div className={styles.overlay}></div>
                          <div
                            className={styles.information}
                            dangerouslySetInnerHTML={{
                              __html: item.fields.subtitle,
                            }}
                          ></div>
                        </div>
                      </LinkItem>
                    ) : (
                      <div className={styles.imageItem}>
                        {image && (
                          <div className={styles.nextImage}>
                            <Image
                              src={image.fields.umbracoFile}
                              alt={image.system.name}
                              layout="fill"
                              quality={100}
                            />
                          </div>
                        )}
                        <div className={styles.overlay}></div>
                        <div
                          className={styles.information}
                          dangerouslySetInnerHTML={{
                            __html: item.fields.subtitle,
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {link && (
              <div className={styles.showMore}>
                <LinkItem url={link.url}>
                  <button className="btn-orange">Xem thêm</button>
                </LinkItem>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListImageInfo;
