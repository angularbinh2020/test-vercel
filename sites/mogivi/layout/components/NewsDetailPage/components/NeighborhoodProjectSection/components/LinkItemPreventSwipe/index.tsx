import LinkItem from "components/LinkItem";
import { useRef, useCallback } from "react";
const LinkItemPreventSwipe = (props: any) => {
  const canClickRef = useRef(true);
  const isMousePressingClickRef = useRef(false);
  const handleMouseDown = useCallback(() => {
    isMousePressingClickRef.current = true;
  }, []);
  const handleMouseMove = useCallback(() => {
    if (isMousePressingClickRef.current) canClickRef.current = false;
  }, []);
  const handleClick = useCallback((e: Event) => {
    if (!canClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
    isMousePressingClickRef.current = false;
    canClickRef.current = true;
  }, []);
  return (
    <LinkItem
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      {...props}
    />
  );
};

export default LinkItemPreventSwipe;
