var React = require('react-native');
var Main = require('./Main');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  });

class SassiList extends React.Component{
	render(){
		return (
			<NavigatorIOS
          ref="navigator"
          style={styles.mainContainer}
          initialRoute={{
            title: 'WWF SASSI',
            component: Main,
            backButtonTitle: 'Back',
          }}/>

			)
		}
	};



module.exports = SassiList;