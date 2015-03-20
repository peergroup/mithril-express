
import m from 'mithril';
import _ from 'lodash';

import helpers from '../lib/helpers';

var model = {
    name: {
        type: String,
        default: ""
    }
};

// TypeCast class
var Todo = function (data = {}) {
    return new helpers.TypeCast(data, model);
};

export {Todo};