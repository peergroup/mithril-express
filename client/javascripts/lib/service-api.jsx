
import m from 'mithril';
import _ from 'lodash';

var serializeObject = function (object) {
    return JSON.parse(JSON.stringify(object));
};

export default function (resourceUrl) {
    if (_.isUndefined(resourceUrl)) {
        throw new TypeError("resourceUrl is undefined, " +
        "please provide an API URL");
    }
    return {
        get: function (id = '', type = null, background = false) {
            return m.request({
                method: "GET",
                url: resourceUrl + id,
                type: type,
                background: background
            });
        },
        post: function (model) {
            if (_.isUndefined(model)) {
                throw new TypeError("POST data model undefined");
            }
            return m.request({
                method: "POST",
                url: resourceUrl,
                data: serializeObject(model)
            });
        },
        put: function (id, model) {
            if (_.isUndefined(id)) {
                throw new TypeError("PUT ID undefined");
            }
            if (_.isUndefined(model)) {
                throw new TypeError("PUT data model undefined");
            }
            return m.request({
                method: "PUT",
                url: resourceUrl + id,
                data: serializeObject(model)
            });
        },
        del: function (id) {
            if (_.isUndefined(id)) {
                throw new TypeError("DELETE ID undefined");
            }
            return m.request({
                method: "DELETE",
                url: resourceUrl + id
            });
        }
    };
};
