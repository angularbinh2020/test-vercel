import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

//--- Material UI
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
//--- Others

import ButtonMG from "../ButtonMG";
import TextInputStyled from "../TextInputStyled";

export interface DefaultValues {
  title: string;
  full_name: string;
  description: string;
}

interface Props {
  modalTitle: string;
  handleClose: any;
  defaultValues: DefaultValues;
  handleSave: any;
}

export default function EditTourDetailModal({
  modalTitle,
  handleClose,
  defaultValues,
  handleSave,
}: Props) {
  const formik = useFormik({
    initialValues: {
      title: defaultValues.title || "",
      full_name: defaultValues.full_name || "",
      description: defaultValues.description || "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .required("Trường này không được để trống")
        .max(50, "Tiêu đề không vượt quá 50 ký tự"),
      full_name: Yup.string()
        .required("Trường này không được để trống")
        .max(100, "Tên người khởi tạo không quá 100 ký tự"),
      description: Yup.string()
        .required("Trường này không được để trống")
        .max(200, "Mô tả không quá 200 ký tự"),
    }),
    onSubmit: (values: any) => {
      handleSave(values);
      handleClose();
    },
  });
  return (
    <Dialog
      open
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        <Box textAlign="center">{modalTitle}</Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div className="mb-3">
            <TextInputStyled
              label="Tiêu đề tin đăng"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMsg={formik.touched.title && formik.errors?.title}
              className="w-100"
            />
          </div>
          <div className="mb-3">
            <TextInputStyled
              label="Người khởi tạo"
              name="full_name"
              value={formik.values.full_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMsg={formik.touched.full_name && formik.errors?.full_name}
            />
          </div>
          <TextInputStyled
            label="Mô tả"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMsg={formik.touched.description && formik.errors?.description}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className="text-right">
          <ButtonMG onClick={handleClose} color="primary">
            Hủy bỏ
          </ButtonMG>
          <ButtonMG onClick={() => formik.handleSubmit()} className="ms-3">
            Lưu
          </ButtonMG>
        </div>
      </DialogActions>
    </Dialog>
  );
}
