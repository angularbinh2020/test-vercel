import { useCallback, useId } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import BootstrapTooltip from "react-bootstrap/Tooltip";
import { Placement } from "react-bootstrap/esm/types";

interface Props {
  title: string;
  children: any;
  placement?: Placement;
}

const Tooltip = ({ title, children, placement }: Props) => {
  const tooltipId = useId();

  return (
    <OverlayTrigger
      placement={placement || "right"}
      overlay={
        <BootstrapTooltip id={`${tooltipId}-${title}`}>
          {title}
        </BootstrapTooltip>
      }
    >
      {children}
    </OverlayTrigger>
  );
};

export default Tooltip;
