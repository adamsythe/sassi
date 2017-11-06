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
  ScrollView
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
    marginTop:20
  },
  colorSection:{
    backgroundColor: '#e77d24',
    height:47,
    paddingLeft: 22,
    paddingRight:11,
    flexDirection:"row",
    flex:1,
  },
  colorSectionGreen:{
    backgroundColor: '#6dae44',
    height:47,
    paddingLeft: 22,
    paddingRight:11,
    flexDirection:"row",
    flex:1,
  },
  colorSectionRed:{
    backgroundColor: '#e21f26',
    height:47,
    paddingLeft: 22,
    paddingRight:11,
    flexDirection:"row",
    flex:1,
  },
});



class Color extends React.Component{
	render () {
    colour = <View></View>
    if (this.props.color=="Green") {
      colour = 
      <View style= {styles.colorSectionGreen}>
         <View style= {styles.leftSide}>
            <Image source={require('../assets/icons-13.png')} 
             style={styles.colorIcon}/>
             <Text style={styles.colorText}>Green - best choice</Text>
          </View>
          
        </View>
    }
    if (this.props.color=="Red") {
      colour = 
      <View style= {styles.colorSectionRed}>
         <View style= {styles.leftSide}>
            <Image source={require('../assets/icons-10.png')} 
             style={styles.colorIcon}/>
             <Text style={styles.colorText}>Red - don't buy</Text>
          </View>
         
        </View>
    }
  
if (this.props.color=="Orange") {
  colour=
  <View style= {styles.colorSection}>
         <View style= {styles.leftSide}>
            <Image source={require('../assets/orangeIconInverted.png')} 
             style={styles.colorIcon}/>
             <Text style={styles.colorText}>Orange - think twice</Text>
          </View>
          
        </View>
}

		return(
			
        <ScrollView style = {styles.fishInfoSection}>
        {colour}
              <Text style={styles.infosubTitle}>{this.props.paragraph}</Text>
            </ScrollView>

			)
	}
};

module.exports = Color;