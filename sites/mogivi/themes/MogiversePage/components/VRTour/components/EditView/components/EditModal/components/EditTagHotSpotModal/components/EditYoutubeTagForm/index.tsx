import { useImperativeHandle, forwardRef } from "react";
import { useFormik } from "formik";
import { EditTagFormRef } from "../..";
import { ITagYoutubeHotspot } from "sites/mogivi/models/ITagYoutubeHotspot";
import TextInputStyled from "sites/mogivi/themes/MogiversePage/components/VRTour/components/TextInputStyled";

interface Props {
  defaultValues: ITagYoutubeHotspot;
  onSave: any;
  onClose: any;
}

const EditYoutubeTagForm = ({ defaultValues, onSave }: Props, ref: any) => {
  const formik = useFormik({
    initialValues: {
      embedContent: defaultValues.embedContent || "",
      shareUrl: defaultValues.shareUrl || "",
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
        label="Link chia sẻ"
        placeholder="Nhập link chia sẻ"
        name="shareUrl"
        value={formik.values.shareUrl}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <TextInputStyled
        label="Code nhúng"
        placeholder="Nhập mã nhúng"
        name="embedContent"
        value={formik.values.embedContent}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        multiline
        rows={8}
      />
    </div>
  );
};

export default forwardRef<EditTagFormRef, Props>(EditYoutubeTagForm);
