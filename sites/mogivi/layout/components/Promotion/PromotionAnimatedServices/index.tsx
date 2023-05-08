import classNames from "classnames";
import useViewMode from "hooks/useViewMode";
import Image from "next/image";
import React from "react";
import { IPromotionAnimatedServices } from "sites/mogivi/models/blocks/IPromotionAnimatedServices";
import styles from "./styles.module.scss";

export interface PromotionAnimatedServicesProps {
  block: IPromotionAnimatedServices;
}

export const PromotionAnimatedServices = (
  props: PromotionAnimatedServicesProps
) => {
  const { itemTitle, video, cover, items } = props.block.fields;
  const { isDesktop } = useViewMode();

  return (
    <div
      className={styles.promotionContainer}
      style={{ backgroundImage: cover && `url(${cover.fields.umbracoFile})` }}
    >
      <div className={styles.promotionTextGroup}>
        <div className="container">
          <h2 className="title-wrap">{itemTitle}</h2>
          {video ? (
            <div className={classNames("row", styles.promotionBox)}>
              <div className="col-md-5 d-grid gap-3">
                {items.map((item, idx) => {
                  const { icon, title, bodyText } = item.fields;
                  return (
                    <div key={idx} className={classNames(styles.textCard)}>
                      {icon && (
                        <div className={styles.cardImg}>
                          <Image
                            className="lazyloaded"
                            alt="icon"
                            src={icon.fields?.umbracoFile}
                            width={50}
                            height={50}
                          />
                        </div>
                      )}
                      <div className={styles.cardContent}>
                        <h3>{title}</h3>
                        <div
                          dangerouslySetInnerHTML={{ __html: bodyText }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {isDesktop && (
                <div className="col-md-7 text-center">
                  <div className="margin-media">
                    <Image
                      src={video.fields?.umbracoFile}
                      alt={video.system.name}
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={classNames("row", styles.promotionBoxWithoutImage)}>
              {items.map((item, idx) => {
                const { icon, title, bodyText } = item.fields;
                return (
                  <div
                    key={idx}
                    className={classNames(
                      "col-sm-12 col-md-6 col-lg-6",
                      styles.textCardBox
                    )}
                  >
                    <div className={classNames(styles.textCard)}>
                      {icon && (
                        <div className={styles.cardImg}>
                          <Image
                            className="lazyloaded"
                            alt="icon"
                            src={icon.fields?.umbracoFile}
                            width={70}
                            height={70}
                          />
                        </div>
                      )}
                      <div className={styles.cardContent}>
                        <h3>{title}</h3>
                        <div
                          dangerouslySetInnerHTML={{ __html: bodyText }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
