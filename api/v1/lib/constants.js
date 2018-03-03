'use strict';

const DATE_FORMAT_FUNCTION = 'to_char';
const DATE_FORMAT_PARAMS = 'DD-MM-YYYY';
const errorMessage = [
  {
    key: "inUse",
    value: "User name '{user_name}' is already in use and cannot be used again"
  }
]

const findMessage = ((key) => {
  const result = errorMessage.find(item => {
    return item.key === key
  })
  return result.value
})

module.exports = {
  DATE_FORMAT_FUNCTION,
  DATE_FORMAT_PARAMS,
  findMessage
}
