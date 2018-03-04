'use strict';

const DATE_FORMAT_FUNCTION = 'to_char';
const DATE_FORMAT_PARAMS = 'DD-Mon-YY HH24:MI';
const UPPER = 'upper';

const errorMessage = [
  {
    key: "inUse",
    value: "Name '{name}' is already in use and cannot be used again"
  }
]

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
  UPPER
}
