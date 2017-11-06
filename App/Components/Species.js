var React = require('react-native');
var Separator = require('./helpers/Separator');
var FullSep = require('./helpers/FullSep');
var CatchMethod = require('./CatchMethod');
var Origin = require('./Origin');
var Information = require('./Information');
var SearchBar = require('react-native-search-bar');
var RNFS = require('react-native-fs');


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
  BackAndroid,
} = React;



var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 0,
    flexDirection: 'column',
    backgroundColor: '#f4f4f4'
  },
  title: {
    marginBottom: 12,
    fontSize: 13,
    color: '#a9a9a9',
    marginLeft: 11,
    marginTop: 23
  },
  searchInput: {
    height: 52,
    padding: 15,
    marginRight: 0,
    fontSize: 18,
    borderWidth: 10,
    borderColor: '#bdbdc3',
    borderRadius: 0,
    color: '#000000',
    backgroundColor: 'white'
  },
  textHolder: {
    alignSelf:  'center',
  },
  buttonTitle: {
    fontSize: 16,
    marginLeft:22,
    fontWeight: 'bold',
    color: "#000",
    width:200
  },
  buttonSubtitle: {
    fontSize: 15,
    marginLeft:22,
    color: "#a4a4a4",
    width:200
  },
  button: {
    height: 66,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 0,
    alignSelf: 'stretch',
  },
  imgholder: {
     flexDirection: 'row',
     position: 'absolute',
    right:11,
    top: 27 
  },
  textimgholder: {
    flexDirection: 'row',
    flex: 1,
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



class Species extends React.Component{
  constructor(props){
    super(props)
    this._renderRow = this._renderRow.bind(this);
    this.gotoFish = this.gotoFish.bind(this);
    this.navigate = this.navigate.bind(this);
    this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      search: '',
      error: false,
      dataSource: this.ds.cloneWithRows(this._species("")),
    }
  }
  handleChange(e){
    this.setState({
      search: (e.nativeEvent.text),
      dataSource: this.ds.cloneWithRows(this._species(e.nativeEvent.text)),
    })
  };

  navigate(id){
      catchMethod= []

    if(fish.color[0] || fish.color[1] || fish.color[2]){
    for (var i = 0; i < fish.catch_method.length; i++){
      temp_catchMethod={}


      for(var catchLoop = 0; catchLoop<this.props.myJSON.response.catch_method.length; catchLoop++){
        if (this.props.myJSON.response.catch_method[catchLoop].id==fish.catch_method[i]){
          temp_catchMethod["name"]=this.props.myJSON.response.catch_method[catchLoop].name
          temp_catchMethod["description"]=this.props.myJSON.response.catch_method[catchLoop].description;
        };
      };
      temp_catchMethod["color"]=[false, false, false]
      temp_catchMethod["id"]=fish.catch_method[i]
      for (var j = 0; j < this.props.myJSON.response.species[id].status.length; j++){
        if (this.props.myJSON.response.species[id].status[j].catch_method_id==fish.catch_method[i]) {
          if(this.props.myJSON.response.species[id].status[j].status=='Green'){
            temp_catchMethod["color"][0]=true
          }
          if(this.props.myJSON.response.species[id].status[j].status=='Yellow'){
            temp_catchMethod["color"][1]=true
          }
          if(this.props.myJSON.response.species[id].status[j].status=='Red'){
            temp_catchMethod["color"][2]=true
          }
        }
      };
      catchMethod.push(temp_catchMethod)
    }
  }
    else{
        temp_catchMethod={}
        temp_catchMethod["name"]="Unkown";
        temp_catchMethod["color"]=[false, false, false]
        temp_catchMethod["description"]="Unkown";
        temp_catchMethod["id"]="Unkown"
        catchMethod.push(temp_catchMethod)
      }
    if(fish.catch_method.length>1){
      if(Platform.OS==='ios')
          this.props.navigator.push({
          title: fish.common_name,
          component: CatchMethod,
          passProps: {catchMethod:catchMethod, myJSON:this.props.myJSON, fish:fish, status:this.props.myJSON.response.species[id]},
          backButtonTitle: 'Back',
        });
      else{
        this.props.navigator.push({
            component: CatchMethod,
            props: {catchMethod:catchMethod, myJSON:this.props.myJSON, fish:fish, status:this.props.myJSON.response.species[id]},
          });
        }
      }
    else{
      method = catchMethod[0];
      origin = []
      if(fish.color[0] || fish.color[1] || fish.color[2])
      for (var i = 0; i < this.props.myJSON.response.species[id].status.length; i++){
        tempOrigin = {}
        tempOrigin["color"]=[false, false, false]
        tempOrigin["eco_label"]=[false, false, false]
      if (this.props.myJSON.response.species[id].status[i].status=="Green") {
          tempOrigin.color[0]=true
        };
        if (this.props.myJSON.response.species[id].status[i].status=="Yellow") {
          tempOrigin.color[1]=true
        };
        if (this.props.myJSON.response.species[id].status[i].status=="Red") {
          tempOrigin.color[2]=true
        };
         if(this.props.myJSON.response.species[id].status[i].eco_label=='asc')
             tempOrigin['eco_label'][0]=true;
        if(this.props.myJSON.response.species[id].status[i].eco_label=='msc')
              tempOrigin['eco_label'][1]=true;
         if(this.props.myJSON.response.species[id].status[i].eco_label=='improvement project')
              tempOrigin['eco_label'][2]=true;
       // alert (this.props.status.status[i].origin_id)
        tempOrigin['origin_id']= this.props.myJSON.response.species[id].status[i].origin_id;
        for(var originLoop = 0; originLoop<this.props.myJSON.response.origin.length; originLoop++){
          if (this.props.myJSON.response.origin[originLoop].id==tempOrigin['origin_id']){
            tempOrigin["name"]=this.props.myJSON.response.origin[originLoop].name
            tempOrigin["description"]=this.props.myJSON.response.origin[originLoop].description;
          };
        };


      
      origin.push(tempOrigin)
    };
    if(!(fish.color[0] || fish.color[1] || fish.color[2]))
    {
      tempOrigin = {}
      tempOrigin["color"]=[false, false, false]
      tempOrigin['origin_id']= "Unknown";
        tempOrigin['name']="Unknown";
        tempOrigin['description']="Unknown";
      origin.push(tempOrigin)
    }
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
      if(origin.length==1){
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
  }
  }


  gotoFish(id){
   fish = this.props.species[id] 
    RNFS.readDir(RNFS.DocumentDirectoryPath)
   .then((result) => {
   var picInPhone = false;
    for (var i =0; i < result.length; i++) {
      if (fish.id+'.jpg' == result[i].name){
        picInPhone =true
      }
    }
    if (picInPhone){
    //  alert ("downloaded pic")
      RNFS.readFile(RNFS.DocumentDirectoryPath + '/' + fish.id +'.jpg', 'base64')
        .then((result) => {
          fish["image"] = 'data:image/png;base64,'+result;
            fish["imgPackaged"]=false;
            this.navigate (id)
        })
    }
    else{
    //  alert ("bundled pic")
          switch(fish.id) {
        case 4:
            fish["image"] = require('../assets/fish/4.jpg');
            break;
        case 16:
            fish["image"] = require('../assets/fish/16.jpg');
            break;
        case 28:
            fish["image"] = require('../assets/fish/28.jpg');
            break;
        case 29:
            fish["image"] = require('../assets/fish/29.jpg');
            break;
        case 31:
            fish["image"] = require('../assets/fish/31.jpg');
            break;
        case 32:
            fish["image"] = require('../assets/fish/32.jpg');
            break;
        case 33:
            fish["image"] = require('../assets/fish/33.jpg');
            break;
        case 34:
            fish["image"] = require('../assets/fish/34.jpg');
            break;
        case 35:
            fish["image"] = require('../assets/fish/35.jpg');
            break;
        case 36:
            fish["image"] = require('../assets/fish/36.jpg');
            break;
        case 37:
            fish["image"] = require('../assets/fish/37.jpg');
            break;
        case 38:
            fish["image"] = require('../assets/fish/38.jpg');
            break;
        case 39:
            fish["image"] = require('../assets/fish/39.jpg');
            break;
        case 40:
            fish["image"] = require('../assets/fish/40.jpg');
            break;
        case 41:
            fish["image"] = require('../assets/fish/41.jpg');
            break;
        case 42:
            fish["image"] = require('../assets/fish/42.jpg');
            break;
        case 43:
            fish["image"] = require('../assets/fish/43.jpg');
            break;
        case 44:
            fish["image"] = require('../assets/fish/44.jpg');
            break;
        case 45:
            fish["image"] = require('../assets/fish/45.jpg');
            break;
        case 46:
            fish["image"] = require('../assets/fish/46.jpg');
            break;
        case 47:
            fish["image"] = require('../assets/fish/47.jpg');
            break;
        case 48:
            fish["image"] = require('../assets/fish/48.jpg');
            break;
        case 49:
            fish["image"] = require('../assets/fish/49.jpg');
            break;
        case 50:
            fish["image"] = require('../assets/fish/50.jpg');
            break;
        case 51:
            fish["image"] = require('../assets/fish/51.jpg');
            break;
        case 52:
            fish["image"] = require('../assets/fish/52.jpg');
            break;
        case 53:
            fish["image"] = require('../assets/fish/53.jpg');
            break;
        case 54:
            fish["image"] = require('../assets/fish/54.jpg');
            break;
        case 55:
            fish["image"] = require('../assets/fish/55.jpg');
            break;
        case 56:
            fish["image"] = require('../assets/fish/56.jpg');
            break;
        case 57:
            fish["image"] = require('../assets/fish/57.jpg');
            break;
        case 58:
            fish["image"] = require('../assets/fish/58.jpg');
            break;
        case 59:
            fish["image"] = require('../assets/fish/59.jpg');
            break;
        case 60:
            fish["image"] = require('../assets/fish/60.jpg');
            break;
        case 61:
            fish["image"] = require('../assets/fish/61.jpg');
            break;
        case 62:
            fish["image"] = require('../assets/fish/62.jpg');
            break;
        case 63:
            fish["image"] = require('../assets/fish/63.jpg');
            break;
        case 64:
            fish["image"] = require('../assets/fish/64.jpg');
            break;
        case 65:
            fish["image"] = require('../assets/fish/65.jpg');
            break;
        case 66:
            fish["image"] = require('../assets/fish/66.jpg');
            break;
        case 67:
            fish["image"] = require('../assets/fish/67.jpg');
            break;
        case 68:
            fish["image"] = require('../assets/fish/68.jpg');
            break;
        case 69:
            fish["image"] = require('../assets/fish/69.jpg');
            break;
        case 70:
            fish["image"] = require('../assets/fish/70.jpg');
            break;
        case 72:
            fish["image"] = require('../assets/fish/72.jpg');
            break;
        case 73:
            fish["image"] = require('../assets/fish/73.jpg');
            break;
        case 74:
            fish["image"] = require('../assets/fish/74.jpg');
            break;
        case 75:
            fish["image"] = require('../assets/fish/75.jpg');
            break;
        case 76:
            fish["image"] = require('../assets/fish/76.jpg');
            break;
        case 77:
            fish["image"] = require('../assets/fish/77.jpg');
            break;
        case 78:
            fish["image"] = require('../assets/fish/78.jpg');
            break;
        case 79:
            fish["image"] = require('../assets/fish/79.jpg');
            break;
        case 80:
            fish["image"] = require('../assets/fish/80.jpg');
            break;
        case 81:
            fish["image"] = require('../assets/fish/81.jpg');
            break;
        case 82:
            fish["image"] = require('../assets/fish/82.jpg');
            break;
        case 83:
            fish["image"] = require('../assets/fish/83.jpg');
            break;
        case 84:
            fish["image"] = require('../assets/fish/84.jpg');
            break;
        case 85:
            fish["image"] = require('../assets/fish/85.jpg');
            break;
        case 86:
            fish["image"] = require('../assets/fish/86.jpg');
            break;
        case 87:
            fish["image"] = require('../assets/fish/87.jpg');
            break;
        case 88:
            fish["image"] = require('../assets/fish/88.jpg');
            break;
        case 89:
            fish["image"] = require('../assets/fish/89.jpg');
            break;
        case 90:
            fish["image"] = require('../assets/fish/90.jpg');
            break;
        case 91:
            fish["image"] = require('../assets/fish/91.jpg');
            break;
        case 93:
            fish["image"] = require('../assets/fish/93.jpg');
            break;
        case 94:
            fish["image"] = require('../assets/fish/94.jpg');
            break;
        case 95:
            fish["image"] = require('../assets/fish/95.jpg');
            break;
        case 96:
            fish["image"] = require('../assets/fish/96.jpg');
            break;
        case 97:
            fish["image"] = require('../assets/fish/97.jpg');
            break;
        case 98:
            fish["image"] = require('../assets/fish/98.jpg');
            break;
        case 99:
            fish["image"] = require('../assets/fish/99.jpg');
            break;
        case 100:
            fish["image"] = require('../assets/fish/100.jpg');
            break;
        case 101:
            fish["image"] = require('../assets/fish/101.jpg');
            break;
        case 102:
            fish["image"] = require('../assets/fish/102.jpg');
            break;
        case 103:
            fish["image"] = require('../assets/fish/103.jpg');
            break;
        case 104:
            fish["image"] = require('../assets/fish/104.jpg');
            break;
        case 105:
            fish["image"] = require('../assets/fish/105.jpg');
            break;
        case 106:
            fish["image"] = require('../assets/fish/106.jpg');
            break;
        case 107:
            fish["image"] = require('../assets/fish/107.jpg');
            break;
        case 108:
            fish["image"] = require('../assets/fish/108.jpg');
            break;
        case 109:
            fish["image"] = require('../assets/fish/109.jpg');
            break;
        case 110:
            fish["image"] = require('../assets/fish/110.jpg');
            break;
        case 111:
            fish["image"] = require('../assets/fish/111.jpg');
            break;
        case 112:
            fish["image"] = require('../assets/fish/112.jpg');
            break;
        case 113:
            fish["image"] = require('../assets/fish/113.jpg');
            break;
        case 114:
            fish["image"] = require('../assets/fish/114.jpg');
            break;
        case 116:
            fish["image"] = require('../assets/fish/116.jpg');
            break;
        case 119:
            fish["image"] = require('../assets/fish/119.jpg');
            break;
        case 120:
            fish["image"] = require('../assets/fish/120.jpg');
            break;
        case 121:
            fish["image"] = require('../assets/fish/121.jpg');
            break;
        case 122:
            fish["image"] = require('../assets/fish/122.jpg');
            break;
        case 124:
            fish["image"] = require('../assets/fish/124.jpg');
            break;
        case 125:
            fish["image"] = require('../assets/fish/125.jpg');
            break;
        case 126:
            fish["image"] = require('../assets/fish/126.jpg');
            break;
        case 127:
            fish["image"] = require('../assets/fish/127.jpg');
            break;
        case 128:
            fish["image"] = require('../assets/fish/128.jpg');
            break;
        case 129:
            fish["image"] = require('../assets/fish/129.jpg');
            break;
        case 130:
            fish["image"] = require('../assets/fish/130.jpg');
            break;
        case 131:
            fish["image"] = require('../assets/fish/131.jpg');
            break;
        case 132:
            fish["image"] = require('../assets/fish/132.jpg');
            break;
        default: 
            fish["image"] = require('../assets/fish/132.jpg');
            break;
    }
      fish["imgPackaged"]=true;
      this.navigate (id)
    }

//    if(!("catchMethod" in fish))
 //     fish['catchMethod']=[['unknown',[true,true,true]]];
      
 //   if(!("origin" in fish))
  //    fish['origin']=[['unknown',[true,true,true]]];
   
    

})
  .catch((err) => {
   // alert(err.message, err.code);
  }); 
  };

  _species(search){
      var dataBlob = []
      for (var ii = 0; ii < this.props.species.length; ii++) {
        var other_name = [];
        var inothername = false;
        for (var x = 0; x<2; x++){
          
          if (x<this.props.species[ii].other_names.length){
            if (this.props.species[ii].other_names[x].name.toLowerCase().indexOf(search.toLowerCase())>-1) {
              inothername = true;
            }
            if(x==0){
              other_name.push(this.props.species[ii].other_names[x].name+", ");
            }
            else
              other_name.push(this.props.species[ii].other_names[x].name);
          
          }
          else{
            other_name.push("");
          }
        }

         if (inothername || species[ii].common_name.toLowerCase().indexOf(search.toLowerCase())>-1) {
          var go=false;
  if (this.props.color==0)
    if(this.props.species[ii].color[0])
      go=true;
  if (this.props.color==1)
    if(this.props.species[ii].color[1])
      go=true;
  if (this.props.color==2)
    if(this.props.species[ii].color[2])
      go=true;
  if (this.props.color==3)
      go=true;

  if(go){
        var gicon = this.props.species[ii].color[0] ? require('../assets/gLight.png') : require('../assets/nLight.png');
        var oicon = this.props.species[ii].color[1] ? require('../assets/oLight.png') : require('../assets/nLight.png');
        var ricon = this.props.species[ii].color[2] ? require('../assets/rLight.png') : require('../assets/nLight.png');
        var ID = ii;
        
        dataBlob.push([this.props.species[ii].common_name,other_name[0], other_name[1], gicon, oicon, ricon, ID]);
      };
    };
      }
      return dataBlob;
    }

    _renderRow(rowData, sectionID, rowID){
  return(

    <View>
          <TouchableHighlight
                style={styles.button}
                onPress={() => this.gotoFish(rowData[6])}
                underlayColor='grey'>
                <View style={styles.textimgholder}>
                  <View style={styles.textHolder}>
                    <Text numberOfLines={1} style={styles.buttonTitle}>{rowData[0]}</Text>
                   <Text numberOfLines={1} style={styles.buttonSubtitle}>{rowData[1]}{rowData[2]}</Text>
                    </View>
                    <View style={styles.imgholder}>
                      <Image source={rowData[3]}
                      style={styles.gicon}/>
                     <Image source={rowData[4]}
                     style={styles.oicon}/>
                     <Image source={rowData[5]}
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
  render(){
    var Search;
    if(Platform.OS==='ios'){
      Search =  
       
         <SearchBar
        placeholder='Search'
        onChange={this.handleChange.bind(this)} 

        />

      
    }
    else{
      Search =  
      <TextInput
              style={{height: 40, borderColor: 'grey', borderWidth: 2, marginBottom:0}}
              value={this.state.search}
              onChange={this.handleChange.bind(this)}  
              placeholder="search"/> 
    }

     return (
      <ScrollView style={styles.mainContainer} keyboardShouldPersistTaps={false} keyboardDismissMode={'on-drag'}>

      <FullSep />

      {Search}

              
               <Text style={styles.title}>SELECT A SPECIES</Text>
              <FullSep />
              <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
      />
              
     </ScrollView>

    
    )
  }
};


module.exports = Species;




