import React, { useState } from "react";
import styles from "./styles.module.scss";
import Slider from "components/ReactSlickSlider";
import { IETTab } from "sites/mogivi/models/IETTab";
import LinkItem from "components/LinkItem";
import classNames from "classnames";
import Image from "next/image";

interface NeighborhoodProjectSectionProps {
  tab: IETTab;
}

const NeighborhoodProjectSection = (props: NeighborhoodProjectSectionProps) => {
  const { blocksInTab, title: pageTitle, anchorID } = props.tab.fields;

  const [settings] = useState({
    speed: 500,
    centerMode: false,
    dots: true,
    centerPadding: "100px",
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  return (
    <div className={styles.neighborProjectContent} id={anchorID}>
      {blocksInTab && blocksInTab[0]?.fields?.projectViews?.items?.length && (
        <div className="mt-4 pt-4 pb-1">
          <h2 className="section-title mb-3">{pageTitle}</h2>
          <Slider {...settings}>
            {blocksInTab[0]?.fields?.projectViews.items?.map(
              (item: any, idx: number) => {
                const { logo } = item;
                return (
                  <div key={idx} className={styles.neighborProjectItem}>
                    <LinkItem url={item?.pageURL}>
                      <div className="position-relative img-other-project overflow-hidden">
                        <div className={styles.projectImg}>
                          <Image
                            className="w-100 img-fluid"
                            data-src={logo?.logoUrl}
                            alt={logo?.description}
                            title={logo?.description}
                            src={
                              logo?.logoUrl ||
                              "/images/istockphoto-1147544807-612x612.webp"
                            }
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                          />
                        </div>
                        <div className={styles.otherProjectBody}>
                          <h1 className="h5 font-weight-bold">{item.name}</h1>
                          <p className={classNames("mb-1", styles.description)}>
                            {item.shortDescription}
                          </p>
                          {item.listOfInfo[item.listOfInfo?.length - 1]
                            ?.text && (
                            <div
                              className={styles.price}
                              dangerouslySetInnerHTML={{
                                __html:
                                  item.listOfInfo[item.listOfInfo?.length - 1]
                                    .text,
                              }}
                            ></div>
                          )}
                        </div>
                      </div>
                    </LinkItem>
                  </div>
                );
              }
            )}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default NeighborhoodProjectSection;
