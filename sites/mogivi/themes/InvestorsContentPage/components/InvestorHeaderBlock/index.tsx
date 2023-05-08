import { subscribeInfo } from "apis/client";
import classNames from "classnames";
import { FormRow } from "components/Forms/form-row";
import LinkItem from "components/LinkItem";
import { PATTERN } from "const/validation-pattern";
import { useGetPageDataContext } from "context/page-data.context";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { DialogPopupMessage } from "sites/mogivi/layout/components/Modal/ModalSuccessMessage";
import { IIntroductionIInvestorBlock } from "sites/mogivi/models/blocks/IIntroductionIInvestorBlock";
import { RootState } from "store";
import styles from "./styles.module.scss";

type FormType = Models.ContactModel & {};

let contactModel: Models.ContactModel = {
  currentPageId: 0,
  email: "",
  fullname: "",
  firstName: "",
  lastName: "",
  messages: "",
  tel: "",
};

interface InvestorHeaderBlockProps {
  block: IIntroductionIInvestorBlock;
  handleClose: () => void;
  handleShow: () => void;
  show: boolean;
}

export const InvestorHeaderBlock = (props: InvestorHeaderBlockProps) => {
  const { investor } = useSelector((state: RootState) => state.investor);
  const pageData = useGetPageDataContext();
  const siteId = pageData?.siteId ?? 0;
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    reset,
    formState: { errors },
  } = useForm<FormType>();
  const addressText = investor?.addressText;
  const { itemTitle, investorLogo, foundingDate, website } = props.block.fields;
  const { handleClose, handleShow, show } = props;
  const pageUrl = pageData?.currentNode.fields.umbracoUrlAlias.split("/")[0];
  const [showDialog, setShowDialog] = useState(false);
  const [contactForm, setContactForm] = useState<Models.ContactModel>({
    ...contactModel,
    messages: `Tôi cần thêm thông tin về chủ đầu tư ${itemTitle}`,
  });
  const handleShowDialog = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);

  const onSubmit = (data: FormType) => {
    data.fullname = contactForm.firstName + contactForm.lastName;
    data.currentPageId = siteId;

    try {
      subscribeInfo(data);
      handleClose();
      handleShowDialog();
      setContactForm(contactModel);
      reset({
        ...contactModel,
        firstName: "",
        lastName: "",
        messages: `Tôi cần thêm thông tin về chủ đầu tư ${itemTitle}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateData = useCallback(
    (field: any, value: any) => {
      setContactForm({
        ...contactForm,
        [field]: value,
      });
      setValue(field, value);
      trigger(field);
    },
    [contactForm, setValue, trigger]
  );

  return (
    <div className="container">
      <div className={styles.investorHeaderContainer}>
        <div className={styles.viewAllInvestor}>
          <LinkItem url={`/${pageUrl}`}>
            <SvgIcon icon="chevronLeft" />
            <span>Xem tất cả chủ đầu tư</span>
          </LinkItem>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className={styles.investorHeaderLeft}>
              {investorLogo && (
                <Image
                  src={investorLogo?.fields.umbracoFile}
                  width={820}
                  height={950}
                  alt="investor-logo"
                  objectFit="contain"
                  priority
                />
              )}
            </div>
          </div>
          <div className="col-sm-12 col-md-9 col-lg-9">
            <div className={styles.investorHeaderRight}>
              <div>
                <div className={styles.investorHeader}>
                  <h1 className={styles.investorName}>{itemTitle}</h1>
                  <p className={styles.investorFullName}>{itemTitle}</p>
                </div>
                <div className={styles.investorInfoDetail}>
                  <table>
                    <tbody className={styles.tableBody}>
                      {foundingDate && (
                        <tr>
                          <td className={styles.textLight}>Thành lập:</td>
                          <td className={styles.textBold}>{foundingDate}</td>
                        </tr>
                      )}
                      {addressText && (
                        <tr>
                          <td className={styles.textLight}>Địa chỉ:</td>
                          <td className={styles.textBold}>{addressText}</td>
                        </tr>
                      )}
                      {website && (
                        <tr>
                          <td className={styles.textLight}>Website:</td>
                          <td className={styles.textBold}>
                            <Link href={website.url}>
                              <a>{website.name}</a>
                            </Link>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={classNames(styles.contactBtn)}>
                <button className="btn-orange" onClick={handleShow}>
                  Liên hệ tư vấn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className={styles.modalContainer}
        show={show}
        centered
        onHide={handleClose}
      >
        <div className={styles.closeButton} onClick={handleClose}>
          <SvgIcon icon="close" width={20} height={20} />
        </div>
        <Modal.Header className={classNames("border-0 justify-content-center")}>
          <Modal.Title>Liên hệ tư vấn</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className={styles.modalBody}>
            <div className={styles.contactFormContainer}>
              <Form.Group
                className="mb-3 d-flex gap-3"
                controlId="formBasicEmail"
              >
                <FormRow
                  error={
                    errors?.firstName?.message &&
                    String(errors?.firstName?.message)
                  }
                >
                  <Controller
                    control={control}
                    name="firstName"
                    rules={{
                      required: "Vui lòng nhập Họ",
                    }}
                    render={() => (
                      <Form.Control
                        {...(register("firstName"), { required: true })}
                        type="text"
                        placeholder="Họ"
                        value={contactForm?.firstName}
                        onChange={(e) =>
                          onUpdateData("firstName", e.target?.value)
                        }
                      />
                    )}
                  />
                </FormRow>
                <FormRow
                  error={
                    errors?.lastName?.message &&
                    String(errors?.lastName?.message)
                  }
                >
                  <Controller
                    control={control}
                    name="lastName"
                    rules={{
                      required: "Vui lòng nhập Tên",
                    }}
                    render={() => (
                      <Form.Control
                        {...(register("lastName"), { required: true })}
                        type="text"
                        placeholder="Tên"
                        value={contactForm?.lastName}
                        onChange={(e) =>
                          onUpdateData("lastName", e.target?.value)
                        }
                      />
                    )}
                  />
                </FormRow>
              </Form.Group>
              <Form.Group className="mb-3 d-flex gap-3">
                <FormRow
                  className="w-100"
                  error={errors?.tel?.message && String(errors?.tel?.message)}
                >
                  <Controller
                    control={control}
                    name="tel"
                    rules={{
                      required: "Vui lòng nhập số điện thoại",
                      pattern: {
                        value: PATTERN.phoneNumber,
                        message: "Số điện thoại không hợp lệ!",
                      },
                    }}
                    render={() => (
                      <Form.Control
                        {...register("tel")}
                        type="text"
                        placeholder="Số điện thoại"
                        value={contactForm?.tel}
                        onChange={(e) => onUpdateData("tel", e.target?.value)}
                      />
                    )}
                  />
                </FormRow>
              </Form.Group>
              <Form.Group className="mb-3 d-flex gap-3">
                <FormRow
                  className="w-100"
                  error={
                    errors?.email?.message && String(errors?.email?.message)
                  }
                >
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
                        value={contactForm?.email}
                        onChange={(e) => onUpdateData("email", e.target?.value)}
                      />
                    )}
                  />
                </FormRow>
              </Form.Group>
              <Form.Group className="mb-3 d-flex gap-3">
                <FormRow
                  className="w-100"
                  error={
                    errors?.messages?.message &&
                    String(errors?.messages?.message)
                  }
                >
                  <Controller
                    control={control}
                    name="messages"
                    rules={{
                      required: "Vui lòng nhập lời nhắn",
                    }}
                    render={() => (
                      <Form.Control
                        {...register("messages")}
                        as={"textarea"}
                        rows={3}
                        placeholder="Lời nhắn"
                        value={contactForm?.messages}
                        onChange={(e) =>
                          onUpdateData("messages", e.target?.value)
                        }
                      />
                    )}
                  />
                </FormRow>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <button
              className={classNames(styles.btnSubmit, "w-100", "btn-orange")}
              type="submit"
            >
              Gửi thông tin
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
      {showDialog && (
        <DialogPopupMessage
          showDialog={showDialog}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </div>
  );
};
