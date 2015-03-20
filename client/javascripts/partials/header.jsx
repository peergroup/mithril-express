
import m from 'mithril';

export default {
    controller: function() {
        this.menuItems = [
            {name: 'Todos', href: '/todos', icon: 'list-alt'},
            {name: 'About', href: '/about', icon: 'list-alt'}
        ];
        this.testScopeVar = 'hello';
    },
    view: function (ctrl) {
        var dynamicComponent;
        if (ctrl.testScopeVar2) {
            dynamicComponent = <li><a href="#">{ctrl.testScopeVar2}</a></li>
        }
        return <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">{ctrl.headerConf}</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        {ctrl.menuItems.map(function(menuItem, index) {
                            return <li>
                                <a onclick={function (event) {
                                    event.preventDefault();
                                    m.route(menuItem.href)}} href={menuItem.href}>
                                    <span class={"glyphicon glyphicon-"+menuItem.icon}></span> {menuItem.name}
                                </a>
                            </li>
                        })}
                        {dynamicComponent}
                    </ul>
                </div>
            </div>
        </nav>;
    }
};
