var React = require('react-native');
var Partners = require('./Partners');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Navigator
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  });

class NavigatePartners extends React.Component{
	render(){
		return (
			<NavigatorIOS
          ref="navigator"
          style={styles.mainContainer}
          initialRoute={{
            title: 'Partners',
            component: Partners,
            backButtonTitle: 'Back',
          }}/>

			)
		}
	};



module.exports = NavigatePartners;