import React, { Component } from 'react';
import {
   
    Container,
    Contenet,
    Footer,
    Button,
    FooterTab,
    Icon,
    Text,
    Content,
    
} from "native-base"
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

// import Icon from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import Global from './Global';
import humenBack from '../assets/images/humenBack.png';

class ProfileAdmin extends React.Component {
  
  interest_data = [];
  constructor(props) {
          super(props);
         
          this.state = {

            name : '',
            gender : '',
            birthday : '',
            picUrl : '',
            phoneNumber : '',
            interest1 : '',     
            interest2 : '',     
            is_flag : false,

         }
        }
    static navigationOptions = {
      title: "Profile",
    };
    componentWillMount() {
       /////////// based on Global.toPerson, to get user's profile.
        this.getProfile();
         
        //   this._getLocationAsync();
    }
     getProfile = async() => {
    
        userRef = firebase.database().ref("/users/" + Global.toPerson);
       userRefInterest =  firebase.database().ref("/users/" + Global.toPerson + "/interest");
       var interest1 = "";
       var interest2 = "";
       var count = 0
       await  userRefInterest.on('child_added', function(snapshot)
       {
           count++;
           console.log("count =======" +  count);
           if(count < 5)
           {

            interest1 = interest1 + snapshot.val();
            interest1 = interest1 + ", ";
           }
           else
           {
            interest2 = interest2 + snapshot.val();
            interest2 = interest2 + ", ";
           }
           
           
      
       });
       
       await  userRef.once('value').then(snapshot =>
        {
                this.setState({name : snapshot.val().name});
                var gender = "man";
                if(snapshot.val().gender === 2) gender = "women";
                this.setState({gender: gender});
                this.setState({birthday : snapshot.val().birthday});
                this.setState({picUrl : snapshot.val().cameraUrl});
                this.setState({is_flag : true});
                this.setState({phoneNumber : snapshot.val().phoneNumber});
        });
       
        this.setState({interest1: interest1});
        this.setState({interest2: interest2});

    }
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
 check_request_data()
 {
    if(this.state.dateType==='' && this.state.datetime==='' && this.state.location==='' && this.state.description==='')
        this.setState({is_requested:false});
 }
  render() {
    const { selectedItems } = this.state;
    var {navigate} = this.props.navigation;
    return (
      <Container>          
      <Content>
          <View style={{marginTop:20, alignItems: 'center', justifyContent: 'center' }}>
           {this.state.is_flag &&  <Image source={{ uri: this.state.picUrl}} style={{ width: 150, height: 150 }} />}
           {!this.state.is_flag && <Image source={ humenBack } style={{ width: 150, height: 150 }} />}       
          </View> 
        <View style={{marginTop:10, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{color:'black', fontSize:20}}>{this.state.name}'s Profile</Text>  
        </View>           
        <View style={styles.frame}>
            <View style={styles.inputWrapper}>
                    <Text style ={{marginLeft : 20,color:"black", fontSize:20}}> Name : </Text>   
                    <Text style ={{marginLeft : 10,color:"green", fontSize:17}}>{this.state.name}</Text>   

                    <Text style ={{marginLeft : 20,color:"black", fontSize:20}}> Gender : </Text>   
                    <Text style ={{marginLeft : 10,color:"green", fontSize:17}}>{this.state.gender}</Text>     

            </View>
            <View style={styles.inputWrapper}>
                    <Text style ={{marginLeft : 20,color:"black", fontSize:20}}> Birthday : </Text>   
                    <Text style ={{marginLeft : 10,color:"green", fontSize:17}}>{this.state.birthday}</Text>            
            </View>   
            <View style={styles.inputWrapper}>
                    <Text style ={{marginLeft : 20,color:"black", fontSize:20}}> Phone Number :</Text>   
                    <Text style ={{marginLeft : 10,color:"green", fontSize:17}}>{this.state.phoneNumber}</Text>                  
            </View>   
            <View style={styles.inputWrapper}>
                    <Text style ={{marginLeft : 20,color:"black", fontSize:20}}> Interest : </Text>   
                    <Text style ={{marginLeft : 10,color:"green", fontSize:17}}>{this.state.interest1}</Text>                  
            </View>  
            <View style={styles.inputWrapper}>
                    <Text style ={{marginLeft : 20,color:"black", fontSize:20}}> {"  "} </Text>   
                    <Text style ={{marginLeft : 10,color:"green", fontSize:17}}>{this.state.interest2}</Text>                  
            </View>    
        </View>
        
        <View style={{marginTop:10, alignItems: 'center', justifyContent: 'center' }}>
        
            <Text style={{color:'black', fontSize:20}}> Created Dating Info </Text>  
        
        </View>
        
        <ScrollView> 
                <Items
                   navigation = {navigate}
                   ref={done => (this.done = done)}  />
        </ScrollView>
      </Content>      
       <Footer>
                <FooterTab>
                    <Button style={{backgroundColor:'#FFFFFF'}}  transparent onPress = {()=>navigate("Home")}>
                    <Icon type="FontAwesome" name="home" style={{color: 'green'}}/>
                    <Text style={{color: 'green'}}>Home</Text>
                    </Button>

                    <Button style={{backgroundColor:'#FFFFFF'}}  transparent>
                    <Icon type="Zocial" name="persona" style={{color: 'green'}}/>
                    <Text style={{color: 'green'}}>Profile</Text>
                    </Button>           

                    <Button style={{backgroundColor:'#FFFFFF'}} transparent  onPress = {()=>navigate("Setting")}>              
                    <Icon type="MaterialIcons" name="settings" style={{color: 'green'}}/>
                    <Text style={{color: 'green'}}>Setting</Text>
                    </Button>
                </FooterTab>
        </Footer>
 </Container>
     
    );
  }
 
}

class Items extends React.Component {
    constructor(props) {
          super(props);
          }
    state = {
      items: [],
      selected : false,

    };
  
