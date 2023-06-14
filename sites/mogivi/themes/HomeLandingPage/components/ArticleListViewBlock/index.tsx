import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import styles from "./article-list.module.scss";
import Image from "next/image";
import icLocation from "sites/mogivi/assets/icons/ic-location.svg";
import ic360 from "sites/mogivi/assets/icons/vr-on.gif";
import { IApartmentBestSellerInVR360 } from "sites/mogivi/models/blocks/IApartmentBestSellerInVR360";
import classNames from "classnames";
import LinkItem from "components/LinkItem";
import { ILinkInfo } from "sites/mogivi/models/ILinkInfo";
import useDetectDeviceByScreen from "sites/mogivi/hooks/useDetectDeviceByScreen";
import DefaultImg from "public/images/istockphoto-1147544807-612x612.webp";
import useBoolean from "sites/mogivi/hooks/useBoolean";
import TagsRender from "./components/TagsRender";

interface IArticleListProps {
  itemTitle: string;
  subtitle: string;
  articleList: IApartmentBestSellerInVR360[];
  link: ILinkInfo;
}

const ArticleListView = (props: IArticleListProps) => {
  const { itemTitle, articleList, subtitle, link } = props;
  const { isLaptopOrPc } = useDetectDeviceByScreen();
  const [isShowVrIcon, , showVrIcon] = useBoolean(false);
  useEffect(() => {
    showVrIcon();
  }, []);
  return (
    <div className={styles.articleListContainer}>
      <div className={styles.articleTitle}>
        <h2>{itemTitle}</h2>
        {subtitle && <div dangerouslySetInnerHTML={{ __html: subtitle }}></div>}
      </div>

      <div className="container">
        <div className="row gy-4">
          {articleList?.map((item, idx: number) => {
            const previewImageUrl = isLaptopOrPc
              ? item.desktopTeasersImageUrl
              : item.mobileTeasersImageUrl;
            const previewImageAlt = isLaptopOrPc
              ? item.desktopTeasersImageCaption
              : item.mobileTeasersImageCaption;
            return (
              <div key={idx} className="col-12 col-md-6 col-lg-6 col-xl-4">
                {item.pageURL && (
                  <LinkItem url={item.pageURL}>
                    <Card className={styles.cardContainer}>
                      <Card.Body>
                        <div
                          className={classNames(
                            "w-100 position-relative",
                            styles.cardImage
                          )}
                        >
                          {previewImageUrl && (
                            <Image
                              src={previewImageUrl}
                              alt={previewImageAlt}
                              width={300}
                              height={200}
                              quality={100}
                            />
                          )}
                          {isShowVrIcon && item.vrTourURL && (
                            <LinkItem
                              url={item.vrTourURL ?? ""}
                              className={classNames(
                                !item.vrTourURL && "d-none"
                              )}
                            >
                              <div className={styles.ic360}>
                                <Image
                                  src={ic360}
                                  width={50}
                                  height={50}
                                  alt="ic360"
                                />
                              </div>
                            </LinkItem>
                          )}
                        </div>
                        <div className="p-3">
                          {item.title && (
                            <Card.Title className={styles.cardTitle}>
                              {item.title}
                            </Card.Title>
                          )}

                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <Image
                                src={icLocation}
                                width={15}
                                height={15}
                                alt=""
                              />
                            </div>
                            {item.address && (
                              <Card.Text className={styles.cardAddress}>
                                {item.address}
                              </Card.Text>
                            )}
                          </div>
                        </div>
                      </Card.Body>
                      <Card.Footer className={styles.cardFooter}>
                        <TagsRender tags={item.tags} />
                        <div className={styles.detail}>
                          <div className={styles.agency}>
                            <Image
                              src={item.contact?.avatar ?? DefaultImg}
                              alt={item.contact?.full_name || "img"}
                              width={40}
                              height={40}
                              className={styles.agencyAvatar}
                            />
                            <div className="ms-2">
                              <span className="text-truncate text-internal-orange">
                                {item.contact?.full_name}
                              </span>
                              <div className="d-block fst-italic d-sm-none text-dark-cerulean">
                                {item.publishDateText}
                              </div>
                            </div>
                          </div>
                          <span className="text-internal-orange d-none d-sm-inline">
                            {item.publishDateText}
                          </span>
                        </div>
                      </Card.Footer>
                    </Card>
                  </LinkItem>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {link && (
        <LinkItem url={link.url} target={link.target}>
          <div className={styles.seeMore}>
            <button className="btn-orange">Xem thêm</button>
          </div>
        </LinkItem>
      )}
    </div>
  );
};

export default ArticleListView;
