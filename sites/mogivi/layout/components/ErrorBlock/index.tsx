import React from "react";
import SvgBanner from "sites/mogivi/components/SvgBanner";
import styles from "./styles.module.scss";

export const ErrorBlock = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.contentNotfound}>
        <h2>Không tìm thấy!</h2>
        <p>
          Trang mà bạn muốn truy cập có thể đã ngừng xuất bản hoặc không tồn
          tại.
        </p>
      </div>
      <div className={styles.errorImg}>
        <SvgBanner icon="banner404" />
      </div>
    </div>
  );
};
