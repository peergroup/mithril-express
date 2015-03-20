/*jslint node: true */
"use strict";

var restful = require('node-restful');
var mongoose = restful.mongoose;
var PubSub = require('vanilla-pubsub');

var TodoSchema = require('../models/todo');

var Todo = restful.model('todo', TodoSchema)
    .methods(['get', 'post', 'put', 'delete']);

Todo.after('post', function(req, res, next) {
    PubSub.publish('data', {channel: 'Todo.posted', data: res.locals.bundle});
    next();
});

Todo.after('put', function(req, res, next) {
    PubSub.publish('data', {channel: 'Todo.updated', data: res.locals.bundle});
    next();
});

module.exports = Todo;
