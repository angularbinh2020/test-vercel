import React from "react";
import styles from "./styles.module.scss";
import { ICounter } from "sites/mogivi/models/blocks/ICounter";

export interface IStatisticsModel {
  block: ICounter;
}

const StatisticsBlock = (props: IStatisticsModel) => {
  const { items } = props.block.fields;
  return (
    <div className={styles.statContainer}>
      <div className="container">
        <div className="row justify-content-center gap-4 flex-wrap">
          {items &&
            items.map((counterItem, idx) => {
              const { counter, title } = counterItem.fields;
              return (
                <div key={idx} className="col-lg-3">
                  <div className={styles.statItem}>
                    {counter && <h1>{counter}</h1>}
                    {title && <span>{title}</span>}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default StatisticsBlock;
