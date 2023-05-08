import axiosInstance from "apis/axios";
import classNames from "classnames";
import { useGetPageDataContext } from "context/page-data.context";
import { useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonCustom, {
  IColorTypes,
} from "sites/mogivi/components/ButtonCustom";
import { REGEX_PATTERN } from "sites/mogivi/const/regex-pattern";
import { useSetLoadingFullScreenState } from "sites/mogivi/redux/loadingFullScreen.slice";
import { useSetToastState } from "sites/mogivi/redux/toast.slice";
import { getFullApiUrl } from "sites/mogivi/utils";
import styles from "./styles.module.scss";
import defaultProjectImage from "sites/mogivi/assets/images/city-night.jpg";
import { MOGIVI_CONTENT_TYPE } from "sites/mogivi/const/content-type";
import { IImageCardsBlock } from "sites/mogivi/models/blocks/IImageCardsBlock";
import InfoModal from "sites/mogivi/components/InfoModal";
import Image from "next/image";

interface Props {
  apiUrl: string;
}

const FormRequestMoreInfo = ({ apiUrl }: Props) => {
  const uniqueId = useId();
  const pageData = useGetPageDataContext();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { showErrorToast } = useSetToastState();
  const { showLoading, closeLoading } = useSetLoadingFullScreenState();
  const { projectTitle, projectImage, mogiviHotLine } = useMemo(() => {
    let projectTitle = "";
    let projectImage: any = defaultProjectImage;
    let mogiviHotLine = pageData?.siteLanguageNode.fields.phone || "";

    const blocks = pageData?.currentNode.fields.blocks;
    const projectModuleBlock = blocks?.find(
      (block) =>
        block.system.contentType === MOGIVI_CONTENT_TYPE.projectModuleBlock
    );

    const imageCardsBlock: IImageCardsBlock = blocks?.find(
      (block) =>
        block.system.contentType === MOGIVI_CONTENT_TYPE.imageCardsBlock
    ) as any;
    if (projectModuleBlock) {
      projectTitle = projectModuleBlock.fields.itemTitle || "";
    }
    if (imageCardsBlock?.fields.groupBlocks?.length) {
      projectImage =
        imageCardsBlock.fields.groupBlocks[0].fields.image.fields.umbracoFile;
    }
    return { projectTitle, projectImage, mogiviHotLine };
  }, [pageData]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    showLoading();
    const request: string[] = [data.request1, data.request2, data.request3];
    const requestData = {
      currentPageId: pageData?.siteId,
      fullname: data.name,
      email: data.email,
      tel: data.mobile,
      messages: data.note,
      request: request.filter((strVal) => strVal).join(","),
    };
    const fullApiUrl = getFullApiUrl(apiUrl);
    axiosInstance
      .post(fullApiUrl, requestData)
      .then((res) => {
        reset();
        setShowSuccessModal(true);
      })
      .catch((e) => {
        console.log(e);
        showErrorToast("Gửi yêu cầu không thành công, vui lòng thử lại sau");
      })
      .finally(closeLoading);
  };
  return (
    <>
      <div className="card my-3 px-0">
        <div className="container px-0">
          <div className="row">
            <div className="col-12 col-md-7 p-3 p-md-5">
              <form className="container" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div
                    className={classNames(
                      "col-12 mb-3",
                      styles.formHeaderTitle
                    )}
                  >
                    <h1>{`Bạn đang quan tâm dự án ${projectTitle}?`}</h1>
                    <h2>
                      Để lại thông tin, chuyên viên Mogivi sẽ liên hệ với bạn
                    </h2>
                  </div>
                </div>

                <div className="row  mb-3">
                  <div className="col-12 col-md-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Nhận bảng giá"
                        id={`${uniqueId}-option1`}
                        {...register("request1")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`${uniqueId}-option1`}
                      >
                        Nhận bảng giá
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Tham quan nhà mẫu"
                        id={`${uniqueId}-option2`}
                        {...register("request2")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`${uniqueId}-option2`}
                      >
                        Tham quan nhà mẫu
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Nhận tài liệu phân tích"
                        id={`${uniqueId}-option3`}
                        {...register("request3")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`${uniqueId}-option3`}
                      >
                        Nhận tài liệu phân tích
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 mb-3">
                    <input
                      type="text"
                      className={classNames(
                        "form-control",
                        errors.name && "is-invalid"
                      )}
                      placeholder="Họ tên"
                      {...register("name", { required: "Thông tin bắt buộc." })}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {String(errors.name.message)}
                      </div>
                    )}
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      type="email"
                      className={classNames(
                        "form-control",
                        errors.email && "is-invalid"
                      )}
                      placeholder="Email"
                      {...register("email", {
                        required: "Thông tin bắt buộc.",
                        pattern: {
                          value: REGEX_PATTERN.EMAIL,
                          message: "Email không hợp lệ",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {String(errors.email.message)}
                      </div>
                    )}
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      type="text"
                      className={classNames(
                        "form-control",
                        errors.mobile && "is-invalid"
                      )}
                      placeholder="Số điện thoại"
                      {...register("mobile", {
                        required: "Thông tin bắt buộc.",
                        pattern: {
                          value: REGEX_PATTERN.MOBILE,
                          message: "Số điện thoại không hợp lệ",
                        },
                      })}
                    />
                    {errors.mobile && (
                      <div className="invalid-feedback">
                        {String(errors.mobile.message)}
                      </div>
                    )}
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Lời nhắn"
                      {...register("note")}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <ButtonCustom
                      color={IColorTypes.Orange}
                      type="submit"
                      className={classNames("px-5", styles.submitBtn)}
                    >
                      ĐĂNG KÝ
                    </ButtonCustom>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-md-5">
              <div className={styles.projectImage}>
                <Image
                  src={projectImage}
                  alt={projectTitle}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <InfoModal
        isOpen={showSuccessModal}
        handleCloseModal={() => setShowSuccessModal(false)}
        headerTitle="Đã gửi thành công!"
      >
        <p>
          Cảm ơn bạn đã chọn Mogivi, chúng tôi sẽ liên lạc ngay trong thời gian
          sớm nhất. Mọi thắc mắc xin vui lòng liên hệ
          <a
            href={`tel:${mogiviHotLine?.replace(
              REGEX_PATTERN.WHITE_SPACE,
              ""
            )}`}
            className="ms-1 text-black fw-bold text-decoration-none"
          >
            {mogiviHotLine}
          </a>
        </p>
      </InfoModal>
    </>
  );
};

export default FormRequestMoreInfo;
