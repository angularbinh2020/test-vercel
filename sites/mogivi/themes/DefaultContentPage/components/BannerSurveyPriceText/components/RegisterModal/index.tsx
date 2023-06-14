import { Form, Modal } from "react-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { FormRow } from "components/Forms/form-row";
import { PATTERN } from "const/validation-pattern";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useSetLoadingFullScreenState } from "sites/mogivi/redux/loadingFullScreen.slice";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSetToastState } from "sites/mogivi/redux/toast.slice";
import useBoolean from "sites/mogivi/hooks/useBoolean";
interface Props {
  handleClose: any;
  apiSubscribesSetting: string;
}

const RegisterModal = ({ handleClose, apiSubscribesSetting }: Props) => {
  const { showLoading, closeLoading } = useSetLoadingFullScreenState();
  const [projectErrorMsg, setProjectErrorMsg] = useState("");
  const { showErrorToast } = useSetToastState();
  const [isShowSuccessModal, , showSuccessModal] = useBoolean(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<any>({
    defaultValues: {
      projects: [{ name: "" }],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: "projects",
  });
  const onBlurInputProjectName = () => {
    if (!projectErrorMsg) return;
    const isProjectEmpty = watch("projects")?.every(
      (project: any) => !project.name.trim()
    );
    setProjectErrorMsg(
      isProjectEmpty ? "Vui lòng nhập ít nhất 1 dự án bạn quan tâm" : ""
    );
  };

  const onSubmit = async (value: any) => {
    const isProjectEmpty = value.projects.every(
      (project: any) => !project.name.trim()
    );
    setProjectErrorMsg(
      isProjectEmpty ? "Vui lòng nhập ít nhất 1 dự án bạn quan tâm" : ""
    );
    if (isProjectEmpty) return;

    showLoading();
    const requestData = {
      fullName: value.fullName,
      phone: value.phone,
      email: value.email,
      projects: value.projects,
    };
    try {
      await axios.post(apiSubscribesSetting, requestData);
      showSuccessModal();
    } catch (e) {
      console.error(e);
      showErrorToast("Không thể gửi đăng ký thành công, vui lòng thử lại sau.");
    } finally {
      closeLoading();
    }
  };

  if (isShowSuccessModal)
    return (
      <Modal show centered onHide={handleClose}>
        <div className={styles.closeButton} onClick={handleClose}>
          <SvgIcon icon="close" width={20} height={20} />
        </div>
        <Modal.Header className={classNames("border-0 justify-content-center")}>
          <Modal.Title>Đăng ký nhận khảo sát giá thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <p className="text-center">
            Đăng ký tư vấn thành công. Mogivi sẽ liên hệ với quý khách sớm nhất
            có thể
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <button
            className={classNames(styles.btnSubmit, "w-100", "btn-orange")}
            onClick={handleClose}
          >
            Đóng
          </button>
        </Modal.Footer>
      </Modal>
    );

  return (
    <Modal show centered onHide={handleClose} fullscreen="sm-down">
      <div
        className={classNames(styles.closeButton, styles.mobileCloseBtn)}
        onClick={handleClose}
      >
        <SvgIcon icon="close" width={20} height={20} />
      </div>
      <Modal.Header
        className={classNames(
          "border-0 justify-content-center",
          styles.modalTitle
        )}
      >
        <Modal.Title>Đăng ký nhận khảo sát giá</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <div>
          <Form.Group className="mb-3">
            <Form.Label>Họ và tên</Form.Label>
            <FormRow error={errors?.fullName?.message as string}>
              <Controller
                control={control}
                name="fullName"
                rules={{
                  required: "Vui lòng nhập Họ tên",
                }}
                render={() => (
                  <Form.Control
                    {...register("fullName")}
                    type="text"
                    placeholder="Nhập họ và tên"
                  />
                )}
              />
            </FormRow>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <FormRow className="w-100" error={errors?.phone?.message as string}>
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    value: PATTERN.phoneNumber,
                    message: "Số điện thoại không hợp lệ!",
                  },
                }}
                render={() => (
                  <Form.Control
                    {...register("phone")}
                    type="text"
                    placeholder="Nhập số điện thoại"
                  />
                )}
              />
            </FormRow>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <FormRow className="w-100" error={errors?.email?.message as string}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Vui lòng nhập email",
                  pattern: {
                    value: PATTERN.email,
                    message: "Email không hợp lệ",
                  },
                }}
                render={() => (
                  <Form.Control
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                  />
                )}
              />
            </FormRow>
          </Form.Group>
          <h6>Dự án quan tâm</h6>
          {fields.map((item, index) => (
            <Form.Group className="mb-3 d-flex gap-3" key={item.id}>
              <FormRow className="w-100">
                <Controller
                  control={control}
                  name={`projects.${index}.name`}
                  render={() => (
                    <Form.Control
                      {...register(`projects.${index}.name`)}
                      type="text"
                      placeholder="Nhập dự án quan tâm"
                      onBlur={onBlurInputProjectName}
                    />
                  )}
                />
              </FormRow>
            </Form.Group>
          ))}
        </div>
        <div className={styles.error}>{projectErrorMsg}</div>
        <div
          className={classNames(styles.addBtn, "d-flex justify-content-end")}
        >
          <Tooltip title="Thêm dự án">
            <FontAwesomeIcon
              onClick={() => {
                append({
                  name: "",
                });
              }}
              icon={faSquarePlus}
            />
          </Tooltip>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <button
          className={classNames(styles.btnSubmit, "w-100", "btn-orange")}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Gửi thông tin
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
