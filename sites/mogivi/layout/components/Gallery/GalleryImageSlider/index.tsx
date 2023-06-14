import classNames from "classnames";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { useState } from "react";
import Slider from "components/ReactSlickSlider";
import styles from "./styles.module.scss";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { IImagesSliderBlock } from "sites/mogivi/models/blocks/IImagesSliderBlock";

export interface GalleryImageSliderProps {
  block: IImagesSliderBlock;
}

export const GalleryImageSlider = (props: GalleryImageSliderProps) => {
  const { itemTitle, items } = props.block.fields;

  const [settings] = useState({
    speed: 300,
    centerMode: true,
    dots: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1e4,
    infinite: true,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px",
          arrows: false,
        },
      },
    ],
  });

  return (
    <div className={styles.galleryImageContainer}>
      <div className={styles.galleryImageTextGroup}>
        <div className="container">
          <h2>{itemTitle}</h2>
          <Slider {...settings}>
            {items &&
              items.map((item, idx) => {
                const icon = item.fields?.image;
                const link = item.fields?.link;

                return (
                  <div
                    key={idx}
                    className={classNames(styles.cardImgContainer)}
                  >
                    {link?.aliasUrl ? (
                      <Link href={link?.aliasUrl || ""} draggable={false}>
                        <div className={styles.cardImg}>
                          {icon && (
                            <Image
                              className="lazyloaded"
                              alt="icon"
                              src={icon.fields?.umbracoFile}
                              width={420}
                              height={320}
                              objectFit="cover"
                            />
                          )}
                        </div>
                      </Link>
                    ) : (
                      <div className={styles.cardImg}>
                        {icon && (
                          <Image
                            className="lazyloaded"
                            alt="icon"
                            src={icon.fields?.umbracoFile}
                            width={420}
                            height={320}
                            objectFit="cover"
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </div>
  );
};
