import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import classNames from "classnames";
import useViewMode from "hooks/useViewMode";
import Link from "next/link";
import { Pagination } from "swiper";
import LinkItem from "components/LinkItem";
import { IImageSlider } from "sites/mogivi/models/blocks/IImageSlider";

interface IGalleryModel {
  block: IImageSlider;
}

const GalleryBlock = (props: IGalleryModel) => {
  const { itemTitle, items } = props.block.fields;
  const { isDesktop } = useViewMode();
  // const settings = {
  //   speed: 300,
  //   centerMode: true,
  //   dots: false,
  //   arrows: false,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,

  //   autoplay: false,
  //   infinite: true,
  //   fade: false,
  //   centerPadding: "25%",
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         infinite: false,
  //         autoplay: false,
  //         slidesToScroll: 1,
  //         centerMode: false,
  //         arrows: false,
  //       },
  //     },
  //   ],
  // };

  return (
    <div className={styles.galleryContainer}>
      {itemTitle && (
        <h2 className={classNames("text-center", styles.title)}>{itemTitle}</h2>
      )}
      {items && items?.length && (
        <div className={styles.articleSlideContainer}>
          <Swiper
            spaceBetween={10}
            slidesPerView={isDesktop ? 2 : 1}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
            scrollbar={{ draggable: false }}
            centeredSlides
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            loop
          >
            {items.map((sliderItem, idx) => {
              const {
                image,
                itemTitle: sliderItemTitle,
                link,
                subtitle,
              } = sliderItem.fields;
              return (
                <SwiperSlide key={idx}>
                  {({ isActive }) => (
                    <div className={styles.articleItem}>
                      {image && (
                        <div className={styles.articleImg}>
                          <Image
                            src={image?.fields?.umbracoFile}
                            width={864}
                            height={530}
                            objectFit="cover"
                            alt={image?.system?.name}
                          />
                        </div>
                      )}
                      <div className={styles.serviceInfo}>
                        {sliderItemTitle && (
                          <h3 className={styles.serviceName}>
                            {sliderItemTitle}
                          </h3>
                        )}
                        {subtitle && (
                          <div
                            className={styles.description}
                            dangerouslySetInnerHTML={{ __html: subtitle }}
                          ></div>
                        )}
                        {link && (
                          <LinkItem
                            className={styles.link}
                            url={link?.url}
                            target={link?.target}
                          >
                            Explore more
                          </LinkItem>
                        )}
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default GalleryBlock;
