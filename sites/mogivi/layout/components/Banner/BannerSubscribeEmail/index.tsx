import classNames from "classnames";
import React from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.scss";
import BasicBanner from "public/images/basic-banner.png";
import { useForm, Controller } from "react-hook-form";
import { useSetToastState } from "sites/mogivi/redux/toast.slice";
import { useSetLoadingFullScreenState } from "sites/mogivi/redux/loadingFullScreen.slice";
import { REGEX_PATTERN } from "sites/mogivi/const/regex-pattern";
import { FormRow } from "components/Forms/form-row";
import axiosInstance from "apis/axios";
import { useGetPageDataContext } from "context/page-data.context";
import { REQUEST_METHOD } from "sites/mogivi/const/request-method";

const BannerSubscribeEmail = ({ block }: any) => {
  const { itemTitle, subtitle, aPISetting } = block?.fields || {};
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({});
  const pageData = useGetPageDataContext();
  const { showInfoToast, showErrorToast } = useSetToastState();
  const { showLoading, closeLoading } = useSetLoadingFullScreenState();
  const onSubmit = async (values: any) => {
    showLoading();
    try {
      reset();
      const apiUrl = aPISetting[0]?.fields?.apiKeyTag?.node?.fields?.itemTitle;
      const requestBody = {
        currentPageUrl: window.location.href,
        currentPageId: pageData?.siteId,
        email: values.email?.trim(),
      };
      const usingPost =
        aPISetting[0]?.fields?.method?.toUpperCase() ===
        REQUEST_METHOD.POST.toUpperCase();
      if (usingPost) {
        await axiosInstance.post(apiUrl, requestBody);
      } else {
        await axiosInstance.get(apiUrl, {
          data: requestBody,
        });
      }
      showInfoToast(
        "Đăng ký thành công, chúng tôi sẽ gửi cho bạn những thông tin hấp dẫn và mới nhất hàng tuần."
      );
    } catch (e) {
      console.error(e);
      showErrorToast("Đã có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      closeLoading();
    }
  };
  return (
    <div
      className={styles.bannerSubscribeContainer}
      style={{
        backgroundImage: `url(${BasicBanner.src})`,
      }}
    >
      <div className={styles.bannerSubscribe}>
        <div className={styles.contentWrapper}>
          <h1>{itemTitle}</h1>
          <div className="mb-sm">
            <div
              className="subtitle"
              dangerouslySetInnerHTML={{ __html: subtitle || "" }}
            ></div>
          </div>{" "}
        </div>
        <Form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group
            className={classNames("mb-3", styles.formEmail)}
            controlId="formEmail"
          >
            <FormRow
              error={errors?.email?.message && String(errors?.email?.message)}
            >
              <Controller
                control={control}
                name="email"
                render={() => (
                  <Form.Control
                    {...register("email", {
                      required: "Vui lòng nhập email.",
                      pattern: {
                        value: REGEX_PATTERN.EMAIL,
                        message: "Vui lòng nhập địa chỉ email hợp lệ",
                      },
                    })}
                    type="email"
                    placeholder="Enter email"
                    className="mb-1"
                  />
                )}
              />
            </FormRow>
          </Form.Group>
          <Button
            type="submit"
            className={classNames(styles.btnSubmit, "yellow-gradient")}
          >
            Đăng ký
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default BannerSubscribeEmail;
