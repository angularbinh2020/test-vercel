import { components, OptionProps } from "react-select";
import { IHotSpotIcon } from "models/IHotSpotIcon";
import FormLabel from "@material-ui/core/FormLabel";
import DropdownStyled from "sites/mogivi/themes/MogiversePage/components/VRTour/components/DropdownStyled";
import styles from "./styles.module.scss";

const Option = (props: OptionProps<IHotSpotIcon>) => {
  return (
    <components.Option {...props}>
      <img
        src={props.data.file.logoUrl}
        className={styles.iconPreview}
        alt={props.data.name}
      />
      {props.data.name}
    </components.Option>
  );
};

interface Props {
  hotSpotIcons: IHotSpotIcon[];
  hotSpotIconSelected: IHotSpotIcon;
  handleChangeHotSpotIcon: any;
}

const SelectHotSpotIcon = ({
  hotSpotIcons,
  hotSpotIconSelected,
  handleChangeHotSpotIcon,
}: Props) => {
  return (
    <>
      <FormLabel className="mt-3 mb-2">Tour HotSpot Icon</FormLabel>
      <DropdownStyled
        placeholder="Chọn icon hot spot cho tour"
        value={hotSpotIconSelected}
        options={hotSpotIcons}
        onChange={handleChangeHotSpotIcon}
        getOptionLabel={(option: IHotSpotIcon) => option.name}
        menuShouldScrollIntoView={false}
        styles={{
          menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
        }}
        menuPortalTarget={document.body}
        getOptionValue={(option: IHotSpotIcon) => option.nodeId}
        className="mb-3"
        components={{ Option: Option }}
      />
    </>
  );
};
export default SelectHotSpotIcon;
