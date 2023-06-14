import React, { useState } from "react";
import styles from "./styles.module.scss";
import arrow from "sites/mogivi/assets/icons/arrow.svg";
import classNames from "classnames";
import { IBannerCarouselModel } from "sites/mogivi/themes/HomeLandingPage/components/BannerCarouselBlock";
import LinkItem from "components/LinkItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper";
import Image from "next/legacy/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useViewMode from "hooks/useViewMode";

export const BannerCarousel = (props: IBannerCarouselModel) => {
  const { items } = props?.block?.fields;
  const { isMobileS } = useViewMode();

  return (
    <div className={styles.bannerContainer}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        // scrollbar={{ draggable: false }}
        // centeredSlides
        // fadeEffect={{ crossFade: true }}
        speed={500}
        // autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        loop
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {items.map((carouselItem, idx) => {
          const {
            backgroundImage: desktopImage,
            backgroundImageMobile: mobileImage,
            link,
            text,
            itemTitle,
            contentBgColour,
          } = carouselItem?.fields;
          return (
            <SwiperSlide key={idx}>
              <div
                className={styles.bannerBox2}
                style={{
                  color: `#${contentBgColour !== "" ? contentBgColour : "fff"}`,
                }}
              >
                <div
                  className={classNames(
                    "position-absolute w-100 h-100 top-0",
                    styles.zNegative1
                  )}
                >
                  <div className="position-relative w-100 h-100">
                    <Image
                      src={
                        isMobileS
                          ? mobileImage?.fields?.umbracoFile
                          : desktopImage?.fields?.umbracoFile
                      }
                      priority
                      quality={100}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="right"
                      alt="banner"
                    />
                  </div>
                </div>
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-5 text-left">
                      {itemTitle && itemTitle !== "" && <h1>{itemTitle}</h1>}
                      {text && (
                        <div dangerouslySetInnerHTML={{ __html: text }}></div>
                      )}
                      {link && (
                        <LinkItem
                          url={link.url || "#"}
                          className={classNames(styles.btnLink)}
                          target={link?.target}
                        >
                          <span>{link?.name}</span>{" "}
                          <div className={styles.arrowIcon}>
                            <Image
                              src={arrow}
                              width={30}
                              height={30}
                              objectFit="contain"
                              alt="icon"
                            />
                          </div>
                        </LinkItem>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
