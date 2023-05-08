import Link from "next/link";
import React from "react";

import styles from "./list-text.module.scss";

type ListTextType = {
  url: string;
  nodeId: number;
  name: string;
  keyword: string | null;
};

interface ListTextProps {
  list: ListTextType[];
  itemTitle: string;
  subtitle: string;
}

const ListText = (props: ListTextProps) => {
  const { list, itemTitle, subtitle } = props;
  return (
    <div className={styles.listTextContainer}>
      <h1 className={styles.title}>{itemTitle}</h1>
      <div
        className={styles.subTitle}
        dangerouslySetInnerHTML={{ __html: subtitle }}
      ></div>

      <div className={styles.content}>
        <div className="container-fluid">
          <div>
            <ul className={styles.grid}>
              {list?.length &&
                list.map(
                  (item, idx) =>
                    item.url &&
                    item.url !== "" && (
                      <li key={idx}>
                        <Link href={item.url}>
                          <a>{item.name}</a>
                        </Link>
                      </li>
                    )
                )}
            </ul>
            {/* <div className="col-12 col-md-4 col-lg-3 col-xl">
              <ul className="d-grid gap-1 text-center text-md-start text-lg-start text-xl-start">
                <li>
                  <Link href="#">Mua bán nhà phố Gò Vấp</Link>
                </li>
                <li>
                  <Link href="#">Mua bán nhà phố Tân Bình</Link>
                </li>
                <li>
                  <Link href="#">Mua bán nhà phố Quận 8</Link>
                </li>
                <li>
                  <Link href="#">Mua bán nhà phố Bình Tân</Link>
                </li>
                <li>
                  <Link href="#">Thuê căn hộ Quận 8</Link>
                </li>
                <li>
                  <Link href="#">Thuê căn hộ Quận 2</Link>
                </li>
                <li>
                  <Link href="#">Thuê căn hộ Quận 1</Link>
                </li>
                <li>
                  <Link href="#">Thuê căn hộ Bình Thạnh</Link>
                </li>
                <li>
                  <Link href="#">Thuê căn hộ Tân Bình</Link>
                </li>
                <li>
                  <Link href="#">Thuê căn hộ Gò Vấp</Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-4 col-lg-3 col-xl">
              <ul className="d-grid gap-1 text-center text-md-start text-lg-start text-xl-start">
                <li>
                  <Link href="#">Dự án căn hộ Quận 1</Link>
                </li>
                <li>
                  <Link href="#">Dự án căn hộ Quận 2</Link>
                </li>
                <li>
                  <Link href="#">Dự án căn hộ Quận 7</Link>
                </li>
                <li>
                  <Link href="#">Dự án căn hộ Quận 8</Link>
                </li>
                <li>
                  <Link href="#">Dự án căn hộ Quận 9</Link>
                </li>
                <li>
                  <Link href="#">Dự án căn hộ Quận 12</Link>
                </li>
                <li>
                  <Link href="#">Dự án căn hộ Bình Tân</Link>
                </li>
                <li>
                  <Link href="#">Dự án căn hộ Bình Thạnh</Link>
                </li>
                <li>
                  <Link href="#">Dự án căn hộ Bình Chánh</Link>
                </li>
                <li>
                  <Link href="#">Dự án căn hộ Tân Phú</Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-4 col-lg-3 col-xl">
              <ul className="d-grid gap-1 text-center text-md-start text-lg-start text-xl-start">
                <li>
                  <Link href="#">Dự án Vinhomes Grand Park</Link>
                </li>
                <li>
                  <Link href="#">Dự án Akari City</Link>
                </li>
                <li>
                  <Link href="#">Dự án Picity High Park</Link>
                </li>
                <li>
                  <Link href="#">Dự án Vinhomes Central Park</Link>
                </li>
                <li>
                  <Link href="#">Dự án Masteri Thảo Điền</Link>
                </li>
                <li>
                  <Link href="#">Dự án Vinhomes Golden River</Link>
                </li>
                <li>
                  <Link href="#">Dự án Lovera Vista</Link>
                </li>
                <li>
                  <Link href="#">Dự án Celadon City</Link>
                </li>
                <li>
                  <Link href="#">Dự án Q7 Saigon Riverside</Link>
                </li>
                <li>
                  <Link href="#">Dự án The Sun Avenue</Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-4 col-lg-3 col-xl">
              <ul className="d-grid gap-1 text-center text-md-start text-lg-start text-xl-start">
                <li>
                  <Link href="#">Dự án Saigon South Residence</Link>
                </li>
                <li>
                  <Link href="#">Dự án Saigon Intela</Link>
                </li>
                <li>
                  <Link href="#">Dự án Kingdom 101</Link>
                </li>
                <li>
                  <Link href="#">Dự án Q7 Boulevard</Link>
                </li>
                <li>
                  <Link href="#">Dự án Soho Residence</Link>
                </li>
                <li>
                  <Link href="#">Dự án Sunrise Riverside</Link>
                </li>
                <li>
                  <Link href="#">Dự án Opal Skyline</Link>
                </li>
                <li>
                  <Link href="#">Dự án Ricca</Link>
                </li>
                <li>
                  <Link href="#">Dự án Safira Khang Điền</Link>
                </li>
                <li>
                  <Link href="#">Dự án Westgate</Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListText;
