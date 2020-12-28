function containsAny(str, substrings) {
  if (substrings !== undefined) {
    for (var i = 0; i !== substrings.length; i++) {
      var substring = substrings[i];
      if (str.indexOf(substring) !== -1) {
        return true;
      }
    }
    return false;
  }

  return true;
}

function countChars(str) {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i].match(/[a-z]/i)) {
      count += 1;
    }
  }

  return count;
}

export default {
  containsAny,
  countChars,
};