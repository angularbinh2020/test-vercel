export enum TAB_VALUES {
  BuyHouse = "mua-ban",
  RentHouse = "cho-thue",
  Project = "du-an",
}

export const TABS_SEARCH = [
  {
    label: "Mua bán",
    value: TAB_VALUES.BuyHouse,
    url: "mua-ban",
    icon: "home",
    eventKey: "first",
  },
  {
    label: "Cho thuê",
    value: TAB_VALUES.RentHouse,
    url: "cho-thue",
    icon: "building",
    eventKey: "second",
  },
  {
    label: "Dự án",
    value: TAB_VALUES.Project,
    url: "du-an",
    icon: "city",
    eventKey: "third",
  },
];
