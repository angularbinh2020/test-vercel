import { useImperativeHandle, forwardRef } from "react";
import { useFormik } from "formik";
import { EditTagFormRef } from "../..";
import TextInputStyled from "sites/mogivi/themes/MogiversePage/components/VRTour/components/TextInputStyled";
import { ITagVideoHotspot } from "sites/mogivi/models/ITagVideoHotspot";

interface Props {
  defaultValues: ITagVideoHotspot;
  onSave: any;
  onClose: any;
}

const EditVideoTagForm = ({ defaultValues, onSave }: Props, ref: any) => {
  const formik = useFormik({
    initialValues: {
      resourceUrl: defaultValues.resourceUrl || "",
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
    <div style={{ width: 500 }}>
      <TextInputStyled
        label="Video url (Mp4)"
        placeholder="Nhập video url"
        name="resourceUrl"
        value={formik.values.resourceUrl}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        multiline
        rows={8}
      />
    </div>
  );
};

export default forwardRef<EditTagFormRef, Props>(EditVideoTagForm);
