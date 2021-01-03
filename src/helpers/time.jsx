function listTimes(interval = 15) {
    
  var times = []; // time array
  var tt = 0; // start time
  var ap = ["AM", "PM"]; // AM-PM

  for (var i = 0; tt < 24 * 60; i++) {
    var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
    var mm = tt % 60; // getting minutes of the hour in 0-55 format
    times[i] =
      ("0" + (hh % 12)).slice(-2) +
      ":" +
      ("0" + mm).slice(-2) + " " +
      ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
    tt = tt + interval;
  }
  
  return times;
}

export default {
  listTimes,
};