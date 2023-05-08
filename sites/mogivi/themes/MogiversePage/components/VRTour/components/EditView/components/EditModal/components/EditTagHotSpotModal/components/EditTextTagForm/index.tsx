import { ITagTextHotspot } from "sites/mogivi/models/ITagTextHotspot";
import { useImperativeHandle, forwardRef } from "react";
import { useFormik } from "formik";
import { EditTagFormRef } from "../..";
import TextInputStyled from "sites/mogivi/themes/MogiversePage/components/VRTour/components/TextInputStyled";
import SimpleHtmlContent from "sites/mogivi/themes/MogiversePage/components/VRTour/components/SimpleHtmlContent";

interface Props {
  defaultValues: ITagTextHotspot;
  onSave: any;
  onClose: any;
}

const EditTextTagForm = ({ defaultValues, onSave }: Props, ref: any) => {
  const formik = useFormik({
    initialValues: {
      title: defaultValues.title || "",
      body: defaultValues.body || "",
    },
    onSubmit: (values: any) => {
      onSave(values);
    },
  });
  useImperativeHandle(
    ref,
    () => {
      return { formik };
    },
    [formik]
  );
  return (
    <>
      <TextInputStyled
        label="Tiêu đề"
        placeholder="Nhập tiêu đề"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <SimpleHtmlContent
        label="Nội dung"
        placeholder="Nhập nội dung"
        name="body"
        value={formik.values.body}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </>
  );
};

export default forwardRef<EditTagFormRef, Props>(EditTextTagForm);
