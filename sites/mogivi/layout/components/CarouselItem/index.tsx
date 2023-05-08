import classNames from "classnames";
import LinkItem from "components/LinkItem";
import { useGetPageDataContext } from "context/page-data.context";
import useViewMode from "hooks/useViewMode";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Slider from "components/ReactSlickSlider";
import SvgIcon from "sites/mogivi/components/SvgIcon";

import styles from "./styles.module.scss";

export const CarouselItem = () => {
  const { topInvestors } = useSelector(
    (state: Types.RootState) => state.investor
  );
  const pageData = useGetPageDataContext();
  const pageUrl = pageData?.currentNode.fields.umbracoUrlAlias.split("/")[0];
  const { isMobile } = useViewMode();

  const [settings] = useState({
    speed: 300,
    centerMode: false,
    dots: false,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    // autoplaySpeed: 1e4,
    infinite: false,
    nextArrow: <SvgIcon icon="chevronRight" />,
    prevArrow: <SvgIcon icon="chevronLeft" />,
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
          slidesToShow: 2.5,
          infinite: false,
          autoplay: false,
          slidesToScroll: 2.5,
          centerMode: false,
          arrows: false,
        },
      },
    ],
  });
  if (topInvestors)
    return (
      <div className={classNames(styles.investorContainer)}>
        <div className={styles.headerTitle}>
          <div className={styles.headerGroup}>
            <h2>Chủ đầu tư nổi bật</h2>
            <div className={styles.readMoreBtn}>
              <LinkItem url={`/${pageUrl}`}>
                Xem thêm
                <SvgIcon icon="chevronRight" />
              </LinkItem>
            </div>
          </div>
        </div>

        {isMobile ? (
          <div className={styles.investorCarousel}>
            {topInvestors?.map((investor: any, i: number) => (
              <LinkItem
                className={styles.investorItem}
                key={i}
                url={investor.pageURL}
                ariaLabel={investor.name}
              >
                <div className={styles.investorLogo}>
                  {investor.logo && (
                    <Image
                      src={investor.logo.logoUrl}
                      width={363}
                      height={280}
                      alt={""}
                      objectFit={"contain"}
                    />
                  )}
                </div>
              </LinkItem>
            ))}
          </div>
        ) : (
          <div className={styles.investorCarousel}>
            <Slider {...settings}>
              {topInvestors?.map((investor: any, i: number) => (
                <LinkItem
                  className={styles.investorItem}
                  key={i}
                  url={investor.pageURL}
                  ariaLabel={investor.name}
                >
                  <div className={styles.investorLogo}>
                    {investor.logo && (
                      <Image
                        src={investor.logo.logoUrl}
                        width={363}
                        height={280}
                        alt={""}
                        objectFit={"contain"}
                      />
                    )}
                  </div>
                </LinkItem>
              ))}
            </Slider>
          </div>
        )}
      </div>
    );
  return null;
};
