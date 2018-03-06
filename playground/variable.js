

const moment = require('moment');
let d = Date.now();
console.log(d);
let date = moment(d).format("MM-DD-YYYY");

console.log(date);

let da1 = moment(20180315,"YYYYMMDD").format("DD-MM-YYYY");
let da2 = moment(20180316,"YYYYMMDD").format("DD-MM-YYYY");


console.log(da1>da2);


date = moment().format("DD-MM-YYYY");
console.log(date);
