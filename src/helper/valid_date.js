var dayjs = require("dayjs");
const { format } = require("morgan");

validate = (date, format) => {
  return dayjs(date, format).format(format) === date;
};

dates_format = (date, format = "DD/MM/YYYY HH:mm:ss") => {
  let tempDate = new Date(date);
  tempDate.setHours(tempDate.getHours() + 7);
  return dayjs(tempDate).format(format);
};

date_format = (date, format = "DD/MM/YYYY") => {
  let tempDate = new Date(date);
  tempDate.setHours(tempDate.getHours() + 7);
  return dayjs(tempDate).format(format);
};

module.exports = {
  validate,
  date_format,
  dates_format,
};
