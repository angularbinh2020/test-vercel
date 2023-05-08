import { useState, useCallback } from "react";

type setFalse = () => void;
type setTrue = () => void;

const useBoolean = (
  defaultValue: boolean = false
): [boolean, setFalse, setTrue] => {
  const [isTrue, setIsTrue] = useState(defaultValue ?? false);
  const setFalse = useCallback(() => {
    setIsTrue(false);
  }, []);
  const setTrue = useCallback(() => {
    setIsTrue(true);
  }, []);
  return [isTrue, setFalse, setTrue];
};

export default useBoolean;
