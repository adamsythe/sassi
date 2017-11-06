var React = require('react-native');

var {
  View,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
    flex: 1,
    marginLeft: 0
  },
});

class FullSep extends React.Component{
  render(){
    return (
      <View style={styles.separator} />
    );
  }
};

module.exports = FullSep;