    componentWillMount() {
      
      this.update();
    }
    render() {
      
      const { items } = this.state;
       if (items === null || items.length === 0) {
        return null;
      }
      return (
  
        <View style={{ margin: 7 } }>
  
          {items.map(({ id, dateType, datetime, location, description, name, phone }) => (
              <TouchableOpacity                
                style = { styles.item_list}                
                key={id}>
                           
                <View style = {{flexDirection:'column',top:5}}>
                  
                   <View style = {{flexDirection:'row', paddingLeft : 5}}>
                        <Text style={{ marginLeft:10, color:"red",fontSize:20}}> To : {name}   </Text>
                        <Text style ={{marginLeft : 5,color:"red", fontSize:17}}> ({phone})   </Text>        
                   </View>  
                  
                  <View style = {{flexDirection:'row', paddingLeft : 5}}>
                        <Text style={{ marginLeft:0,fontWeight: 'bold',fontSize:20}}> Date Type :   </Text>
                        <Text style ={{marginLeft : 5,color:"green", fontSize:17}}>  {dateType}  </Text>        
                   </View>     
                   <View style = {{flexDirection:'row',paddingLeft : 5}}>    
                    <Text style={{ marginLeft:0,fontWeight: 'bold',fontSize:20}}> Date Time :   </Text>
                        <Text style ={{marginLeft : 5,color:"green", fontSize:17}}> {datetime}  </Text>      
                   </View>    
                   <View style = {{flexDirection:'row', paddingLeft : 5}}>
                    <Text style={{marginLeft:0,fontWeight: 'bold',fontSize:20}}> Location :    </Text>
                        <Text style ={{marginLeft : 5,color:"green", fontSize:17}}>  {location} </Text>     
                   </View>
                   <View style = {{flexDirection:'row', paddingLeft : 5}}>   
                    <Text style={{marginLeft:0,fontWeight: 'bold',fontSize:20}}> Description :</Text>
                        <Text style ={{marginLeft : 5,color:"green", fontSize:17}}>  {description} </Text>    
                   </View>    
             
                </View>
             </TouchableOpacity>

   
          ))}
        </View>
      );
    }

    update = async() => {
        
        /////////  using looking for key//////////////////////////////
        console.log("update");
        const user = firebase.auth().currentUser;
        var userId = user.uid;
        itemsRef = firebase.database().ref("/user_dating/" + Global.toPerson);
        var items = [];  
        await  itemsRef.on('value', (snap) => {
       
                  // get children as an array
                  snap.forEach((child) => {
                      console.log("child - key   " + child.key);
                    items.push({
                            id: child.key,
                            dateType : child.val().dateType,
                            datetime : child.val().datetime,
                            location :  child.val().location,
                            description : child.val().description,
                            name : child.val().name,
                            phone : child.val().phone,
                          });
                  });
                  this.setState({
                    items: items
                  });
            }); 


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
  item_list : 
  {
    flexDirection:'row',
    // height:150,
    alignItems:'center',
    backgroundColor:'white',
    borderTopColor:'#ccc',
    borderTopWidth:1,
    paddingHorizontal:15
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
 frame: {
    width: DEVICE_WIDTH - 20,
    height: 160,
    marginTop : 5,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: 1,
  },
  frameScroll: {
    width: DEVICE_WIDTH - 20,
    height: 300,
    marginTop : 5,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: 1,
  },

inputWrapper: {
  flex: 1,
  marginTop:5,
  flexDirection: 'row', 
},
  
});
export default ProfileAdmin; 
