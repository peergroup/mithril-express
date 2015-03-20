
import m from 'mithril';
import _ from 'lodash';

export default {
    stringToCssSelector: function (string) {
        return string.replace(/[^A-Za-z0-9]/g, '');
    },
    mCastData: function (data) {
        var self = this;
        _.forOwn(data, function(value, prop) {
            if (prop !== '__v') {
                self[prop] = m.prop(value);
            }
        });
    },
    TypeCast: function (data = {}, model = {}) {
        var self = this;
        // Allows to pass the stringified mithril vm object directly
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        if (data._id) {
            self._id = data._id;
        }
        _.forOwn(model, function (value, prop) {
            self[prop] = data[prop] ? m.prop(data[prop]) : m.prop(value.default);
        });
    }
};