import { Button, Modal } from "react-bootstrap";
import useBoolean from "sites/mogivi/hooks/useBoolean";
import { useForm } from "react-hook-form";
import { useSetLoadingFullScreenState } from "sites/mogivi/redux/loadingFullScreen.slice";
import { submitLoan } from "apis/client";
import { useGetPageDataContext } from "context/page-data.context";
import { IETFormFieldItem } from "models/IETFormFieldItem";
import { useMemo, forwardRef, useImperativeHandle } from "react";
import { REGEX_PATTERN } from "sites/mogivi/const/regex-pattern";
import styles from "./styles.module.scss";
import { useSetToastState } from "sites/mogivi/redux/toast.slice";

interface Props {
  selectGroupField: any[];
}

export interface RegisterLoanFormRef {
  showLoanModal: () => void;
}

const RegisterLoanForm = forwardRef<RegisterLoanFormRef, Props>(
  ({ selectGroupField }, ref) => {
    const pageData = useGetPageDataContext();
    const { showLoading, closeLoading } = useSetLoadingFullScreenState();
    const [isShowLoanModal, closeLoanModal, showLoanModal] = useBoolean(false);
    const { showErrorToast } = useSetToastState();
    const [isShowSuccessModal, closeSuccessModal, showSuccessModal] =
      useBoolean(false);
    const { selectFieldList } = useMemo(() => {
      const selectFieldList: Array<IETFormFieldItem> = [];
      for (let i = 0; i < 4; i++) {
        selectFieldList.push(selectGroupField[i]);
      }
      return { selectFieldList };
    }, []);
    const fullNameField = selectGroupField[4];
    const phoneNumberField = selectGroupField[5];
    const emailField = selectGroupField[6];
    const {
      handleSubmit,
      formState: { errors },
      reset,
      register,
      setValue,
    } = useForm<any>();
    const onSubmit = async (data: any) => {
      showLoading();
      const age = data["yourAgeSelect"];
      const job = data["yourJobSelect"];
      const income = data["totalEarnSelect"];
      const earnType = data["getSalaryBy"];
      const requestBody = {
        currentPageId: pageData?.siteId || pageData?.subPageData?.siteId || "",
        fullname: data["userNameInput"]?.trim(),
        email: data["userEmailInput"]?.trim(),
        tel: data["userPhoneInput"]?.trim(),
        request: `Tuổi: ${age};Công việc hiện tại: ${job};Tổng thu nhập: ${income};Nhận lương qua: ${earnType}`,
      };
      try {
        await submitLoan(requestBody);
        closeLoanModal();
        reset();
        showSuccessModal();
      } catch (error) {
        console.log(error);
        showErrorToast("Đã có lỗi xảy ra, vui lòng thử lại sau");
      } finally {
        closeLoading();
      }
    };
    useImperativeHandle(ref, () => ({ showLoanModal }), []);
    return (
      <>
        <Modal show={isShowLoanModal} onHide={closeLoanModal} backdrop>
          <Modal.Header closeButton>
            <Modal.Title>Khả năng vay vốn</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
              <div className="row">
                {selectFieldList.map((formItem, formItemIdx) => {
                  return (
                    <div key={formItemIdx} className="col-6 mb-2">
                      <div className="form-group">
                        <label
                          className="mb-2"
                          htmlFor={formItem.fields.elementName}
                        >
                          {formItem.fields.label}
                        </label>
                        <select
                          {...register(formItem.fields.elementName)}
                          style={{ maxWidth: 220 }}
                          className="form-control"
                          id={formItem.fields.elementName}
                          onChange={(e: any) =>
                            setValue(
                              formItem.fields.elementName,
                              e.target.value
                            )
                          }
                        >
                          {formItem.fields.values.map((item, idx) => {
                            return (
                              <option key={idx} value={item.fields.key}>
                                {item.fields.value}
                              </option>
                            );
                          })}
                        </select>
                        {errors[formItem.fields.elementName]?.message && (
                          <div className="invalid-feedback d-block">
                            {
                              errors[formItem.fields.elementName]
                                ?.message as String
                            }
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className="col-12 mt-3">
                  <input type="hidden" name="ClientId" id="clientUserId" />
                  <div className="form-group mb-3">
                    <label className="mb-2 mt-2">Thông tin cá nhân</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={fullNameField.fields.placeholder}
                      {...register(fullNameField.fields.elementName, {
                        required: "Vui lòng nhập đủ thông tin",
                      })}
                    />
                    {errors[fullNameField.fields.elementName]?.message && (
                      <div className="invalid-feedback d-block">
                        {
                          errors[fullNameField.fields.elementName]
                            ?.message as String
                        }
                      </div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <input
                      type="tel"
                      pattern="(84|0[1|2|3|5|7|8|9])+([0-9]{8})\b"
                      className="form-control"
                      placeholder={phoneNumberField.fields.placeholder}
                      {...register(phoneNumberField.fields.elementName, {
                        required: "Vui lòng nhập đủ thông tin",
                        pattern: {
                          value: REGEX_PATTERN.MOBILE,
                          message: "Vui lòng nhập đúng định dạng số điện thoại",
                        },
                      })}
                    />

                    {errors[phoneNumberField.fields.elementName]?.message && (
                      <div className="invalid-feedback d-block">
                        {
                          errors[phoneNumberField.fields.elementName]
                            ?.message as String
                        }
                      </div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder={emailField.fields.placeholder}
                      {...register(emailField.fields.elementName, {
                        required: "Vui lòng nhập đủ thông tin",
                        pattern: {
                          value: REGEX_PATTERN.EMAIL,
                          message: "Vui lòng nhập đúng định dạng email",
                        },
                      })}
                    />
                    {errors[emailField.fields.elementName]?.message && (
                      <div className="invalid-feedback d-block">
                        {
                          errors[emailField.fields.elementName]
                            ?.message as String
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" className={styles.btnSubscribe}>
                Đăng ký vay
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        <Modal show={isShowSuccessModal} onHide={closeSuccessModal}>
          <Modal.Header closeButton>
            <Modal.Title>Đã gửi thành công!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {" "}
              Cảm ơn bạn đã Mogivi, chúng tôi sẽ liên lạc ngay trong thời gian
              sớm nhất. Mọi thắc mắc xin vui lòng liên hệ{" "}
              <a href="tel:1800 646 427">1800 646 427</a>
            </p>
          </Modal.Body>
          <Button
            type="submit"
            className={styles.btnClose}
            onClick={closeSuccessModal}
          >
            Đóng
          </Button>
        </Modal>
      </>
    );
  }
);

export default RegisterLoanForm;
