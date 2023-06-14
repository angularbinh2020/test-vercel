import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { ITeamBlock } from "sites/mogivi/models/blocks/ITeamBlock";
import styles from "./styles.module.scss";

export interface GalleryPeopleInfoProps {
  block: ITeamBlock;
}

export const GalleryPeopleInfo = (props: GalleryPeopleInfoProps) => {
  const { itemTitle, team, subtitle } = props.block.fields;
  return (
    <div className={styles.galleryIntroContainer}>
      <div className={styles.galleryIntroTextGroup}>
        <div className="container">
          <h2 className="title-wrap">{itemTitle}</h2>
          <p>{subtitle}</p>
          <div className="container">
            <div
              className={classNames(
                "row align-items-center",
                styles.textImgCard
              )}
            >
              {team.map((item, idx) => {
                const image = item.fields.image.fields?.umbracoFile;
                const fullname = item.fields.fullname;
                const position = item.fields.title;
                const desc = item.fields.description;
                return (
                  <div key={idx} className="col-12 col-md-6 col-lg-4 mb-4">
                    <div className={styles.cardImgContainer}>
                      <div className={styles.cardImg}>
                        {image && (
                          <Image
                            alt={item.fields.image.system.name}
                            src={image}
                            width={420}
                            height={550}
                            quality={100}
                            className="objectFitCover"
                          />
                        )}
                      </div>
                      {position && fullname && desc && (
                        <>
                          <div className={styles.cardContent}>
                            <div className={styles.cardInfo}>
                              <h3>{fullname}</h3>
                              <p className={styles.cardPosition}>{position}</p>
                            </div>
                          </div>
                          <div className={styles.cardDescription}>
                            <h6>{position}</h6>
                            <h4>{fullname}</h4>
                            <p>{desc}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
