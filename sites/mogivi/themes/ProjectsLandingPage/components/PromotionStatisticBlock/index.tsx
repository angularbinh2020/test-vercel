import React from "react";
import Image from "next/legacy/image";

// Icons
import icFourUsers from "sites/mogivi/assets/icons/ic-users-four.svg";
import icBuildings from "sites/mogivi/assets/icons/ic-buildings.svg";
import icHandsShake from "sites/mogivi/assets/icons/ic-handshake.svg";

import styles from "./promotion-static.module.scss";

const PromotionStatisticBlock = () => {
  return (
    <div className={styles.promotionStaticContainer}>
      <div className={styles.title}>Tham gia cộng đồng Mogivi</div>

      <div className="d-grid d-lg-flex d-xl-flex justify-content-center gap-3 gap-lg-5 gap-xl-5">
        <div className={styles.item}>
          <div className="flex-shrink-0">
            <Image src={icFourUsers} alt="icFourUsers" />
          </div>
          <div className={styles.content}>
            <div className={styles.quatity}>15,000+</div>
            <div className={styles.text}>Thành viên</div>
          </div>
        </div>

        <div className={styles.item}>
          <div className="flex-shrink-0">
            <Image src={icBuildings} alt="icBuildings" />
          </div>
          <div className={styles.content}>
            <div className={styles.quatity}>20,000 +</div>
            <div className={styles.text}>Căn hộ, dự án</div>
          </div>
        </div>

        <div className={styles.item}>
          <div className="flex-shrink-0">
            <Image src={icHandsShake} alt="icHandsShake" />
          </div>
          <div className={styles.content}>
            <div className={styles.quantity}>70 Million+</div>
            <div className={styles.text}>lượt kết nối khách hàng</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionStatisticBlock;
