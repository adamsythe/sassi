var React = require('react-native');
var Species = require('./Species');
var CatchMethod = require('./CatchMethod');
var Separator = require('./helpers/Separator');
var FullSep = require('./helpers/FullSep');
var Origin = require('./Origin');
var Information = require('./Information');
var SearchBar = require('react-native-search-bar');

var RNFS = require('react-native-fs'); 
let myJSON = require('./database/database.json')  
//this is the packaged database.  The code starts off by using that 
//database and then checks if there is a downloaded database to replaceit with
//and then it checks to see if it needs to download a new database


var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  ListView,
  Navigator,
  NavigatorIOS,
  Platform,
  BackAndroid,
  AsyncStorage,
  Alert,
  ScrollView
} = React;


/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Copyright (C) Paul Johnston 1999 - 2000.
 * Updated by Greg Holt 2000 - 2001.
 * See http://pajhome.org.uk/site/legal.html for details.
 */

/*
 * Convert a 32-bit number to a hex string with ls-byte first
 */
var hex_chr = "0123456789abcdef";

function rhex(num)
{
  str = "";
  for(j = 0; j <= 3; j++)
    str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
           hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}

/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 */
function str2blks_MD5(str)
{
  nblk = ((str.length + 8) >> 6) + 1;
  blks = new Array(nblk * 16);
  for(i = 0; i < nblk * 16; i++) blks[i] = 0;
  for(i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters.
 */
function add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * These functions implement the basic operation for each round of the
 * algorithm.
 */
function cmn(q, a, b, x, s, t)
{
  return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t)
{
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t)
{
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t)
{
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t)
{
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Take a string and return the hex representation of its MD5.
 */
function calcMD5(str)
{
  x = str2blks_MD5(str);
  a =  1732584193;
  b = -271733879;
  c = -1732584194;
  d =  271733878;

  for(i = 0; i < x.length; i += 16)
  {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i+10], 17, -42063);
    b = ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = ff(d, a, b, c, x[i+13], 12, -40341101);
    c = ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = ff(b, c, d, a, x[i+15], 22,  1236535329);    

    a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = gg(c, d, a, b, x[i+11], 14,  643717713);
    b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = gg(c, d, a, b, x[i+15], 14, -660478335);
    b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = gg(b, c, d, a, x[i+12], 20, -1926607734);
    
    a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = hh(b, c, d, a, x[i+14], 23, -35309556);
    a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = hh(d, a, b, c, x[i+12], 11, -421815835);
    c = hh(c, d, a, b, x[i+15], 16,  530742520);
    b = hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i+10], 15, -1051523);
    b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = ii(d, a, b, c, x[i+15], 10, -30611744);
    c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);
  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}
 



var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 0,
    marginTop: 0,
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
    borderRadius: 1,
    color: '#000000',
    backgroundColor: 'white'
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    alignSelf: 'center',
    marginLeft:22
  },
  buttonTextLeftGreen: {
    fontSize: 16,
    color: '#6cad44',
    alignSelf: 'center',
    marginLeft:10
  },
  buttonTextLeftOrange: {
    fontSize: 16,
    color: '#e77d24',
    alignSelf: 'center',
    marginLeft:10
  },
  buttonTextLeftRed: {
    fontSize: 16,
    color: '#e11f25',
    alignSelf: 'center',
    marginLeft:10
  }, 
  buttonTextRight: {
    fontSize: 16,
    color: '#424242',
    alignSelf: 'center',
    marginLeft:0
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 0,
    flex: 1,
  },
  button2: {
    height: 66,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 0,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'stretch',
  },
  iconPic: {
    alignSelf:  'center',
    marginLeft: 22,
  },
  iconPicTest: {
    alignSelf:  'center',
    marginLeft: 22,
    height: 20,
    width: 20,
  },
  iconArrow: {
    position: 'absolute',
    right:11,
    top: 15
  },
   textimgholder: {
    flexDirection: 'row',
    flex: 1,
  },
  oicon: {
    marginLeft: 5,
  },
  ricon: {
    marginLeft: 5,
  },
  arrowIcon: {
    marginLeft: 14,
  },
  imgholder: {
     flexDirection: 'row',
     position: 'absolute',
    right:11,
    top: 27 
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
 
});

