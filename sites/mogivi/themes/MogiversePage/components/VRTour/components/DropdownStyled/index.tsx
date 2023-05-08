import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

const DropdownStyled = (props: any) => {
  return <Select isSearchable={true} isClearable={false} {...props} />;
};

DropdownStyled.propTypes = {
  defaultValue: PropTypes.any,
  isClearable: PropTypes.any,
  options: PropTypes.any,
  onChange: PropTypes.any,
  value: PropTypes.any,
  placeholder: PropTypes.any,
  getOptionLabel: PropTypes.any,
  menuPortalTarget: PropTypes.any,
  menuPosition: PropTypes.any,
  menuShouldScrollIntoView: PropTypes.any,
  styles: PropTypes.any,
  getOptionValue: PropTypes.any,
  className: PropTypes.string,
  components: PropTypes.any,
};

export default DropdownStyled;
