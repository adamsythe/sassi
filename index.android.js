/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var AndroidListSassi = require('./App/Components/AndroidListSassi');
var About = require('./App/Components/About');
var AndroidPartnersNavigate = require('./App/Components/AndroidPartnersNavigate');
var SplashScreen = require('react-native-splashscreen');


'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  BackAndroid
} = React;

function goBack()
{
  // this.AndroidListSassi.navigator.pop();

}


BackAndroid.addEventListener('hardwareBackPress', function() {
  if(mainComponent.state.selectedTab==0){
      if ( mainComponent.refs.sassi.refs.navigator.getCurrentRoutes().length>1){
        mainComponent.refs.sassi.refs.navigator.pop();
        return true
      }
    }
  if(mainComponent.state.selectedTab==1){
    if ( mainComponent.refs.partners.refs.navigator.getCurrentRoutes().length>1){
      mainComponent.refs.partners.refs.navigator.pop();
      return true
    }
  }
  
  return false
  //return false;
});


var styles = StyleSheet.create({
  container: {
    flex: 11,
    
  },
  main:{
    flex:11,
  },
  footer:{
    flex:1,
    backgroundColor: '#f4f4f4',
  },
  toolbar: {
    backgroundColor: '#ffffff',
    height: 56,
  },
});


var mainComponent;

class Sassi extends React.Component{
  constructor(props){
    super(props)
    mainComponent = this;
    SplashScreen.hide();
    this.state = {
      selectedTab: 0,
    }
  }
  iconClicked(){
    if (this.state.selectedTab==0)
      mainComponent.refs.sassi.refs.navigator.popToTop();
    else{
      this.setState({
        selectedTab: 0,
      })
    };
  }
  onActionSelected (position) {

  if(this.state.selectedTab==position){
    if (this.state.selectedTab==0)
      mainComponent.refs.sassi.refs.navigator.popToTop();
    if (this.state.selectedTab==1)
      mainComponent.refs.partners.refs.navigator.popToTop();
  }
  else{
    this.setState({
      selectedTab: position,
    })
  };
};
  render() {
    var content;
    switch (this.state.selectedTab)
    {
      case 0:
        content = <AndroidListSassi ref="sassi"></AndroidListSassi>
        break;
      case 1:
        content = <AndroidPartnersNavigate ref="partners"></AndroidPartnersNavigate>
        break;
      case 2:
        content = <About ref="about"></About>
        break;
    }
    return (
      <View style={styles.container}>
          <View style={styles.footer}>
        <ToolbarAndroid
            navIcon= {require("./App/assets/toolbar.png")}
            title=''
            style={styles.toolbar}            
            actions={[{title: 'list', show: 'always'}, {title: 'partners', show: 'always'}, {title: 'about',  show: 'always'}]}
            onIconClicked={this.iconClicked.bind(this)}
            onActionSelected={this.onActionSelected.bind(this)} />
            </View>
           <View style={styles.main}>
         {content}
      </View>
       </View>
    );
  }; 

  
};

AppRegistry.registerComponent('Sassi', () => Sassi);







