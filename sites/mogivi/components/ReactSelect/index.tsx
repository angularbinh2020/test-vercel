import React from "react";
import { AsyncPaginate, wrapMenuList } from "react-select-async-paginate";
import { components, MenuPlacement, MenuPosition } from "react-select";
import { defaultAdditional, loadOptions } from "./utils";

interface ReactSelectProps {
  //--- Settings loading
  isLoading?: boolean;
  loadingWidth?: number;
  loadingHeight?: number;
  //--- Title field
  title?: string;
  titleClassName?: any;
  //--- Option control
  fieldName?: string;
  className?: any;
  options?: any;
  value?: any;
  onChange?: any;
  customDropdown?: any;
  titleDropdown?: string;
  actionDropdown?: Function;
  optionsPerPage?: number;
  //--- Validate field
  isValidationFailed?: boolean;
  errors?: any;
  clearErrors?: any;
  inputRef?: any;
  defaultMenuIsOpen?: boolean;
  placeholder?: string;
  maxMenuHeight?: number;
  getOptionLabel?: any;
  getOptionValue?: any;
  isClearable?: boolean;
  Clearable?: boolean;
  defaultValue?: any;
  isDisabled?: boolean;
  onInputChange?: any;
  getOptions?: (
    searchText: string,
    page: number,
    optionsPerPage: number
  ) => Promise<{ options: any[]; hasMore: boolean }>;
  isMulti?: boolean;
  filterOption?: any;
  keyCache?: string;
  inputValue?: string;
  showIcon?: boolean;
  menuPosition?: MenuPosition;
  menuPlacement?: MenuPlacement;
  menuPortalTarget?: HTMLElement | null;
  clearValue?: any;
  menuShouldScrollIntoView?: boolean;
  menuShouldBlockScroll?: boolean;
  closeMenuOnScroll?: any;
  onBlur?: any;
  closeMenuOnSelect?: boolean;
  blurInputOnSelect?: boolean;
  autoFocus?: boolean;
  backspaceRemovesValue?: boolean;
  noOptionsMessage?: any;
  classNamePrefix?: string;
  CustomMenu?: (props: any) => JSX.Element;
}

const ReactSelect: React.FC<ReactSelectProps> = (props) => {
  const {
    //--- Settings loading
    isLoading,
    loadingWidth,
    loadingHeight,
    //--- Title field
    title,
    titleClassName,
    //--- Option control
    fieldName,
    className,
    options,
    value,
    onChange,
    customDropdown,
    titleDropdown,
    actionDropdown,
    optionsPerPage,
    //--- Validate field
    isValidationFailed,
    errors,
    clearErrors,
    inputRef,
    getOptions,
    keyCache,
    showIcon,
    clearValue,
    CustomMenu,
    ...rest
  } = props;
  const KEY = `react_select_${fieldName || ""}_${
    (value && value.value) || ""
  }_${keyCache || ""}`;
  const CACHE_OPTION =
    (value && [value.value]) || (keyCache && [keyCache]) || [];
  const _options = options;

  const _loadPageOptions = async (q: any, prevOptions: any, page: any) => {
    const { options, hasMore } = await (getOptions
      ? getOptions(q, page.page, optionsPerPage || 10)
      : loadOptions(q, page.page, _options, optionsPerPage));

    return {
      options,
      hasMore,
      additional: {
        page: page.page + 1,
      },
    };
  };

  const CustomMenuList = (props: any) => {
    return (
      <>
        <components.MenuList {...props}>{props.children}</components.MenuList>
      </>
    );
  };

  const MenuList: any = wrapMenuList(CustomMenu || CustomMenuList);

  return (
    <>
      <AsyncPaginate
        debounceTimeout={500}
        key={KEY}
        value={value}
        onChange={onChange}
        cacheUniqs={CACHE_OPTION}
        additional={defaultAdditional}
        loadOptions={_loadPageOptions}
        components={{ MenuList }}
        className={className}
        menuShouldBlockScroll
        {...rest}
      />
    </>
  );
};

ReactSelect.defaultProps = {
  //--- Settings loading
  isLoading: false,
  loadingWidth: 100,
  loadingHeight: 11,
  //--- Title field
  title: "",
  //--- Option control
  fieldName: `${new Date().getTime()}`,
  options: [],
  value: undefined,
  onChange: () => {},
  customDropdown: undefined,
  titleDropdown: "",
  actionDropdown: () => {},
  optionsPerPage: 10,
  //--- Validate field
  isValidationFailed: false,
  errors: undefined,
  clearErrors: () => {},
  inputRef: undefined,
  menuPosition: "absolute",
  menuPlacement: "auto",
  menuPortalTarget: null,
  noOptionsMessage: () => <>Không có lựa chọn nào</>,
  classNamePrefix: "react-select",
};

export default ReactSelect;
