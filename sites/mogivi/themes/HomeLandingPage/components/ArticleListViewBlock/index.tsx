import React from "react";
import { Card } from "react-bootstrap";
import styles from "./article-list.module.scss";
import Image from "next/image";
import icLocation from "sites/mogivi/assets/icons/ic-location.svg";
import ic360 from "sites/mogivi/assets/icons/vr-on.gif";
import { IApartmentBestSellerInVR360 } from "sites/mogivi/models/blocks/IApartmentBestSellerInVR360";
import classNames from "classnames";
import Link from "next/link";
import LinkItem from "components/LinkItem";
import { ILinkInfo } from "sites/mogivi/models/ILinkInfo";

interface IArticleListProps {
  itemTitle: string;
  subtitle: string;
  articleList: IApartmentBestSellerInVR360[];
  link: ILinkInfo;
}

const ArticleListView = (props: IArticleListProps) => {
  const { itemTitle, articleList, subtitle, link } = props;

  return (
    <div className={styles.articleListContainer}>
      <div className={styles.articleTitle}>
        <h2>{itemTitle}</h2>
        {subtitle && <div dangerouslySetInnerHTML={{ __html: subtitle }}></div>}
      </div>

      <div className="container">
        <div className="row gy-4">
          {articleList?.map((item, idx: number) => (
            <div key={idx} className="col-12 col-md-6 col-lg-4 col-xl-4">
              {item.fullPageURL && (
                <LinkItem url={item.fullPageURL}>
                  <Card className={styles.cardContainer}>
                    <Card.Body>
                      <div
                        className={classNames(
                          "w-100 position-relative",
                          styles.cardImage
                        )}
                      >
                        {item?.imagesSlider[0] && (
                          <Image
                            src={item?.imagesSlider[0].sourceURL}
                            alt={item?.imagesSlider[0].imageCaption}
                            objectFit="cover"
                            width={300}
                            height={200}
                            layout="responsive"
                            quality={100}
                          />
                        )}

                        {item.vrTourLink ? (
                          <Link href={item.vrTourLink}>
                            <a>
                              <div className={styles.ic360}>
                                <Image
                                  src={ic360}
                                  width={50}
                                  height={50}
                                  alt="ic360"
                                />
                              </div>
                            </a>
                          </Link>
                        ) : (
                          <div className={styles.ic360}>
                            <Image
                              src={ic360}
                              width={50}
                              height={50}
                              alt="ic360"
                            />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        {item.itemTitle && (
                          <Card.Title className={styles.cardTitle}>
                            {item.itemTitle}
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
                          {item.houseOrApartmentNumber && (
                            <Card.Text className={styles.cardAddress}>
                              {item.houseOrApartmentNumber}
                            </Card.Text>
                          )}
                        </div>
                      </div>
                    </Card.Body>
                    {item.richText && (
                      <Card.Footer className={styles.cardFooter}>
                        <h5>{item.richText}</h5>
                        {item.price.defaultPriceText && (
                          <span>{item.price.defaultPriceText}</span>
                        )}
                      </Card.Footer>
                    )}
                  </Card>
                </LinkItem>
              )}
            </div>
          ))}
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
