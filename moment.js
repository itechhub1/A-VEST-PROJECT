const moment = require("moment")

/* const today = moment()

const future = moment("Mon Aug 16 2021 15:30:01 GMT+0100","DD-MM-YYYY")
console.log(future.diff(today)); */

var a = moment(new Date());//now
var b = moment(new Date("Mon Mar 16 2021 15:30:01 GMT+0100"));


console.log(b.diff(a, 'days')) // 31
