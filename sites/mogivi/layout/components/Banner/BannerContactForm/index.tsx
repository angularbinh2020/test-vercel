import classNames from "classnames";
import LinkItem from "components/LinkItem";
import { removeVNSuffix } from "helpers/url";
import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import { IBannerSubpageBlock } from "sites/mogivi/models/blocks/IBannerSubpageBlock";
import imgInfo from "sites/mogivi/assets/images/homepage/image-info-3.png";

import styles from "./styles.module.scss";
import ButtonCustom, {
  IColorTypes,
  ISizeTypes,
} from "sites/mogivi/components/ButtonCustom";

interface BannerContactFormProps {
  investorName: string;
  handleShow: () => void;
}

export const BannerContactForm = (props: BannerContactFormProps) => {
  const { investorName, handleShow } = props;
  return (
    <div
      className={classNames(styles.bannerSlider, styles.bannerSubpageContainer)}
    >
      <div className={classNames("container")}>
        <div className="inner">
          <div className={styles.contentWrapper}>
            <div className="mb-sm">
              <div className={styles.subtitle}>
                <p>
                  Nhận tin tức mới nhất, tình hình giao dịch, biến động giá cả
                  của các dự án thuộc {investorName},<br /> gặp ngay chuyên viên
                  tư vấn Mogivi để giải đáp mọi thắc mắc.
                </p>
              </div>
            </div>{" "}
          </div>
          <div className={styles.btnBannerContainer}>
            <button className="btn-orange" onClick={handleShow}>
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
