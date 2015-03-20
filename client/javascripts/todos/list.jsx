
import m from 'mithril';
import _ from 'lodash';
import ServiceApiFactory from '../lib/service-api';
import PubSub from 'vanilla-pubsub';

import {Todo} from '../models/todo';
import helpers from '../lib/helpers';

var component = {
    resources: {
        todos: new ServiceApiFactory('/api/todos/')
    }
};

export default {
    controller: function() {
        var ctrl = this;
        ctrl.vm = {
            todos: m.prop(component.resources.todos.get('', Todo))
        };
        if (!PubSub._storage['Todos.updated']) {
            PubSub.subscribe('Todos.updated', function (data) {
                console.log('Todos.updated called ', data);
                ctrl.vm.todos = m.prop(component.resources.todos.get('', Todo))
            });
        }
        ctrl.remove = function (id, collection, idx) {
            component.resources.todos.del(id).then(function (response) {
                PubSub.publish('Todos.updated', 'after deletion');
                if (collection) {
                    _.pull(collection(), _.find(collection(), {'_id': id}));
                }
            });
        };
        ctrl.update = function (id, data) {
            component.resources.todos.put(id, data).then(function (response) {
                PubSub.publish('Todos.updated', 'after server update');
            });
        };
    },
    view: function (ctrl) {
        return <div class="todos list">
            <div class="queue">
                <h4>Todo List</h4>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {ctrl.vm.todos().map(function(todo, index) {
                        return <tr>
                            <td>{todo.name()}</td>
                            <td>
                                <button type="button" class="btn btn-primary btn-xs" onclick={() => {
                                    m.route('/todos/'+todo._id);
                                }} href={'/todos/'+todo._id}><span class="glyphicon glyphicon-edit"></span></button>
                                <button type="button" class="btn btn-danger btn-xs" onclick={() => {
                                    ctrl.remove(todo._id);
                                }}><span class="glyphicon glyphicon-trash"></span></button>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>;
    }
};
