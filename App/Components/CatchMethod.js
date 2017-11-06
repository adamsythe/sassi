var React = require('react-native');
var FullSep = require('./helpers/FullSep');
var Separator = require('./helpers/Separator');
var Origin = require('./Origin');
var Information = require('./Information');

var {
  Text,
  View,
  NavigatorIOS,
  Navigator,
  Platform,
  Image,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  ScrollView,
  ListView
} = React;

margintop = 13;
if(Platform.OS==='ios')
  var margintop = -30;

marginbot = -33;
if(Platform.OS==='ios')
  var marginbot = 0;


var styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 0,
    flexDirection: 'column',
    backgroundColor: '#f4f4f4',
  },
  headerTitle: {
    fontSize: 16,
    marginBottom:11,
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
    flex: 1,
    color: "#a4a4a4",
  },
  header: {
  	backgroundColor:'white',
  	paddingLeft:30,
    paddingRight:30,
  	paddingBottom:20,
    paddingTop:20,
  },
  mainContainer:{
  	backgroundColor:'white',
  	flex:1,
  	alignSelf: 'stretch',
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
    width:200
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




class CatchMethod extends React.Component{
  constructor(props){
    super(props)
    this._renderRow = this._renderRow.bind(this);
    this.gotoOrigin = this.gotoOrigin.bind(this);
    this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this._getBlob()),
    }
  }
	gotoOrigin(rowID:number){

    fish = this.props.fish;
    method = this.props.catchMethod[rowID];
    origin = []

    for (var i = 0; i < this.props.status.status.length; i++)
    {
      tempOrigin = {}
      tempOrigin["color"]=[false, false, false]
      tempOrigin["eco_label"]=[false, false, false]
    if (this.props.status.status[i].catch_method_id==fish.catch_method[rowID])
      {
        if (this.props.status.status[i].status=="Green") {
          tempOrigin.color[0]=true
        };
        if (this.props.status.status[i].status=="Yellow") {
          tempOrigin.color[1]=true
        };
        if (this.props.status.status[i].status=="Red") {
          tempOrigin.color[2]=true
        };
        if(this.props.status.status[i].eco_label=='asc')
          tempOrigin['eco_label'][0]=true;
        if(this.props.status.status[i].eco_label=='msc')
          tempOrigin['eco_label'][1]=true;
        if(this.props.status.status[i].eco_label=='improvement project')
          tempOrigin['eco_label'][2]=true;
        tempOrigin['origin_id']= this.props.status.status[i].origin_id;
        for(var originLoop = 0; originLoop<this.props.myJSON.response.origin.length; originLoop++){

          if (this.props.myJSON.response.origin[originLoop].id==tempOrigin['origin_id']){

            tempOrigin["name"]=this.props.myJSON.response.origin[originLoop].name
            tempOrigin["description"]=this.props.myJSON.response.origin[originLoop].description;
          };
        };


      
      origin.push(tempOrigin)
      }
    };


    if(origin.length>1)
      if(Platform.OS==='ios')
  		  this.props.navigator.push({
          title: fish.common_name,
          component: Origin,
          passProps: {fish:fish, method:method, origin:origin},
          backButtonTitle: 'Back',
        });
      else{
        this.props.navigator.push({
        component: Origin,
        props: {fish:fish, method:method, origin:origin},
        });
      }
      else
        if(Platform.OS==='ios')
          this.props.navigator.push({
            title: fish.common_name,
            component: Information,
            passProps: {fish:fish, method:method, origin:origin[0]},
            backButtonTitle: 'Back',
          });
      else{
        this.props.navigator.push({
          component: Information,
          props: {fish:fish, method:method, origin:origin[0]},
        });
      }
    };

   _getBlob(){
      var dataBlob = []
      for (var ii = 0; ii < this.props.catchMethod.length; ii++) {
          var gicon = this.props.catchMethod[ii].color[0] ? require('../assets/gLight.png') : require('../assets/nLight.png');
          var oicon = this.props.catchMethod[ii].color[1] ? require('../assets/oLight.png') : require('../assets/nLight.png');
          var ricon = this.props.catchMethod[ii].color[2]? require('../assets/rLight.png') : require('../assets/nLight.png');
          dataBlob.push([this.props.catchMethod[ii].name,gicon,oicon, ricon]);
      }
      return dataBlob;
    }

    _renderRow(rowData, sectionID, rowID){
      return(
        <View>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.gotoOrigin(rowID)}
            underlayColor='grey'>
              <View style={styles.textimgholder}>
                <Text numberOfLines={1} style={styles.buttonTitle}>{rowData[0]}</Text> 
                <View style={styles.imgHolder}>
                  <Image source={rowData[1]}
                    style={styles.gicon}/>
                          <Image source={rowData[2]}
                            style={styles.oicon}/>
                          <Image source={rowData[3]}
                            style={styles.ricon}/>
                          <Image source={require('../assets/arrowIcon.png')} 
                            style={styles.arrowIcon}/>
                      </View>
                    </View>
                </TouchableHighlight>
                <Separator />
    </View>


    )
}
	render () {
		return(
			<ScrollView style={styles.Container}>
				<FullSep />
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Catch Method:</Text>
					<Text style={styles.paragraph}>Seafood can appear on more than one list depending on the method with which it was removed from the ocean</Text>
				</View>
				<FullSep />

				<Text style={styles.mainTitle}>SELECT A CATCH METHOD</Text>

				<ScrollView style={styles.mainContainer}>
					<FullSep />
						<ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
      />
					<FullSep />
				</ScrollView>

			</ScrollView>
			)
	}
};

CatchMethod.propTypes = {
  fish: React.PropTypes.object.isRequired
}


module.exports = CatchMethod;