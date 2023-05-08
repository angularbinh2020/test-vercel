import classNames from "classnames";
import React from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.scss";
import BasicBanner from "public/images/basic-banner.png";
export const BannerSubscribeEmail = () => {
  return (
    <div
      className={styles.bannerSubscribeContainer}
      style={{
        backgroundImage: `url(${BasicBanner.src})`,
      }}
    >
      <div className={styles.bannerSubscribe}>
        <div className={styles.contentWrapper}>
          <h1>TÀI LIỆU MỚI TẬN TAY !</h1>
          <div className="mb-sm">
            <div className="subtitle">
              <p>
                Cùng 8774 nhà đầu tư bất động sản, nhận những thông tin mới nhất
                của thị trường được gửi qua email hàng tuần.
              </p>
            </div>
          </div>{" "}
        </div>
        <Form className={styles.formContainer}>
          <Form.Group
            className={classNames("mb-3", styles.formEmail)}
            controlId="formEmail"
          >
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Button
            className={classNames(styles.btnSubmit, "yellow-gradient")}
            type="submit"
          >
            Đăng ký
          </Button>
        </Form>
      </div>
    </div>
  );
};