species=[]
function askmelater(){
  AsyncStorage.setItem("time", (new Date().getTime()).toString())
}

function download_pics (id){

  var path = RNFS.DocumentDirectoryPath + '/' + id + '.jpg';
  return fetch('http://webservice.wwfsassi.co.za/ws/web_image_thumb_get?id='+id)
     .then((response) => response.text())
      .then((responseText) => {
        var pic_object = JSON.parse(responseText)
        RNFS.writeFile(path, pic_object.response, 'base64')        
      });
}
function partners_download_pics (id){
  var path = RNFS.DocumentDirectoryPath + '/' + 'partner' +id + '.jpg';
  return fetch('http://webservice.wwfsassi.co.za/ws/web_partner_image_get?id='+id)
    .then((response) => response.text())
      .then((responseText) => {
        var pic_object = JSON.parse(responseText)
        RNFS.writeFile(path, pic_object.response, 'base64')        
      });
}





function what_pics_download(newDb){

  return_arry = []
  currentpicarry = {}
  newpicarry = {}
  console.log(myJSON)
  console.log(newDb)
  for (var i = 0; i < myJSON.response.species.length; i++) {
    currentpicarry[myJSON.response.species[i].id]= myJSON.response.species[i].image_hash
  }
  for (var i = 0; i < newDb.response.species.length; i++) {
    newpicarry[newDb.response.species[i].id]= newDb.response.species[i].image_hash
  }

  for (var i in newpicarry){
    if (newpicarry[i] != currentpicarry[i]){
      return_arry.push(i)
    }
  }

  return return_arry

}

function partners_pics_download(newDb){

  return_arry = []
  currentpicarry = {}
  newpicarry = {}
  for (var i = 0; i < myJSON.response.partners.length; i++) {
    currentpicarry[myJSON.response.partners[i].id]= myJSON.response.partners[i].image_hash
  }
  for (var i = 0; i < newDb.response.partners.length; i++) {
    newpicarry[newDb.response.partners[i].id]= newDb.response.partners[i].image_hash
  }


  for (var i in newpicarry){
    if (newpicarry[i] != currentpicarry[i]){
      return_arry.push(i)
    }
  }



    return return_arry
  }


function update(){
 
  fetch('http://webservice.wwfsassi.co.za/ws/manifest_get')
    .then((response) => response.text())
      .then((responseText) => {  
        var newDb = responseText
        var pics_needed = what_pics_download(JSON.parse(newDb))
        var partners_pics_needed = partners_pics_download(JSON.parse(newDb))
        // var p = new Promise(function(resolve, reject) {
        //   for (var i = 0; i < pics_needed.length; i++) {
        //     download_pics(pics_needed[i])
        //   }
        //   for (var i = 0; i < partners_pics_needed.length; i++) {
        //     partners_download_pics(partners_pics_needed[i])
        //   }
        //   resolve('Success!');
        // })
        var pics_promises = pics_needed.map(function(pic) {
          return download_pics(pic);
        });
        var partners_pics_promises = partners_pics_needed.map(function(pic) {
          return partners_download_pics(pic);
        });
        var p = new Promise.all(pics_promises.concat(partners_pics_promises));
        p.then(function() { 
          AsyncStorage.setItem("database",responseText)
          AsyncStorage.removeItem("time")
          alert ("Success! \nYour update has been installed.")
          go()

        });
      })
  .catch((error) => {
    console.warn(error);
  });
  

}


