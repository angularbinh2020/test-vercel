import { subscribeMoreInfo } from "apis/client";
import classNames from "classnames";
import { FormRow } from "components/Forms/form-row";
import { PATTERN } from "const/validation-pattern";
import { useGetPageDataContext } from "context/page-data.context";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import ButtonCustom, {
  IColorTypes,
} from "sites/mogivi/components/ButtonCustom";
import { IContactBlock } from "sites/mogivi/models/blocks/IContactBlock";
import { RootState } from "store";
import { DialogPopupMessage } from "../Modal/ModalSuccessMessage";
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

interface ContactSupportProps {
  block: IContactBlock;
}

export const ContactSupportBlock = (props: ContactSupportProps) => {
  const { itemTitle, image, imageDescription, aPISetting } = props.block.fields;
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
  const [contactForm, setContactForm] = useState<Models.ContactModel>({
    ...contactModel,
  });
  const [showDialog, setShowDialog] = useState(false);

  const handleShowDialog = () => setShowDialog(true);

  const handleCloseDialog = () => setShowDialog(false);

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

  const onSubmit = (data: FormType) => {
    if (contactForm.firstName && contactForm.lastName) {
      data.fullname = contactForm.firstName + contactForm.lastName;
    } else {
      data.fullname = "";
    }

    data.currentPageId = siteId;
    let apiUrl = "";

    if (aPISetting) {
      apiUrl = aPISetting[0].node.fields.itemTitle;
    }
    try {
      subscribeMoreInfo(data, apiUrl);
      handleShowDialog();
      setContactForm(contactModel);
      reset({ ...contactModel, firstName: "", lastName: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.contactSupportContainer}>
      <div
        className={classNames(
          "row justify-content-center",
          styles.contactWrapper
        )}
      >
        <div className="col-lg-5 col-md-5 col-sm-12 p-0">
          <div className={styles.contactInfo}>
            {image && (
              <div className={styles.imageBox}>
                <Image
                  src={image.fields.umbracoFile}
                  width={460}
                  height={305}
                  alt="contact-img"
                  title={image.system.name}
                  priority
                />
              </div>
            )}
            <div className={styles.infoDetail}>
              {itemTitle && <h2>{itemTitle}</h2>}
              <div dangerouslySetInnerHTML={{ __html: imageDescription }}></div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 p-0">
          <div className={styles.contactForm}>
            <div className={styles.contactFormContainer}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3 d-flex gap-3">
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
                          {...register("firstName")}
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
                          {...register("lastName")}
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
                          onChange={(e) =>
                            onUpdateData("email", e.target?.value)
                          }
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
                <Button
                  className={classNames(
                    styles.btnSubmit,
                    "w-100",
                    "btn-orange"
                  )}
                  type="submit"
                >
                  Gửi thông tin
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {showDialog && (
        <DialogPopupMessage
          showDialog={showDialog}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </div>
  );
};
