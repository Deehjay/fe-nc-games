import dateFormat from "dateformat";

export const formatDate = (date) => {
  if (date) {
    return dateFormat(date, "dddd, mmmm dS, yyyy");
  }
};

export const formatCategory = (category_slug) => {
  const categoryReplacedHyphens = category_slug.replaceAll("-", " ");
  return (
    categoryReplacedHyphens.charAt(0).toUpperCase() +
    categoryReplacedHyphens.slice(1)
  );
};
