
import React, { Component } from "react";
import {
   
    Container,
    Contenet,
    Footer,
    Button,
    FooterTab,
    Icon,
    Text,
    Content,
    Input,
    
} from "native-base"
import {   Image, SectionList, ScrollView,View,Dimensions,StyleSheet, ImageBackground,TouchableOpacity,TextInput,   } from "react-native";
import { LinearGradient } from 'expo';
// import logoImg from '../assets/images/logo.png';
import btn_prev from '../assets/images/btn_prev.png';
import btn_next from '../assets/images/btn_next.png';
import spinner from '../assets/images/loading.gif';

import * as Animatable from 'react-native-animatable';
import Global from "./Global";

import * as firebase from 'firebase'; // Version can be specified in package.json
import DatePicker from 'react-native-datepicker';
import logoImg from '../assets/images/logo.png';
import usernameImg from '../assets/images/username.png';
import passwordImg from '../assets/images/password.png';

///rjc


class Create extends Component {
  uid = '';
  messagesRef = null;
  
  constructor(props)
  {
    super(props);

    this.state = {
       flag_param : 0,
       isLoading : false,

       name:'',

        dateType : '',
        location : '',
        datetime : '',
        description : '',
    };
  }
 
  static navigationOptions = {
    title: "Create",
  };

handleNext()
{
    const uid = Global.u_id;     
    const imageRef = firebase.storage().ref('/images/').child(uid);
    const sampleImage = imageRef.getDownloadURL().then();
    const imageUrl = sampleImage.i;
    // console.log(sampleImage);    
    // console.log(imageUrl);
}
handlePrev()
{

}
componentWillMount() {
   this.getCreatedDate();
}
getCreatedDate = async() => {

    const user = firebase.auth().currentUser;
    var userId = user.uid;
    var interestItems = [];
    userRef = firebase.database().ref("/user_dating/" + userId + "/" + Global.toPerson);
    userNameRef = firebase.database().ref("/users/" + Global.toPerson);
 
    try{
        await  userRef.once('value').then(snapshot =>
            {
                    this.setState({dateType : snapshot.val().dateType});
               
                    this.setState({location : snapshot.val().location});
       
                    this.setState({datetime : snapshot.val().datetime});
       
                    this.setState({description : snapshot.val().description});
            });
       
            await  userNameRef.once('value').then(snapshot =>
               {
                       this.setState({name : snapshot.val().name});
                  
               });

    }
    catch(e)
    {
        console.log(e);
    }
   
 }

sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }
onPress()
{
    const user = firebase.auth().currentUser;
    ///create table for dating
    this.messagesRef = firebase.database().ref('dating');

    this.messagesRef.push({
        dateType : this.state.dateType,
        location : this.state.location,
        datetime : this.state.datetime,
        description : this.state.description,
        toPerson:Global.toPerson,
        user: user.uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
    ///////create table for user
    this.messagesRef = firebase.database().ref('user_dating/' + user.uid + '/'+ Global.toPerson);

    this.messagesRef.set({
        dateType : this.state.dateType,
        location : this.state.location,
        datetime : this.state.datetime,
        description : this.state.description,
        name : Global.toPersonName,
        phone : Global.toPersonPhone,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
    ///////create table for applicants
    this.messagesRef = firebase.database().ref('applicants_dating/' + Global.toPerson + '/' + user.uid );

    this.messagesRef.set({
        dateType : this.state.dateType,
        location : this.state.location,
        datetime : this.state.datetime,
        description : this.state.description,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
    this.props.navigation.navigate("Home");
}
render() {
  
   var {navigate} = this.props.navigation;
    
   return (
        //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
        //    <Image style={{ height: 100, flex: 1 }}  source = {require('../../images/home.jpg')} />
        //   </View> 
        <Container>
      
                <Content>
                <ScrollView style={{flex: 1,height:DEVICE_HEIGHT*1.8}}>
                           <View style={{marginTop:15, alignItems: 'center', justifyContent: 'center' }}> 
                            <Text style={{fontSize:18, color:"green"}}>You can create the date to {this.state.name} </Text>
                           </View> 
                            <View style={styles.inputWrapper}>
                           
                                <Text style = {styles.txt_title}>
                                    Date Type :
                                </Text>
                                
                                <TextInput style = {styles.input}  value = {this.state.dateType} onChangeText={dateType => this.setState({ dateType  })} >

                                </TextInput>    

                            </View>

                            <View style={styles.inputWrapper1}>
                           
                                <Text style = {styles.txt_title}>
                                    Location :
                                </Text>

                                <TextInput style = {styles.input}  value = {this.state.location} onChangeText={location => this.setState({ location })} >

                                </TextInput>    

                            </View>

                            <View style={styles.inputWrapper1}>
                           
                                <Text style = {styles.txt_title}>
                                    Date and Time :
                                </Text>

                                {/* <TextInput style = {styles.input}    onChangeText={datetime => this.setState({ datetime })}>

                                </TextInput> */}
                                <DatePicker
                                    style={{backgroundColor:'#fff',
                                    width: DEVICE_WIDTH - 40,
                                    height: 40,
                                    marginHorizontal: 20,
                                    // paddingLeft: 15,
                                    // paddingRight:10,                                    
                                   borderColor:'green',
                                   borderRadius: 10,
                                   }}
                                    
                                    date={this.state.datetime}
                                    mode="datetime"
                                    placeholder="your date time"
                                    androidMode="spinner"
                                    format="YYYY-MM-DD HH:mm"
                                    minDate="2018-08-01"
                                    maxDate="2035-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                        },
                                        dateInput: {
                                        marginLeft:0,
                                        borderRadius: 10,
                                        },
                                        dateText:{
                                        color: 'green',
                                        marginLeft:DEVICE_WIDTH/2-DEVICE_WIDTH+38,
                                        justifyContent: 'flex-start'
                                        },
                                        placeholderText:{
                                        color:"green",
                                        marginLeft:DEVICE_WIDTH/2-DEVICE_WIDTH+38,
                                        justifyContent: 'flex-start'
                                        }
                                    }}
                                    value = {this.state.datetime}
                                    onDateChange={(date) => {this.setState({datetime: date})}}
                                  />
                            </View>
                            
                            <View style={styles.inputWrapper1}>
                           
                                <Text style = {styles.txt_title}>
                                    Description : 
                                </Text>

                                <TextInput  multiline = {true}  style = {styles.inputDesc}   value = {this.state.description} onChangeText={description => this.setState({ description })}>

                                </TextInput>    

                            </View>

                               <TouchableOpacity
                                    style={styles.button}
                                    onPress = {()=>this.onPress()}>
                                    <Text style={{color:"#fff"}}>Publish</Text>                                    
                              </TouchableOpacity>
                    </ScrollView>   
                </Content>
                <Footer>
                <FooterTab>
                    <Button style={{backgroundColor:'#FFFFFF'}}  transparent onPress = {()=>navigate("Home")}>
                    <Icon type="FontAwesome" name="home" style={{color: 'green'}}/>
                    <Text style={{color: 'green'}}>Home</Text>
                    </Button>
                    <Button style={{backgroundColor:'#FFFFFF'}}  transparent >
                    <Icon type="MaterialIcons" name="person-add" style={{color: 'green'}}/>
                    <Text style={{color: 'green'}}> Create</Text>
                    </Button>
                    <Button style={{backgroundColor:'#FFFFFF'}}  transparent onPress = {()=>navigate("Profile")}>
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
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


const styles = StyleSheet.create({

      inputWrapper: {
        flex: 1,
        marginTop:40
      },
      inputWrapper: {
        flex: 1,
        marginTop:30
      },
      txt_title:
      {
        marginHorizontal: 20,
        marginBottom : 10,
        color:'green',
      },
      input: {
        width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 10,
        borderRadius: 10,
        borderColor: 'green',
        borderWidth: 1,
        color:'#000000',
  
        
      },
      button: {
        marginTop:40,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        height: 40,
        width: DEVICE_WIDTH - 40,
        borderRadius: 14,
        zIndex: 100,
      },
      inputDesc: {
        width: DEVICE_WIDTH - 40,
        height: 100,
        marginHorizontal: 20,
        paddingLeft: 10,
    
        borderRadius: 10,
        borderColor: 'green',
        borderWidth: 1,
        color:'#000000',
      },
});


export default Create;
