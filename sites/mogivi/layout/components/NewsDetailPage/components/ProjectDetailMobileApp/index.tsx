import classNames from "classnames";
import ImageLegacy from "next/legacy/image";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Slider from "components/ReactSlickSlider";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.scss";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import ic360Gif from "sites/mogivi/assets/icons/vr-on.gif";
import Layout from "components/Layout";
import Fancybox from "sites/mogivi/components/Fancybox";
import ProjectModule from "../ProjectModule";
import iconVR from "sites/mogivi/assets/icons/icon-vr.png";
import { ISubPageData } from "sites/mogivi/models/ISubpage";

interface Props {
  pageData: ISubPageData;
  projectModule: any;
  layoutPageData: any;
  images: string[];
}

export const ProjectDetailMobileApp = (props: Props) => {
  const {
    pageData: subPageData,
    projectModule,
    layoutPageData,
    images,
  } = props;

  const [settings] = useState({
    swipeToSlide: false,
    slideToShow: 1,
    slideToScroll: 1,
    arrows: false,
    fade: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px",
          arrows: false,
        },
      },
    ],
  });

  return (
    <Layout className={styles.generalContainer} pageData={layoutPageData}>
      <div className={classNames(styles.subpageContainer)}>
        <div className={classNames(styles.leftContent)}>
          {subPageData.vrTourURL && (
            <div className={styles.icVirtualTour}>
              <Link href={subPageData.vrTourURL} target="_blank">
                <ImageLegacy
                  src={ic360Gif}
                  width={100}
                  height={100}
                  alt="virtual-tour"
                />
              </Link>
            </div>
          )}
          <div className={styles.mainImageSlider}>
            <Fancybox>
              <Slider {...settings} accessibility={false}>
                {images?.map((item, idx) => (
                  <a key={idx} href={item} data-fancybox="image">
                    <div key={idx} className={styles.singleImage}>
                      <ImageLegacy
                        src={item}
                        width={640}
                        height={350}
                        alt="img"
                      />
                    </div>
                  </a>
                ))}
              </Slider>
            </Fancybox>
          </div>
        </div>
        <div className={classNames("px-2 mt-3", styles.rightContent)}>
          <div className="container">
            <h1 className={classNames(styles.titleProject)} id="titleProject">
              {subPageData.title}
            </h1>
            <div className="row">
              <div
                className={classNames(
                  "col-8 d-flex align-items-start",
                  styles.addressContainer
                )}
              >
                <SvgIcon icon="position" width={15} height={15} />{" "}
                <address>{subPageData.address}</address>
              </div>
              <div className="col-4 text-center">
                <p
                  className={classNames(
                    "mb-2",
                    styles.colorSilverChalice,
                    styles.fontStyle
                  )}
                >
                  {subPageData.publishDateText}
                </p>
                <div className={classNames(styles.idPost, styles.fontStyle)}>
                  ID{" "}
                  <span data-bind="text:news().IdText">
                    {subPageData.newsIdText}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-start">
              <span className={classNames("badge", styles.badge)}>
                {subPageData.statusText}
              </span>
            </div>
            <div className={styles.projectInfo}>
              <div className="row mt-2 align-items-center">
                {subPageData.tags?.map((tag, tagIndex) => {
                  const addBorderStart = tagIndex % 4 !== 0;
                  return (
                    <div
                      className={classNames(
                        "col-3 mb-1",
                        addBorderStart && "border-start"
                      )}
                      key={tagIndex}
                    >
                      <div
                        className={classNames(
                          "text-center",
                          styles.projectInfoItem
                        )}
                      >
                        <Image
                          src={tag.iconUrl}
                          alt={tag.text}
                          width={18}
                          height={18}
                        />
                        <h4>{tag.text}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={classNames(
                "d-flex align-items-center my-3 justify-content-between",
                styles.booking
              )}
            >
              <div className="d-flex align-items-center">
                <ImageLegacy
                  src={iconVR}
                  width={26}
                  height={26}
                  alt="icon-vr"
                  objectFit="cover"
                />
                <h4 className={classNames("ms-1 mb-0", styles.fontStyle)}>
                  Đăng kí xem nhà với MGV Đối Tác
                </h4>
              </div>
              <a
                className={classNames(
                  "btn-outline fw-bold",
                  styles.btnBooking,
                  styles.fontStyle1315
                )}
                href="tel:1800646427"
              >
                Đặt lịch ngay
              </a>
            </div>
          </div>
        </div>
      </div>
      <ProjectModule
        className={styles.generalContainer}
        block={projectModule}
      />
    </Layout>
  );
};
