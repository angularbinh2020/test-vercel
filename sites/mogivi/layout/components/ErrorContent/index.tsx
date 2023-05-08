import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import SvgBanner from "sites/mogivi/components/SvgBanner";
import Link from "next/link";
import { INotFoundPageBlock } from "sites/mogivi/models/blocks/INotFoundPageBlock";

export interface ErrorContentBlockProps {
  block: INotFoundPageBlock;
}

export const ErrorContentBlock = (props: ErrorContentBlockProps) => {
  const { itemTitle, pageSummary, backgroundImage } = props.block.fields;
  const listPages = [
    {
      name: "Trang chủ",
      url: "/",
    },
    {
      name: "Mua với Mogivi",
      url: "/",
    },
    {
      name: "Thông tin thị trường",
      url: "/",
    },
    {
      name: "Tìm kiếm nhà đất",
      url: "/",
    },
    {
      name: "Thuê với Mogivi",
      url: "/",
    },
    {
      name: "Hướng dẫn sử dụng",
      url: "/",
    },
    {
      name: "Dự án mới",
      url: "/",
    },
    {
      name: "Chuyên viên tư vấn",
      url: "/",
    },
    {
      name: "Liên hệ",
      url: "/",
    },
  ];

  return (
    <>
      <div
        className={styles.errorContentContainer}
        style={{
          backgroundImage: `url(${backgroundImage.fields?.umbracoFile})`,
        }}
      >
        <div className={`${styles.errorBanner}`}>
          <div className={`${styles.errorLeftContent}`}>
            <h2>{itemTitle}</h2>
            <p>{pageSummary}</p>
          </div>
          <div className={`${styles.errorRightContent}`}>
            <div className={styles.errorImg}>
              <SvgBanner icon="banner404" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.listPagesContainer}>
        <h2>Có thể bạn sẽ cần</h2>
        <div className={styles.listItemBox}>
          <ul>
            {listPages.map((item, idx) => {
              return (
                <li key={idx} className={styles.item}>
                  <Link href={item.url}>
                    <a>{item.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
