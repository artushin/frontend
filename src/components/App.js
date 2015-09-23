'use strict';

var React = require('react'),
    Router = require('react-router'),
    mui = require('material-ui'),
    Colors = require('material-ui/lib/styles/colors'),
    Dialog = require('material-ui/lib/dialog'),
    RaisedButton = require('material-ui/lib/raised-button'),
    ThemeManager = new mui.Styles.ThemeManager(),
    injectTapEventPlugin = require("react-tap-event-plugin"),
    Route = Router.Route;

// CSS
require('normalize.css');
require('../styles/main.less');

injectTapEventPlugin();

var App = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },
    componentWillMount() {
        ThemeManager.setPalette({
            accent1Color: Colors.deepOrange500
        });
    },

    render() {

        let containerStyle = {
            textAlign: 'center',
            paddingTop: '200px'
        };

        let standardActions = [
            {text: 'Okay'}
        ];

        return (
            <div style={containerStyle}>
                <Dialog
                    title="Yay for Material Design"
                    actions={standardActions}
                    ref="yayDialog">
                    It's grand.
                </Dialog>

                <h1>base-frontend</h1>

                <h2>A starter skeleton</h2>

                <RaisedButton label="Yay for Material Design" primary={true} onTouchTap={this._handleTouchTap}/>

            </div>
        );
    },

    _handleTouchTap() {
        this.refs.yayDialog.show();
    }
});

var Routes = (
    <Route name="app" path="/" handler={App}>
    </Route>
);

var content = document.getElementById('content');

Router.run(Routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, content);
});