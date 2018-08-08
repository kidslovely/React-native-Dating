import React, { Component } from "react";
import {
   
    Container,
    Contenet,
    Footer,

    FooterTab,
    Icon,
    Text,
    Content,
    
} from "native-base"
import {   Image, SectionList, View,Dimensions,StyleSheet, ScrollView, ImageBackground,TouchableOpacity,TextInput, Alert,   Button,} from "react-native";

import * as firebase from 'firebase'; // Version can be specified in package.json
import Global from './Global';

import logoImg from '../assets/images/dating_icon.jpg';

import usernameImg from '../assets/images/username.png';
import passwordImg from '../assets/images/password.png';
import spinner from '../assets/images/loading.gif';
import PhoneInput from 'react-native-phone-input';
///rjc


class Login extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      flag_param : 0,
      isLoading : false,
      email :'',
      password : '',
      passErrorMessage :null,
      phonenumbererror:false,
      passworderror:false
    };
  }
 
  static navigationOptions = {
  header : null
  };

  onPress()
  {
    this.setState({isLoading : true});

    this.props.navigation.navigate("Signup1");
  }

  handleSignIn()
  {
   
   //validation start
    if(this.state.email=='')
    {
     this.setState({phonenumbererror:true}); 
     this.setState({passErrorMessage : "* phone number no input"});
     return;
    }
    else 
     this.setState({phonenumbererror:false});

     if(this.state.password=='')
     {
      this.setState({passworderror:true}); 
      this.setState({passErrorMessage : "* password no input"});
      return;
     }
     else 
      this.setState({passworderror:false});
    //validation end

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() =>{
      if(this.state.email === "+44123456@gmail.com") { this.props.navigation.navigate("BeforeHomeAdmin"); return;} 
      var userId = firebase.auth().currentUser.uid;
      Global.u_id = userId;
      this.props.navigation.navigate("BeforeHome");
    }).catch((error) => {
      const { message } = error;
      Alert.alert(message);
    });
    
  }

  render() {
    
    var {navigate} = this.props.navigation;
    
    return (
      
        <Container>

                
           
                <Content>                
                    
                <ScrollView style={{flex: 1,height:DEVICE_HEIGHT*1.5}}>
                            <View style = {styles.logo}>
                             <Image source = {logoImg} style = {styles.image}/> 
                            </View>
                            <View style={styles.inputWrapper1}>                            
                                <PhoneInput style={{backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                width: DEVICE_WIDTH - 40,
                                height: 40,
                                marginHorizontal: 20,
                                paddingLeft: 15,
                                borderRadius: 10,}} 
                                value='+44'
                                confirmText='Confirm' 
                                onChangePhoneNumber={(value)=> this.setState({email:value+"@gmail.com"})}
                                textStyle={{color:'green'}}/>
                            </View>
                            {this.state.phonenumbererror && <Text style={{marginLeft :20,  color: 'red' }}>  {this.state.passErrorMessage} </Text>}
                            <View style={styles.inputWrapper}>
                                <Image source={passwordImg} style={styles.inlineImg} />
                                <TextInput
                                    
                                    secureTextEntry
                                    style={styles.input}
                                    placeholder="password"
                 
                                    onChangeText={password => this.setState({ password })}
                                                   
                                    placeholderTextColor="green"
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            {this.state.passworderror && <Text style={{marginLeft :20,  color: 'red' }}>  {this.state.passErrorMessage} </Text>}
                            <View style={styles.inputWrapper}>
                                <TouchableOpacity

                                    style={styles.button}

                                    onPress={()=>this.handleSignIn()}>
                                    
                                    <Text style={styles.text}>Sign In</Text>
                                    
                                </TouchableOpacity>
                            </View>
                            <View style={styles.signupsecttion}>                                    
                              <TouchableOpacity
                                    style={styles.button}
                                    onPress = {()=>this.onPress()}>
                                    <Text style={styles.text}>Sign Up</Text>                                    
                              </TouchableOpacity>
                            </View>
                            </ScrollView>
                </Content>
        </Container>      
     
      
    );
  }  
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


const styles = StyleSheet.create({
    logo: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      top : 100,
      marginBottom : 50
    },
    image: {
      width: 150,
      height: 150,
    },
    form:{    flex: 1, top : 200 },
    input: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 10,
        color: '#00ff00',
        borderColor: "#0000ff",
      },
      inputWrapper1: {
        flex: 1,
        marginTop:50
          
      },
      inputWrapper: {
        flex: 1,
        marginTop:50
          
      },
      inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
      },
      button: {
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        height: 40,
        width: DEVICE_WIDTH - 40,
        borderRadius: 14,
        zIndex: 100,
      },
      signupsecttion: {
        flex: 1,
        marginTop: 20,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      text: {
        color: 'white',
        backgroundColor: 'transparent',
      },
    
  });


export default Login;
