import classNames from "classnames";
import React, { useCallback, useEffect, useId, useMemo, useState } from "react";
import SvgIcon from "sites/mogivi/components/SvgIcon";
import { IETValuesFilterTagsItem } from "sites/mogivi/models/IETFilterTags";
import { ITagItem } from "sites/mogivi/models/ITagItem";
import styles from "./styles.module.scss";

interface FilterOptionProps {
  filterItem: IETValuesFilterTagsItem;
  results?: any;
  handleChangeFilterOptions?: any;
}

const FilterOption = (props: FilterOptionProps) => {
  const { filterItem, handleChangeFilterOptions } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterTitle, setFilterTitle] = useState<string>(
    filterItem.fields.title
  );
  const options = filterItem?.fields.options;
  const filterOptionId = useId();

  const closeAllOpenFilterOptions = useCallback(() => {
    const filterOptionElement = document.querySelectorAll(
      '[data-filter-option-id][data-is-open="true"]'
    );
    filterOptionElement.forEach((element: any) => {
      const isNotCurrentOption =
        element.getAttribute("data-filter-option-id") !== filterOptionId;
      if (isNotCurrentOption) {
        element.click();
      }
    });
  }, []);

  const openDropdownHandler = useCallback(
    (e: any) => {
      const isSetOpen = !isOpen;
      if (isSetOpen) {
        closeAllOpenFilterOptions();
      }
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(isSetOpen);
    },
    [closeAllOpenFilterOptions, isOpen]
  );

  const bodyTrigger = () => {
    setIsOpen(false);
  };

  const onChangeOption = useCallback(
    (optionSelected: ITagItem) => {
      if (optionSelected.system.name !== filterTitle) {
        setFilterTitle(optionSelected.system.name);
        const newOptions = { ...filterItem };
        newOptions.filterOptions = optionSelected;
        handleChangeFilterOptions(newOptions);
      }
    },
    [filterItem, filterTitle, handleChangeFilterOptions]
  );

  useEffect(() => {
    document.body.addEventListener("click", bodyTrigger);

    return () => {
      document.body.removeEventListener("click", bodyTrigger);
    };
  }, []);

  return (
    <div className={styles.filterMenu}>
      <div
        className={styles.dropdownList}
        onClick={(e) => openDropdownHandler(e)}
        data-filter-option-id={filterOptionId}
        data-is-open={isOpen}
      >
        <span>{filterTitle}</span>
        <span>
          <SvgIcon icon={isOpen ? "chervonUp" : "chervonDown"} />
        </span>
      </div>
      {isOpen && (
        <ul className={classNames(styles.filterMenuList, "scrollbar")}>
          {options?.map((option, idx) => (
            <li key={idx} onClick={() => onChangeOption(option)}>
              <div className={styles.filterItem}>
                <span>{option.system.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterOption;
