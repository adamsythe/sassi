/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SassiList = require('./App/Components/SassiList');
var About = require('./App/Components/About');
var NavigatePartners = require('./App/Components/NavigatePartners');
var Partners = require('./App/Components/Partners');
var Main = require('./App/Components/Main');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TabBarIOS,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 11,
    
  },
  main:{
    flex:10,
  },
  footer:{
    flex:1,
    backgroundColor: '#f4f4f4',
  },
});

class Sassi extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selectedTab: 'SASSI',
    }
  }
  aboutHandleChange(){
    this.setState({
      selectedTab: 'About',
    })
  };
  sassiHandleChange(){
    if (this.state.selectedTab == "SASSI")
    {
      this.refs.sassi.refs.navigator.popToTop();
     
    }
    this.setState({
      selectedTab: 'SASSI',
    })
  };

  partnersHandleChange(){
    if (this.state.selectedTab == "Partners")
    {
      this.refs.partners.refs.navigator.popToTop();
    }
    this.setState({
      selectedTab: 'Partners',
    })
  };

  mainContent(){
    /*
    if(this.state.selectedTab=='about')
    return(
      <About></About>
          )
   if (this.state.selectedTab=='sassi')
    return(
      <SassiList></SassiList>
          
          )
  if (this.state.selectedTab=='partners')
    return(
      <Partners></Partners>
          
          )*/

  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.footer}>

          <TabBarIOS>

            <TabBarIOS.Item 
              title="Sassi List" 
              selected={this.state.selectedTab === "SASSI"}
              icon={require("./App/assets/sassiListIcon.png")}
              onPress={this.sassiHandleChange.bind(this)} >
              <View style={styles.main}>
                <SassiList ref="sassi"></SassiList>
              </View>
            </TabBarIOS.Item>

            <TabBarIOS.Item 
              title="Partners" 
              selected={this.state.selectedTab === "Partners"}
              icon={require("./App/assets/partnersIcon.png")}
              onPress={this.partnersHandleChange.bind(this)} >
              <View style={styles.main}>
                <NavigatePartners ref="partners"></NavigatePartners>
              </View>
            </TabBarIOS.Item>

            <TabBarIOS.Item 
              title="About" 
              selected={this.state.selectedTab === "About"}
              icon={require("./App/assets/aboutIcon.png")}
              onPress={this.aboutHandleChange.bind(this)} >
              <View style={styles.main}>
                <About></About>
              </View>
            </TabBarIOS.Item>
        
          </TabBarIOS>
        
        </View>
      </View>
    );
  }
};



AppRegistry.registerComponent('Sassi', () => Sassi);
