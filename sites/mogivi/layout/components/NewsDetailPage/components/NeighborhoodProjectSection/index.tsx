import React, { useState } from "react";
import styles from "./styles.module.scss";
import Slider from "components/ReactSlickSlider";
import classNames from "classnames";
import Image from "next/legacy/image";
import { ProjectSameLocation } from "sites/mogivi/models/ISubpage";
import { TAB_ANCHOR_ID } from "sites/mogivi/const/tab-anchor-id";
import { COLOR_TYPE } from "const/color-type";
import { getProjectTagColorName } from "sites/mogivi/utils";
import LinkItemPreventSwipe from "./components/LinkItemPreventSwipe";

interface Props {
  listProjects: ProjectSameLocation[];
}

const NeighborhoodProjectSection = (props: Props) => {
  const { listProjects } = props;
  const currentYear = new Date().getFullYear();
  const [settings] = useState({
    speed: 500,
    centerMode: false,
    dots: true,
    centerPadding: "100px",
    slidesToShow: 3,
    infinite: false,
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
    <div
      className={styles.neighborProjectContent}
      id={TAB_ANCHOR_ID.NEIGHBORHOOD_PROJECTS}
    >
      <div className="mt-4 pt-4 pb-1">
        <h2 className="section-title mb-3">Dự án lân cận</h2>
        <Slider {...settings}>
          {listProjects?.map((item, idx: number) => {
            const { logo, nodeId } = item;
            return (
              <div key={idx} className={styles.neighborProjectItem}>
                <div className="card">
                  <div className="position-relative overflow-hidden">
                    <div className={styles.projectImg}>
                      <LinkItemPreventSwipe url={item.pageURL}>
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
                      </LinkItemPreventSwipe>
                    </div>
                  </div>

                  <div className="px-2">
                    <div
                      className={classNames(
                        "w-100 d-flex align-items-start gap-2 mt-2",
                        styles.cardHeader
                      )}
                    >
                      {Boolean(item.statusProcedure?.name) && (
                        <div
                          className={classNames(
                            styles.tag,
                            "default-tag",
                            getProjectTagColorName(nodeId)
                          )}
                        >
                          {item.statusProcedure?.name}
                          {nodeId === COLOR_TYPE.handoverProject &&
                            ` • ${item.finishedYear.name}`}
                        </div>
                      )}
                      {item.isProjectHasCommissionFromMgv && (
                        <div className={classNames(styles.tag, "default-tag")}>
                          MGV Phân phối
                        </div>
                      )}
                      {+item.finishedYear.name > currentYear && (
                        <div className={classNames(styles.tag, "tag-warning")}>
                          Dự kiến bàn giao {`• ${item.finishedYear.name}`}
                        </div>
                      )}
                    </div>
                    <div className={styles.cardTitle}>
                      <LinkItemPreventSwipe url={item.pageURL}>
                        {item.name}
                      </LinkItemPreventSwipe>
                    </div>
                    {/* <div
                      className={classNames(
                        "w-100 d-flex align-items-end flex-wrap",
                        styles.cardSubDescription
                      )}
                    >
                      {item.listOfInfo?.map((infoItem: any, idx: number) => (
                        <div
                          key={idx}
                          className={classNames(
                            "d-flex align-items-center w-50 mb-2",
                            styles.briefInfoBox
                          )}
                        >
                          {infoItem?.icon && (
                            <>
                              <Image
                                src={infoItem.icon.logoUrl}
                                width={20}
                                height={20}
                                objectFit={"contain"}
                                alt={"icon"}
                              />
                              <div
                                className={styles.briefInfoText}
                                dangerouslySetInnerHTML={{
                                  __html: infoItem?.text,
                                }}
                              ></div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                    {item.listOfInfo && item.listOfInfo[8] && (
                      <div
                        className={classNames(
                          "w-100 d-flex align-items-start justify-content-between",
                          styles.cardSubDescription
                        )}
                      >
                        <div className={styles.price}>
                          <span>Giá:</span>{" "}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.listOfInfo[8].text,
                            }}
                          ></div>
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default NeighborhoodProjectSection;
