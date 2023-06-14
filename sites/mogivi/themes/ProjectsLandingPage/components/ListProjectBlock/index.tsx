import React, { useCallback, useState } from "react";
import Image from "next/legacy/image";
import styles from "./list-project.module.scss";
import classNames from "classnames";
import { PaginationBlock } from "sites/mogivi/layout/components/Pagination";
import { DEFAULT_PAGE_SIZE, START_PAGE_INDEX } from "const/config";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { COLOR_TYPE } from "const/color-type";
import { IProjectsAPI } from "sites/mogivi/models/blocks/IProjectsAPI";
import { Modal } from "react-bootstrap";
import { ErrorBlock } from "sites/mogivi/layout/components/ErrorBlock";
import LinkItem from "components/LinkItem";
import LoadingPlaceholder from "./components/LoadingPlaceholder";
import { useGetSearchPageResult } from "hooks/useGetSearchPageResult";
import useBoolean from "sites/mogivi/hooks/useBoolean";
import { getProjectTagColorName } from "sites/mogivi/utils";

interface ProjectModelProps {
  block: IProjectsAPI;
}

const ListProjectBlock = (props: ProjectModelProps) => {
  const { settingAPI } = props.block.fields;
  const {
    items,
    pageIndex,
    totalPages,
    pageSize,
    isLoading,
    isError,
    baseUrl,
  } = useGetSearchPageResult(settingAPI);
  const currentYear = new Date().getFullYear();

  const [isShow, closeModal, openModal] = useBoolean(false);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleShow = (url: string) => {
    let video_id = url.split("v=")[1];
    const ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    const replaceUrl = `https://www.youtube.com/embed/${video_id}`;
    openModal();
    setVideoUrl(replaceUrl);
  };

  return (
    <div className="container pb-5">
      <div className="row gy-4">
        {isLoading && <LoadingPlaceholder pageSize={pageSize} />}
        {!isLoading &&
          items?.map((item: any, idx: number) => {
            const nodeId = item.statusProcedure?.nodeId;
            const ImageCardsRender = () => (
              <>
                <div className={styles.cardImageItem}>
                  <Image
                    src={
                      item.logo?.logoUrl ||
                      "/images/istockphoto-1147544807-612x612.webp"
                    }
                    alt="Project"
                    quality={100}
                    layout="fill"
                    priority={!idx}
                  />
                </div>
                {item.imageCards
                  ?.slice(0, 3)
                  ?.map((imageItem: any, imgIdx: number) => (
                    <div key={imgIdx} className={styles.cardImageItem}>
                      <Image
                        src={imageItem.logoUrl}
                        alt="Project"
                        quality={100}
                        layout="fill"
                      />
                      {imgIdx + 1 === 3 && (
                        <span className={styles.cardImageCount}>
                          +{item.imageCards?.length}
                        </span>
                      )}
                    </div>
                  ))}
              </>
            );
            return (
              <div key={idx} className="col-12 mb-3 p-md-0">
                <div className={classNames(styles.cardContainer)}>
                  {item.videoYouTube ? (
                    <div className={styles.cardImage}>
                      <div className={styles.cardProjectListImg}>
                        <ImageCardsRender />
                        <div
                          className={styles.playIcon}
                          onClick={() => handleShow(item.videoYouTube.logoUrl)}
                        >
                          <SvgIcon icon="play" width={50} height={50} />
                        </div>
                        <span className={styles.blurBackground}></span>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.cardImage}>
                      <LinkItem
                        className={styles.cardProjectListImg}
                        url={item?.pageURL}
                      >
                        <ImageCardsRender />
                      </LinkItem>
                    </div>
                  )}

                  <div className={styles.cardBody}>
                    <div
                      className={classNames(
                        "w-100 d-flex align-items-start gap-2",
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
                      <LinkItem url={item.pageURL}>{item.name}</LinkItem>
                    </div>
                    <div
                      className={classNames(
                        "w-100 d-flex align-items-end gap-2",
                        styles.cardSubDescription
                      )}
                    >
                      {item.listOfInfo?.map((infoItem: any, idx: number) => (
                        <div
                          key={idx}
                          className={classNames(
                            "me-3 d-flex align-items-center gap-2",
                            styles.briefInfoBox
                          )}
                        >
                          {infoItem?.icon && (
                            <>
                              <div>
                                <Image
                                  src={infoItem.icon.logoUrl}
                                  width={20}
                                  height={20}
                                  objectFit={"contain"}
                                  alt={"icon"}
                                />
                              </div>
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
                    )}
                    <div
                      className={classNames("w-100", styles.cardDescription)}
                    >
                      <div className={styles.descriptionText}>
                        {item.shortDescription}
                      </div>
                    </div>
                    <div className="row">
                      {item.listOfInvestor?.map(
                        (investorItem: any, investorIdx: number) => (
                          <div
                            key={investorIdx}
                            className="col-sm-12 col-md-12 mb-2"
                          >
                            {investorItem.pageURL && (
                              <LinkItem url={investorItem.pageURL}>
                                <div className="d-flex gap-3 align-items-center">
                                  <div className={styles.investorLogo}>
                                    <Image
                                      src={investorItem?.logo?.logoUrl}
                                      alt={investorItem?.logo?.description}
                                      title={investorItem?.logo?.description}
                                      width={120}
                                      height={40}
                                      objectFit={"contain"}
                                    />
                                  </div>
                                  <div
                                    className={classNames(
                                      "d-flex flex-column gap-2",
                                      styles.investorInfo
                                    )}
                                  >
                                    <strong className={styles.investorTitle}>
                                      {investorItem.name}
                                    </strong>
                                    <span className={styles.investorDesc}>
                                      {investorItem.addressText}
                                    </span>
                                  </div>
                                </div>
                              </LinkItem>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {!isLoading && isError && <ErrorBlock />}
      </div>

      {!isLoading && totalPages && (
        <>
          <PaginationBlock
            baseUrl={baseUrl}
            currentNumber={pageIndex ?? START_PAGE_INDEX}
            totalPages={totalPages}
            pageSize={pageSize ?? DEFAULT_PAGE_SIZE}
          />

          <Modal
            className={styles.videoModalContainer}
            show={isShow}
            size={"lg"}
            onHide={closeModal}
            animation={true}
            centered
          >
            <Modal.Body className={styles.videoModal}>
              <div className={styles.videoModalBox}>
                <iframe
                  className="modal__video-style"
                  loading="lazy"
                  src={videoUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ListProjectBlock;
