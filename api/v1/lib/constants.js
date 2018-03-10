'use strict';

const DATE_FORMAT_FUNCTION = 'date_format'; // 'to_char'
const DATE_FORMAT_PARAMS = '%d-%b-%y %H:%i' // 'DD-Mon-YY HH24:MI';
const UPPER = 'upper';
const DEFAULT_PASSWORD = 'purchase+'
const errorMessage = [
  {
    key: "inUse",
    value: "'{name}' is already in use"
  }
]

const catchError = ((error, fld, res) => {
  if (error.name === "SequelizeUniqueConstraintError") {
    res.json({ error: true, message: findMessage("inUse").replace('{name}', fld) });
  } else {
    res.status(400).send(error);
  }
})
const activeValue = 1
const inActiveValue = 11

const findMessage = ((key) => {
  const result = errorMessage.find(item => {
    return item.key === key
  })
  return result.value
})

const formatName = ((name) => {
  return name.toUpperCase()
  // return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
})

module.exports = {
  DATE_FORMAT_FUNCTION,
  DATE_FORMAT_PARAMS,
  findMessage,
  formatName,
  UPPER,
  DEFAULT_PASSWORD,
  activeValue,
  inActiveValue,
  catchError
}
