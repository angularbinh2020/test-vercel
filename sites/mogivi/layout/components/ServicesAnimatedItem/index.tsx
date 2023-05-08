import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IServicesAnimatedBlock } from "sites/mogivi/models/blocks/IServicesAnimatedBlock";
import appStore from "sites/mogivi/assets/icons/ic-app-store.png";
import googlePlay from "sites/mogivi/assets/icons/ic-google-play.png";
import styles from "./styles.module.scss";

export interface ServicesAnimatedItemProps {
  block: IServicesAnimatedBlock;
}

export const ServicesAnimatedItem = (props: ServicesAnimatedItemProps) => {
  const { itemTitle, items } = props?.block?.fields;
  return (
    <div
      className={classNames(
        styles.servicesAnimatedContainer,
        "section-container"
      )}
    >
      <div className="container">
        <div className={styles.headerTitle}>
          {itemTitle && <h2 className="title-wrap">{itemTitle}</h2>}
          <p>
            Thay vì phải tự chọn tìm môi giới để có khách hàng, Mogivi giúp chủ
            nhà kết nối 1:1 với Môi giới uy tín và khách mua phù hợp, có tiềm
            năng chốt giao dịch cao.{" "}
          </p>
        </div>
        <div className={classNames(styles.blockServiceContainer)}>
          {items.map((item, idx) => {
            const { title, description, image, buttons } = item?.fields;
            return (
              <div
                key={idx}
                className={classNames(
                  "row justify-content-between",
                  styles.serviceBox
                )}
              >
                {image && (
                  <div className="col-md-4 col-lg-5">
                    <div className={styles.serviceImg}>
                      <Image
                        src={image.fields?.umbracoFile}
                        width={605}
                        height={420}
                        objectFit={"cover"}
                        alt={image.system.name}
                      />
                    </div>
                  </div>
                )}
                <div className="col-md-8 col-lg-7">
                  <div className={styles.servicesContent}>
                    <h3>{title}</h3>
                    <div>
                      <p className="text-video-font-size">{description}</p>
                    </div>
                    <div className={styles.buttonGroup}>
                      {buttons &&
                        buttons.map((item, i) => {
                          const isIOS = item.url.includes(
                            "https://apps.apple.com"
                          );
                          const isAndroid = item.url.includes(
                            "https://play.google.com/"
                          );

                          if (isIOS) {
                            return (
                              <div key={i} className={"btn-more"}>
                                <Link href={item.url}>
                                  <a
                                    target={item.target ? item.target : "_self"}
                                  >
                                    <div>
                                      <Image
                                        src={appStore}
                                        width={120}
                                        height={40}
                                        objectFit={"contain"}
                                        alt={item.url}
                                      />
                                    </div>
                                  </a>
                                </Link>
                              </div>
                            );
                          }
                          if (isAndroid) {
                            return (
                              <div key={i} className={"btn-more"}>
                                <Link href={item.url}>
                                  <a
                                    target={item.target ? item.target : "_self"}
                                  >
                                    <div>
                                      <Image
                                        src={googlePlay}
                                        width={120}
                                        height={40}
                                        objectFit={"contain"}
                                        alt={item.url}
                                      />
                                    </div>
                                  </a>
                                </Link>
                              </div>
                            );
                          }
                          return (
                            <div key={i} className={"btn-more"}>
                              <Link href={item.url}>
                                <a target={item.target ? item.target : "_self"}>
                                  <button className="btn-orange">
                                    {item.name}
                                  </button>
                                </a>
                              </Link>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
