import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./list-project.module.scss";
import classNames from "classnames";
import { PaginationBlock } from "sites/mogivi/layout/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { ProjectModel } from "sites/mogivi/models/apis";
import { onGetAllProjects } from "sites/mogivi/redux/project.slice";
import { START_PAGE_INDEX } from "const/config";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { COLOR_TYPE } from "const/color-type";
import { IProjectsAPI } from "sites/mogivi/models/blocks/IProjectsAPI";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import useViewMode from "hooks/useViewMode";
import { ErrorBlock } from "sites/mogivi/layout/components/ErrorBlock";
import LinkItem from "components/LinkItem";
import { useGetPageDataContext } from "context/page-data.context";
import useBoolean from "sites/mogivi/hooks/useBoolean";
import LoadingPlaceholder from "./components/LoadingPlaceholder";

let projectModel: ProjectModel = {
  page: 1,
  limit: 10,
  keyword: "",
  siteId: "",
};

interface ProjectModelProps {
  block: IProjectsAPI;
}

const ListProjectBlock = (props: ProjectModelProps) => {
  const { allProjects, totalPages, isError, loading } = useSelector(
    (state: RootState) => state.project
  );
  const pageData = useGetPageDataContext();
  const { settingAPI } = props.block.fields;
  const [currentNumber, setCurrentNumber] = useState(START_PAGE_INDEX);
  const { isMobileApp } = useViewMode();
  const dispatch = useDispatch();
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const { baseApi, pageIndex, limit, defaultKeyword, method, siteId } =
    useMemo(() => {
      let baseApi = "";
      let pageIndex = 1;
      let limit = 10;
      let defaultKeyword = "";
      let method = "get";
      let siteId: any = 0;
      if (pageData) {
        const defaultCMSKey =
          pageData.currentNode?.fields?.defaultFilterLocation?.node.system
            ?.urlSegment;
        defaultKeyword = defaultCMSKey;
        siteId = pageData.siteId;
      }
      if (settingAPI?.length) {
        const aPIKeyTag = settingAPI[0].fields.aPIKeyTag;
        const parameters = settingAPI[0].fields.parameters;
        baseApi = aPIKeyTag?.node.fields.itemTitle;
        pageIndex = parameters[0].fields.value;
        limit = parameters[1].fields.value;
        method = aPIKeyTag?.method?.toLowerCase() || "get";
      }

      return { baseApi, pageIndex, limit, defaultKeyword, method, siteId };
    }, [pageData, settingAPI]);
  const { urlKeyword, urlPageNumber, baseUrl } = useMemo(() => {
    let urlKeyword = "";
    let urlPageNumber = String(currentNumber);
    const asPath = router.asPath;
    let baseUrl = asPath.split("/page-")[0];
    if (asPath.includes("?ViewMobileApp=1")) {
      baseUrl = baseUrl.replace("?ViewMobileApp=1", "");
    }
    const slug = router.query.slug;
    const asPathGroup = asPath.split("/");

    if (slug && slug.length < 2) {
      asPathGroup.slice(1).forEach((pathItem) => {
        if (pathItem !== slug[0]) {
          if (pathItem.includes("page")) {
            if (isMobileApp) {
              const page = pathItem.replace("?ViewMobileApp=1", "");
              urlPageNumber = page.replace("page-", "");
            } else {
              urlPageNumber = pathItem.replace("page-", "");
            }
          } else {
            urlPageNumber = String(START_PAGE_INDEX);
            urlKeyword = pathItem;
            if (isMobileApp) {
              urlKeyword = pathItem.replace("?ViewMobileApp=1", "");
            }
          }
        }
      });
    } else {
      asPathGroup.slice(1).forEach((pathItem) => {
        if (slug && pathItem !== slug[0] && pathItem !== slug[1]) {
          if (pathItem.includes("page")) {
            if (isMobileApp) {
              const page = pathItem.replace("?ViewMobileApp=1", "");
              urlPageNumber = page.replace("page-", "");
            } else {
              urlPageNumber = pathItem.replace("page-", "");
            }
          } else {
            urlPageNumber = String(START_PAGE_INDEX);
            urlKeyword = pathItem;
            if (isMobileApp) {
              urlKeyword = pathItem.replace("?ViewMobileApp=1", "");
            }
          }
        }
      });
    }

    return { urlKeyword, urlPageNumber, baseUrl };
  }, [currentNumber, isMobileApp, router.asPath, router.query.slug]);

  projectModel = {
    page: pageIndex,
    limit: limit,
    keyword: defaultKeyword,
    siteId: siteId,
    method: method,
  };

  const [isShow, closeModal, openModal] = useBoolean(false);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const getTagColorName = useCallback((nodeId: any) => {
    const options = {
      [COLOR_TYPE.upcomingProject]: "tag-danger",
      [COLOR_TYPE.sellingProject]: "tag-success",
      [COLOR_TYPE.undefineProject]: "tag-orange",
      [COLOR_TYPE.handoverProject]: "tag-secondary",
      [COLOR_TYPE.updatingProject]: "tag-warning",
    };
    return options[nodeId] ?? "";
  }, []);

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

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getResult = useCallback(
    (pageNumber: number, keyword: string) => {
      setCurrentNumber(pageNumber);
      dispatch(
        onGetAllProjects(
          { ...projectModel, page: pageNumber, keyword: keyword },
          baseApi
        ) as any
      );
      backToTop();
    },
    [baseApi, dispatch]
  );

  useEffect(() => {
    getResult(+urlPageNumber, urlKeyword);
  }, [urlPageNumber, getResult, urlKeyword]);

  return (
    <div className="container pb-5">
      <div className="row gy-4">
        {allProjects?.map((item: any, idx: number) => {
          const nodeId = item.statusProcedure?.nodeId;
          return (
            <div key={idx} className="col-12 mb-3 p-md-0">
              <div className={classNames(styles.cardContainer)}>
                {item.videoYouTube ? (
                  <div className={styles.cardImage}>
                    <div className={styles.cardProjectListImg}>
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
                        ?.map((imageItem: any, imgIdx: number) =>
                          imgIdx + 1 !== 3 ? (
                            <div key={imgIdx} className={styles.cardImageItem}>
                              <Image
                                src={imageItem.logoUrl}
                                alt="Project"
                                quality={100}
                                layout="fill"
                              />
                            </div>
                          ) : (
                            <div key={imgIdx} className={styles.cardImageItem}>
                              <Image
                                src={imageItem.logoUrl}
                                alt="Project"
                                quality={100}
                                layout="fill"
                              />
                              <span className={styles.cardImageCount}>
                                +{item.imageCards?.length}
                              </span>
                            </div>
                          )
                        )}
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
                        ?.map((imageItem: any, imgIdx: number) =>
                          imgIdx + 1 !== 3 ? (
                            <div key={imgIdx} className={styles.cardImageItem}>
                              <Image
                                src={imageItem.logoUrl}
                                alt="Project"
                                quality={100}
                                layout="fill"
                              />
                            </div>
                          ) : (
                            <div key={imgIdx} className={styles.cardImageItem}>
                              <Image
                                src={imageItem.logoUrl}
                                alt="Project"
                                quality={100}
                                layout="fill"
                              />
                              <span className={styles.cardImageCount}>
                                +{item.imageCards?.length}
                              </span>
                            </div>
                          )
                        )}
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
                          getTagColorName(nodeId)
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
                  {item.listOfInfo[8] && (
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
                  <div className={classNames("w-100", styles.cardDescription)}>
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
        {loading && <LoadingPlaceholder pageSize={projectModel.limit} />}
        {isError && allProjects?.length === 0 && <ErrorBlock />}
      </div>

      {Boolean(allProjects?.length) && totalPages && (
        <>
          <PaginationBlock
            baseUrl={baseUrl}
            currentNumber={+urlPageNumber}
            totalPages={totalPages}
            pageSize={projectModel.limit}
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
                  // onLoad={spinner}
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
