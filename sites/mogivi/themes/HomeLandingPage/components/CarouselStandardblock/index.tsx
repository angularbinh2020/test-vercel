import React from "react";
import styles from "./carousel-standard.module.scss";
import classNames from "classnames";
import carouselImage1 from "sites/mogivi/assets/images/homepage/img-carousel-1.png";
import carouselImage2 from "sites/mogivi/assets/images/homepage/img-carousel-2.png";
import carouselImage3 from "sites/mogivi/assets/images/homepage/img-carousel-3.png";
import Slider from "components/ReactSlickSlider";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import Image from "next/legacy/image";
import { ISectionAnalyticNews } from "sites/mogivi/models/blocks/ISectionAnalyticNews";
import LinkItem from "components/LinkItem";
import { convertDate } from "helpers/date";

const SLIDES = [
  {
    image: carouselImage1,
    title: "Top 10 Dự Án Chung Cư Quận Bình Thạnh Chất Lượng Nhất",
    date: "22/01/2022",
  },
  {
    image: carouselImage2,
    title: "Top 10 Dự Án Chung Cư Quận Bình Thạnh Chất Lượng Nhất",
    date: "22/01/2022",
  },
  {
    image: carouselImage3,
    title: "Top 10 Dự Án Chung Cư Quận Bình Thạnh Chất Lượng Nhất",
    date: "22/01/2022",
  },
];

const SlideArrowNext = (props: any) => (
  <SvgIcon
    icon="chevronRight"
    {...props}
    className={classNames(props.className, styles.arrow)}
  />
);

const SlideArrowPrev = (props: any) => (
  <SvgIcon
    icon="chevronLeft"
    {...props}
    className={classNames(props.className, styles.arrow)}
  />
);

interface CarouselStandardProps {
  articleList: ISectionAnalyticNews[];
  itemTitle: string;
  subtitle: string;
}

const CarouselStandard = (props: CarouselStandardProps) => {
  const { articleList, itemTitle, subtitle } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SlideArrowNext />,
    prevArrow: <SlideArrowPrev />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className={styles.carouselStandardContainer}>
      <div className={classNames("container", styles.carouselStandardBody)}>
        <div className={styles.title}>{itemTitle}</div>
        {subtitle && (
          <div
            className={styles.subTitle}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          ></div>
        )}
        <div className={classNames(styles.slider, styles.slickCustom)}>
          <Slider {...settings}>
            {articleList.map((item, index: number) => {
              return (
                item.pageUrl && (
                  <LinkItem url={item.pageUrl} key={index}>
                    <div className={styles.sliderItemContainer}>
                      <div className={styles.sliderItem}>
                        {item.mainImage && (
                          <div className="w-100">
                            <Image
                              src={item.mainImage}
                              alt={item.introText}
                              width={520}
                              height={250}
                            />
                          </div>
                        )}
                        <div className={styles.sliderTitle}>
                          {item.mainHeading}
                        </div>
                        <div className={styles.sliderDate}>
                          {convertDate(item.dateLine)}
                        </div>
                      </div>
                    </div>
                  </LinkItem>
                )
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CarouselStandard;
