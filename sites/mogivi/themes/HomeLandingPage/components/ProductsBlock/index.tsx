import React from "react";
import styles from "./styles.module.scss";
import Image from "next/legacy/image";
import { IProducts } from "sites/mogivi/models/blocks/IProducts";
import LinkItem from "components/LinkItem";
import { ILinkInfo } from "sites/mogivi/models/ILinkInfo";

export interface IProductBlock {
  block: IProducts;
}

const ProductBlock = (props: IProductBlock) => {
  const { items, title } = props.block.fields;
  return (
    <div className={styles.productContainer}>
      <div className="container">
        {title && title !== "" && <h2 className="text-center mb-5">{title}</h2>}
        {items && items?.length !== 0 && (
          <div className={styles.productBox}>
            {items.map((productItem, idx) => {
              const { image, links, text, title } = productItem.fields;
              return (
                <div key={idx} className={styles.productItem}>
                  {links && (
                    <LinkItem url={links[0]?.url} target={links[0].target}>
                      <div className={styles.name}>
                        {title && title !== "" && <h3>{title}</h3>}
                      </div>
                      <div className={styles.card}>
                        {image && (
                          <div className={styles.wrapper}>
                            <Image
                              className={styles.coverImage}
                              src={image?.fields?.umbracoFile}
                              width={500}
                              height={500}
                              alt={image?.system?.name || "img"}
                            />
                          </div>
                        )}
                      </div>
                      <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: text }}
                      ></div>
                    </LinkItem>
                  )}
                  {links && (
                    <div className={styles.product}>
                      {links.map((item: ILinkInfo, idx: number) => (
                        <LinkItem
                          className={styles.seeDetail}
                          key={idx}
                          url={item?.url}
                          target={item?.target}
                        >
                          {item?.name}
                        </LinkItem>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductBlock;
