
import m from 'mithril';
import helpers from './helpers';

export default {
    labelInput: function (label, bindTo) {
        return <div className="form-group">
            <label
                for={'input' + helpers.stringToCssSelector(label)}
                className="col-sm-2 control-label">
                {label}
            </label>
            <div className="col-sm-10">
                <input
                    id={'input' + helpers.stringToCssSelector(label)}
                    className="form-control" type="text" placeholder={label}
                    oninput={m.withAttr("value", bindTo)} value={bindTo()} />
            </div>
        </div>;
    },
    labelSelect: function (label, options, bindTo) {
        return <div className="form-group">
            <label
                for={'select' + helpers.stringToCssSelector(label)}
                className="col-sm-2 control-label">
                {label}
            </label>
            <div className="col-sm-10">
                <select
                    id={'select' + helpers.stringToCssSelector(label)}
                    className="form-control"
                    onchange={m.withAttr("value", bindTo)}>
                    <option value=""></option>
                    {options().map(function (option) {
                        var selected = (option._id === bindTo()) ? 'selected':'';
                        return <option selected={selected} value={option._id}>{option.name}</option>;
                    })}
                </select>
            </div>
        </div>;
    },
    simpleTextInput: function (label, bindTo) {
        return <input
            id={'input' + helpers.stringToCssSelector(label)}
            className="form-control input-sm" type="text" placeholder={label}
            oninput={m.withAttr("value", bindTo)} value={bindTo()} />;
    },
    labelTextarea: function (label, bindTo, rows = 5) {
        return <div className="form-group">
            <label
                for={'textarea' + helpers.stringToCssSelector(label)}
                className="col-sm-2 control-label">
                {label}
            </label>
            <div className="col-sm-10">
                <textarea
                    id={'textarea' + helpers.stringToCssSelector(label)}
                    className="form-control"
                    placeholder={label}
                    oninput={m.withAttr("value", bindTo)}
                    rows={rows}>
                    {bindTo()}
                </textarea>
            </div>
        </div>;
    }
}