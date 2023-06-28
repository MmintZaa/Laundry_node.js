var dayjs = require("dayjs");
const { format } = require("morgan");

validate = (date, format) => {
  return dayjs(date, format).format(format) === date;
};

date_format = (date, format = "DD/MM/YYYY HH:mm:ss") => {
  let tempDate = new Date(date);
  tempDate.setHours(tempDate.getHours() + 7);
  return dayjs(tempDate).format(format);
};

module.exports = {
  validate,
  date_format,
};
