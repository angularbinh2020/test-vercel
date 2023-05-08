import React from "react";
import styles from "./recently-view.module.scss";
import imgDepartment from "sites/mogivi/assets/images/homepage/img-department.png";
import Image, { StaticImageData } from "next/image";

const Item: IItemProps = {
  image: imgDepartment,
  name: "Vinhomes Central Park",
  price: "17 tỷ",
  countBRoom: 4,
  countWC: 3,
  area: 152,
};

interface IItemProps {
  image: StaticImageData;
  name: string;
  price: string;
  countBRoom: number;
  countWC: number;
  area: number;
}

export const RecentlyViewBlock = () => {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.sectionHeader}>Bất động sản vừa xem</div>
      <div className={styles.container}>
        {Array(6)
          .fill(Item)
          .map((i: IItemProps, iIndex: number) => {
            return (
              <div className={styles.row} key={iIndex}>
                <div className={styles.image}>
                  <Image src={i.image} alt="Department" layout="responsive" />
                </div>
                <div className={`${styles.infoContainer} gap-2 gap-md-1`}>
                  <div className={styles.name}>{i.name}</div>
                  <div className={styles.price}>{i.price}</div>
                  <div className={styles.detailInfo}>
                    {`${i.area}m`}
                    <sup>2</sup> |{i.countBRoom} phòng ngủ |{i.countWC} WC
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
