
import m from 'mithril';

import header from '../partials/header';

export default {
    controller: function() {
        this.header = new header.controller();
    },
    view: function (ctrl, extScope) {
        return <div class="page">
            {header.view(ctrl.header)}
            {extScope.block()}
            <footer></footer>
        </div>;
    }
};
