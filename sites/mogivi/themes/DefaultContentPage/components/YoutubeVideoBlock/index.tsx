import React from "react";
import styles from "./styles.module.scss";
import arrow from "sites/mogivi/assets/icons/arrow.svg";
import LinkItem from "components/LinkItem";
import { IYoutubeVideo } from "sites/mogivi/models/blocks/IYoutubeVideo";
import Image from "next/legacy/image";

interface IYoutubeVideoModel {
  block: IYoutubeVideo;
}

const YoutubeVideoBlock = (props: IYoutubeVideoModel) => {
  const { itemTitle, link, youtubeID, description } = props.block.fields;
  return (
    <div className={styles.bannerMobileContainer}>
      <div className="container">
        <div className={styles.bannerContent}>
          <div className="row align-items-center">
            <div className="col-lg-4 col-sm-12">
              {itemTitle && itemTitle !== "" && <h1>{itemTitle}</h1>}
              {description && (
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
              )}
              {link && (
                <LinkItem
                  className={styles.btnLink}
                  url={link?.url}
                  target={link?.target}
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
                </LinkItem>
              )}
            </div>
            <div className="col-lg-8">
              <div className={styles.productMedia}>
                {youtubeID && youtubeID !== "" && (
                  <div>
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${youtubeID}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeVideoBlock;
