import classNames from "classnames";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import Slider from "components/ReactSlickSlider";
import { IQuickLinksBlock } from "sites/mogivi/models/blocks/IQuickLinksBlock";
import styles from "./styles.module.scss";
import SvgIcon from "sites/mogivi/components/SvgIcon";

export interface IQuickLinks {
  block: IQuickLinksBlock;
}

export const GalleryQuickLink = (props: IQuickLinks) => {
  const { itemTitle, items } = props.block.fields;

  const isSubHeadingEmpty = items.filter(
    (item) => item.fields.subheading !== ""
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      <SvgIcon icon="chevronRight" />
    </button>
  );
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      <SvgIcon icon="chevronLeft" />
    </button>
  );

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
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
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
    <div className={styles.galleryInfoContainer}>
      <div className={styles.galleryInfoTextGroup}>
        <div className="container">
          <h2>{itemTitle}</h2>

          {/* <div className={classNames("row align-items-center", styles.textVideoCard)}> */}
          {isSubHeadingEmpty?.length !== 0 ? (
            <div
              className={classNames("row align-items-center", styles.textCard)}
            >
              {items &&
                items.map((item, idx) => {
                  const icon = item.fields?.image;
                  const label = item.fields?.label;
                  const subHeading = item.fields?.subheading;
                  const link = item.fields.link;

                  return link ? (
                    <div
                      key={idx}
                      className={classNames(
                        "col-sm-12 col-md-4 col-lg-4 p-0",
                        styles.cardImgContainer,
                        styles.cardImgHover
                      )}
                    >
                      <Link href={link.url}>
                        <Fragment>
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
                          <div className={styles.cardDescription}>
                            {label && <h4>{label}</h4>}
                            {subHeading && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: subHeading,
                                }}
                              ></div>
                            )}
                          </div>
                        </Fragment>
                      </Link>
                    </div>
                  ) : (
                    <div
                      key={idx}
                      className={classNames(
                        "col-sm-12 col-md-4 col-lg-4 p-0",
                        styles.cardImgContainer,
                        styles.cardImgHover
                      )}
                    >
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
                      <div className={styles.cardDescription}>
                        {label && <h4>{label}</h4>}
                        {subHeading && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: subHeading,
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <Slider {...settings}>
              {items?.map((item, idx) => {
                const icon = item.fields?.image;
                const link = item.fields.link;

                return link?.aliasUrl ? (
                  <div
                    key={idx}
                    className={classNames(styles.cardImgContainer)}
                  >
                    <Link href={link.aliasUrl} draggable={false}>
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
                  </div>
                ) : (
                  <div
                    key={idx}
                    className={classNames(styles.cardImgContainer)}
                  >
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
                  </div>
                );
              })}
            </Slider>
          )}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
