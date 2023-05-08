import React from "react";
import styles from "./list-image-standard.module.scss";
import classNames from "classnames";
import imgHoChiMinh from "sites/mogivi/assets/images/homepage/img-hochiminh.svg";
import imgHaNoi from "sites/mogivi/assets/images/homepage/img-hanoi.svg";
import imgBaRiaVungTau from "sites/mogivi/assets/images/homepage/img-baria-vungtau.svg";
import imgDaNang from "sites/mogivi/assets/images/homepage/img-danang.svg";
import imgLongAn from "sites/mogivi/assets/images/homepage/img-longan.svg";
import imgBinhDuong from "sites/mogivi/assets/images/homepage/img-binhduong.svg";

import ButtonCustom, {
  IColorTypes,
  ISizeTypes,
} from "sites/mogivi/components/ButtonCustom";
import Image from "next/image";
import { IBannerImageLink } from "sites/mogivi/models/blocks/IBannerImageLink";
import LinkItem from "components/LinkItem";

const LIST_IMAGES = [
  {
    image: imgHoChiMinh,
    label: "TP. Hồ Chí Minh",
  },
  {
    image: imgHaNoi,
    label: "TP. Hà Nội",
  },
  {
    image: imgBaRiaVungTau,
    label: "Bà Rịa - Vũng Tàu",
  },
  {
    image: imgDaNang,
    label: "Đà Nẵng",
  },
  {
    image: imgLongAn,
    label: "Long An",
  },
  {
    image: imgBinhDuong,
    label: "Bình Dương",
  },
];

interface ListImageStandardProps {
  block: IBannerImageLink;
}

const ListImageStandard = (props: ListImageStandardProps) => {
  const { imageLink, text, title, link } = props.block.fields;
  return (
    <div className={styles.listImageStandardContainer}>
      <div className={classNames("container", styles.listImageStandardBody)}>
        {title && <h1 className={styles.title}>{title}</h1>}
        <div
          className={styles.subTitle}
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
        <div className={styles.imagesContainer}>
          <div className="container-fluid">
            <div className="row gy-4">
              {imageLink &&
                imageLink.map((item, index: number) => {
                  return (
                    <div
                      className={classNames(
                        "col-xs-12 col-md-6 col-lg-6 col-xl-6",
                        styles.imageItem
                      )}
                      key={index}
                    >
                      {item.fields.link ? (
                        <LinkItem url={item.fields.link.url ?? "#"}>
                          {item.fields.image && (
                            <Image
                              src={item.fields.image.fields.umbracoFile}
                              alt={item.fields.itemTitle}
                              width={700}
                              height={300}
                            />
                          )}
                          <div className={styles.label}>
                            {item.fields.itemTitle}
                          </div>
                        </LinkItem>
                      ) : (
                        <>
                          {item.fields.image && (
                            <Image
                              src={item.fields.image.fields.umbracoFile}
                              alt={item.fields.itemTitle}
                              width={700}
                              height={300}
                            />
                          )}
                          <div className={styles.label}>
                            {item.fields.itemTitle}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
            </div>
            {link && (
              <div className={styles.showMore}>
                <LinkItem url={link.url}>
                  <button className="btn-orange">Xem thêm</button>
                </LinkItem>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListImageStandard;
