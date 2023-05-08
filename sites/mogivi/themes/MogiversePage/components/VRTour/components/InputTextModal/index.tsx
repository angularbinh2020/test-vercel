import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import IconInfo from "sites/mogivi/assets/icons/ic-info-1.svg";
//--- Material UI
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormErrorMessage from "../FormErrorMessage";
import Image from "next/image";
import RichTextEditor from "../RichTextEditor";
import styles from "./styles.module.scss";
import classNames from "classnames";

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
export default function InputTextModal(props: any) {
  const classes = useStyles();

  const { defaultValue, handleClose, modalTitle, description, onChangeValue } =
    props;

  const formik = useFormik({
    initialValues: {
      inputEdited: defaultValue || "",
    },
    validationSchema: Yup.object().shape({
      inputEdited: Yup.string().required("Trường này không được để trống"),
    }),
    onSubmit: (values: any) => {
      onChangeValue(values.inputEdited);
      handleClose();
    },
  });

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
          <RichTextEditor
            placeholder="Nhập nội dung nhãn dán"
            name="inputEdited"
            value={formik.values.inputEdited}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage
            errorMessage={
              formik.touched.inputEdited && formik.errors.inputEdited
            }
          />
        </div>

        <div className="text-end py-3 pe-3">
          <Button onClick={handleClose} className={classes.btnClose}>
            Hủy
          </Button>
          <Button
            onClick={() => formik.handleSubmit()}
            className={classNames(classes.btnSave, "ml-2")}
          >
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
}
