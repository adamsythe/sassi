var React = require('react-native');
var Separator = require('./helpers/Separator');
var FullSep = require('./helpers/FullSep');

var {
  Text,
  View,
  NavigatorIOS,
  Image,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Platform
} = React;

var styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 0,
    flexDirection: 'column',
    backgroundColor: '#f4f4f4'
  },
  bannerPicHolder: {
    height: 200,
    backgroundColor: 'white',
    flex:1,
    alignItems:"stretch"
  },
  bannerPic:{
    alignSelf:  'center',
    resizeMode: "contain",
    height: 150,
    marginTop:25
  },
  colorSection:{
    backgroundColor: '#e77d24',
    height:47,
    paddingLeft: 22,
    paddingRight:11,
    flexDirection:"row",
    flex:1,
  },
  colorIcon: {
    marginRight:10,
  },
  colorText:{
    color: 'white',
    fontSize:16,
  },
  leftSide:{
    alignSelf:"center",
    flexDirection:"row",
  },
  rightSide:{
    position:"absolute",
    right: 11,
    top: 17,
    flexDirection:"row",
    flex:1,

  },
  infoIcon:{

  },
  arrowIcon:{
    marginLeft: 15,
  },
  mscSection:{
    backgroundColor: 'white',
    height:47,
    paddingLeft: 22,
    paddingRight:11,
    flexDirection:"row",
    flex:1,
  },
  onWhiteText:{
    fontSize:16,
    alignSelf:"center",
  },
  title: {
    marginBottom: 12,
    fontSize: 13,
    color: '#a9a9a9',
    marginLeft: 11,
    marginTop: 23
  },
  fishInfo:{
    backgroundColor:"white",
  },
  fishInfoSection:{
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 22,
    paddingRight: 22,
  },
  infoTitle:{
    fontSize:15,
    marginBottom:11,
  },
  infosubTitle:{
    color:"#a4a4a4",
  },
  header:{

    height: 40,
    marginTop:15,
  },
  headerText:{
    color:'#000000',
    fontSize:20,
    alignSelf:  'center',
  }
});



class Where extends React.Component{
  gotoMsc(){

  }
  render () {
    var header;
     if (Platform.OS==='ios') {
     
    }
    else{

      header= <View style= {styles.header}>
        <Text numberOfLines={1} style={styles.headerText}>{this.props.header}</Text>
      </View>
    };
    return(
       
       <ScrollView style = {styles.fishInfoSection}>
       {header}
              <Text style={styles.infosubTitle}>{this.props.description}</Text>
            </ScrollView>
        
      )
  }
};

module.exports = Where;




