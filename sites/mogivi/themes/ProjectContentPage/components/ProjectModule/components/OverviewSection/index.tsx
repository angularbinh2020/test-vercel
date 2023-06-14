import React, { useCallback, useMemo, useState } from "react";
import SocialShare from "sites/mogivi/components/SocialShare";
import { IETTab } from "../../../../../../models/IETTab";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IETKeyValueItem } from "sites/mogivi/models/IETKeyValueItem";
import GallerySection from "./GallerySection";
import DetailSection from "./DetailSection";
import ConvenientSection from "./ConvenientSection";
import BuildingSection from "./BuildingSection";
import InvestorSection from "./InvestorSection";
import classNames from "classnames";
import { useGetPageDataContext } from "context/page-data.context";
import defaultProjectImage from "sites/mogivi/assets/images/city-night.jpg";
import { MOGIVI_CONTENT_TYPE } from "sites/mogivi/const/content-type";
import { IImageCardsBlock } from "sites/mogivi/models/blocks/IImageCardsBlock";
import { FormRow } from "components/Forms/form-row";
import { PATTERN } from "const/validation-pattern";
import { Modal, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { DialogPopupMessage } from "sites/mogivi/layout/components/Modal/ModalSuccessMessage";
import Link from "next/link";
import { IInfoGridBlock } from "sites/mogivi/models/blocks/IInfoGridBlock";
import { getFullApiUrl } from "sites/mogivi/utils";
import axiosInstance from "apis/axios";
import { useSetToastState } from "sites/mogivi/redux/toast.slice";
import Image from "next/legacy/image";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
interface OverviewSectionProps {
  tab: IETTab;
}

let contactModel: Models.ContactProjectModel = {
  currentPageId: 0,
  email: "",
  fullname: "",
  messages: "",
  tel: "",
};

const OverviewSection = (props: OverviewSectionProps) => {
  const tab = props.tab.fields;
  const overviewItems: IInfoGridBlock = tab.blocksInTab[0] || [];
  const introItems = tab.blocksInTab[1] || {};
  const imageItems = tab.blocksInTab[2] || [];
  const detailItems = tab.blocksInTab[3] || [];
  const utilityItems = tab.blocksInTab[4] || [];
  const buildingItems = tab.blocksInTab[5] || [];
  const investorItems = tab.blocksInTab[6] || [];
  const [isReadMore, setIsReadMore] = useState(true);
  const { itemTitle, subtitle, introductionText } = introItems?.fields;
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const pageData = useGetPageDataContext();
  const formAskMoreInfoApiUrl = useMemo(() => {
    return (
      pageData?.currentNode.fields?.blocks.find(
        (block) =>
          block.system.contentType ===
          MOGIVI_CONTENT_TYPE.breadcrumbsProjectPageBlock
      )?.fields.subcribeAPI?.callBackToMe + "OnProject"
    );
  }, [pageData]);
  const { projectTitle, projectImage, mogiviHotLine, address } = useMemo(() => {
    let projectTitle = "";
    let projectImage: any = defaultProjectImage;
    let mogiviHotLine = pageData?.siteLanguageNode.fields.phone || "";

    let address =
      pageData?.currentNode.fields.blocks[1]?.fields?.breadcrumbs[1]
        ?.linkText || "";

    const blocks = pageData?.currentNode.fields.blocks;
    const projectModuleBlock = blocks?.find(
      (block: any) =>
        block.system.contentType === MOGIVI_CONTENT_TYPE.projectModuleBlock
    );

    const imageCardsBlock: IImageCardsBlock = blocks?.find(
      (block: any) =>
        block.system.contentType === MOGIVI_CONTENT_TYPE.imageCardsBlock
    ) as any;
    if (projectModuleBlock) {
      projectTitle = projectModuleBlock.fields.itemTitle || "";
    }
    if (imageCardsBlock?.fields.groupBlocks?.length) {
      projectImage =
        imageCardsBlock.fields.groupBlocks[0].fields.image?.fields.umbracoFile;
    }
    return {
      projectTitle,
      projectImage,
      mogiviHotLine,
      address,
    };
  }, [pageData]);

  const checkLabel = (overviewItem: IInfoGridBlock, label: string) => {
    const text =
      overviewItem?.fields.groupBlocks.find((block) => {
        if (block?.fields?.label) {
          return block?.fields?.label?.toLowerCase().includes(label);
        }
      })?.fields.text || "";
    return text;
  };
  const status = checkLabel(overviewItems, "trạng thái");
  const typeOfEstate = checkLabel(overviewItems, "loại hình");
  const investor = checkLabel(overviewItems, "chủ đầu tư");

  const [contactForm, setContactForm] = useState<Models.ContactProjectModel>({
    ...contactModel,
    messages: `Tôi cần thêm thông tin về ${projectTitle}`,
  });
  const [show, setShow] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowDialog = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);
  const [showLoading, setShowLoading] = useState(false);
  const handleShowLoading = () => setShowLoading(true);
  const handleCloseLoading = () => setShowLoading(false);
  const { showErrorToast } = useSetToastState();

  const onSubmit = async (data: any) => {
    handleShowLoading();
    const requestData = {
      currentPageId: pageData?.siteId,
      fullname: data.fullname,
      email: data.email,
      tel: data.tel,
      messages: data.messages,
    };
    const fullApiUrl = getFullApiUrl(formAskMoreInfoApiUrl);
    axiosInstance
      .post(fullApiUrl, requestData)
      .then((res) => {
        handleShowDialog();
        handleClose();
        setContactForm(contactModel);
        reset({
          ...contactModel,
          firstName: "",
          lastName: "",
          messages: `Tôi cần thêm thông tin về ${itemTitle}`,
        });
      })
      .catch((e) => {
        console.log(e);
        showErrorToast("Gửi yêu cầu không thành công, vui lòng thử lại sau");
      })
      .finally(handleCloseLoading);
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
    <>
      <div
        className={classNames("mt-4", styles.container)}
        id={tab.anchorID}
        data-tab-anchor-id={tab.anchorID}
      >
        <div className="row">
          <div className="col-12 col-md-8 col-lg-8">
            <div className="project-summary__info border-right">
              <div className="row">
                {overviewItems?.fields.groupBlocks?.map(
                  (item: IETKeyValueItem) => (
                    <div
                      className="col-12 col-md-6 col-lg-6"
                      key={`overview-item-id-${item.system.id}`}
                    >
                      <div className="row">
                        <div className="col-12 col-md-12 col-lg-4">
                          <span>{item.fields.label}</span>
                        </div>
                        <div
                          className="col-12 col-md-12 col-lg-8"
                          dangerouslySetInnerHTML={{ __html: item.fields.text }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="col-12 d-md-none">
            <SocialShare iconSize={30} className="mt-2 text-center" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className={styles.introductionTitle + " border-top mt-3 pt-3"}>
              <h2 className={styles.sectionTitle + " sectionTitleFirst"}>
                {itemTitle}{" "}
                <span className={styles.placeViral}>{subtitle}</span>
              </h2>
              <div
                className={classNames(
                  "mt-4",
                  isReadMore ? styles.briefText : styles.fullText
                )}
                dangerouslySetInnerHTML={{
                  __html: introductionText,
                }}
              ></div>
              <div className={styles.collapseBtn}>
                <span
                  onClick={toggleReadMore}
                  data-tab-opened={isReadMore ? "false" : "true"}
                >
                  {isReadMore ? "Xem thêm" : "Thu gọn"}
                </span>
                <FontAwesomeIcon
                  className={styles.collapseIcon}
                  icon={isReadMore ? faAngleDown : faAngleUp}
                />
              </div>
            </div>
            <GallerySection infoDetail={imageItems} />
            <DetailSection infoDetail={detailItems} />
            <ConvenientSection infoDetail={utilityItems} />
            <BuildingSection infoDetail={buildingItems} />
            <InvestorSection infoDetail={investorItems} />
          </div>
          <div className="col-0 col-lg-4">
            <div className={styles.contactForDetailContainer}>
              <div className={styles.content}>
                <h2>{projectTitle}</h2>
                {address && address !== "" && (
                  <p className={styles.address}>{address}</p>
                )}
                <div className={styles.price}>
                  <p>Giá:</p>
                  <div onClick={handleShow}>
                    <h3>Liên hệ để nhận tư vấn</h3>
                  </div>
                </div>
                <ul className={styles.status}>
                  {status && status !== "" && (
                    <li>
                      <div className={styles.statusTitle}>Trạng thái:</div>
                      <div
                        className={styles.statusContent}
                        dangerouslySetInnerHTML={{ __html: status }}
                      ></div>
                    </li>
                  )}
                  {investor && investor !== "" && (
                    <li>
                      <div className={styles.statusTitle}>Chủ đầu tư:</div>
                      <div
                        className={styles.statusContent}
                        dangerouslySetInnerHTML={{ __html: investor }}
                      ></div>
                    </li>
                  )}
                  {typeOfEstate && typeOfEstate !== "" && (
                    <li>
                      <div className={styles.statusTitle}>Loại hình:</div>
                      <div
                        className={styles.statusContent}
                        dangerouslySetInnerHTML={{ __html: typeOfEstate }}
                      ></div>
                    </li>
                  )}
                </ul>

                <button
                  className={classNames("btn-orange", styles.btnContact)}
                  onClick={handleShow}
                >
                  Liên hệ ngay
                </button>
                <div className={styles.hotLine}>
                  <Link href={`tel:${mogiviHotLine}`}>
                    <SvgIcon icon="phone" /> {mogiviHotLine}
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.contactForDetailMobile}>
              <div className="container">
                <div className={styles.contactMobileBox}>
                  <div className={styles.contactNow} onClick={handleShow}>
                    <button className="btn-orange">Liên hệ ngay</button>
                  </div>
                  <div className={styles.contactViaPhoneNumber}>
                    <button className="btn-outline">
                      <SvgIcon icon="phone" />
                      <Link href={`tel:${mogiviHotLine}`}>{mogiviHotLine}</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && (
        <Modal
          size="xl"
          className={styles.modalContainer}
          show={show}
          centered
          onHide={handleClose}
        >
          <div className={styles.closeButton} onClick={handleClose}>
            <SvgIcon icon="close" width={20} height={20} />
          </div>
          {/* <Modal.Header className={classNames("border-0 justify-content-center")}>
            <Modal.Title>Liên hệ tư vấn</Modal.Title>
          </Modal.Header> */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body className={styles.modalBody}>
              <div className={styles.contactFormImg}>
                {projectImage && (
                  <Image
                    src={projectImage}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className={styles.contactFormContainer}>
                <h2 className="text-center">Liên hệ tư vấn</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <FormRow
                    error={
                      errors?.fullname?.message &&
                      String(errors?.fullname?.message)
                    }
                  >
                    <Controller
                      control={control}
                      name="fullname"
                      rules={{
                        required: "Vui lòng nhập họ và tên",
                      }}
                      render={() => (
                        <Form.Control
                          {...register("fullname")}
                          type="text"
                          placeholder="Họ và tên"
                          value={contactForm?.fullname}
                          onChange={(e) =>
                            onUpdateData("fullname", e.target?.value)
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
                <button
                  disabled={showLoading}
                  className={classNames(
                    styles.btnSubmit,
                    "w-100",
                    "btn-orange",
                    showLoading ? styles.btnDisable : ""
                  )}
                  type="submit"
                >
                  {showLoading && (
                    <span className={styles.threeDotLoader}></span>
                  )}
                  Gửi thông tin
                </button>
              </div>
            </Modal.Body>
            {/* <Modal.Footer className="border-0">
              <button className={classNames(styles.btnSubmit, "w-100", "btn-orange")} type="submit">
                Gửi thông tin
              </button>
            </Modal.Footer> */}
          </Form>
        </Modal>
      )}
      {showDialog && (
        <DialogPopupMessage
          showDialog={showDialog}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </>
  );
};

export default OverviewSection;
