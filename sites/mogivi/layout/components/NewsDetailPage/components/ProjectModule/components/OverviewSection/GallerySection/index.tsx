import classNames from "classnames";
import Image from "next/legacy/image";
import React, { Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";
import Fancybox from "sites/mogivi/components/Fancybox";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { IInfoGridBlock } from "sites/mogivi/models/blocks/IInfoGridBlock";
import styles from "./styles.module.scss";
interface GallerySectionProps {
  infoDetail: IInfoGridBlock;
}

const GallerySection = (props: GallerySectionProps) => {
  const galleryItems = props.infoDetail?.fields?.groupBlocks || [];
  return (
    <Accordion className={styles.container}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h2 className={styles.sectionTitle}>
            {props.infoDetail.fields?.itemTitle}{" "}
            <span className={styles.placeViral}>
              {props.infoDetail.fields?.subtitle}
            </span>
          </h2>
        </Accordion.Header>
        <Accordion.Body>
          <Fancybox>
            <div className={styles.galleryContent}>
              <div className="intro-gallery">
                <div className="row">
                  <div className="col-6 col-md-3 col-lg-3 mb-4">
                    <span
                      className={styles.introGalleryVid}
                      data-fancybox=""
                      data-src={
                        props.infoDetail?.fields?.videoIntroduction?.url
                      }
                    >
                      <SvgIcon
                        width={50}
                        height={50}
                        icon="play"
                        className={styles.playIcon}
                      />
                      <Image
                        className={styles.videoBox}
                        alt={props.infoDetail?.fields?.videoIntroduction?.name}
                        src={
                          "https://brokerdev.azureedge.net/media/3223/phoi-canh-de-capella.jpg"
                        }
                        width={440}
                        height={380}
                        objectFit={"cover"}
                      />
                    </span>
                  </div>
                  {galleryItems.map((item, idx) => {
                    const image = item.fields.image;
                    if (!image) return <Fragment key={idx}></Fragment>;
                    const { umbracoFile } = image.fields;
                    const { name } = image.system;
                    return (
                      <div
                        key={idx}
                        className={classNames("col-6 col-md-3 col-lg-3 mb-1")}
                      >
                        <a
                          className={styles.imagesGallery}
                          data-fancybox="image"
                          href={umbracoFile}
                        >
                          <Image
                            alt="De Capella"
                            src={umbracoFile}
                            title={name}
                            width={220}
                            height={200}
                            objectFit={"cover"}
                          />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Fancybox>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default GallerySection;
