import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo, useEffect, useCallback } from "react";
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
import ApartmentSection from "./components/ApartmentSection";
import NeighborhoodProjectSection from "./components/NeighborhoodProjectSection";
import { MOGIVI_CONTENT_TYPE } from "sites/mogivi/const/content-type";
import { TYPE_TRACKING, otherLog } from "sites/mogivi/utils/tracking";
import { getPhoneHidden } from "utils";
import ChatPopup from "sites/mogivi/components/ChatPopup";

interface SubPageDataProps {
  pageData: any;
}

const NewsDetailPage = (props: SubPageDataProps) => {
  const { pageData } = props;
  const subPageData: ISubPageData = pageData;
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [isShowPhoneNumber, setIsShowPhoneNumber] = useState(false);
  const projectNode: IPageNode = pageData?.subPageData?.currentNode;
  const projectModule = projectNode?.fields.blocks.find(
    (block) => block.system.contentType === MOGIVI_CONTENT_TYPE.projectModule
  );
  const [chatConfig, setChatConfig] = useState({
    isOpen: false,
    fullName: "",
    avatar: "",
    agencyPhoneNumber: "",
  });

  const { isMobileApp } = useViewMode();
  const {
    phone: phoneNumber,
    full_name: nickName,
    avatar,
  } = subPageData?.contact;
  const images = subPageData?.imageSliders;
  const layoutPageData: any = useMemo(() => {
    return {
      currentNode: {
        fields: {
          umbracoUrlAlias: "",
          pageTitle: subPageData.title,
          metaTitle: subPageData.title,
          metaDescription: subPageData.areaDescription,
        },
      },
      siteLanguageNode: pageData.siteLanguageNode,
      rootNode: pageData.rootNode,
    };
  }, [pageData]);
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
  const handleShowChatPopup = useCallback(() => {
    if (!chatConfig.isOpen) {
      setChatConfig({
        isOpen: true,
        fullName: nickName || "",
        avatar: avatar || "",
        agencyPhoneNumber: phoneNumber || "",
      });
      otherLog({
        pageUrl: pageData.pageFullURL,
        link: pageData.pageFullURL,
        linkTitle: pageData.title,
        linkId: "",
        type: TYPE_TRACKING.CHAT_BROKER_BROKER,
      });
    }
  }, [chatConfig]);
  const handleCloseChatPopup = useCallback(() => {
    setChatConfig({
      isOpen: false,
      fullName: "",
      avatar: "",
      agencyPhoneNumber: "",
    });
  }, []);
  const logOnCall = () => {
    otherLog({
      pageUrl: pageData.pageFullURL,
      link: pageData.pageFullURL,
      linkTitle: pageData.title,
      linkId: "",
      type: TYPE_TRACKING.MAKE_CALL,
      phone: phoneNumber,
    });
  };

  const showPhoneNumber = () => {
    if (!isShowPhoneNumber) {
      setIsShowPhoneNumber(true);
      otherLog({
        pageUrl: pageData.pageFullURL,
        link: pageData.pageFullURL,
        linkTitle: pageData.title,
        linkId: "",
        type: TYPE_TRACKING.SHOW_PHONE,
        phone: phoneNumber,
      });
    }
  };

  useEffect(() => {
    otherLog({
      pageUrl: pageData.pageFullURL,
      link: pageData.pageFullURL,
      linkTitle: pageData.title,
      linkId: "",
    });
  }, []);

  if (isMobileApp)
    return (
      <ProjectDetailMobileApp
        projectModule={projectModule}
        pageData={pageData}
        layoutPageData={layoutPageData}
        images={images}
      />
    );

  return (
    <Layout className={styles.generalContainer} pageData={layoutPageData}>
      <div className={classNames("row", styles.subpageContainer)}>
        <div className="col-md-12 mb-0 mb-md-3">
          <nav className="nav-breadcrumb">
            <ul className="breadcrumb">
              {subPageData.breadcrumbLinks?.map((item, idx) => {
                return (
                  <li key={idx} className="breadcrumb-item">
                    <Link href={item.url}>{item.name}</Link>
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
          {subPageData.vrTourURL && (
            <div className={styles.icVirtualTour}>
              <Link href={subPageData?.vrTourURL} target="_blank">
                <Image
                  src={ic360Gif}
                  width={100}
                  height={100}
                  alt="virtual-tour"
                  className="objectFitCover"
                />
              </Link>
            </div>
          )}
          <div>
            <Fancybox>
              <Slider
                {...settings}
                ref={(slider1: any) => setNav1(slider1)}
                accessibility={false}
              >
                {images?.map((item, idx) => (
                  <a key={idx} href={item} data-fancybox="image">
                    <div key={idx} className={styles.singleImage}>
                      <Image
                        src={item}
                        width={640}
                        height={350}
                        alt={`image ${idx}`}
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
              infinite={false}
            >
              {images?.map((item, idx) => (
                <div key={idx} className={styles.subImage}>
                  <Image
                    src={item}
                    width={350}
                    height={120}
                    alt={`image ${idx}`}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div
            className={styles.areaDescription}
            dangerouslySetInnerHTML={{
              __html: subPageData.areaDescription || "",
            }}
          ></div>
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
                {subPageData.statusText}
              </span>
              <span className={classNames("badge", styles.badgeStatus)}>
                {subPageData.statusText}
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
              <span className="font-weight-bold">{subPageData.newsIdText}</span>
            </h2>
            <p className="address mt-2 mb-2">
              <SvgIcon icon="position" width={15} height={15} />{" "}
              <span>{subPageData.address}</span>
            </p>
            <div className="row align-items-center mt-3 mb-3">
              <div className="col-5"></div>
              <div
                className={classNames(
                  "col-7",
                  styles.socialMediaShareContainer
                )}
              >
                <Link
                  href={`http://www.facebook.com/share.php?u=${subPageData.pageFullURL}&title=${subPageData.title}`}
                  target="_blank"
                >
                  <SvgIcon icon="facebook" width={24} height={24} />{" "}
                </Link>
                <Link
                  target="_blank"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${subPageData.pageFullURL}`}
                >
                  <SvgIcon icon="linkedin" width={24} height={24} />{" "}
                </Link>
                <Link
                  target="_blank"
                  href={`https://twitter.com/intent/tweet?url=${subPageData.pageFullURL}&title=${subPageData.title}`}
                >
                  <SvgIcon icon="twitter" width={24} height={24} />{" "}
                </Link>
                <Link
                  target="_blank"
                  href={`whatsapp://send?text=${subPageData.pageFullURL}`}
                >
                  <SvgIcon icon="whatsapp" width={24} height={24} />{" "}
                </Link>
              </div>
              <div className="col-12 mt-3">
                <div className="position-relative">
                  <div className={styles.brokerInfo}>
                    {subPageData?.contact && (
                      <div
                        className={classNames(
                          "d-flex align-items-center p-2 border",
                          styles.brokerAvatar
                        )}
                      >
                        <Image
                          alt={nickName}
                          src={
                            avatar ||
                            "https://brokerdev.azureedge.net/icons/Avatar/Avatar-customer%202.png"
                          }
                          width={56}
                          height={56}
                          className="rounded-circle objectFitCover shadow"
                        />
                        <div className="ms-2">
                          <span className="text-internal-orange">
                            {nickName}
                          </span>
                          <div className="fst-italic fs-6">
                            {subPageData?.publishDateText}
                          </div>
                        </div>
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
                            onClick={handleShowChatPopup}
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
                                <SvgIcon icon="phone" width={15} height={15} />
                              </div>
                              <div
                                className="d-flex flex-column align-items-center justify-content-center"
                                onClick={showPhoneNumber}
                              >
                                <span>{getPhoneHidden(phoneNumber)}</span>
                                <span>Nhấn để hiện rõ</span>
                              </div>
                            </div>
                          ) : (
                            <Link
                              href={`tel:${phoneNumber}`}
                              onClick={logOnCall}
                            >
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
                                  <span>{phoneNumber}</span>
                                  <span>Nhấn để gọi</span>
                                </div>
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={classNames(styles.projectInfo, "container")}>
              <div className="row align-items-center w-100 gap-0">
                {subPageData.tags?.map((tag, tagIndex) => (
                  <div className="col-6 col-md-3 col-lg-4 mb-3" key={tagIndex}>
                    <div
                      className={classNames(
                        "text-center",
                        styles.projectInfoItem
                      )}
                    >
                      <Image
                        src={tag.iconUrl}
                        width={24}
                        height={24}
                        alt={tag.text}
                      />
                      <span className="ms-1 text-truncate">{tag.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {projectModule && (
          <ProjectModule
            className={styles.generalContainer}
            block={projectModule}
          />
        )}
        <ApartmentSection
          rental={subPageData.listOfRentalMgvNewsSameLocation}
          sell={subPageData.listOfSellMgvNewsSameLocation}
        />
        <NeighborhoodProjectSection
          listProjects={subPageData.listOfProjectsSameLocation}
        />
        <ChatPopup
          key={chatConfig.fullName}
          handleClose={handleCloseChatPopup}
          {...chatConfig}
        />
      </div>
    </Layout>
  );
};

export default NewsDetailPage;
