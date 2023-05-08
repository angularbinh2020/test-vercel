export const convertDate = (date: string) => {
  const newDate = new Date(date);
  return String(newDate.toLocaleDateString());
};
