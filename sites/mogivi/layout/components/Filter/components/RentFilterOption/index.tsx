import classNames from "classnames";
import Image from "next/image";
import React, { useEffect, useId } from "react";
import { Form } from "react-bootstrap";
import ButtonCustom, {
  ISizeTypes,
  IColorTypes,
} from "sites/mogivi/components/ButtonCustom";
import Search from "sites/mogivi/components/SvgIcon/components/Search";
import { IETSearchService } from "sites/mogivi/models/blocks/ISearchModule";
import { TABS_SEARCH } from "../FilterOption";
import icDiff from "sites/mogivi/assets/icons/ic-diff.png";
import styles from "./styles.module.scss";
import { ETFilterTagsItem } from "sites/mogivi/models/ETFilterTagsItem";

interface BuyFilterProps {
  data: IETSearchService;
}

export const RentFilterOption = (props: BuyFilterProps) => {
  const { apiSearchSettings, filtersOptions, itemTitle } = props.data.fields;
  const filterTagItems: ETFilterTagsItem[] = filtersOptions;
  const filterOptions = filterTagItems.slice(1) || [];
  // const productsType = buyFilterOptions[0].fields;
  // const priceRange = buyFilterOptions[1].fields;
  // const areaRange = buyFilterOptions[2].fields;
  // const bedRoom = buyFilterOptions[3].fields;
  // const bathRoom = buyFilterOptions[4].fields;
  // const direction = buyFilterOptions[5].fields;
  const uuid = useId();

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
                  id={`${uuid}-${productItem.id}-${i}`}
                  label={productItem.contentName}
                  className={styles.checkBox}
                />
              ))}
            </Form.Group>
          </div>
        </div>
      )}

      {priceRange && (
        <div className={classNames(styles.row)}>
          <div className={styles.label}>Chọn giá</div>
          <div className={styles.radioBtnGroup}>
            <Form.Group className={styles.control}>
              {priceRange.options.map((priceItem, i) => (
                <Form.Check
                  key={i}
                  type="radio"
                  name={priceRange.parameterNameAPI}
                  label={priceItem.fields.value}
                  id={`${uuid}-${priceItem.fields.key}`}
                  className={styles.select}
                />
              ))}
            </Form.Group>
          </div>
        </div>
      )}

      {areaRange && (
        <div className={classNames(styles.row)}>
          <div className={styles.label}>Chọn diện tích</div>
          <div className={styles.radioBtnGroup}>
            <Form.Group className={styles.control}>
              {areaRange.options.map((areaItem, i) => (
                <Form.Check
                  key={i}
                  type="radio"
                  name={areaRange.parameterNameAPI}
                  label={areaItem.fields.value}
                  id={`${uuid}-${areaItem.fields.key}`}
                  className={styles.select}
                />
              ))}
            </Form.Group>
          </div>
        </div>
      )}

      {bedRoom && bedRoom?.options && (
        <div className={classNames(styles.row)}>
          <div className={styles.label}>Chọn phòng ngủ</div>
          <div className={styles.radioBtnGroup}>
            <Form.Group className={styles.control}>
              {bedRoom?.options?.map((bedRoomItem, i) => (
                <Form.Check
                  key={i}
                  type="checkbox"
                  name={areaRange.parameterNameAPI}
                  label={bedRoomItem.fields.value}
                  id={`${uuid}-${bedRoomItem.fields.key}`}
                  className={styles.select}
                />
              ))}
            </Form.Group>
          </div>
        </div>
      )}

      {bathRoom && bathRoom?.options && (
        <div className={classNames(styles.row)}>
          <div className={styles.label}>Chọn phòng ngủ</div>
          <div className={styles.radioBtnGroup}>
            <Form.Group className={styles.control}>
              {bathRoom?.options?.map((bathRoomItem, i) => (
                <Form.Check
                  key={i}
                  type="radio"
                  name={areaRange.parameterNameAPI}
                  label={bathRoomItem.fields.value}
                  id={bathRoomItem.fields.key}
                  className={styles.select}
                />
              ))}
            </Form.Group>
          </div>
        </div>
      )}

      {direction && direction?.options && (
        <div className={classNames(styles.row)}>
          <div className={styles.label}>Chọn phòng ngủ</div>
          <div className={styles.radioBtnGroup}>
            <Form.Group className={styles.control}>
              {direction?.options?.map((directionItem, i) => (
                <Form.Check
                  key={i}
                  type="checkbox"
                  name={areaRange.parameterNameAPI}
                  label={directionItem.fields.value}
                  id={directionItem.fields.key}
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