//alert (RNFS.DocumentDirectoryPath)  
function go(){

  var calcMD5 = require("blueimp-md5");
  AsyncStorage.getItem("database").then((value) => {
   var storage = value
    if (storage != null) {

      //see what happens if storage does equal null
      my_hash = calcMD5(storage)
      //console.log (storage.substr(0, storage.length))
      myJSON=JSON.parse(storage)    
    }
    else
     {my_hash = calcMD5(myJSON)}
    create_database()
      fetch('http://webservice.wwfsassi.co.za/ws/hash_db', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
        })
      })
        .then((response) => response.text())
          .then((responseText) => {
            var response=JSON.parse(responseText)
            server_hash = response

          if (server_hash.response===my_hash) {
            //I want to keep this open in case I need to use it
          }
          else{
            AsyncStorage.getItem("time").then((value) => { 
              time_delay = 0;
              //86400000 * 5;
              var goforward = false;
              if (value == null) {
                goforward = true
              }
              if (value != null)
                if (parseInt(value)<(new Date().getTime()-time_delay))
                  goforward=true
              if (goforward) 
                Alert.alert(
                  'A new version of the SASSI list is available for download.',
                  '',
                  [
                  {text: 'Download now', onPress: () => update()},
                    {text: 'Ask me later', onPress: () => askmelater()},
                    
                  ]
                );
            }).done();
          }
        }).catch((error) => {

      });
    //send hash to server
    // on fail continue!.
    //if match we continue! Yay we have the latest DB.
    //on non-match we need to work!
  }).done();
}
go()



function create_database(){
function compare(a,b) {
  if (a.common_name < b.common_name)
    return -1;
  else if (a.common_name > b.common_name)
    return 1;
  else 
    return 0;
}

myJSON.response.species.sort(compare);
  species = []
  data_information = {}
  data_information.asc = myJSON.response.data_information[0].asc
  data_information.msc = myJSON.response.data_information[0].msc
  data_information.fishery_improvement = myJSON.response.data_information[0].fishery_improvement
  data_information.red = myJSON.response.data_information[0].red
  data_information.green = myJSON.response.data_information[0].green
  data_information.orange = myJSON.response.data_information[0].orange
  for (var i = 0; i < myJSON.response.species.length; i++) {

      tempSpecis = {};
      tempSpecis['description'] = myJSON.response.species[i].short_description;
      tempSpecis['scientific_name'] = myJSON.response.species[i].scientific_name;
      tempSpecis['common_name'] = myJSON.response.species[i].common_name;
      tempSpecis['id'] = myJSON.response.species[i].id;
      tempSpecis['color'] = [false, false, false];
      tempSpecis['eco_label'] = [false, false, false];
      tempSpecis["catch_method"]= []
      tempSpecis["origin"]= []
      tempSpecis["image"] = require('../assets/logo.png')
      tempSpecis["imgPackaged"]=true;
      tempSpecis["other_names"]=myJSON.response.species[i].other_names;
     
      for (var j = 0; j < myJSON.response.species[i].status.length; j++){
        if (myJSON.response.species[i].status[j].status=='Green'){
           tempSpecis['color'][0]=true;
        };
        if (myJSON.response.species[i].status[j].status=='Yellow'){
           tempSpecis['color'][1]=true;
        };
        if (myJSON.response.species[i].status[j].status=='Red'){
           tempSpecis['color'][2]=true;
        };
        if (tempSpecis["catch_method"].indexOf(myJSON.response.species[i].status[j].catch_method_id)<0){
          tempSpecis["catch_method"].push(myJSON.response.species[i].status[j].catch_method_id);
        }
        if(myJSON.response.species[i].status[j].eco_label=='asc')
          tempSpecis['eco_label'][0]=true;
        if(myJSON.response.species[i].status[j].eco_label=='msc')
          tempSpecis['eco_label'][1]=true;
        if(myJSON.response.species[i].status[j].eco_label=='improvement project')
          tempSpecis['eco_label'][2]=true;
        tempSpecis.data_information=data_information;
      };
    //  alert ("push")
      species.push(tempSpecis);


    };
  

};


