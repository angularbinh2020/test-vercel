import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import arrow from "sites/mogivi/assets/icons/arrow.svg";
import Image from "next/legacy/image";
import phoneFrame from "sites/mogivi/assets/images/phone-frame.png";
import { IVRTourServices } from "sites/mogivi/models/blocks/IVRTourServices";
import LinkItem from "components/LinkItem";

interface IServicesModel {
  block: IVRTourServices;
}

const ServicesBlock = (props: IServicesModel) => {
  const { embedLink, items, title } = props.block.fields;
  return (
    <div className={styles.servicesContainer}>
      <div className="container">
        {title && <h2 className={classNames("mb-5", styles.title)}>{title}</h2>}
        <div className={classNames(styles.serviceDes, "mb-5")}>
          <div className="row">
            {items?.map((serviceItem, idx) => {
              const {
                bodyText,
                link,
                title: serviceItemTitle,
              } = serviceItem.fields;
              if (idx === 0) {
                return (
                  <div
                    key={idx}
                    className={classNames(
                      "col-lg-4 col-sm-12 text-start",
                      styles.discover
                    )}
                  >
                    {serviceItemTitle && serviceItemTitle !== "" && (
                      <h2>{serviceItemTitle}</h2>
                    )}
                    {bodyText && bodyText !== "" && <span>{bodyText}</span>}
                    {link &&
                      link.map((linkItem, linkIdx) => (
                        <LinkItem
                          key={linkIdx}
                          url={linkItem?.url || "#"}
                          className={styles.btnLink}
                          target={linkItem?.target}
                        >
                          <span>{linkItem?.name}</span>
                          <div className={styles.arrowIcon}>
                            <Image
                              src={arrow}
                              width={30}
                              height={20}
                              objectFit="contain"
                              alt="icon"
                            />
                          </div>
                        </LinkItem>
                      ))}
                    <div className={styles.dash}></div>
                  </div>
                );
              }
              return (
                <div
                  key={idx}
                  className={classNames(
                    "col-lg-2 col-sm-12",
                    styles.serviceItem
                  )}
                >
                  {serviceItemTitle && serviceItemTitle !== "" && (
                    <h2>{serviceItemTitle}</h2>
                  )}
                  {bodyText && bodyText !== "" && (
                    <div dangerouslySetInnerHTML={{ __html: bodyText }}></div>
                  )}
                  <div
                    className={classNames(styles.dash, styles.dashItem)}
                  ></div>
                  <div className={styles.dashLeft}></div>
                </div>
              );
            })}
          </div>
        </div>
        {embedLink && (
          <div className={styles.mainContent}>
            <div className={styles.phoneFrame}>
              <Image
                src={phoneFrame}
                width={1005}
                height={1908}
                alt="phone-frame"
              />
            </div>
            <iframe
              src={embedLink}
              loading="lazy"
              title={title ?? "iframe"}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesBlock;
