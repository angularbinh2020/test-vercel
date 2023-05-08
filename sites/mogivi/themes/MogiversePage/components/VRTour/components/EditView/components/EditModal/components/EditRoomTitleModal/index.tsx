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

import ButtonMG from "../../../../../ButtonMG";
import TextInputStyled from "../../../../../TextInputStyled";

interface Props {
  handleClose: any;
  defaultValue: string;
  handleSave: any;
}

export default function EditRoomTitleModal({
  handleClose,
  defaultValue,
  handleSave,
}: Props) {
  const formik = useFormik({
    initialValues: {
      title: defaultValue || "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Trường này không được để trống"),
    }),
    onSubmit: (values) => {
      handleSave(values.title);
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
        <Box textAlign="center">Sửa tiêu đề</Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TextInputStyled
            label="Tiêu đề"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMsg={formik.touched.title && formik.errors?.title}
            className="w-100"
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
