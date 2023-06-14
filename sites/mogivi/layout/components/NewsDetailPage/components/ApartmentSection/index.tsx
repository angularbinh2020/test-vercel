import React, { useState, useMemo } from "react";
import { Tab, Tabs } from "react-bootstrap";
import styles from "./styles.module.scss";
import Slider from "components/ReactSlickSlider";
import classNames from "classnames";
import Image from "next/image";
import LinkItem from "components/LinkItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  ApartmentSameLocation,
  ApartmentSameLocationModel,
} from "sites/mogivi/models/ISubpage";
import { TAB_ANCHOR_ID } from "sites/mogivi/const/tab-anchor-id";
import useDetectDeviceByScreen from "sites/mogivi/hooks/useDetectDeviceByScreen";
import Link from "next/link";
import BootstrapTooltip from "components/BootstrapTooltip";
import VrIcon from "sites/mogivi/assets/icons/vr-on.gif";
import DefaultImg from "public/images/istockphoto-1147544807-612x612.webp";
import ItemRender from "./components/ItemRender";

interface Props {
  rental: ApartmentSameLocationModel;
  sell: ApartmentSameLocationModel;
}

const ApartmentSection = ({ rental, sell }: Props) => {
  const [activeKey, setActiveKey] = useState<any>("0");
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
  const { isMobile } = useDetectDeviceByScreen();
  const tabViews = useMemo(() => {
    const tabs: {
      title: string;
      badge: string;
      viewAllLabel: string;
      viewAllUrl: string;
      data: ApartmentSameLocation[];
    }[] = [];
    const pushData = (item: ApartmentSameLocationModel, badge: string) => {
      if (item.listOfMgvNews?.length) {
        tabs.push({
          title: `${item.title} (${item.listOfMgvNews.length})`,
          data: item.listOfMgvNews,
          badge,
          viewAllLabel: item.viewAllLabel,
          viewAllUrl: item.viewAllUrl,
        });
      }
    };
    pushData(sell, "For Sell");
    pushData(rental, "For Rent");
    return tabs;
  }, [sell, rental]);
  if (tabViews?.length)
    return (
      <div
        className={styles.apartmentContent}
        id={TAB_ANCHOR_ID.PROJECT_APARTMENT}
      >
        <div
          className={classNames(
            "mt-4 pt-4 pb-1",
            styles.apartmentContentContainer
          )}
        >
          <h2 className="section-title">Tin đăng trong khu vực</h2>
          <Tabs
            defaultActiveKey="0"
            id={`control-${TAB_ANCHOR_ID.PROJECT_APARTMENT}`}
            className="mb-3"
            activeKey={activeKey}
            onSelect={(key) => {
              {
                setActiveKey(key);
              }
            }}
          >
            {tabViews.map((data, idx: number) => (
              <Tab eventKey={idx} title={data.title} key={`tab-index-${idx}`}>
                <Slider {...settings}>
                  {data.data.map(
                    (item: ApartmentSameLocation, index: number) => (
                      <ItemRender
                        isMobile={isMobile}
                        item={item}
                        badge={data.badge}
                        key={`slide-${index}`}
                      />
                    )
                  )}
                </Slider>
              </Tab>
            ))}
          </Tabs>
          <Link
            href={tabViews[activeKey].viewAllUrl}
            className={classNames("btn", styles.btnSeeAll)}
          >
            {tabViews[activeKey].viewAllLabel}
          </Link>
        </div>
      </div>
    );
  return null;
};

export default ApartmentSection;
