import { useImperativeHandle, forwardRef } from "react";
import { useFormik } from "formik";
import { EditTagFormRef } from "../..";
import TextInputStyled from "sites/mogivi/themes/MogiversePage/components/VRTour/components/TextInputStyled";
import SimpleHtmlContent from "sites/mogivi/themes/MogiversePage/components/VRTour/components/SimpleHtmlContent";
import { ITagGoogleMapHotspot } from "sites/mogivi/models/ITagGoogleMapHotspot";
import Grid from "@material-ui/core/Grid";

interface Props {
  defaultValues: ITagGoogleMapHotspot;
  onSave: any;
  onClose: any;
}

const EditGoogleMapTagForm = ({ defaultValues, onSave }: Props, ref: any) => {
  const formik = useFormik({
    initialValues: {
      shareUrl: defaultValues.shareUrl || "",
      embedContent: defaultValues.embedContent || "",
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
    <Grid container spacing={2}>
      <Grid xs={6} item>
        <TextInputStyled
          label="Tiêu đề"
          placeholder="Nhập tiêu đề"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid xs={6} item>
        <TextInputStyled
          label="Link chia sẻ"
          placeholder="Nhập link chia sẻ"
          name="shareUrl"
          value={formik.values.shareUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid xs={6} item>
        <SimpleHtmlContent
          label="Nội dung"
          placeholder="Nhập nội dung"
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid xs={6} item>
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
      </Grid>
    </Grid>
  );
};

export default forwardRef<EditTagFormRef, Props>(EditGoogleMapTagForm);
