var React = require('react-native');

var {
  View,
  StyleSheet,
  Platform
} = React;

if(Platform.OS==='ios')
var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
    flex: 1,
    marginLeft: 22
  },
});
else
  var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
    flex: 1,
    marginLeft: 0
  },
});


class Separator extends React.Component{
  render(){
    return (
      <View style={styles.separator} />
    );
  }
};

module.exports = Separator;