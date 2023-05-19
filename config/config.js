global.express = require('express')
global.bodyParser = require('body-parser')
global.GLOBAL_VALUE = process.env;
// global.jwt = require('jsonwebtoken');
global.cors = require('cors');
global.mongoose = require('mongoose');
global.Schema = mongoose.Schema
global.path = require('path');
global.jwt = require('jsonwebtoken');
global.jwt_decode = require('jwt-decode');
global.jwt_encode = require('jwt-encode');
global.uuid = require('uuid').v4;
global.fs = require('fs');
global.fsPromises = fs.promises;
global.excel = require('excel4node');
global.moment = require('moment');


global.axios = require('axios').default;


if (GLOBAL_VALUE.NODE_ENV == 'production') {
    global.envprofile = 'production'
    require('dotenv').config({
        path: '.env'
    })
} else if (GLOBAL_VALUE.NODE_ENV == 'poc') {
    global.envprofile = 'production'
    require('dotenv').config({
        path: 'poc.env'
    })
} else {
    global.envprofile = ''
    require('dotenv').config({
        path: '.env'
    })
}
// const mongo_url = 'mongodb://'  + GLOBAL_VALUE.MG_HOST + ':' + GLOBAL_VALUE.MG_PORT + '/' + GLOBAL_VALUE.MG_NAME

const mongo_url = GLOBAL_VALUE.MG_CONNECT
// console.log(mongo_url)

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}).then(() => {
    console.log("[success] task 2 connected to the mongo database ")
}).catch((error) => {
    console.log("[failed] task 2 " + error);
    process.exit();
})
