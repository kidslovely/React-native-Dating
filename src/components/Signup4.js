import React, { Component } from 'react';
import {
   
  Container,
  Contenet,
  Footer,
  Button,
  FooterTab,
  Text,
  Content,
  
} from "native-base";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableHighlight,
  ScrollView,
  ImageBackground,Dimensions,Image,TouchableOpacity, Alert,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import SwitchButton from 'switch-button-react-native';

import { Constants, Location, Permissions } from 'expo';

import Icon from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import Global from './Global';
import photoimage from '../assets/images/empty_image.jpeg';


var items = [{
  id: '0',
  name: 'Music',
}, {
  id: '1',
  name: 'Reading',
}, {
  id: '2',
  name: 'Gamming',
}, {
  id: '3',
  name: 'Gardening',
}, {
  id: '4',
  name: 'Dancing',
}, {
  id: '5',
  name: 'Sports',
}, {
  id: '6',
  name: 'Running',
}, {
  id: '7',
  name: 'Parkour',
}, {
  id: '8',
  name: 'Art',
}, 
{
  id: '9',
  name: 'Hiking',
},
{
  id: '10',
  name: 'Cars',
},
{
  id: '11',
  name: 'Boats',
},
{
  id: '12',
  name: 'Aviation',
}, {
  id: '13',
  name: 'Travel',
}, 
{
  id: '14',
  name: 'Camping',
},
{
  id: '15',
  name: 'Makeup',
},
{
  id: '16',
  name: 'Bowling',
},
{
  id: '17',
  name: 'Shopping',
},
{
  id: '18',
  name: 'Animals',
},
{
  id: '19',
  name: 'TV',
},
{
  id: '20',
  name: 'Cooking',
},
{
  id: '21',
  name: 'Singing',
},
{
  id: '22',
  name: 'Photography',
},
{
  id: '23',
  name: 'Collector',
},
];
class Signup4 extends React.Component {
  
  interest_data = [];
  constructor(props) {
          super(props);
         
          this.state = {
            name: '',
            error: false,
            isLoading: false,    
            gender : 1,
            locationResult: null,
            locationLatitude : '',
            locationLogitude :  '',
            is_photo:true,
            selectedItems :[],
          }
        }
    static navigationOptions = {
      title: "Sign Up",
    };
    addItem = (path) =>
    {
       var messageListRef = firebase.database().ref(path);

       messageListRef.set({

          'name': Global.name,
          'email':  '',
          'phoneNumber':  Global.phoneNumber,
          'birthday':  Global.birthday,
          'gender' : this.state.gender,
          'latitude': this.state.locationLatitude,
          'longitude' : this.state.locationLogitude,
          'cameraUrl' : Global.downloadURLCamera,
          'picUrl' : Global.downloadURLPic,
 
        });
        var interestListRef = firebase.database().ref(path + "/interest");
        
        var s_inerest=this.state.selectedItems;
      
        for(s in s_inerest)
        {
          interestListRef.child(items[s_inerest[s]].id).set(items[s_inerest[s]].name);
        }
   }
   onSave = () => {

    //  var s_inerest=this.state.selectedItems;
    //  var str='';
    //  for(s in s_inerest)
    //    {
    //      this.interest_data.push({id :items[s_inerest[s]].id, name:items[s_inerest[s]].name });
       

    //   //   str=str+":"+items[s_inerest[s]].name;
    //    }
      //  console.log(this.interest_data);
   //  Alert.alert(str);
      this.addItem('/users/' + Global.u_id);
      this.props.navigation.navigate("BeforeHome");

    }
    componentDidMount() {
      this._getLocationAsync();
    }
    
    _getLocationAsync = async () => {
    
         
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: JSON.stringify(location) });
      this.setState({ locationLatitude:  JSON.parse(this.state.locationResult)["coords"]["latitude"]});
      this.setState({ locationLogitude:  JSON.parse(this.state.locationResult)["coords"]["longitude"] });
    };
 
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems:selectedItems });
  };
  check_camera_image()
  {
    if(Global.downloadURLCamera===null)
    {
      this.setState({is_photo:false });
    }
  }

  render() {
    const { selectedItems } = this.state;
  
    return (
      <Container>          
      <Content>
      {/* <ScrollView style={{flex: 1,height:DEVICE_HEIGHT*2}}>  */}
          <View style={{marginTop : 20, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <Image source={{ uri: this.props.navigation.state.params.url}} style={{ width: 150, height: 150 }}/>
          </View>          
          <View style={styles.inputWrapper}>
           <Text style ={{marginLeft : 20,color:"green", fontSize:20}}> What is your gender? </Text>            
           <SwitchButton
               onValueChange={(val) => this.setState({ gender: val })}  
               text1 = 'Man'                       
               text2 = 'Woman'                 
               switchWidth = {130}  
               switchHeight = {30} 
               switchdirection = 'rtl' 
               switchBorderRadius = {100}
               switchSpeedChange = {500} 
               switchBorderColor = 'green' 
               switchBackgroundColor = '#fff'
               btnBorderColor = '#00a4b9'
               btnBackgroundColor = 'green'
               fontColor = '#b1b1b1' 
               activeFontColor = '#fff'
           />
           </View>            
           <View style={styles.inputWrapper}>
            <Text style = {{marginLeft : 20, fontSize:20,color : 'green',}}>What is your interest?</Text>
            </View> 
             <View style={{ flex: 1, marginLeft:20, width:300,borderColor: "#0000ff"}}>
              <MultiSelect
                hideTags
                items={items}
                uniqueKey="id"
                ref={(component) => { this.multiSelect = component }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="select your interests"
                searchInputPlaceholderText="select your interests"
                onChangeInput={ (text)=> console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="green"
                tagTextColor="#CCC"
                selectedItemTextColor="green"
                selectedItemIconColor="green"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: 'green' }}
                submitButtonColor="green"
                submitButtonText="Submit"
              />              
            </View>              
           <View style={styles.inputWrapper}>
               <TouchableOpacity
                     style={styles.button}                        
                     onPress={()=>this.onSave()}>                          
                     <Text style={{color:'#ffffff'}}>Finish</Text>                        
               </TouchableOpacity>
           </View>
          {/* </ScrollView>  */}
       </Content>      
 </Container>
     
    );
  }
 
}
 const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#2a8ab7'
  },
  container: {
    flex: 1,
    top: 0,
  },
  button: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    height: 40,
    width: DEVICE_WIDTH - 40,
    borderRadius: 20,
    zIndex: 100,
  },

inputWrapper: {
  flex: 1,
  marginTop:50,
  flexDirection: 'row', 
},
  
});
export default Signup4; 
