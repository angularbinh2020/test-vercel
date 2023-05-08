import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import { EditTagFormRef } from "../..";
import TextInputStyled from "sites/mogivi/themes/MogiversePage/components/VRTour/components/TextInputStyled";
import { Formik, Form, FieldArray } from "formik";
import { ITagFeedbackHotspot } from "sites/mogivi/models/ITagFeedbackHotspot";
import DropdownStyled from "sites/mogivi/themes/MogiversePage/components/VRTour/components/DropdownStyled";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import get from "lodash/get";

interface Props {
  defaultValues: ITagFeedbackHotspot;
  onSave: any;
  onClose: any;
}

const EditFeedbackTagForm = ({ defaultValues, onSave }: Props, ref: any) => {
  const [feedbackIndexSelected, setFeedbackIndexSelected] = useState<any>(
    defaultValues.feedbacks?.length ? 0 : undefined
  );
  const submitBtn = useRef<any>();
  useImperativeHandle(
    ref,
    () => {
      const formik = {
        handleSubmit: () => {
          submitBtn.current?.click();
        },
      };
      return { formik };
    },
    []
  );
  return (
    <div style={{ minWidth: 500 }}>
      <Formik
        initialValues={{
          feedbacks: defaultValues.feedbacks,
        }}
        onSubmit={(values) => {
          onSave(values);
        }}
      >
        {({ values, handleChange, handleBlur }) => {
          const options = values.feedbacks.map((fb, fbIndex) => ({
            value: fb.id,
            label: `Feedback ${fb.id}`,
          }));
          const handleDeleteSelectedFeedback = (remove: any) => {
            remove(feedbackIndexSelected);
            setFeedbackIndexSelected(0);
          };
          const handleAddNew = (push: any) => {
            let newId = 0;
            values.feedbacks.forEach((fb) => {
              if (fb.id >= newId) {
                newId = fb.id + 1;
              }
            });
            const newFeedback = {
              star: 0,
              quote: "",
              fullName: "",
              avatar: "",
              redirectUrl: "",
              description: "",
              id: newId,
              guid: uuidv4(),
            };

            push(newFeedback);
            setFeedbackIndexSelected(options.length);
          };
          const disableNextBtn = feedbackIndexSelected === options.length - 1;
          const disablePreviousBtn = !Boolean(feedbackIndexSelected);
          const handleGoNext = () => {
            if (!disableNextBtn) {
              setFeedbackIndexSelected(feedbackIndexSelected + 1);
            }
          };
          const handleGoPrevious = () => {
            if (!disablePreviousBtn) {
              setFeedbackIndexSelected(feedbackIndexSelected - 1);
            }
          };
          const starFieldName: any = `feedbacks.${feedbackIndexSelected}.star`;
          const fullNameFieldName = `feedbacks.${feedbackIndexSelected}.fullName`;
          const avatarFieldName = `feedbacks.${feedbackIndexSelected}.avatar`;
          const redirectUrlFieldName = `feedbacks.${feedbackIndexSelected}.redirectUrl`;
          const quoteFieldName = `feedbacks.${feedbackIndexSelected}.quote`;
          const descriptionFieldName = `feedbacks.${feedbackIndexSelected}.description`;
          return (
            <Form>
              <FieldArray name="feedbacks">
                {({ remove, push }) => (
                  <div>
                    <Grid container>
                      <Grid item xs={6}>
                        {typeof feedbackIndexSelected === "number" && (
                          <DropdownStyled
                            value={options[feedbackIndexSelected]}
                            options={options}
                            onChange={(selectedOption: any) => {
                              const newIndexSelected = options.findIndex(
                                (option) =>
                                  option.value === selectedOption.value
                              );
                              setFeedbackIndexSelected(newIndexSelected);
                            }}
                            getOptionLabel={(option: any) => option.label}
                            menuShouldScrollIntoView={false}
                            styles={{
                              menuPortal: (base: any) => ({
                                ...base,
                                zIndex: 9999,
                              }),
                            }}
                            menuPortalTarget={document.body}
                            getOptionValue={(option: any) => option.value}
                            className="mb-3"
                          />
                        )}
                      </Grid>
                      <Grid item xs={6} className="text-end">
                        <IconButton
                          onClick={() => handleDeleteSelectedFeedback(remove)}
                          disabled={typeof feedbackIndexSelected !== "number"}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => handleAddNew(push)}>
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          onClick={handleGoPrevious}
                          disabled={disablePreviousBtn}
                        >
                          <SkipPreviousIcon />
                        </IconButton>
                        <IconButton
                          onClick={handleGoNext}
                          disabled={disableNextBtn}
                        >
                          <SkipNextIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    {values.feedbacks.map((fb, fbIndex) => (
                      <div
                        key={fb.guid}
                        className={classNames(
                          fbIndex !== feedbackIndexSelected && "d-none"
                        )}
                      >
                        <TextInputStyled
                          label="Chấm điểm (Số nguyên, tối đa là 5)"
                          placeholder="Nhập điểm"
                          name={starFieldName}
                          value={get(values, starFieldName)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="number"
                          min="1"
                          max="5"
                        />
                        <TextInputStyled
                          label="Tên người bình luận"
                          placeholder="Nhập tên người bình luận"
                          name={fullNameFieldName}
                          value={get(values, fullNameFieldName)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextInputStyled
                          label="Avatar"
                          placeholder="Nhập url avatar"
                          name={avatarFieldName}
                          value={get(values, avatarFieldName)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextInputStyled
                          label="Url bình luận"
                          placeholder="Nhập url bình luận"
                          name={redirectUrlFieldName}
                          value={get(values, redirectUrlFieldName)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextInputStyled
                          label="Feedback"
                          placeholder="Nhập bình luận"
                          name={quoteFieldName}
                          value={get(values, quoteFieldName)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          multiline
                          rows={4}
                        />
                        <TextInputStyled
                          label="Mô tả"
                          placeholder="Nhập mô tả"
                          name={descriptionFieldName}
                          value={get(values, descriptionFieldName)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    ))}{" "}
                    {!values.feedbacks.length && "Chưa có bình luận nào"}
                  </div>
                )}
              </FieldArray>
              <button ref={submitBtn} type="submit" className="d-none"></button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default forwardRef<EditTagFormRef, Props>(EditFeedbackTagForm);
