
import m from 'mithril';
import _ from 'lodash';
import PubSub from 'vanilla-pubsub';

import todosIndex from './todos/index';
//import todoEdit from './todos/edit';

m.route.mode = "pathname";

m.route(document.body, "/", {
    "/": todosIndex,
    "/todos": todosIndex
    //"/todos/:todoID": todoEdit
});

window.socket = io.connect('http://localhost:4223');
socket.on('data', function (data) {
    PubSub.publish(data.channel, data.data);
});
socket.on('message', function (data) {
    console.log(data);
});
