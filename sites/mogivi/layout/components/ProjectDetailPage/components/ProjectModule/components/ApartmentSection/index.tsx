import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import styles from "./styles.module.scss";
import Slider from "components/ReactSlickSlider";
import classNames from "classnames";
import { IETTab } from "sites/mogivi/models/IETTab";
import Image from "next/image";
import LinkItem from "components/LinkItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faBed,
  faBath,
  faRulerCombined,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
interface ApartmentSectionProps {
  tab: IETTab;
}

const ApartmentSection = (props: ApartmentSectionProps) => {
  const tab = props.tab.fields;
  const { itemTitle, TabViews } = tab.blocksInTab[0]?.fields;

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
              <Tab eventKey={idx} title={data.Name} key={idx}>
                <Slider {...settings}>
                  {data.News.map((item: any, index: number) => (
                    <div
                      key={index}
                      className={classNames("mt-3", styles.sliderItem)}
                    >
                      <div className="row" key={idx}>
                        <div className="col-12">
                          <div className={styles.sellApartmentHeader}>
                            <div className={styles.sellApartmentImage}>
                              <Image
                                src={item.Properties[0].Text}
                                alt={item.Properties[3].Text}
                                width={524}
                                height={350}
                              />
                            </div>
                            <span className={styles.badge}>
                              {item.Properties[5].Text}
                            </span>
                            <span className={styles.badgeStatus}>
                              {item.Properties[0].Text === "Thuê"
                                ? "For Rent"
                                : "For Sell"}
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
                              {item.Properties[1].Text && (
                                <LinkItem url={item.Properties[1].Text}>
                                  {item.Properties[3].Text}
                                </LinkItem>
                              )}
                            </div>

                            <h3 className={styles.projectPrice}>
                              {item.Properties[4].Text}
                            </h3>

                            <div
                              className={classNames("mb-2", styles.projectId)}
                            >
                              ID tin:{" "}
                              <span className="fw-bold">{item.MgvNewsId}</span>
                            </div>

                            <div
                              className={classNames(
                                "d-flex align-items-center mb-2",
                                styles.publishDate
                              )}
                            >
                              <FontAwesomeIcon icon={faCalendarAlt} />
                              <span className="ml-2">
                                {item.Properties[2].Text}
                              </span>
                            </div>

                            <div
                              className={classNames(
                                "d-flex align-items-center justify-content-between",
                                styles.extraInfo
                              )}
                            >
                              <span>
                                <FontAwesomeIcon icon={faBed} />{" "}
                                <span className={styles.extraInfoDetail}>
                                  {item.Properties[6].Text}
                                </span>
                              </span>
                              <span>
                                <FontAwesomeIcon icon={faBath} />{" "}
                                <span className={styles.extraInfoDetail}>
                                  {item.Properties[7].Text}
                                </span>
                              </span>
                              <span>
                                <FontAwesomeIcon icon={faRulerCombined} />{" "}
                                <span className={styles.extraInfoDetail}>
                                  {item.Properties[8].Text}
                                </span>
                              </span>
                              <span>
                                <FontAwesomeIcon icon={faLocationArrow} />{" "}
                                <span className={styles.extraInfoDetail}>
                                  {item.Properties[9].Text}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </Tab>
            ))}
          </Tabs>
          <button className={classNames("btn", styles.btnSeeAll)}>
            Xem tất cả
          </button>
        </div>
      </div>
    </>
  );
};

export default ApartmentSection;
