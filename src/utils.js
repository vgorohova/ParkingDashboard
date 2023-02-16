import moment from "moment";

const getDateFromString = (dateString) => {
  const date = moment(dateString);

  return date.format("LLLL");
};

export { getDateFromString };
