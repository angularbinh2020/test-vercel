import React from "react";
import { CarouselsTab } from "sites/mogivi/layout/components/CarouselsTab";
import { ICarouselsBlock } from "sites/mogivi/models/blocks/ICarouselsBlock";

interface ICarouselsBlockProps {
  block: ICarouselsBlock;
}

const CarouselsBlock = (props: ICarouselsBlockProps) => {
  return <CarouselsTab {...props} />;
};

export default CarouselsBlock;
