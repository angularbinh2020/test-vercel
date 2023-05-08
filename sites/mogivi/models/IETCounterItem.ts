export interface IETCounter {
  system: {
    contentType: "counter";
    id: string;
  };
  fields: {
    title: string;
    counter: string;
  };
}
