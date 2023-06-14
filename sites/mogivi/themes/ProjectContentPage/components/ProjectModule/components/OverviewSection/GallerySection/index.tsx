import Image from "next/legacy/image";
import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Fancybox from "sites/mogivi/components/Fancybox";
import { IInfoGridBlock } from "sites/mogivi/models/blocks/IInfoGridBlock";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
interface GallerySectionProps {
  infoDetail: IInfoGridBlock;
}

const GallerySection = (props: GallerySectionProps) => {
  const galleryItems = props.infoDetail?.fields?.groupBlocks || [];
  const [activeKey, setActiveKey] = useState("");
  const handleOnClick = (e: any) => {
    if (activeKey) setActiveKey("");
    else setActiveKey("0");
  };
  return (
    <Accordion className={styles.container} activeKey={activeKey}>
      <Accordion.Item eventKey="0">
        <Accordion.Header
          onClick={handleOnClick}
          data-tab-opened={activeKey ? "true" : "false"}
        >
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
                <div className="row ml-n1 mr-n1">
                  <div className="col-6 col-md-3 col-lg-3 pl-1 pr-1 mb-1">
                    <span
                      className={styles.introGalleryVid}
                      data-fancybox=""
                      data-src={
                        props.infoDetail?.fields?.videoIntroduction?.url
                      }
                    >
                      <FontAwesomeIcon
                        className={styles.playIcon}
                        icon={faPlayCircle}
                      />
                      <Image
                        className="w-100 img-fluid"
                        alt="De Capella"
                        src={
                          "https://brokerdev.azureedge.net/media/3223/phoi-canh-de-capella.jpg"
                        }
                        layout="fill"
                        title={
                          props.infoDetail?.fields?.videoIntroduction?.name
                        }
                      />
                    </span>
                  </div>
                  {galleryItems.map((item, idx) => {
                    const image = item.fields.image;
                    if (!image) return null;
                    const { umbracoFile } = image?.fields;
                    const { name } = image?.system;
                    return (
                      <div key={idx} className="col-6 col-md-3 col-lg-3 mb-1">
                        <a
                          className={styles.imagesGallery}
                          data-fancybox="image"
                          href={umbracoFile}
                        >
                          <Image
                            alt="De Capella"
                            src={umbracoFile}
                            title={name}
                            width={550}
                            height={590}
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
