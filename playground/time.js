const moment = require('moment');

// Jan 1st 1970 00:00:00 a.m.

// let date = moment();
// console.log(date.format('MMM Do, YYYY'));

let createdAt = new Date().getTime();
let date = moment(createdAt);
console.log(date.format('h:mm a'));