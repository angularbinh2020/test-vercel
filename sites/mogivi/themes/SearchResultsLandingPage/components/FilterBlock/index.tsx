import React from "react";
import { FilterOption } from "sites/mogivi/layout/components/Filter/components/FilterOption";
import { FilterResults } from "sites/mogivi/layout/components/Filter/components/FilterResults";
import { ISearchModule } from "sites/mogivi/models/blocks/ISearchModule";
import styles from "./filter.module.scss";

interface FilterProps {
  block: ISearchModule;
}

const FilterBlock = (props: FilterProps) => {
  const servicesSearch = props.block.fields.servicesSearch;

  return (
    <div className={styles.filterContainer}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-4 col-xl-3">
            <FilterOption servicesSearch={servicesSearch} />
          </div>
          <div className="col-12 col-md-12 col-lg-8 col-xl-9">
            <FilterResults servicesSearch={servicesSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBlock;
