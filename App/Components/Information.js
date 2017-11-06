var React = require('react-native');
var Separator = require('./helpers/Separator');
var FullSep = require('./helpers/FullSep');
var Msvcertified = require('./Msvcertified.js');
var Where = require('./Where.js');
var Color = require('./Color.js');
var FisheryImprovementProject = require('./FisheryImprovementProject.js');
var RNFS = require('react-native-fs'); 
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
    marginTop:25,
    width: 200
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
  colorIcon: {
    marginRight:10,
  },
   ascIcon: {
    marginRight:10,
    width: 16,
     height: 27
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
    width:230
  },
  title: {
    marginBottom: 12,
    fontSize: 13,
    color: '#a9a9a9',
    marginLeft: 11,
    marginTop: 23,
    width:200
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
    width:250
  },
  infosubTitle:{
    color:"#a4a4a4",
    width:250
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


class Information extends React.Component{
  constructor(props){
    super(props)
    this.gotoWhere = this.gotoWhere.bind(this);
    if (this.props.origin.color[0]) {
      this.colour="Green"
    };
    if (this.props.origin.color[1]) {
      this.colour="Orange"
    };
    if (this.props.origin.color[2]) {
      this.colour="Red"
    };
  }
gotoMsc(){
      this.props.navigator.push({
        title: 'MSC Certified',
        component: Msvcertified,
         passProps: {paragraph:this.props.fish.data_information.msc, header: 'MSC'},
         props: {paragraph:this.props.fish.data_information.msc, header: 'MSC'},
         backButtonTitle: 'Back',
      });
  };
  gotoAsc(){
      this.props.navigator.push({
        title: 'ASC Certified',
        component: Msvcertified,
         passProps: {paragraph:this.props.fish.data_information.asc, header: 'ASC'},
         props: {paragraph:this.props.fish.data_information.asc, header: 'ASC'},
         backButtonTitle: 'Back',
      });
  };
  gotoFip(){
      this.props.navigator.push({
        title: 'Fishery Improvement Project',
        component: Msvcertified,
         passProps: {paragraph:this.props.fish.data_information.fishery_improvement, header: "Fishery Improvement"},
         props: {paragraph:this.props.fish.data_information.fishery_improvement, header: "Fishery Improvement"},
         backButtonTitle: 'Back',
      });
  };
  gotoWhere(){
    console.log(this.props.origin)
      this.props.navigator.push({
        title: this.props.origin.name,
        component: Where,
         passProps: {description:this.props.origin.description, header: this.props.origin.name },
          props: {description:this.props.origin.description, header: this.props.origin.name},
         backButtonTitle: 'Back',
      });
  };
  gotoHow(){
      this.props.navigator.push({
        title: this.props.method.name,
        component: Where,
         passProps: {description:this.props.method.description,  header: this.props.method.name},
          props: {description:this.props.method.description,  header: this.props.method.name},
         backButtonTitle: 'Back',
      });
  };
  gotoColor(){
   
      this.props.navigator.push({
        title: this.colour,
        component: Color,
         passProps: {color:this.colour, paragraph: this.props.fish.data_information[this.colour.toLowerCase()]},
         props: {color:this.colour, paragraph: this.props.fish.data_information[this.colour.toLowerCase()]},
         backButtonTitle: 'Back',
      });
  };
  gotoFisheryImprovementProject(){
      this.props.navigator.push({
        title: "Fishery Improvement Project",
        component: FisheryImprovementProject,
         passProps: {},
         backButtonTitle: 'Back',
      });
  }; 
	render () {
    var header;
     if (Platform.OS==='ios') {
     
    }
    else{

      header= <View style= {styles.header}>
        <Text numberOfLines={1} style={styles.headerText}>{this.props.fish.common_name}</Text>
      </View>
    };
    if (this.props.fish.imgPackaged) {
      var topPic = <View style= {styles.bannerPicHolder}>
      
          <Image source={this.props.fish.image} 
           style={styles.bannerPic}/>
        </View>
        
    }
    else{
      var topPic = <View style= {styles.bannerPicHolder}>
          <Image style={{width: 200, height: 200, resizeMode: "contain", alignSelf: 'center'}} source={{uri: this.props.fish.image}}/>
        </View>
    }
    //for (var i = 0; i < this.props.fish.commonName.length; i++) {
     // if (i>0) 
   //     commonNames+=", ";
   //   commonNames+=this.props.fish.commonName[i];
    //};

    if (fish.other_names.length>0) {
      var commonNames = fish.other_names[0].name;
      for (var i = 1; i < fish.other_names.length; i++){
          commonNames+=", ";
        commonNames+=fish.other_names[i].name;
      };
    var common = 
<View>
    <Separator />
            <View style = {styles.fishInfoSection}>
              <Text style={styles.infoTitle}>Common names:</Text>
              <Text style={styles.infosubTitle}>{commonNames}</Text>
            </View>
</View>

};



if(this.props.origin.eco_label[0] || this.props.origin.eco_label[1] ||this.props.origin.eco_label[2]){
  var projectNotNone = 

          <Text numberOfLines={1} style={styles.title}>Projects</Text>
          
}

    if(this.props.origin.eco_label[0]){
      var msv = <TouchableHighlight
                          style={styles.button}
                          onPress={this.gotoAsc.bind(this)}
                          underlayColor='grey'>
                  <View style= {styles.mscSection}>
                    <View style= {styles.leftSide}>
                      <Image source={require('../assets/asc.jpg')} 
                        style={styles.ascIcon}/>
                      <View>
              
                        <View style={styles.textimgholder}>
                            <Text style={styles.onWhiteText}>ASC certified</Text> 
                            <View style={styles.imgHolder}>
                        </View>
                      </View>
                        
                        <Separator />
        
                    </View>
                    
                  </View>
        
                  <View style= {styles.rightSide}>
                  <Image source={require('../assets/iInverted.png')} 
                     style={styles.infoIcon}/>
                  <Image source={require('../assets/arrowIcon.png')} 
                     style={styles.arrowIcon}/>
                  </View>
                  
                 </View>
                 </TouchableHighlight>
    };

    if(this.props.origin.eco_label[1]){
  var msv = <TouchableHighlight
                          style={styles.button}
                          onPress={this.gotoMsc.bind(this)}
                          underlayColor='grey'>
                  <View style= {styles.mscSection}>
                    <View style= {styles.leftSide}>
                      <Image source={require('../assets/mscIcon.png')} 
                        style={styles.colorIcon}/>
                      <View>
              
                        <View style={styles.textimgholder}>
                            <Text style={styles.onWhiteText}>MSC certified</Text> 
                            <View style={styles.imgHolder}>
                        </View>
                      </View>
                        
                        <Separator />
        
                    </View>
                    
                  </View>
        
                  <View style= {styles.rightSide}>
                  <Image source={require('../assets/iInverted.png')} 
                     style={styles.infoIcon}/>
                  <Image source={require('../assets/arrowIcon.png')} 
                     style={styles.arrowIcon}/>
                  </View>
                  
                 </View>
                 </TouchableHighlight>
};



if(this.props.origin.eco_label[2]){
  msv=
    <TouchableHighlight
                  style={styles.button}
                  onPress={this.gotoFip.bind(this)}
                  underlayColor='grey'>
          <View style= {styles.mscSection}>
          <View style= {styles.leftSide}>
             <Text numberOfLines={1} style={styles.onWhiteText}>Fishery Improvement Project</Text>
          </View>
          <View style= {styles.rightSide}>
          <Image source={require('../assets/iInverted.png')} 
             style={styles.infoIcon}/>
          <Image source={require('../assets/arrowIcon.png')} 
             style={styles.arrowIcon}/>
          </View>
          
         </View>
</TouchableHighlight>
};



    if (!(this.props.origin.color[0]||this.props.origin.color[1]||this.props.origin.color[2])){
      color=<View></View>
    }
    if (this.props.origin.color[0]==true)
    color = <TouchableHighlight
                  style={styles.button}
                  onPress={this.gotoColor.bind(this)}
                  underlayColor='grey'>
       <View style= {styles.colorSectionGreen}>
         <View style= {styles.leftSide}>
            <Image source={require('../assets/icons-13.png')} 
             style={styles.colorIcon}/>
             <Text style={styles.colorText}>Green - best choice</Text>
          </View>
          <View style= {styles.rightSide}>
          <Image source={require('../assets/i.png')} 
             style={styles.infoIcon}/>
          <Image source={require('../assets/colorArrowIcon.png')} 
             style={styles.arrowIcon}/>
          </View>
        </View>
        </TouchableHighlight>

if (this.props.origin.color[1]==true)
    color = <TouchableHighlight
                  style={styles.button}
                  onPress={this.gotoColor.bind(this)}
                  underlayColor='grey'>
       <View style= {styles.colorSection}>
         <View style= {styles.leftSide}>
            <Image source={require('../assets/orangeIconInverted.png')} 
             style={styles.colorIcon}/>
             <Text style={styles.colorText}>Orange - think twice</Text>
          </View>
          <View style= {styles.rightSide}>
          <Image source={require('../assets/i.png')} 
             style={styles.infoIcon}/>
          <Image source={require('../assets/colorArrowIcon.png')} 
             style={styles.arrowIcon}/>
          </View>
        </View>
        </TouchableHighlight>


        if (this.props.origin.color[2]==true)
    color = <TouchableHighlight
                  style={styles.button}
                  onPress={this.gotoColor.bind(this)}
                  underlayColor='grey'>
       <View style= {styles.colorSectionRed}>
         <View style= {styles.leftSide}>
            <Image source={require('../assets/icons-10.png')} 
             style={styles.colorIcon}/>
             <Text style={styles.colorText}>Red - don't buy</Text>
          </View>
          <View style= {styles.rightSide}>
          <Image source={require('../assets/i.png')} 
             style={styles.infoIcon}/>
          <Image source={require('../assets/colorArrowIcon.png')} 
             style={styles.arrowIcon}/>
          </View>
        </View>
        </TouchableHighlight>

		return(

			<ScrollView style={styles.Container}>
      {header}
        <FullSep />
        {topPic}
       <FullSep />
       {color}
        
         <FullSep />

          <View style= {styles.choicesListSection}>
          <View style= {styles.ctSection}>
          </View>
          <TouchableHighlight
                  style={styles.button}
                  onPress={this.gotoHow.bind(this)}
                  underlayColor='grey'>
          <View style= {styles.mscSection}>
            <View style= {styles.leftSide}>
             
              <View>
      
                <View style={styles.textimgholder}>
                    <Text numberOfLines={1} style={styles.onWhiteText}>{this.props.method.name}</Text> 
                    <View style={styles.imgHolder}>
                </View>
              </View>
                
                <Separator />

            </View>
            
          </View>

          <View style= {styles.rightSide}>
          <Image source={require('../assets/iInverted.png')} 
             style={styles.infoIcon}/>
          <Image source={require('../assets/arrowIcon.png')} 
             style={styles.arrowIcon}/>
          </View>
          
         </View>
         </TouchableHighlight>
         <Separator />
         <TouchableHighlight
                  style={styles.button}
                  onPress={this.gotoWhere.bind("")}
                  underlayColor='grey'>
          <View style= {styles.mscSection}>
            <View style= {styles.leftSide}>
              
              <View>
      
                <View style={styles.textimgholder}>
                    <Text numberOfLines={1} style={styles.onWhiteText}>{this.props.origin.name}</Text> 
                    <View style={styles.imgHolder}>
                </View>
              </View>
                
                <Separator />

            </View>
            
          </View>

          <View style= {styles.rightSide}>
          <Image source={require('../assets/iInverted.png')} 
             style={styles.infoIcon}/>
          <Image source={require('../assets/arrowIcon.png')} 
             style={styles.arrowIcon}/>
          </View>
          
         </View>
         </TouchableHighlight>
         
             
             

            
          </View>
          <FullSep />

          <Text style={styles.title}>MORE ABOUT THIS FISH</Text>
          <FullSep />
          <View style={styles.fishInfo}>
            <View style = {styles.fishInfoSection}>
              <Text numberOfLines={1} style={styles.infoTitle}>Scientific name:</Text>
              <Text numberOfLines={1} style={styles.infosubTitle}>{this.props.fish.scientific_name}</Text>
            </View>
            {common}
            <Separator />
            <View style = {styles.fishInfoSection}>
              <Text style={styles.infoTitle}>Description:</Text>
              <Text style={styles.infosubTitle}>{this.props.fish.description}</Text>
            </View>
          </View>
          <FullSep />

          {projectNotNone}
          <FullSep />
        {msv}
          
          
         <FullSep />


			</ScrollView>
		)
	}
};



Information.propTypes = {
  fish: React.PropTypes.object.isRequired
}


module.exports = Information;




