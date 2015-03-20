
import m from 'mithril';
import _ from 'lodash';
import PubSub from 'vanilla-pubsub';

import appLayout from '../layouts/app';

import todosList from './list';
import todoAdd from './add';

export default {
    controller: function () {
        var self = this;
        this.todosList = new todosList.controller();
        //PubSub.subscribe('Todo.updated', function (job) {
        //    var vmTodo = _.find(self.todosList.vm.todos(), function (item) {
        //        return item._id === todo._id;
        //    });
        //    m.redraw();//
        //});
        this.todoAdd = new todoAdd.controller();
        this.appLayout = new appLayout.controller();
        this.appLayout.header = _.assign(this.appLayout.header, {
            testScopeVar: 'todos',
            headerConf: 'Todos'
        });
    },
    view: function (ctrl) {
        return appLayout.view(ctrl.appLayout, {
            block: function () {
                return <div class="container">
                    <div class="page-header">
                        <h1>Todos <small>… have got to be done.</small></h1>
                    </div>
                    {todoAdd.view(ctrl.todoAdd)}
                    {todosList.view(ctrl.todosList)}
                </div>
            }}
        );
    }
};
