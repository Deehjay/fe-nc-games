import dateFormat from "dateformat";

export const formatDate = (date) => {
  if (date) {
    return dateFormat(date, "dddd, mmmm dS, yyyy");
  }
};
