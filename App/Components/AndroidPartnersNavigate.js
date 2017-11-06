'use strict';

//var AndroidMain = require('./AndroidMain');
//var AndroidSecond = require('./AndroidSecond');
var React = require('react-native');
var Partners = require('./Partners');

var {
  AppRegistry,
  Navigator,
} = React;

var AndroidPartnersNavigate = React.createClass({
  _renderScene(route, navigator) {
    var Component = route.component;
    return (
      <Component {...route.props} navigator={navigator} route={route} />
    );
  },
  render() {

    return (
      <Navigator
        ref='navigator'
        initialRoute={{
          component: Partners,
          type: "right"
        }}
        renderScene={this._renderScene}
      />
    );
  }
});


module.exports = AndroidPartnersNavigate;