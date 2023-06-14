import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import styles from "./styles.module.scss";
import Slider from "components/ReactSlickSlider";
import classNames from "classnames";
import { IETTab } from "sites/mogivi/models/IETTab";
import Image from "next/legacy/image";
import LinkItem from "components/LinkItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import useDetectDeviceByScreen from "sites/mogivi/hooks/useDetectDeviceByScreen";
import Link from "next/link";
import BootstrapTooltip from "components/BootstrapTooltip";
interface Props {
  tab: IETTab;
}

const ApartmentSection = (props: Props) => {
  const tab = props.tab.fields;
  const { itemTitle } = tab.blocksInTab[0]?.fields;
  const TabViews: any[] = tab.blocksInTab[0]?.fields.TabViews;
  const { isMobile } = useDetectDeviceByScreen();
  const [tabSelected, setTabSelected] = useState(TabViews ? TabViews[0] : null);
  const [settings] = useState({
    speed: 300,
    centerMode: false,
    dots: true,
    centerPadding: "100px",
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 1e4,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
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
  const blockEmptyData = TabViews.every(
    (data: any) => !data.listOfMgvNews.length
  );
  if (blockEmptyData) return null;
  return (
    <>
      <div className={styles.apartmentContent} id={tab.anchorID}>
        <div
          className={classNames(
            "mt-4 pt-4 pb-1",
            styles.apartmentContentContainer
          )}
        >
          <h2 className="section-title">{itemTitle}</h2>
          <Tabs
            defaultActiveKey="0"
            id="tab-control"
            transition={true}
            className="mb-3"
          >
            {TabViews?.map((data, idx: number) => (
              <Tab
                eventKey={idx}
                onSelect={() => setTabSelected(data)}
                title={`${data.title} (${data.listOfMgvNews?.length})`}
                key={idx}
              >
                <Slider {...settings}>
                  {data.listOfMgvNews.map((item: any, index: number) => {
                    const imgUrl = isMobile
                      ? item.mobileTeasersImageUrl
                      : item.desktopTeasersImageUrl;
                    const imgAlt = isMobile
                      ? item.mobileTeasersImageCaption
                      : item.desktopTeasersImageCaption;
                    return (
                      <div
                        key={index}
                        className={classNames("mt-3", styles.sliderItem)}
                      >
                        <div className="row" key={idx}>
                          <div className="col-12">
                            <div className={styles.sellApartmentHeader}>
                              <div className={styles.sellApartmentImage}>
                                <Image
                                  src={imgUrl}
                                  alt={imgAlt}
                                  width={524}
                                  height={350}
                                  objectFit="cover"
                                />
                              </div>
                              <span className={styles.badge}>
                                {item.statusText}
                              </span>
                            </div>
                          </div>
                          <div className={classNames("col-12")}>
                            <div
                              className={classNames(
                                "bg-white p-2 shadow-sm",
                                styles.sellApartmentBody
                              )}
                            >
                              <div
                                className={classNames(
                                  "mb-2 font-weight-bold",
                                  styles.projectName
                                )}
                              >
                                <LinkItem url={item.pageURL}>
                                  {item.title}
                                </LinkItem>
                              </div>

                              <div
                                className={classNames("mb-2", styles.projectId)}
                              >
                                ID tin:{" "}
                                <span className="fw-bold">
                                  {item.newsIdText}
                                </span>
                              </div>

                              <div
                                className={classNames(
                                  "d-flex align-items-center mb-2",
                                  styles.publishDate
                                )}
                              >
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                <span className="ml-2">
                                  {item.publishDateText}
                                </span>
                              </div>

                              <div
                                className={classNames(
                                  "d-flex align-items-center justify-content-between",
                                  styles.extraInfo
                                )}
                              >
                                {item.tags?.map(
                                  (tag: any, tagIndex: number) => (
                                    <div
                                      id={`tag-${tagIndex}`}
                                      className="d-flex align-items-center"
                                    >
                                      <Image
                                        src={tag.iconUrl}
                                        width={13}
                                        height={13}
                                        alt={tag.text}
                                      />{" "}
                                      <BootstrapTooltip title={tag.text}>
                                        <span
                                          className={classNames(
                                            styles.extraInfoDetail,
                                            "text-truncate"
                                          )}
                                        >
                                          {tag.text}
                                        </span>
                                      </BootstrapTooltip>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </Tab>
            ))}
          </Tabs>
          <Link
            href={tabSelected?.viewAllUrl ?? ""}
            className={classNames("btn", styles.btnSeeAll)}
          >
            {tabSelected?.viewAllLabel}
          </Link>
        </div>
      </div>
    </>
  );
};

export default ApartmentSection;
