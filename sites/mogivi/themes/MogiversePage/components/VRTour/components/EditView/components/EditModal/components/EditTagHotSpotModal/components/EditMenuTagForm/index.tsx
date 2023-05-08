import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import { EditTagFormRef } from "../..";
import TextInputStyled from "sites/mogivi/themes/MogiversePage/components/VRTour/components/TextInputStyled";
import { Formik, Form, FieldArray } from "formik";
import DropdownStyled from "sites/mogivi/themes/MogiversePage/components/VRTour/components/DropdownStyled";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { ITagMenuHotspot } from "sites/mogivi/models/ITagMenuHotspot";
import get from "lodash/get";

interface Props {
  defaultValues: ITagMenuHotspot;
  onSave: any;
  onClose: any;
}

const EditMenuTagForm = ({ defaultValues, onSave }: Props, ref: any) => {
  const [optionIndexSelected, setOptionIndexSelected] = useState<any>(
    defaultValues.menus?.length ? 0 : undefined
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
          menus: defaultValues.menus,
        }}
        onSubmit={(values) => {
          onSave(values);
        }}
      >
        {({ values, handleChange, handleBlur }) => {
          const options = values.menus.map((fb, fbIndex) => ({
            value: fb.id,
            label: `Item ${fb.id}`,
          }));
          const handleDeleteSelectedFeedback = (remove: any) => {
            remove(optionIndexSelected);
            setOptionIndexSelected(0);
          };
          const handleAddNew = (push: any) => {
            let newId = 0;
            values.menus.forEach((fb) => {
              if (fb.id >= newId) {
                newId = fb.id + 1;
              }
            });
            const newFeedback = {
              imageUrl: "",
              title: "",
              price: 0,
              id: newId,
              guid: uuidv4(),
              redirectUrl: "",
            };

            push(newFeedback);
            setOptionIndexSelected(options.length);
          };
          const disableNextBtn = optionIndexSelected === options.length - 1;
          const disablePreviousBtn = !Boolean(optionIndexSelected);
          const handleGoNext = () => {
            if (!disableNextBtn) {
              setOptionIndexSelected(optionIndexSelected + 1);
            }
          };
          const handleGoPrevious = () => {
            if (!disablePreviousBtn) {
              setOptionIndexSelected(optionIndexSelected - 1);
            }
          };
          const priceFieldName: any = `menus.${optionIndexSelected}.price`;
          const titleFieldName = `menus.${optionIndexSelected}.title`;
          const imageUrlFieldName = `menus.${optionIndexSelected}.imageUrl`;
          const redirectUrlFieldName = `menus.${optionIndexSelected}.redirectUrl`;
          const quoteFieldName = `menus.${optionIndexSelected}.quote`;
          const descriptionFieldName = `menus.${optionIndexSelected}.description`;
          return (
            <Form>
              <FieldArray name="menus">
                {({ remove, push }) => (
                  <div>
                    <Grid container>
                      <Grid item xs={6}>
                        {typeof optionIndexSelected === "number" && (
                          <DropdownStyled
                            value={options[optionIndexSelected]}
                            options={options}
                            onChange={(selectedOption: any) => {
                              const newIndexSelected = options.findIndex(
                                (option) =>
                                  option.value === selectedOption.value
                              );
                              setOptionIndexSelected(newIndexSelected);
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
                          disabled={typeof optionIndexSelected !== "number"}
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
                    {values.menus.map((fb, fbIndex) => (
                      <div
                        key={fb.guid}
                        className={classNames(
                          fbIndex !== optionIndexSelected && "d-none"
                        )}
                      >
                        <TextInputStyled
                          label="Giá"
                          placeholder="Nhập giá"
                          name={priceFieldName}
                          value={get(values, priceFieldName)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="number"
                          min="0"
                        />
                        <TextInputStyled
                          label="Tiêu đề"
                          placeholder="Nhập tên tiêu đề"
                          name={titleFieldName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={get(values, titleFieldName)}
                        />
                        <TextInputStyled
                          label="Ảnh minh họa"
                          placeholder="Nhập url ảnh minh họa"
                          name={imageUrlFieldName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={get(values, imageUrlFieldName)}
                        />
                        <TextInputStyled
                          label="Url điều hướng"
                          placeholder="Nhập url điều hướng"
                          name={redirectUrlFieldName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={get(values, redirectUrlFieldName)}
                        />
                      </div>
                    ))}{" "}
                    {!values.menus.length && "Chưa có dữ liệu"}
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

export default forwardRef<EditTagFormRef, Props>(EditMenuTagForm);
