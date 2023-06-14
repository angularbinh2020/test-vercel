import React, { useState } from "react";
import styles from "./article-variant.module.scss";
import imgArticleVariant1 from "sites/mogivi/assets/images/homepage/img-article-variant-1.svg";
import imgArticleVariant2 from "sites/mogivi/assets/images/homepage/img-article-variant-2.svg";
// import articleVariantImage3 from "sites/mogivi/assets/images/article-variant-image-3.png";
// import articleVariantImage4 from "sites/mogivi/assets/images/article-variant-image-4.png";
// import articleVariantImage5 from "sites/mogivi/assets/images/article-variant-image-5.png";
// import articleVariantImage6 from "sites/mogivi/assets/images/article-variant-image-6.png";
// import articleVariantImage7 from "sites/mogivi/assets/images/article-variant-image-7.png";
import Image, { StaticImageData } from "next/legacy/image";
import classNames from "classnames";
import { Nav, Tab, Tabs } from "react-bootstrap";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { ITopNews } from "sites/mogivi/models/blocks/ITopNews";
import { convertDate } from "helpers/date";
import LinkItem from "components/LinkItem";

const NEWS = [
  {
    image: imgArticleVariant1,
    title: "ĐẦU TƯ NHÀ PHỐ CẦN LƯU Ý ĐIỀU GÌ ĐỂ SINH LỢI NHUẬN CAO?",
    date: "22/01/2022",
    author: "Ny Nguyễn",
    description:
      "Đầu tư nhà phố như thế nào để mang lại nhiều lợi nhuận cho chủ đầu tư? Tham khảo ngay bài viết của Mogivi để có hướng đầu tư tốt hơn.",
  },
  {
    image: imgArticleVariant2,
    title: "11 Việc Quan Trọng Khi Dọn Về Nhà Mới",
    date: "22/01/2022",
    author: "Ny Nguyễn",
    description:
      "Đầu tư nhà phố như thế nào để mang lại nhiều lợi nhuận cho chủ đầu tư? Tham khảo ngay bài viết của Mogivi để có hướng đầu tư tốt hơn.",
  },
  {
    image: imgArticleVariant2,
    title: "11 Việc Quan Trọng Khi Dọn Về Nhà Mới",
    date: "22/01/2022",
    author: "Ny Nguyễn",
    description:
      "Đầu tư nhà phố như thế nào để mang lại nhiều lợi nhuận cho chủ đầu tư? Tham khảo ngay bài viết của Mogivi để có hướng đầu tư tốt hơn.",
  },
  {
    image: imgArticleVariant2,
    title: "11 Việc Quan Trọng Khi Dọn Về Nhà Mới",
    date: "22/01/2022",
    author: "Ny Nguyễn",
    description:
      "Đầu tư nhà phố như thế nào để mang lại nhiều lợi nhuận cho chủ đầu tư? Tham khảo ngay bài viết của Mogivi để có hướng đầu tư tốt hơn.",
  },
  {
    image: imgArticleVariant2,
    title: "11 Việc Quan Trọng Khi Dọn Về Nhà Mới",
    date: "22/01/2022",
    author: "Ny Nguyễn",
    description:
      "Đầu tư nhà phố như thế nào để mang lại nhiều lợi nhuận cho chủ đầu tư? Tham khảo ngay bài viết của Mogivi để có hướng đầu tư tốt hơn.",
  },
  {
    image: imgArticleVariant2,
    title: "11 Việc Quan Trọng Khi Dọn Về Nhà Mới",
    date: "22/01/2022",
    author: "Ny Nguyễn",
    description:
      "Đầu tư nhà phố như thế nào để mang lại nhiều lợi nhuận cho chủ đầu tư? Tham khảo ngay bài viết của Mogivi để có hướng đầu tư tốt hơn.",
  },
];

enum TAB_VALUE {
  NEWS = "news",
  PROJECTS = "projects",
}

const TABS: ITabProps[] = [
  { title: "Tin tức", key: TAB_VALUE.NEWS },
  { title: "Top dự án", key: TAB_VALUE.PROJECTS },
];

interface ITabProps {
  title: string;
  key: TAB_VALUE;
}

