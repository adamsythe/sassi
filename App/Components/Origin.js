var React = require('react-native');
var FullSep = require('./helpers/FullSep');
var Separator = require('./helpers/Separator');
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

var styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f4f4f4',
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
   headerTitle:{
    fontSize:16,
    marginBottom:11,
  },
  paragraph:{
    color:"#a4a4a4",
  },
  header: {
  	backgroundColor:'white',
  	paddingLeft:30,
    paddingRight:30,
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 22,
  },
  mainContainer:{
  	backgroundColor:'white'
  },
   button:{
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


class Origin extends React.Component{
  constructor(props){
    super(props)
    this._renderRow = this._renderRow.bind(this);
     this.gotoInformation = this.gotoInformation.bind(this);
    this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this._getBlob()),
    }
  }
	gotoInformation(rowID:number){
   // product = this.props.fish.product;
    method= this.props.method;
    origin = this.props.origin[rowID];
    if(Platform.OS==='ios')
  		this.props.navigator.push({
        title: fish.title,
        component: Information,
         passProps: {fish:fish, method:method, origin:origin},
         backButtonTitle: 'Back',
      });
    else{
      this.props.navigator.push({
  component: Information,
  props: {fish:fish, method:method, origin:origin},
});
    }
  };

  _getBlob(){
      var dataBlob = []
      for (var ii = 0; ii < this.props.origin.length; ii++) {
          var gicon = this.props.origin[ii].color[0] ? require('../assets/gLight.png') : require('../assets/nLight.png');
          var oicon = this.props.origin[ii].color[1] ? require('../assets/oLight.png') : require('../assets/nLight.png');
          var ricon = this.props.origin[ii].color[2]? require('../assets/rLight.png') : require('../assets/nLight.png');
        dataBlob.push([this.props.origin[ii].name,gicon,oicon, ricon]);
      }
      return dataBlob;
    }

    _renderRow(rowData, sectionID, rowID){
  return(
    <View>
      <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.gotoInformation(rowID)}
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
					<Text style={styles.headerTitle}>Origin:</Text>
					<Text style={styles.paragraph}>The same fish can also appear on multiple lists based on its origin</Text>
				</View>
				<FullSep />

				<Text style={styles.mainTitle}>SELECT AN ORIGIN</Text>

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


Origin.propTypes = {
  fish: React.PropTypes.object.isRequired
}


module.exports = Origin;
