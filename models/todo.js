/*jslint node: true */
"use strict";

var
    restful = require('node-restful'),
    mongoose = restful.mongoose,
    Schema = mongoose.Schema;

module.exports = mongoose.Schema({
    name: String
});