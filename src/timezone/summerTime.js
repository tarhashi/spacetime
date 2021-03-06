'use strict'
const zeroPad = require('../fns').zeroPad;

const toString = function(d) {
  return zeroPad((d.getMonth() + 1)) + '/' + zeroPad(d.getDate()) + ':' + zeroPad(d.getHours())
};

// a timezone will begin with a specific offset in january
// then some will switch to something else between november-march
const shouldChange = (s, m) => {
  if (m.hasDst !== true || !m.change.start || !m.change.back) {
    return false
  }
  //note: this has a order-of-operations issue
  //we can't get the date, without knowing the timezone, and vice-versa
  //it's possible that we can miss a dst-change by a few hours.
  let d = new Date(s.epoch);
  let current = toString(d);
  //eg. is it after ~november?
  if (current >= m.change.start) {
    //eg. is it before ~march~ too?
    if (current < m.change.back) {
      return true
    }
  }
  return false
}
module.exports = shouldChange
