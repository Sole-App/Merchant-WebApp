function getValue(jwtDecoded, text) {
  let result = "";

  Object.entries(jwtDecoded).forEach(function (value, key) {
    if (value.length === 2 && value[0].includes(text)) {
      result = value[1];
    }
  });

  return result;
}

export default {
  getValue,
};