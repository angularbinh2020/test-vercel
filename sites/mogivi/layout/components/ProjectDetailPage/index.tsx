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
import ProjectModule from "./components/ProjectModule";
import IPageNode from "models/IPageNode";
import Layout from "components/Layout";
import useViewMode from "hooks/useViewMode";
import Fancybox from "sites/mogivi/components/Fancybox";
import { ProjectDetailMobileApp } from "./components/ProjectDetailMobileApp";

interface SubPageDataProps {
  pageData: any;
}

const ProjectDetailPage = (props: SubPageDataProps) => {
  const { pageData } = props;
  const subPageData: ISubPageData = pageData;
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [isShowPhoneNumber, setIsShowPhoneNumber] = useState(false);
  const currentNode: IPageNode = pageData?.subPageData?.currentNode;
  const projectModule = currentNode.fields.blocks[3].fields;
  const { isMobileApp } = useViewMode();

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

  const showPhoneNumber = () => {
    if (!isShowPhoneNumber) {
      setIsShowPhoneNumber(true);
    }
  };

  const hideThreeLastDigits = (phoneNumber: string, length: number) => {
    const phoneNumberReplaced = phoneNumber.split("");
    const totalLength = phoneNumberReplaced.length - length - 1;
    for (let i = phoneNumberReplaced.length - 1; i > totalLength; i--) {
      phoneNumberReplaced[i] = "*";
    }
    return phoneNumberReplaced;
  };

  return (
    <>
      {!isMobileApp ? (
        <Layout
          className={styles.generalContainer}
          pageData={props.pageData.subPageData}
        >
          <div className={classNames("row", styles.subpageContainer)}>
            <div className="col-md-12 mb-0 mb-md-3">
              <nav className="nav-breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="">
                      <a>Dự án</a>
                    </Link>
                  </li>
                  {subPageData.breadscrumb.links.map((item, idx) => {
                    return (
                      <li key={idx} className="breadcrumb-item">
                        <Link href={item.url}>
                          <a>{item.title}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            <div
              className={classNames(
                "col-md-12 col-lg-7 my-3 my-sm-0",
                styles.leftContent
              )}
            >
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
              <div className={styles.subImageSlider}>
                <Slider
                  arrows={false}
                  asNavFor={nav1}
                  centerMode={true}
                  ref={(slider2: any) => setNav2(slider2)}
                  slidesToShow={3}
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  {images.map((item, idx) => (
                    <div key={idx} className={styles.subImage}>
                      <Image
                        src={item.src}
                        width={350}
                        height={250}
                        alt={item.name}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div
              className={classNames(
                "col-12 col-md-12 col-lg-5",
                styles.rightContent
              )}
            >
              <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                  <span className={classNames("badge", styles.badge)}>
                    {subPageData.textStatus}
                  </span>
                  <span className={classNames("badge", styles.badgeStatus)}>
                    {subPageData.textStatus}
                  </span>
                </div>
                <h1
                  className={classNames("mt-3", styles.titleProject)}
                  id="titleProject"
                >
                  {subPageData.title}
                </h1>
                <h2 className={styles.projectId}>
                  ID tin:{" "}
                  <span className="font-weight-bold">{subPageData.idText}</span>
                </h2>
                <p className="address mt-2 mb-2">
                  <SvgIcon icon="position" width={15} height={15} />{" "}
                  <span>{subPageData.address}</span>
                </p>
                <div className="row align-items-center mt-3 mb-3">
                  <div className="col-5">
                    <h3 className={styles.projectPrice}>
                      {subPageData.priceText}
                    </h3>
                  </div>
                  <div
                    className={classNames(
                      "col-7",
                      styles.socialMediaShareContainer
                    )}
                  >
                    <Link
                      href={`http://www.facebook.com/share.php?u=${subPageData.publishUrl}&title=${subPageData.title}`}
                    >
                      <a>
                        <SvgIcon icon="facebook" width={24} height={24} />{" "}
                      </a>
                    </Link>
                    <Link
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${subPageData.publishUrl}`}
                    >
                      <a>
                        <SvgIcon icon="linkedin" width={24} height={24} />{" "}
                      </a>
                    </Link>
                    <Link
                      href={`https://twitter.com/intent/tweet?url=${subPageData.publishUrl}&title=${subPageData.title}`}
                    >
                      <a>
                        <SvgIcon icon="twitter" width={24} height={24} />{" "}
                      </a>
                    </Link>
                    <Link
                      href={`whatsapp://send?text=${subPageData.publishUrl}`}
                    >
                      <a>
                        <SvgIcon icon="whatsapp" width={24} height={24} />{" "}
                      </a>
                    </Link>
                  </div>
                  <div className="col-12 mt-3">
                    <div className="position-relative">
                      <div className={styles.brokerInfo}>
                        {subPageData?.chatContact && (
                          <div
                            className={classNames(
                              "d-flex align-items-center p-2 border",
                              styles.brokerAvatar
                            )}
                          >
                            <Image
                              alt={subPageData.chatContact.nickName}
                              src={
                                subPageData.chatContact.avatar ||
                                "https://brokerdev.azureedge.net/icons/Avatar/Avatar-customer%202.png"
                              }
                              width={56}
                              height={56}
                              objectFit={"cover"}
                              className="img-fluid rounded-pill ls-is-cached lazyloaded"
                            />
                            <span className="ml-2">
                              {subPageData.chatContact.nickName}
                            </span>
                          </div>
                        )}

                        <div
                          className={classNames(
                            "p-2 border-bottom",
                            styles.brokerTool
                          )}
                        >
                          <div className="row align-items-center">
                            <div className="col-12 col-md-6 col-lg-6">
                              <div
                                className={classNames(
                                  "text-center d-flex align-items-center justify-content-center",
                                  styles.chatBox
                                )}
                              >
                                <div className={styles.chatIcon}>
                                  <SvgIcon icon="chat" width={15} height={15} />
                                </div>
                                <span>Chat ngay</span>
                              </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-6">
                              {!isShowPhoneNumber ? (
                                <div
                                  className={classNames(
                                    "d-flex align-items-center justify-content-center",
                                    styles.brokerPhone
                                  )}
                                >
                                  <div className={styles.phoneIcon}>
                                    <SvgIcon
                                      icon="phone"
                                      width={15}
                                      height={15}
                                    />
                                  </div>
                                  <div
                                    className="d-flex flex-column align-items-center justify-content-center"
                                    onClick={showPhoneNumber}
                                  >
                                    <span>
                                      {hideThreeLastDigits(
                                        subPageData.chatContact.phoneNumer,
                                        3
                                      )}
                                    </span>
                                    <span>Nhấn để hiện rõ</span>
                                  </div>
                                </div>
                              ) : (
                                <Link
                                  href={`tel:${subPageData.chatContact.phoneNumer}`}
                                >
                                  <a>
                                    <div
                                      className={classNames(
                                        "d-flex align-items-center justify-content-center",
                                        styles.brokerPhone
                                      )}
                                    >
                                      <div className={styles.phoneIcon}>
                                        <SvgIcon
                                          icon="phone"
                                          width={15}
                                          height={15}
                                        />
                                      </div>
                                      <div className="d-flex flex-column align-items-center justify-content-center">
                                        <span>
                                          {subPageData.chatContact.phoneNumer}
                                        </span>
                                        <span>Nhấn để gọi</span>
                                      </div>
                                    </div>
                                  </a>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.projectInfo}>
                  <div className="row align-items-center w-100">
                    <div className="col-6 col-md-3 col-lg-4 mb-3">
                      <div
                        className={classNames(
                          "text-center",
                          styles.projectInfoItem
                        )}
                      >
                        <SvgIcon icon={"bed"} />
                        <h4>Phòng ngủ</h4>
                        <span>{subPageData.bedRoomNo}</span>
                      </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-4 mb-3">
                      <div
                        className={classNames(
                          "text-center",
                          styles.projectInfoItem
                        )}
                      >
                        <SvgIcon icon={"bath"} />
                        <h4>Phòng tắm</h4>
                        <span>{subPageData.bathRoonNo}</span>
                      </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-4 mb-3">
                      <div
                        className={classNames(
                          "text-center",
                          styles.projectInfoItem
                        )}
                      >
                        <SvgIcon icon={"ruler"} />
                        <h4>Diện tích</h4>
                        <span>{subPageData.area}</span>
                      </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-4">
                      <div
                        className={classNames(
                          "text-center",
                          styles.projectInfoItem
                        )}
                      >
                        <SvgIcon icon={"location"} />
                        <h4>Hướng</h4>
                        <span>{subPageData.directionText}</span>
                      </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-4">
                      <div
                        className={classNames(
                          "text-center",
                          styles.projectInfoItem
                        )}
                      >
                        <SvgIcon icon={"eye"} />
                        <h4>Tổng view</h4>
                        <span>{subPageData.totalView}</span>
                      </div>
                    </div>
                    {+subPageData?.totalChat !== 0 && (
                      <div className="col-6 col-md-3 col-lg-4">
                        <div
                          className={classNames(
                            "text-center",
                            styles.projectInfoItem
                          )}
                        >
                          <SvgIcon icon={"comment"} />
                          <h4>Tổng chat</h4>
                          <span>{subPageData.totalChat}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProjectModule
            className={styles.generalContainer}
            block={projectModule}
          />
        </Layout>
      ) : (
        <ProjectDetailMobileApp pageData={pageData} />
      )}
    </>
  );
};

export default ProjectDetailPage;
