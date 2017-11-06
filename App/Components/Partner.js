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
     width: 200, height: 200, resizeMode: "contain", alignSelf: 'center'
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
  }
});



class Partner extends React.Component{
	render () {
     if (this.props.partner.imgPackaged) {
      var topPic = <View style= {styles.bannerPicHolder}>
          <Image source={this.props.partner.img} 
           style={styles.bannerPic}/>
        </View>
        
    }
    else{
      var topPic = <View style= {styles.bannerPicHolder}>
    <Image style={{width: 200, height: 200, resizeMode: "contain", alignSelf: 'center'}} source={{uri: this.props.partner.img}}/>

        </View>    }

		return(
			<ScrollView style={styles.Container}>
        {topPic}
       <FullSep />
        <View style = {styles.fishInfoSection}>
              <Text style={styles.infosubTitle}>{this.props.partner.description}</Text>
            </View>
        <FullSep />    
      </ScrollView>
			)
	}
};

module.exports = Partner;