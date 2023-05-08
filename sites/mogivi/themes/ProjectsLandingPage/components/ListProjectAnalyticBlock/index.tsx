import React from "react";
import { Card } from "react-bootstrap";
import Image from "next/image";

import imgAnalytic1 from "sites/mogivi/assets/images/projects/img-project-analytic.png";
import icUserInfo from "sites/mogivi/assets/icons/ic-user-info.svg";
import icCalendar from "sites/mogivi/assets/icons/ic-calendar.svg";

import styles from "./list-project-analytic.module.scss";

const ListProjectAnalyticBlock = () => {
  return (
    <div className="container py-5">
      <div className={styles.title}>Phân tích thị trường</div>

      <div className="row gy-4">
        <div className="col-12 col-md-6 col-lg-4 col-xl-4">
          <Card className={styles.cardContainer}>
            <Image
              src={imgAnalytic1}
              alt="imgAnalytic1"
              layout="responsive"
              className={styles.cardImage}
            />
            <Card.Body className={styles.cardBody}>
              <Card.Title className={styles.cardTitle}>
                Top 10 Dự Án Chung Cư Quận Bình Thạnh Chất Lượng Nhất
              </Card.Title>
              <div className="d-flex align-items-center">
                <Image src={icUserInfo} alt="" />
                <Card.Text className={styles.info}>Ny Nguyễn</Card.Text>
              </div>
            </Card.Body>
            <Card.Footer className={styles.cardFooter}>
              <div className="d-flex align-items-center">
                <Image src={icCalendar} />
                <Card.Text className={styles.info}>Jan 16, 2021</Card.Text>
              </div>
            </Card.Footer>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-4 col-xl-4">
          <Card className={styles.cardContainer}>
            <Image
              src={imgAnalytic1}
              alt="imgAnalytic1"
              layout="responsive"
              className={styles.cardImage}
            />
            <Card.Body className={styles.cardBody}>
              <Card.Title className={styles.cardTitle}>
                Top 10 Dự Án Chung Cư Quận Bình Thạnh Chất Lượng Nhất
              </Card.Title>
              <div className="d-flex align-items-center">
                <Image src={icUserInfo} alt="" />
                <Card.Text className={styles.info}>Ny Nguyễn</Card.Text>
              </div>
            </Card.Body>
            <Card.Footer className={styles.cardFooter}>
              <div className="d-flex align-items-center">
                <Image src={icCalendar} />
                <Card.Text className={styles.info}>Jan 16, 2021</Card.Text>
              </div>
            </Card.Footer>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-4 col-xl-4">
          <Card className={styles.cardContainer}>
            <Image
              src={imgAnalytic1}
              alt="imgAnalytic1"
              layout="responsive"
              className={styles.cardImage}
            />
            <Card.Body className={styles.cardBody}>
              <Card.Title className={styles.cardTitle}>
                Top 10 Dự Án Chung Cư Quận Bình Thạnh Chất Lượng Nhất
              </Card.Title>
              <div className="d-flex align-items-center">
                <Image src={icUserInfo} alt="" />
                <Card.Text className={styles.info}>Ny Nguyễn</Card.Text>
              </div>
            </Card.Body>
            <Card.Footer className={styles.cardFooter}>
              <div className="d-flex align-items-center">
                <Image src={icCalendar} />
                <Card.Text className={styles.info}>Jan 16, 2021</Card.Text>
              </div>
            </Card.Footer>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-4 col-xl-4">
          <Card className={styles.cardContainer}>
            <Image
              src={imgAnalytic1}
              alt="imgAnalytic1"
              layout="responsive"
              className={styles.cardImage}
            />
            <Card.Body className={styles.cardBody}>
              <Card.Title className={styles.cardTitle}>
                Top 10 Dự Án Chung Cư Quận Bình Thạnh Chất Lượng Nhất
              </Card.Title>
              <div className="d-flex align-items-center">
                <Image src={icUserInfo} alt="" />
                <Card.Text className={styles.info}>Ny Nguyễn</Card.Text>
              </div>
            </Card.Body>
            <Card.Footer className={styles.cardFooter}>
              <div className="d-flex align-items-center">
                <Image src={icCalendar} />
                <Card.Text className={styles.info}>Jan 16, 2021</Card.Text>
              </div>
            </Card.Footer>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-4 col-xl-4">
          <Card className={styles.cardContainer}>
            <Image
              src={imgAnalytic1}
              alt="imgAnalytic1"
              layout="responsive"
              className={styles.cardImage}
            />
            <Card.Body className={styles.cardBody}>
              <Card.Title className={styles.cardTitle}>
                Top 10 Dự Án Chung Cư Quận Bình Thạnh Chất Lượng Nhất
              </Card.Title>
              <div className="d-flex align-items-center">
                <Image src={icUserInfo} alt="" />
                <Card.Text className={styles.info}>Ny Nguyễn</Card.Text>
              </div>
            </Card.Body>
            <Card.Footer className={styles.cardFooter}>
              <div className="d-flex align-items-center">
                <Image src={icCalendar} />
                <Card.Text className={styles.info}>Jan 16, 2021</Card.Text>
              </div>
            </Card.Footer>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-4 col-xl-4">
          <Card className={styles.cardContainer}>
            <Image
              src={imgAnalytic1}
              alt="imgAnalytic1"
              layout="responsive"
              className={styles.cardImage}
            />
            <Card.Body className={styles.cardBody}>
              <Card.Title className={styles.cardTitle}>
                Top 10 Dự Án Chung Cư Quận Bình Thạnh Chất Lượng Nhất
              </Card.Title>
              <div className="d-flex align-items-center">
                <Image src={icUserInfo} alt="" />
                <Card.Text className={styles.info}>Ny Nguyễn</Card.Text>
              </div>
            </Card.Body>
            <Card.Footer className={styles.cardFooter}>
              <div className="d-flex align-items-center">
                <Image src={icCalendar} />
                <Card.Text className={styles.info}>Jan 16, 2021</Card.Text>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ListProjectAnalyticBlock;
