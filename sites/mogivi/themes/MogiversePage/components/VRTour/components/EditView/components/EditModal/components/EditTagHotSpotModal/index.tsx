import React, { useEffect, useMemo, useRef } from "react";
import IconInfo from "sites/mogivi/assets/icons/ic-info-1.svg";
//--- Material UI
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Image from "next/image";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { TagHotspotTypes } from "sites/mogivi/const/tag-hotspot-types";
import EditTextTagForm from "./components/EditTextTagForm";
import EditIframeTagForm from "./components/EditIframeTagForm";
import { createTagHotSpotConfig } from "sites/mogivi/utils/vr360";
import EditYoutubeTagForm from "./components/EditYoutubeTagForm";
import EditVideoTagForm from "./components/EditVideoTagForm";
import EditGoogleMapTagForm from "./components/EditGoogleMapTagForm";
import EditFeedbackTagForm from "./components/EditFeedbackTagForm";
import EditMenuTagForm from "./components/EditMenuTagForm";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  icLabel: {
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
    textAlign: "center",

    "& img": {
      width: 45,
      height: 45,
    },
  },
  btnClose: {
    border: "1px solid transparent",
    backgroundColor: "#ffffff",
    color: "#939292",
    borderRadius: 50,
    paddingLeft: 25,
    paddingRight: 25,
  },
  btnSave: {
    border: "1px solid #ff4e00",
    backgroundColor: "#ff4e00",
    color: "#ffffff",
    borderRadius: 50,
    paddingLeft: 25,
    paddingRight: 25,
    "&:hover": {
      border: "1px solid #ff4e00",
      backgroundColor: "#ffffff",
      color: "#ff4e00",
    },
  },
}));

const EditHotSpotTagForm = {
  [TagHotspotTypes.TEXT]: EditTextTagForm,
  [TagHotspotTypes.IFRAME]: EditIframeTagForm,
  [TagHotspotTypes.YOUTUBE]: EditYoutubeTagForm,
  [TagHotspotTypes.FACEBOOK]: EditYoutubeTagForm,
  [TagHotspotTypes.TIKTOK]: EditYoutubeTagForm,
  [TagHotspotTypes.INSTAGRAM]: EditYoutubeTagForm,
  [TagHotspotTypes.VIDEO]: EditVideoTagForm,
  [TagHotspotTypes.PDF]: EditIframeTagForm,
  [TagHotspotTypes.GOOGLE_MAP]: EditGoogleMapTagForm,
  [TagHotspotTypes.FEEDBACK]: EditFeedbackTagForm,
  [TagHotspotTypes.MENU]: EditMenuTagForm,
};

export interface EditTagFormRef {
  formik: any;
}

interface Props {
  modalTitle: string;
  onSave: any;
  onClose: any;
  defaultValues: any;
}

export default function EditTagHotSpotModal({
  modalTitle,
  onSave,
  onClose,
  defaultValues,
}: Props) {
  const classes = useStyles();
  const formRef = useRef<EditTagFormRef>();
  const handleSave = (values: any) => {
    const newConfig = createTagHotSpotConfig(defaultValues.type, values);
    onSave(newConfig);
    onClose();
  };

  const EditForm = useMemo(() => {
    //@ts-ignore
    return EditHotSpotTagForm[defaultValues.type];
  }, []);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.container}>
        <h1 className={classes.title}>{modalTitle}</h1>
        <div className={classes.icLabel}>
          <Image src={IconInfo} alt="Info" />
        </div>
        <div className="px-3">
          {EditForm ? (
            <EditForm
              defaultValues={defaultValues}
              onClose={onClose}
              onSave={handleSave}
              ref={formRef}
            />
          ) : (
            "Loại tag chưa được hỗ trợ, vui lòng liên hệ bộ phận IT để nhận trợ giúp."
          )}
        </div>

        <div className="text-end py-3 pe-3">
          <Button onClick={onClose} className={classes.btnClose}>
            Hủy
          </Button>
          <Button
            onClick={() => formRef.current?.formik.handleSubmit()}
            className={classNames(classes.btnSave, "ml-2")}
          >
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
}
