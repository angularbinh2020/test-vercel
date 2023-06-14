import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useId } from "react";
import { Placement } from "react-bootstrap/esm/types";
interface Props {
  title: string;
  children: any;
  placement?: Placement;
}
const BootstrapTooltip = ({ children, title, placement }: Props) => {
  const id = useId();
  return (
    <OverlayTrigger
      placement={placement ?? "top"}
      overlay={<Tooltip id={id}>{title}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};

export default BootstrapTooltip;
