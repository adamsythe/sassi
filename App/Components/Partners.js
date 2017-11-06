var React = require('react-native');
var Separator = require('./helpers/Separator');
var FullSep = require('./helpers/FullSep');
var Partner = require('./Partner');
var RNFS = require('react-native-fs'); 
let myJSON = require('./database/database.json')

var {
  Text,
  View,
  NavigatorIOS,
  Navigator,
  Image,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  ScrollView,
  ListView,
  Platform,
  AsyncStorage,
} = React;


//var partners = [woolworths, checkers, picknpay];


var styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 0,
    flexDirection: 'column',
    backgroundColor: '#f4f4f4',
  },
  headerTitle: {
    fontSize: 16,
    marginTop: 18,
    flex: 1,
    fontWeight:'bold',
    margin:0,
  },
  mainTitle: {
    fontSize: 13,
    marginTop: 18,
    flex: 1,
    marginLeft:11,
    marginTop: 24,
    marginBottom: 14,
    color: "#a4a4a4"
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22.4,
    flex: 1,
    marginTop:-20,
    color: "#a4a4a4"
  },
  header: {
    height: 114,
    backgroundColor:'white',
    paddingLeft:30,
  },
  mainContainer:{
    backgroundColor:'white'
  },
  button: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 0,
    alignSelf: 'stretch',
    paddingLeft: 30
  },
  buttonTitle:{
    alignSelf: 'center',
    fontSize: 16,
  },
  textimgholder: {
    flexDirection: 'row',
    flex: 1,
  },
  imgHolder:{
  flexDirection: 'row',
     position: 'absolute',
    right:11,
    top: 16
  },
  gicon: {

  },
  oicon: {
    marginLeft: 5,
  },
  ricon: {
    marginLeft: 5,
  },
  arrowIcon: {
    marginLeft: 14,
  }
});



class Partners extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      partnersdataSource: [],
    }
    this._renderRow = this._renderRow.bind(this);
     this.gotoPartner = this.gotoPartner.bind(this);
    this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.separatorId = 0;
    this.state = {
      dataSource: this.ds.cloneWithRows(this._partners()),
    }
  };
  componentDidMount(){
    AsyncStorage.getItem("database").then((value) => {
    if (value!=null) {
      myJSON=JSON.parse(value)
      function compare(a,b) {
  if (a.title < b.title)
    return -1;
  else if (a.title > b.title)
    return 1;
  else 
    return 0;
}

//myJSON.response.partners.sort(compare);
    }
    partners = []
    for (var i = 0; i < myJSON.response.partners.length; i++) {
      temppartners= [];
      temppartners.title= myJSON.response.partners[i].name;
      temppartners.description= myJSON.response.partners[i].description;
      temppartners.id= myJSON.response.partners[i].id;
      temppartners["img"] = require('../assets/logo.png');
      temppartners["imgPackaged"]=true;
      partners.push(temppartners);
      
    };
    this.setState({
          partnersdataSource:partners,
        })

    this.setState({
          dataSource: this.ds.cloneWithRows(this._partners()),
        })
    }).done(

    );
  }

  addpic(rowID:number){
    console.log(rowID)
    RNFS.readDir(RNFS.DocumentDirectoryPath)
   .then((result) => {
    var picInPhone = false;
     for (var i =0; i < result.length; i++) {
      if ("partner" + rowID+'.jpg' == result[i].name){
        picInPhone =true
      }}
       if (picInPhone){
    //  alert ("downloaded pic")
      RNFS.readFile(RNFS.DocumentDirectoryPath +  '/'+ 'partner' + rowID +'.jpg', 'base64')
        .then((result) => {
          var whichpartner = 0;
          for (var p = 0; p < this.state.partnersdataSource.length; p++) {
            if (this.state.partnersdataSource[p].id==rowID) {
                whichpartner = p;
            }
          }
          this.state.partnersdataSource[whichpartner]["img"] = 'data:image/png;base64,'+ result;
          this.state.partnersdataSource[whichpartner]["imgPackaged"]=false;
          this.gotoPartner(whichpartner)
        })
    }


    else{
      for (var p = 0; p < this.state.partnersdataSource.length; p++) {
         if (this.state.partnersdataSource[p].id==rowID) {
                whichpartner = p;
            }
      }
          
            switch(rowID){
              case 28: 
                      this.state.partnersdataSource[whichpartner]["img"] = require("../assets/partners/partner28.jpg");
                      break;
              case 29: 
                      this.state.partnersdataSource[whichpartner]["img"] = require("../assets/partners/partner29.jpg");
                      break;
              case 30: 
                      this.state.partnersdataSource[whichpartner]["img"] = require("../assets/partners/partner30.jpg");
                      break;
              case 32: 
                      this.state.partnersdataSource[whichpartner]["img"] = require("../assets/partners/partner32.jpg");
                      break;
              case 33: 
                      this.state.partnersdataSource[whichpartner]["img"] = require("../assets/partners/partner33.jpg");
                      break;
              case 34: 
                      this.state.partnersdataSource[whichpartner]["img"] = require("../assets/partners/partner34.jpg");
                      break;
              case 35: 
                      this.state.partnersdataSource[whichpartner]["img"] = require("../assets/partners/partner35.jpg");
                      break;
              case 36: 
                      this.state.partnersdataSource[whichpartner]["img"] = require("../assets/partners/partner36.jpg");
                      break;
              case 37: 
                      this.state.partnersdataSource[whichpartner]["img"] = require("../assets/partners/partner37.jpg");
                      break;
              
            }
    
    
      this.state.partnersdataSource[whichpartner]["imgPackaged"]=true;
     this.gotoPartner(whichpartner)
    }
    
    })
  .catch((err) => {
    alert(err.message, err.code);
  }); 
  };

  gotoPartner(rowID:number){


 
      if(Platform.OS==='ios'){
        this.props.navigator.push({
            title: this.state.partnersdataSource[rowID].title,
            component: Partner,
             passProps: {partner:this.state.partnersdataSource[rowID]},
             backButtonTitle: 'Back',
          });
      }
     else{
      this.props.navigator.push({
  component: Partner,
  props: {partner:this.state.partnersdataSource[rowID]},
});
     };
  };

    _partners(){
      var dataBlob = []
      
      for (var ii = 0; ii < this.state.partnersdataSource.length; ii++) {
        var ID = ii;
        dataBlob.push([this.state.partnersdataSource[ii].title, this.state.partnersdataSource[ii].id]);
      }
      return dataBlob;
    }


_renderRow(rowData, sectionID, rowID){
  return(
    <View key={rowData[1]}>
      <TouchableHighlight
        style={styles.button}
        onPress={() => this.addpic(rowData[1])}
        underlayColor='grey'>
          <View style={styles.textimgholder}>
              <Text style={styles.buttonTitle} key={0}>{rowData[0]}</Text> 
              <View style={styles.imgHolder} key={1}>
                  <Image source={require('../assets/arrowIcon.png')} 
                    style={styles.arrowIcon} key={0}/>
              </View>
          </View>
      </TouchableHighlight>
      
    </View>
    )
}
separate(){
  return(
    <View key={this.separatorId++}>
    <Separator key={this.separatorId++}/>
    </View>
  )
}
  render () {
    return(
      <ScrollView style={styles.mainContainer} key="0">
        <FullSep key="1"/>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              renderSeparator= {this.separate.bind(this)}
        />
        <FullSep key="2"/>
      </ScrollView>

      )
  }
};

module.exports = Partners


