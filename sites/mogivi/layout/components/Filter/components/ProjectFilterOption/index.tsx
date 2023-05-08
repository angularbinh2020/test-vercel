import classNames from "classnames";
import React, { useId } from "react";
import { Form } from "react-bootstrap";
import Search from "sites/mogivi/components/SvgIcon/components/Search";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import styles from "./styles.module.scss";
import { ETFilterTagsItem } from "sites/mogivi/models/ETFilterTagsItem";

interface BuyFilterProps {
  data: IETSearchService;
}

export const ProjectFilterOption = (props: BuyFilterProps) => {
  const { apiSearchSettings, filtersOptions, itemTitle } = props.data.fields;
  const filterTagItems: ETFilterTagsItem[] = filtersOptions;
  const filterOptions = filterTagItems.slice(1) || [];
  const uuid = useId();
  // const productsType = buyFilterOptions[0].fields;
  // const handoverYear = buyFilterOptions[1].fields;
  // const statusType = buyFilterOptions[2].fields;

  return (
    <>
      {/* <div className="position-relative">
        <Form.Group>
          <Form.Control type="text" placeholder={itemTitle} className={styles.searchInput} />
        </Form.Group>
        <Search className={styles.searchIcon} />
      </div> */}

      {filterOptions &&
        filterOptions.map((item, i) => {
          const serviceType =
            item.fields?.selectControlType.toLowerCase() === "checkbox"
              ? "checkbox"
              : "radio";
          const className =
            item.fields?.selectControlType.toLowerCase() === "checkbox"
              ? styles.checkBox
              : styles.select;
          if (item.fields?.filterOptions) {
            return (
              <div key={i} className={classNames(styles.row)}>
                <div className={styles.label}>{item.fields.title}</div>
                <div className={styles.rowControl}>
                  <Form.Group className={styles.control}>
                    {item.fields?.filterOptions.map((filterOption, i) => (
                      <Form.Check
                        key={i}
                        type={serviceType}
                        name={item.fields?.parameterNameAPI}
                        id={`${uuid}-${filterOption.id}-${i}`}
                        label={filterOption.contentName}
                        className={className}
                      />
                    ))}
                  </Form.Group>
                </div>
              </div>
            );
          } else if (item.fields?.options) {
            return (
              <div key={i} className={classNames(styles.row)}>
                <div className={styles.label}>{item.fields.title}</div>
                <div className={styles.rowControl}>
                  <Form.Group className={styles.control}>
                    {item.fields?.options.map((filterOption, i) => (
                      <Form.Check
                        key={i}
                        type={serviceType}
                        name={item.fields?.parameterNameAPI}
                        id={`${uuid}-${filterOption.fields.key}`}
                        label={filterOption.fields.value}
                        className={className}
                      />
                    ))}
                  </Form.Group>
                </div>
              </div>
            );
          }
        })}

      {/* {productsType && (
        <div className={classNames(styles.row)}>
          <div className={styles.label}>Chọn loại hình</div>
          <div className={styles.rowControl}>
            <Form.Group className={styles.control}>
              {productsType.filterOptions.map((productItem, i) => (
                <Form.Check
                  key={i}
                  type="checkbox"
                  name={productsType.parameterNameAPI}
                  id={`${productsType.parameterNameAPI}-${i}`}
                  label={productItem.contentName}
                  className={styles.checkBox}
                />
              ))}
            </Form.Group>
          </div>
        </div>
      )}
      {handoverYear && handoverYear.options && (
        <div className={classNames(styles.row)}>
          <div className={styles.label}>Chọn giá</div>
          <div className={styles.radioBtnGroup}>
            <Form.Group className={styles.control}>
              {handoverYear.options.map((handoverYearItem, i) => (
                <Form.Check
                  key={i}
                  type="radio"
                  name={handoverYear.parameterNameAPI}
                  label={handoverYearItem.fields.value}
                  id={handoverYearItem.fields.key}
                  className={styles.select}
                />
              ))}
            </Form.Group>
          </div>
        </div>
      )}
      {statusType && statusType.options && (
        <div className={classNames(styles.row)}>
          <div className={styles.label}>Chọn diện tích</div>
          <div className={styles.radioBtnGroup}>
            <Form.Group className={styles.control}>
              {statusType.options.map((statusItem, i) => (
                <Form.Check
                  key={i}
                  type="radio"
                  name={statusType.parameterNameAPI}
                  label={statusItem.fields.value}
                  id={statusItem.fields.key}
                  className={styles.select}
                />
              ))}
            </Form.Group>
          </div>
        </div>
      )} */}

      <div className={styles.advanceFilterFooter}>
        <button className={classNames("btn-outline", styles.buttonReset)}>
          Đặt lại
        </button>
        <button className={classNames("btn-orange", styles.buttonApply)}>
          Áp dụng
        </button>
      </div>
    </>
  );
};
