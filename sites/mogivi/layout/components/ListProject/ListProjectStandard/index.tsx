import React from "react";
import { Card } from "react-bootstrap";
import Image, { StaticImageData } from "next/legacy/image";
import styles from "./styles.module.scss";
import projectImage1 from "sites/mogivi/assets/images/projects/img-project-1.png";
import projectImage2 from "sites/mogivi/assets/images/projects/img-project-2.png";
import projectImage3 from "sites/mogivi/assets/images/projects/img-project-3.png";
import icBuilding from "sites/mogivi/assets/icons/ic-building-gray.svg";
import icKey from "sites/mogivi/assets/icons/ic-key.svg";
import icMarker from "sites/mogivi/assets/icons/ic-marker.svg";
import classNames from "classnames";
import ButtonCustom, {
  IColorTypes,
  ISizeTypes,
} from "sites/mogivi/components/ButtonCustom";

const PROJECTS: IProject[] = [
  {
    image: projectImage1,
    name: "The Splendor",
    description:
      "Dự án The Splendor Apartments tọa lạc trên mặt tiền đường Nguyễn Văn Dung, giáp mặt tiền sông Vàm Thuật",
    price: "$Từ 36 triệu/m2",
    address: "Quận Gò Vấp, Thành phố Hồ Chí Minh",
    block: "2 Block",
    apartment: "203 Căn",
    tag: "",
  },
  {
    image: projectImage2,
    name: "Grand Sunlake",
    description:
      "Dự án Grand Sunlake nằm trong khu đô thị Văn Quán, phường Văn Quán, quận Hà Đông, thành phố Hà Nội. Dự án nằm tại khu vực trung tâm quận Hà Đông",
    price: "$Từ 36 triệu/m2",
    address: "Quận Hà Đông, Thành phố Hà Nội",
    block: "2 Block",
    apartment: "203 Căn",
    tag: "Phân phối F1",
  },
  {
    image: projectImage3,
    name: "Wyndham Thanh Thủy",
    description:
      "Dự án Wyndham Thanh Thủy là khu nghỉ dưỡng khoáng nóng 5 sao của chủ đầu tư Onsen Fuji tọa lạc tại",
    price: "$Từ 36 triệu/m2",
    address: "Huyện Thanh Thủy, Tỉnh Phú Thọ",
    block: "2 Block",
    apartment: "203 Căn",
    tag: "F1 độc quyền",
  },
];

interface IProject {
  image: StaticImageData;
  name: string;
  description: string;
  price: string;
  address: string;
  block: string;
  apartment: string;
  tag: string;
}

const ListProjectBlock = () => {
  return (
    <div className="container pb-5">
      <div className={styles.header}>DỰ ÁN</div>

      <div className="row gy-4">
        {PROJECTS.concat(...PROJECTS).map((p: IProject, pIndex: number) => {
          return (
            <div key={pIndex} className="col-12 col-md-6 col-lg-4 col-xl-4">
              <Card className={styles.cardContainer}>
                <Card.Title className={styles.cardTitle}>
                  <div className="w-100 position-relative">
                    <Image src={p.image} alt="Project" layout="responsive" />
                  </div>
                </Card.Title>
                <Card.Body className={styles.cardBody}>
                  <div
                    className={classNames(
                      "w-100 d-flex align-items-start justify-content-between",
                      styles.cardHeader
                    )}
                  >
                    <Card.Title className={styles.cardTitle}>
                      {p.name}
                    </Card.Title>
                    {p.tag ? (
                      <div className={styles.tag}>{p.tag}</div>
                    ) : (
                      <div className={styles.noTag}></div>
                    )}
                  </div>

                  <div className={classNames("w-100", styles.cardDescription)}>
                    <Card.Text className={styles.descriptionText}>
                      {p.description}
                    </Card.Text>
                  </div>
                  <div
                    className={classNames(
                      "w-100 d-flex align-items-end justify-content-between",
                      styles.cardSubDescription
                    )}
                  >
                    <div className="d-flex align-items-center">
                      <div className={styles.info}>
                        <Image
                          className={styles.icon}
                          src={icBuilding}
                          alt="icBuilding"
                        />
                        <span className={styles.infoText}>{p.block}</span>
                      </div>
                      <div className={styles.info}>
                        <Image
                          src={icKey}
                          alt="icKey"
                          className={styles.icon}
                        />
                        <span className={styles.infoText}>{p.apartment}</span>
                      </div>
                    </div>
                    <div className={styles.price}>{p.price}</div>
                  </div>

                  <div className={styles.cardFooter}>
                    <Image src={icMarker} alt="icMarker" />
                    <span className={styles.address}>{p.address}</span>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>

      <div className={styles.seeMore}>
        <ButtonCustom size={ISizeTypes.Small} color={IColorTypes.OutlineOrange}>
          Xem thêm
        </ButtonCustom>
      </div>
    </div>
  );
};

export default ListProjectBlock;
