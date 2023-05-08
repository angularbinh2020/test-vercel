import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import classNames from "classnames";
import arrow from "sites/mogivi/assets/icons/arrow.svg";
import Link from "next/link";
import { IContactsMethod } from "sites/mogivi/models/blocks/IContactsMethod";

export interface IContactInfoBlockModel {
  block: IContactsMethod;
}

export const ContactInfoBlock = (props: IContactInfoBlockModel) => {
  const { items } = props.block.fields;
  return (
    <div className={styles.contactInfoContainer}>
      <div className="container">
        <div className={classNames(styles.contactInfoBox, "row")}>
          {items &&
            items?.length !== 0 &&
            items.map((item, idx) => {
              const { icon, text, title, link } = item.fields;
              return (
                <div key={idx} className="col-lg-4 col-sm-12">
                  <div className={styles.content}>
                    {title && <h3>{title}</h3>}
                    {text && (
                      <div dangerouslySetInnerHTML={{ __html: text }}></div>
                    )}
                    {link && (
                      <Link href={link?.url || "#"}>
                        <a
                          className={styles.btnLink}
                          target={link.target ? link.target : "_self"}
                        >
                          <span>{link?.name}</span>
                          <div className={styles.arrowIcon}>
                            <Image
                              src={arrow}
                              width={30}
                              height={20}
                              objectFit="contain"
                              alt="icon"
                            />
                          </div>
                        </a>
                      </Link>
                    )}
                    {icon && (
                      <div className={styles.prodImg}>
                        <Image
                          src={icon?.fields?.umbracoFile}
                          width={100}
                          height={100}
                          objectFit="contain"
                          alt={icon?.system?.name}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