class Main extends React.Component{
  constructor(props){
    super(props)
      this._renderRow = this._renderRow.bind(this);
      this.navigate = this.navigate.bind(this);
      this.gotoFish = this.gotoFish.bind(this);
      this.gotoSpecies=this.gotoSpecies.bind(this);
      this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      this.state = {
        search: '',
        error: false,
        dataSource: this.ds.cloneWithRows(this._species("")),  
      }

    }
    componentDidMount(){
    };
  handleChange(e){    
    this.setState({
      search: (e.nativeEvent.text),
      dataSource: this.ds.cloneWithRows(this._species(e.nativeEvent.text)),
    })
  };

  gotoSpecies(){
    if(Platform.OS==='ios'){
      this.props.navigator.push({
          title: 'Species',
          component: Species,
          passProps: {color:3, species:species, myJSON:myJSON},
          backButtonTitle: 'Back',
      });
    }
    else{
      this.props.navigator.push({
        component: Species,
        props: {color:3, species:species, myJSON:myJSON},
      });
    };
  }
  gotoGreen(){
   if(Platform.OS==='ios'){
      this.props.navigator.push({
          title: 'Species',
          component: Species,
           passProps: {color:0, species:species, myJSON:myJSON},
           backButtonTitle: 'Back',
        });
    }
    else{
      this.props.navigator.push({
        component: Species,
        props: {color:0, species:species, myJSON:myJSON},
      });
    };
  }
  gotoOrange(){
    if(Platform.OS==='ios'){
      this.props.navigator.push({
          title: 'Species',
          component: Species,
          passProps: {color:1, species:species, myJSON:myJSON},
          backButtonTitle: 'Back',
      });
    }
    else{
      this.props.navigator.push({
        component: Species,
        props: {color:1, species:species, myJSON:myJSON},
      });
    };
  }
  gotoRed(){
   if(Platform.OS==='ios'){
      this.props.navigator.push({
          title: 'Species',
          component: Species,
          passProps: {color:2, species:species, myJSON:myJSON},
          backButtonTitle: 'Back',
      });
    }
    else{
      this.props.navigator.push({
        component: Species,
        props: {color:2, species:species, myJSON:myJSON},
      });
    };
  }
  navigate(id){
    catchMethod= []
    if(fish.color[0] || fish.color[1] || fish.color[2])
      for (var i = 0; i < fish.catch_method.length; i++){
        temp_catchMethod={}
        for(var catchLoop = 0; catchLoop<myJSON.response.catch_method.length; catchLoop++){
          if (myJSON.response.catch_method[catchLoop].id==fish.catch_method[i]){
            temp_catchMethod["name"]=myJSON.response.catch_method[catchLoop].name
            temp_catchMethod["description"]=myJSON.response.catch_method[catchLoop].description;
          };
        };
       console.log(fish)
        temp_catchMethod["color"]=[false, false, false]
        temp_catchMethod["eco_label"]=[false, false, false]
   
        temp_catchMethod["id"]=fish.catch_method[i]
        for (var j = 0; j < myJSON.response.species[id].status.length; j++){
          if (myJSON.response.species[id].status[j].catch_method_id==fish.catch_method[i]) {
            if(myJSON.response.species[id].status[j].status=='Green'){
              temp_catchMethod["color"][0]=true
            }
            if(myJSON.response.species[id].status[j].status=='Yellow'){
              temp_catchMethod["color"][1]=true
            }
            if(myJSON.response.species[id].status[j].status=='Red'){
              temp_catchMethod["color"][2]=true
            }
            if(myJSON.response.species[id].status[j].eco_label=='asc')
              temp_catchMethod['eco_label'][0]=true;
            if(myJSON.response.species[id].status[j].eco_label=='msc')
              temp_catchMethod['eco_label'][1]=true;
            if(myJSON.response.species[id].status[j].eco_label=='improvement project')
              temp_catchMethod['eco_label'][2]=true;
          }
        };
        catchMethod.push(temp_catchMethod)
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
              passProps: {catchMethod:catchMethod, myJSON:myJSON, fish:fish, status:myJSON.response.species[id]},
              backButtonTitle: 'Back',
            }); 
        else{
          this.props.navigator.push({
            component: CatchMethod,
            props: {catchMethod:catchMethod, myJSON:myJSON, fish:fish, status:myJSON.response.species[id]},
          });
        }}
      else{
        method = catchMethod[0];
        origin = []
        if(fish.color[0] || fish.color[1] || fish.color[2])
          for (var i = 0; i < myJSON.response.species[id].status.length; i++){
            tempOrigin = {}
            tempOrigin["color"]=[false, false, false]
            tempOrigin["eco_label"]=[false, false, false]
            if (myJSON.response.species[id].status[i].status=="Green") {
              tempOrigin.color[0]=true
            };
            if (myJSON.response.species[id].status[i].status=="Yellow") {
              tempOrigin.color[1]=true
            };
            if (myJSON.response.species[id].status[i].status=="Red") {
              tempOrigin.color[2]=true
            };
            if (myJSON.response.species[id].status[i].eco_label=='asc')
              tempOrigin['eco_label'][0]=true;
            if (myJSON.response.species[id].status[i].eco_label=='msc')
              tempOrigin['eco_label'][1]=true;
            if (myJSON.response.species[id].status[i].eco_label=='improvement project')
              tempOrigin['eco_label'][2]=true;

        tempOrigin['origin_id']= myJSON.response.species[id].status[i].origin_id;

        for(var originLoop = 0; originLoop<myJSON.response.origin.length; originLoop++){
          if (myJSON.response.origin[originLoop].id==tempOrigin['origin_id']){
            tempOrigin["name"]=myJSON.response.origin[originLoop].name
            tempOrigin["description"]=myJSON.response.origin[originLoop].description;
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
      } 
    };
  }

  gotoFish(id){
   fish = species[id] 


   RNFS.readDir(RNFS.DocumentDirectoryPath)
   .then((result) => {

   var picInPhone = false;
    for (var i =0; i < result.length; i++) {
      if (fish.id+'.jpg' == result[i].name){
        picInPhone =true
      }
    }
    if (picInPhone){
      RNFS.readFile(RNFS.DocumentDirectoryPath + '/' + fish.id +'.jpg', 'base64')
        .then((result) => {

          fish["image"] = 'data:image/png;base64,'+result;
            fish["imgPackaged"]=false;
            this.navigate (id)
        })
    }
    else{

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
  
  
 })
  .catch((err) => {
  //  alert(err.message, err.code);
  }); 

  };

  _species(search){
      var dataBlob = []

      for (var ii = 0; ii < species.length; ii++) {
         var inothernames = false;
         var other_name = [];
          for (var x = 0; x<species[ii].other_names.length; x++){
            if(species[ii].other_names[x].show_in_search){
   
              if (species[ii].other_names[x].name.toLowerCase().indexOf(search.toLowerCase())>-1) {
                inothernames=true;
              }
            

            
              other_name.push(species[ii].other_names[x].name);
              if (x<species[ii].other_names.length-1)
                other_name.push(", ")
          
              }
            }
            if (inothernames || species[ii].common_name.toLowerCase().indexOf(search.toLowerCase())>-1) {
              var gicon = species[ii].color[0] ? require('../assets/gLight.png') : require('../assets/nLight.png');
              var oicon = species[ii].color[1] ? require('../assets/oLight.png') : require('../assets/nLight.png');
              var ricon = species[ii].color[2] ? require('../assets/rLight.png') : require('../assets/nLight.png');
              var ID = ii;
              dataBlob.push([species[ii].common_name, other_name,"", gicon, oicon, ricon,ID]);
            };
          }
          return dataBlob;
        }

    _renderRow(rowData, sectionID, rowID){
      return(

        <View>
          <TouchableHighlight
              style={styles.button2}
              onPress={() => this.gotoFish(rowData[6])}
              underlayColor='grey'>
                <View style={styles.textimgholder}>
                  <View style={styles.textHolder}>
                    <Text numberOfLines={1} style={styles.buttonTitle}>{rowData[0]}</Text>
                    <Text numberOfLines={1} style={styles.buttonSubtitle}>{rowData[1]}</Text>
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
      <FullSep />
      Search =  
      <View>
        <FullSep />
        <TextInput
          style={{height: 40, borderColor: 'grey', borderWidth: 2, marginBottom: 0}}
          value={this.state.search}
          onChange={this.handleChange.bind(this)} 
          placeholder="search"/> 
 
      </View>

    }
    var MainContent;
    lengthSearch=this.state.search.length;
     
    var list=[];
     

    if (lengthSearch<=0){
      MainContent= 
        <ScrollView keyboardShouldPersistTaps={false}>
          <Text style={styles.title}>SEARCH BY SPECIES</Text>
          <View>
            <FullSep />
            <TouchableHighlight
              style={styles.button}
              onPress={this.gotoSpecies.bind(this)}
              underlayColor='grey'>
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Select a species</Text>
                  <Image source={require('../assets/arrowIcon.png')} 
                    style={styles.iconArrow}/>
                </View>
              </TouchableHighlight>
              <FullSep />
            </View>

            <Text style={styles.title}> SEARCH BY STATUS</Text>
            <View> 
              <FullSep />
              <View>

                <TouchableHighlight
                  style={styles.button}
                  onPress={this.gotoGreen.bind(this)}
                    underlayColor='grey'>
                      <View style={styles.buttonContainer}>
                        <Image source={require('../assets/greenIcon.png')} 
                          style={styles.iconPic}/>
                        <Text style={styles.buttonTextLeftGreen}>Green </Text>
                        <Text style={styles.buttonTextRight}>- best choice</Text>
                        <Image source={require('../assets/arrowIcon.png')} 
                          style={styles.iconArrow}/>
                      </View>
                    </TouchableHighlight>
                    <Separator />
                  </View>
                  <View>
                    <TouchableHighlight
                      style={styles.button}
                        onPress={this.gotoOrange.bind(this)}
                        underlayColor='grey'>
                          <View style={styles.buttonContainer}>
                            <Image source={require('../assets/orangeIcon.png')} 
                              style={styles.iconPicTest}/>
                            <Text style={styles.buttonTextLeftOrange}>Orange </Text>
                            <Text style={styles.buttonTextRight}>- think twice</Text>
                            <Image source={require('../assets/arrowIcon.png')} 
                              style={styles.iconArrow}/>
                          </View>
                        </TouchableHighlight>
                        <Separator />
                      </View>

                      <View>
                        <TouchableHighlight
                          style={styles.button}
                          onPress={this.gotoRed.bind(this)}
                          underlayColor='grey'>
                            <View style={styles.buttonContainer}>
                              <Image source={require('../assets/redIcon.png')} 
                                style={styles.iconPic}/>
                              <Text style={styles.buttonTextLeftRed}>Red </Text>
                              <Text style={styles.buttonTextRight}>- don't buy</Text>
                              <Image source={require('../assets/arrowIcon.png')} 
                                style={styles.iconArrow}/>
                            </View>
                          </TouchableHighlight>
                 
                        </View>
                        <FullSep />
                      </View> 
                    </ScrollView> 
      }
      else{

      for (var i = 0; i < species.length; i++) {
        lengthSearch=this.state.search.length;

        if (this.state.search==species[i].common_name.substring(0,lengthSearch)){


        };
     };
     MainContent=<ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
      />;
   };

     

    return(
      <ScrollView style={styles.mainContainer} keyboardShouldPersistTaps={false} keyboardDismissMode={'on-drag'}>
      
        {Search}

              {MainContent}

              
              

      </ScrollView>
      
    )
  }

}


module.exports = Main;