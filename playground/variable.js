

// const moment = require('moment');
// let d = Date.now();
// console.log(d);
// let date = moment(d).format("MM-DD-YYYY");
//
// console.log(date);
//
// let da1 = moment(20180315,"YYYYMMDD").format("DD-MM-YYYY");
// let da2 = moment(20180316,"YYYYMMDD").format("DD-MM-YYYY");
//
//
// console.log(da1>da2);
//
//
// date = moment().format("DD-MM-YYYY");
// console.log(date);

const {User} = require('../server/models/user');
const {EventUser} = require('../server/models/event/eventuser');
const {ObjectID} = require('mongodb').ObjectID;


let isUser = async function (id,done) {
    return await User.findOne({_id: id});
};

let obj = new ObjectID('5aa50163a8053715877d190e');

isUser(obj).then((res,done) => {
    console.log(res);
    done();
}).catch((e) => {
    console.log(e);
    done(e);
});