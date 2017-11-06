var React = require('react-native');
var ShopList = require('./ShopList');

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

class Shop extends React.Component{
	render(){
		return (
			<NavigatorIOS
          ref="navigator"
          style={styles.mainContainer}
          initialRoute={{
            title: 'Shop List',
            component: ShopList,
            backButtonTitle: 'Back',
          }}/>

			)
		}
	};



module.Shop = Shop;