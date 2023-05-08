import classNames from "classnames";
import Image from "next/image";
import React, { useState } from "react";
import Slider from "components/ReactSlickSlider";
import styles from "./styles.module.scss";
import { IReviewsBlock } from "sites/mogivi/models/blocks/IReviewsBlock";
import useViewMode from "hooks/useViewMode";

export interface ReviewsItemProps {
  block: IReviewsBlock;
}

export const ReviewsItem = (props: ReviewsItemProps) => {
  const { itemTitle, reviewsList } = props.block.fields;
  const { isDesktop } = useViewMode();

  const [settings] = useState({
    speed: 300,
    centerMode: false,
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1e4,
    infinite: true,
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
    <div className={classNames(styles.reviewsContainer, "section-container")}>
      <div className="container">
        <div className={styles.headerTitle}>
          <h2>{itemTitle}</h2>
        </div>
        <div className={styles.feedBackContainer}>
          <Slider {...settings}>
            {reviewsList.map((item, idx) => {
              const { image, review, authorIcon, authorName, authorTitle } =
                item && item?.fields;
              return (
                <div key={idx} className={styles.reviewsItem}>
                  <div className={styles.reviewsItemContainer}>
                    <div className="row justify-content-center">
                      {image && isDesktop && (
                        <div className="col-md-3 col-lg-5">
                          <div className="margin-media">
                            <Image
                              src={image.fields?.umbracoFile}
                              width={363}
                              height={280}
                              alt={image.system.name}
                              objectFit={"cover"}
                            />
                          </div>
                        </div>
                      )}

                      <div className="col-md-9 col-lg-7">
                        <div className={styles.reviewsContent}>
                          <div
                            className={styles.authorFeedback}
                            dangerouslySetInnerHTML={{ __html: review }}
                          >
                            {/* <p className="text-video-font-size">
                            “{review}
                          </p> */}
                          </div>
                          <div className={styles.author}>
                            {authorIcon && (
                              <div className={styles.authorImg}>
                                <Image
                                  src={authorIcon.fields?.umbracoFile}
                                  alt={authorIcon.system.name}
                                  width={500}
                                  height={500}
                                />
                              </div>
                            )}

                            <div className={styles.authorInfo}>
                              <h5>{authorName}</h5>
                              <span>{authorTitle}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};
