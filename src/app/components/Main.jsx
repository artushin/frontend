/** In this file, we create a React component which incorporates components provided by material-ui */

import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';

const containerStyle = {
  textAlign: 'center',
  paddingTop: 200,
};

const AppBarTop = React.createClass({
  render() {
    return (
      <AppBar
        title="Frontend"
        showMenuIconButton={false}
      />
    );
  },
});

const Main = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.lightBlue300,
    });

    this.setState({muiTheme: newMuiTheme});
  },

  render() {
    return (
      <div>
        <AppBarTop/>
        <div style={containerStyle}>
          <h1>frontend</h1>
          <h2>a ui skeleton</h2>
          <RaisedButton label="I'm a Button" primary={true} />
        </div>
      </div>
    );
  },
});

export default Main;