interface IContent {
  image: StaticImageData;
  title: string;
  date: string;
  author: string;
  description: string;
}

interface ArticleVariantProps {
  list: ITopNews[];
  itemTitle: string;
}

const ArticleVariant = (props: ArticleVariantProps) => {
  const { list, itemTitle } = props;

  return (
    <div className={styles.backgroundNews}>
      <div className="container">
        <Tab.Container id="left-tabs-example" defaultActiveKey={"news"}>
          <div className="row">
            <h1 className={classNames(styles.title, "col-md-8 col-lg-8")}>
              {itemTitle}
            </h1>
            <div
              className={classNames(
                "col-xs-12 col-md-12 col-lg-4 col-xl-4",
                styles.contentContainer
              )}
            >
              <Nav
                variant="pills"
                className={styles.tabPanel}
                defaultActiveKey={TABS[0].key}
              >
                {list.map((item, idx) => (
                  <Nav.Item key={idx}>
                    <Nav.Link eventKey={TABS[idx].key}>
                      {item.topic.keyword}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
          </div>
          <div>
            <Tab.Content className={styles.tabContent}>
              {list.map((item, idx) => (
                <Tab.Pane key={idx} eventKey={TABS[idx].key}>
                  <div className="row">
                    <div className="col-xs-12 col-md-12 col-lg-8 col-xl-8 bg-white pt-4">
                      {item.items[0].pageUrl && (
                        <LinkItem url={item.items[0].pageUrl}>
                          <div className={styles.content}>
                            {item.items[0].mainImage && (
                              <div
                                className={classNames(
                                  "w-100",
                                  styles.mainNextImage
                                )}
                              >
                                <Image
                                  src={item.items[0].mainImage}
                                  alt={item.items[0].mainHeading}
                                  layout="fill"
                                  objectFit="cover"
                                  quality={100}
                                />
                              </div>
                            )}
                            <div className={styles.contentHeaderWrap}>
                              <div className={styles.contentHeader}>
                                {item.items[0].dateLine && (
                                  <div className={styles.date}>
                                    <SvgIcon
                                      icon="clock"
                                      className={styles.clockIconContent}
                                    />
                                    <span>
                                      {convertDate(item.items[0].dateLine)}
                                    </span>
                                  </div>
                                )}

                                {item.items[0].byLine && (
                                  <div className={styles.author}>
                                    {item.items[0].byLine}
                                  </div>
                                )}
                              </div>
                              {item.items[0].mainHeading && (
                                <h4 className={styles.contentTitle}>
                                  {item.items[0].mainHeading}
                                </h4>
                              )}
                              {item.items[0].bodyText && (
                                <p className={styles.contentDescription}>
                                  {item.items[0].bodyText}
                                </p>
                              )}
                            </div>
                          </div>
                        </LinkItem>
                      )}
                    </div>
                    <div
                      className={classNames(
                        "col-xs-12 col-md-12 col-lg-4 col-xl-4",
                        styles.listItemContainer
                      )}
                    >
                      {item.items.slice(1).map(
                        (articleItem, articleIdx) =>
                          articleItem.pageUrl && (
                            <LinkItem
                              key={articleIdx}
                              url={articleItem.pageUrl}
                            >
                              <div className={styles.itemContainer}>
                                {articleItem.mainImage && (
                                  <div className={styles.image}>
                                    <Image
                                      src={articleItem.mainImage}
                                      alt={articleItem.mainHeading}
                                      layout="fill"
                                      objectFit="cover"
                                      quality={100}
                                    />
                                  </div>
                                )}

                                <div className={styles.itemContent}>
                                  {articleItem.mainHeading && (
                                    <h6 className={styles.itemTitle}>
                                      {articleItem.mainHeading}
                                    </h6>
                                  )}
                                  {articleItem.dateLine && (
                                    <div className={styles.itemDate}>
                                      <SvgIcon
                                        icon="clock"
                                        className={styles.clockIconItem}
                                      />
                                      <small>
                                        {convertDate(articleItem.dateLine)}
                                      </small>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </LinkItem>
                          )
                      )}
                    </div>
                  </div>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    </div>
  );
};

export default ArticleVariant;
