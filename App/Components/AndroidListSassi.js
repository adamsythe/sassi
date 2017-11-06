'use strict';

var Main = require('./Main');
var React = require('react-native');


var {
  AppRegistry,
  Navigator,
  BackAndroid
} = React;



class AndroidListSassi extends React.Component{
 

  _renderScene(route, navigator) {
    var Component = route.component;
    return (
      <Component {...route.props} navigator={navigator} route={route} />
    );
  }
  
  render() {


    return (
      <Navigator
        ref="navigator"
        initialRoute={{
          component: Main,
          type: "right"
        }}
        renderScene={this._renderScene}
      />
    );
  }
};


module.exports = AndroidListSassi;