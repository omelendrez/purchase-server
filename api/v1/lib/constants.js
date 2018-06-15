"use strict";

const DATE_FORMAT_FUNCTION = "date_format"; // 'date_format'; // 'to_char'
const DATE_FORMAT_PARAMS = "%d-%b-%y %H:%i"; // '%d-%b-%y %H:%i' // 'DD-Mon-YY HH24:MI';
const SHORT_DATE_FORMAT_PARAMS = "%d-%b-%y"; // '%d-%b-%y' // 'DD-Mon-YY';
const DEFAULT_DATE_FORMAT_PARAMS = "%Y-%m-%d"; // '%Y-%m-%d';
const UPPER = "upper";
const DEFAULT_PASSWORD = "purchase+";
const errorMessage = [
  {
    key: "inUse",
    value: "'{name}' is already in use"
  }
];

const catchError = (error, fld, res) => {
  if (error.name === "SequelizeUniqueConstraintError") {
    res.json({
      error: true,
      message: findMessage("inUse").replace("{name}", fld)
    });
  } else {
    res.status(400).send(error);
  }
};
const activeValue = 1;
const inActiveValue = 2;

const getNextNumber = (type, model, organization_id) => {
  return `select concat('${type}',trim(to_char(cast(max(replace(number, '${type}', '')) as int)+1, '000000'))) as number from ${model} where left(number,3) = '${type}' and organization_id=${organization_id}`;
};

const findMessage = key => {
  const result = errorMessage.find(item => {
    return item.key === key;
  });
  return result.value;
};

const formatName = name => {
  return name.toUpperCase();
  // return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
};

module.exports = {
  DATE_FORMAT_FUNCTION,
  DATE_FORMAT_PARAMS,
  SHORT_DATE_FORMAT_PARAMS,
  DEFAULT_DATE_FORMAT_PARAMS,
  findMessage,
  formatName,
  UPPER,
  DEFAULT_PASSWORD,
  activeValue,
  inActiveValue,
  catchError,
  getNextNumber
};
