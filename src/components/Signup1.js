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
  
} from "native-base";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableHighlight,
  ScrollView,
  Alert,
  ImageBackground,Dimensions,Image,TouchableOpacity
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase'; // Version can be specified in package.json
import Global from './Global';
import usernameImg from '../assets/images/username.png';
import passwordImg from '../assets/images/password.png';

class Signup1 extends Component {

  constructor(props) {
      super(props);
     
      this.state = {
        name: '',
        error: false,
        isLoading: false,
        nameerror: false,
        birthdayerror: false,
        passworderror: false,
        confirmerror:false,
        phonenumbererror:false,
        name: '',
        email: '',
        password: '',
        confirm : '',
        birthday:'',
        errorMessage: null,
        passErrorMessage : null,
        phoneNumber : '+44',
        userId : '',

      }
    }
    static navigationOptions = {
      title: "Sign Up",
    };
  
    handleProfile = () =>
    {
      firebase.auth().signInWithEmailAndPassword(Global.email, this.state.password)
      .then(() =>{
        var userId = firebase.auth().currentUser.uid;
       
       // this.addItem('/users/' + userId);
       
        Global.u_id = userId;
        Global.name = this.state.name;
      //  Global.email = this.state.email;
        Global.phoneNumber = this.state.phoneNumber;
        Global.birthday = this.state.birthday;
        
        this.props.navigation.navigate("Signup2");
      })

    }
    onLogin()
    {
      this.props.navigation.navigate("Login");
    }
    handleSignUp = () => {
      //// admin
        
        if(this.state.name==='+44123456')
        {
          let email = "+44123456@gmail.com" 
          if(this.state.password === this.state.confirm)
          {
            firebase.auth()
              .createUserWithEmailAndPassword(email, this.state.password)
              .then(() => this.onLogin())
              .catch((error) => {   this.setState({passworderror:true});  this.setState({ passErrorMessage: error.message }) })
          }
          else
          {
            this.setState({confirmerror:true});
            this.setState({passErrorMessage : "* retype password!"});
          }
          return;
         
        }


      //validation start
      if(this.state.name=='')
       {
        this.setState({nameerror:true}); 
        this.setState({passErrorMessage : "* Name no input"});
        return;
       }
       else 
        this.setState({nameerror:false});
        
        if(this.state.phoneNumber=='+44')
        {
         this.setState({phonenumbererror:true}); 
         this.setState({passErrorMessage : "* phone number no input"});
         return;
        }
        else
        { 
         this.setState({phonenumbererror:false});
        }
         if(this.state.birthday=='')
        {
         this.setState({birthdayerror:true}); 
         this.setState({passErrorMessage : "* birthday no input"});
         return;
        }
        else 
         this.setState({birthdayerror:false});

         if(this.state.password=='')
         {
          this.setState({passworderror:true}); 
          this.setState({passErrorMessage : "* password no input"});
          return;
         }
         else 
          this.setState({passworderror:false});

          if(this.state.confirm=='')
          {
           this.setState({confirmerror:true}); 
           this.setState({passErrorMessage : "* password confrim no input"});
           return;
          }
          else 
           this.setState({confirmerror:false});
         
       //validation end
      if(this.state.password === this.state.confirm)
      {
        
        var d_id=this.state.phoneNumber+"@gmail.com";
        this.setState({passErrorMessage : null });
        this.setState({confirmerror:false});
        Global.email = d_id;
        // Alert.alert(Global.email);
       
        firebase.auth()
          .createUserWithEmailAndPassword(Global.email, this.state.password)
          .then(() => this.handleProfile())
          .catch((error) => {   this.setState({passworderror:true});  this.setState({ passErrorMessage: error.message }) })

      }
      else
      {
        this.setState({confirmerror:true});
        this.setState({passErrorMessage : "* retype password!"});
      }
      
    }

