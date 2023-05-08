import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Slider from "components/ReactSlickSlider";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.scss";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { ISubPageData } from "sites/mogivi/models/ISubpage";
import ic360Gif from "sites/mogivi/assets/icons/vr-on.gif";
import IPageNode from "models/IPageNode";
import Layout from "components/Layout";
import Fancybox from "sites/mogivi/components/Fancybox";
import ProjectModule from "../ProjectModule";
import iconVR from "sites/mogivi/assets/icons/icon-vr.png";

interface ProjectDetailMobileApp {
  pageData: any;
}

export const ProjectDetailMobileApp = (props: ProjectDetailMobileApp) => {
  const { pageData } = props;
  const subPageData: ISubPageData = pageData;
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [isShowPhoneNumber, setIsShowPhoneNumber] = useState(false);
  const currentNode: IPageNode = pageData?.subPageData?.currentNode;
  const projectModule = currentNode.fields.blocks[3].fields;

  const images = subPageData?.files;

  const [settings] = useState({
    swipeToSlide: false,
    slideToShow: 1,
    slideToScroll: 1,
    asNavFor: nav2,
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
    <>
      <Layout
        className={styles.generalContainer}
        pageData={pageData.subPageData}
      >
        <div className={classNames(styles.subpageContainer)}>
          <div className={classNames(styles.leftContent)}>
            {subPageData.isShowVRIcon && (
              <div className={styles.icVirtualTour}>
                <Link href={subPageData?.vrTourUrl}>
                  <a>
                    <Image
                      src={ic360Gif}
                      width={100}
                      height={100}
                      alt="virtual-tour"
                    />
                  </a>
                </Link>
              </div>
            )}
            <div className={styles.mainImageSlider}>
              <Fancybox>
                <Slider
                  {...settings}
                  ref={(slider1: any) => setNav1(slider1)}
                  accessibility={false}
                >
                  {images.map((item, idx) => (
                    <a key={idx} href={item.src} data-fancybox="image">
                      <div key={idx} className={styles.singleImage}>
                        <Image
                          src={item.src}
                          width={640}
                          height={350}
                          alt={item.name}
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
                    {subPageData.publishedDateText}
                  </p>
                  <div className={classNames(styles.idPost, styles.fontStyle)}>
                    ID{" "}
                    <span data-bind="text:news().IdText">
                      {subPageData.projectId}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-start">
                <span className={classNames("badge", styles.badge)}>
                  {subPageData.textStatus}
                </span>
              </div>
              <div className="mt-3 mb-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-end">
                    <h3 className={styles.projectPrice}>
                      {subPageData.priceText}
                    </h3>
                    <p
                      className={classNames(
                        styles.colorSilverChalice,
                        styles.fontStyle,
                        "mx-2"
                      )}
                    >
                      {subPageData.area}
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <h5
                      className={classNames(
                        "mb-0 me-2",
                        styles.colorSilverChalice,
                        styles.fontStyle
                      )}
                    >
                      174
                    </h5>
                    <SvgIcon icon="eye" width={15} height={15} />
                  </div>
                  <div className="d-flex align-items-center">
                    <h5
                      className={classNames(
                        "mb-0 me-2",
                        styles.colorSilverChalice,
                        styles.fontStyle
                      )}
                    >
                      3
                    </h5>
                    <SvgIcon icon="chat" />
                  </div>
                </div>
              </div>

              <div className={styles.projectInfo}>
                <div className="row justify-content-center align-items-center">
                  <div className="col-3">
                    <div
                      className={classNames(
                        "text-center",
                        styles.projectInfoItem
                      )}
                    >
                      <SvgIcon icon={"bed"} width={18} height={13} />
                      <h4>Phòng ngủ</h4>
                      <h4>{subPageData.bedRoomNo}</h4>
                    </div>
                  </div>
                  <div className="col-3 border-start">
                    <div
                      className={classNames(
                        "text-center",
                        styles.projectInfoItem
                      )}
                    >
                      <SvgIcon icon={"bath"} width={18} height={13} />
                      <h4>Phòng tắm</h4>
                      <h4>{subPageData.bathRoonNo}</h4>
                    </div>
                  </div>
                  <div className="col-3 border-start">
                    <div
                      className={classNames(
                        "text-center",
                        styles.projectInfoItem
                      )}
                    >
                      <SvgIcon icon={"ruler"} width={18} height={13} />
                      <h4>Diện tích</h4>
                      <h4>{subPageData.area}</h4>
                    </div>
                  </div>
                  <div className="col-3 border-start">
                    <div
                      className={classNames(
                        "text-center",
                        styles.projectInfoItem
                      )}
                    >
                      <SvgIcon icon={"location"} width={18} height={13} />
                      <h4>Hướng</h4>
                      <h4>{subPageData.directionText}</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={classNames(
                  "d-flex align-items-center my-3 justify-content-between",
                  styles.booking
                )}
              >
                <div className="d-flex align-items-center">
                  <Image
                    src={iconVR}
                    width={22}
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
    </>
  );
};
