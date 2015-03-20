
import m from 'mithril';
import ServiceApiFactory from '../lib/service-api';
import {Todo} from '../models/todo';
import PubSub from 'vanilla-pubsub';

import formComp from '../lib/form-components';

var apiUrl = "/api/todos/";
var component = {
    service: new ServiceApiFactory(apiUrl)
};

export default {
    controller: function() {
        var ctrl = this;
        ctrl.vm = {};
        ctrl.vm.newTodo = new Todo();
        ctrl.add = function (data, collection) {
            var newModel = data;
            component.service.post(newModel).then(function (response) {
                newModel._id = response._id;
                PubSub.publish('Todos.updated');
                if (collection) {
                    collection().push(newModel);
                }
            });
        };
    },
    view: function (ctrl) {
        //console.log('Draw todoAdd');
        return <div class="todo add">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title"><span class="glyphicon glyphicon-plus-sign"></span> Add Todo</h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal">
                        {formComp.labelInput('Name', ctrl.vm.newTodo.name)}
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="button" class="btn btn-success" onclick={() => {
                                    ctrl.add(ctrl.vm.newTodo);
                                }}><span class="glyphicon glyphicon-plus-sign"></span> Add Todo</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>;
    }
};