  render() {
    return (
      
      <Container>
                    
           <Content>
              
           <ScrollView style={{flex: 1,height:DEVICE_HEIGHT*1.5}}> 

                 <View style={styles.inputWrapper1}>
                  <Image source={usernameImg} style={styles.inlineImg} />
                  <TextInput
                    style={styles.input}
             
                    placeholder="your name"

                    onChangeText={name => this.setState({ name })}     
                    autoCapitalize="none"    
                    placeholderTextColor="green"
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.inputWrapper}>
                {this.state.nameerror && <Text style={{marginLeft :20, marginTop:-25, color: 'red' }}>  {this.state.passErrorMessage} </Text>}
                <PhoneInput style={{backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                width: DEVICE_WIDTH - 40,
                                height: 40,
                                marginHorizontal: 20,
                                paddingLeft: 15,
                                borderRadius: 10,}} 
                                value='+44'
                                confirmText='set' 
                                textStyle={{color:'green'}}
                                onChangePhoneNumber={(value)=> this.setState({phoneNumber:value})}
                                />
                </View>
                {this.state.phonenumbererror && <Text style={{marginLeft :20,  color: 'red' }}>  {this.state.passErrorMessage} </Text>}
                  <View style={styles.inputWrapper}>
                  <DatePicker
                      style={{backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      width: DEVICE_WIDTH - 40,
                      height: 40,
                      marginHorizontal: 20,
                      paddingLeft: 15,
                      paddingRight:10,
                      borderRadius: 10,}}
                      
                      date={this.state.birthday}
                      mode="date"
                      placeholder="your birthday"
                      format="YYYY-MM-DD" //"YYYY-MM-DD HH:mm"
                      minDate="1950-07-01"
                      maxDate="2030-06-01"
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
                      onDateChange={(date) => {this.setState({birthday: date})}}
                    />
                </View>
                {this.state.birthdayerror && <Text style={{marginLeft :20, color: 'red' }}>  {this.state.passErrorMessage} </Text>}

                  <View style={styles.inputWrapper}>
                  <Image source={passwordImg} style={styles.inlineImg} />
                  <TextInput

                    secureTextEntry
                  
                    style={styles.input}
                    placeholder="password"

                    onChangeText={password => this.setState({ password })}
                    
                    autoCapitalize="none"
                    placeholderTextColor="green"
                    underlineColorAndroid="transparent"
                  />
                </View>

                {this.state.passworderror && <Text style={{marginLeft :20,  color: 'red' }}>  {this.state.passErrorMessage} </Text>}
                  <View style={styles.inputWrapper}>
                  <Image source={passwordImg} style={styles.inlineImg} />
                  <TextInput

                    secureTextEntry
                  
                    style={styles.input}
                    placeholder="confirm password"

                    onChangeText={confirm => this.setState({ confirm })}

                    autoCapitalize="none"
                    placeholderTextColor="green"
                    underlineColorAndroid="transparent"
                  />
                </View>
                {this.state.confirmerror && <Text style={{marginLeft :20, color: 'red' }}>  {this.state.passErrorMessage} </Text>}
                <Text style={{marginLeft :20, color: 'red' }}>  {this.state.passErrorMessage} </Text>
                               
                <View style={styles.inputWrapper}>
                    <TouchableOpacity
                          style={styles.button}
                          onPress={()=>this.handleSignUp()}>
                          
                          <Text style={styles.text}>Next</Text>
                        
                    </TouchableOpacity>
                </View>
            </ScrollView>    
            </Content>
      
      </Container>
      
    )
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
    backgroundColor: '#00f000',
    height: 40,
    width: DEVICE_WIDTH - 40,
    borderRadius: 20,
    zIndex: 100,
  },
  
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
    marginTop:60   
  },
inputWrapper: {
  flex: 1,
  marginTop:30
 
},
inlineImg: {
  position: 'absolute',
  zIndex: 99,
  width: 22,
  height: 22,
  left: 35,
  top: 9,
},

  
});

export default Signup1;
