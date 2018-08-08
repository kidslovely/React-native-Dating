
import React from 'react';
import {
   
  Container,
  Contenet,
  Footer,
  FooterTab,
  Icon,
  Content,
  
} from "native-base";

import { Platform, StyleSheet, Text, View, TextInput, Button, Dimensions,Alert,Image,TouchableOpacity, ScrollView,} from 'react-native';
import SMSVerifyCode from 'react-native-sms-verifycode';
import usernameImg from '../assets/images/username.png';
import Global from './Global';

const base64 = require('base-64');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class Signup2 extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
               phoneNumber: '', 
               textBody: '',
               name:'',
               code:'',

              };
    }
    static navigationOptions = {
      title: "Sign Up",
    };
  //use the Twilio REST API to send message to the designated number:
  send(toNumber, content)  {
    var data = new FormData();
    data.append("To", toNumber);
    //data.append("From", "+17153887265");//my
    data.append("From", "+447403922478");//brithish
    data.append("Body", content);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      //Alert the user of the status of their request:
      if (this.readyState === 4) {
        console.log(this.responseText);

        status = this.status;

        if (status == '400') {

          Alert.alert('The number ' + toNumber + ' is not correct, or has not been verified.')
        }
        else if (status == '201'){
          Alert.alert('please wait for a moment')
        }
        else {
          Alert.alert('The SMS server is having errors.')
        }
      }
    });
    //my account
    // xhr.open("POST", "https://api.twilio.com/2010-04-01/Accounts/AC2451dcd594b92ca31f2201a286e59c0c/Messages.json");
    // xhr.setRequestHeader('Authorization', 'Basic ' + base64.encode('AC2451dcd594b92ca31f2201a286e59c0c:9233aeb73b527e6ad7fcc04b7fd907ae'))

    //british account
    xhr.open("POST", "https://api.twilio.com/2010-04-01/Accounts/AC8b9fc4e284d1bfe4f1a645b5ef5947f9/Messages.json");
    xhr.setRequestHeader('Authorization', 'Basic ' + base64.encode('AC8b9fc4e284d1bfe4f1a645b5ef5947f9:780222e6f87208776a4e7bdb0e4f206a'))
    xhr.send(data);

  }

  
    onInputCompleted = (text) => {
     
      if(text===this.state.code)
       {
        this.props.navigation.navigate("Signup3");
       }
      else
        {
        Alert.alert("Code is worng");
        this.reset();
        }  
    }

    reset = () => {
    this.verifycode.reset()
    this.setState({codeText: ''})
    }
    componentDidMount() {
      this.sendCode();
    }
   //send Code
   sendCode()
   {
      var d1=Math.floor(Math.random() * 10);
      var d2=Math.floor(Math.random() * 10);
      var d3=Math.floor(Math.random() * 10);
      var d4=Math.floor(Math.random() * 10);
      var d5=Math.floor(Math.random() * 10);
      var vcode=''+d1+d2+d3+d4+d5;
      this.setState({code:vcode});
      vcode="Your verification code is "+vcode;
     this.send(/*Global.phoneNumber*/"+8615944329263", vcode);
   }
  //user interface:
  render() {
    
    return (
      <Container>
                    
      <Content>
      <ScrollView style={{flex: 1,height:DEVICE_HEIGHT*1.5}}> 
      <Text style={styles.titleText1}>Your name</Text>
      <View style={styles.inputWrapper1}>
          <Image source={usernameImg} style={styles.inlineImg} />
          <TextInput
                    style={styles.input}             
                    placeholder={Global.name}
                    onChangeText={name => this.setState({ name })}
                    editable={false}    
                    autoCapitalize="none"    
                    placeholderTextColor="green"
                    underlineColorAndroid="transparent"
                  />
        </View>
        <View style={{marginTop:30}}>
        <Text style={styles.titleText2}>Check Vierification Code</Text>
         <SMSVerifyCode
              ref={ref => (this.verifycode = ref)}
               verifyCodeLength={5}
               containerPaddingVertical={10}
               containerPaddingHorizontal={50}
               containerBackgroundColor={'#ffffff'}
               onInputCompleted={this.onInputCompleted}
         />
          <View style={styles.inputWrapper}>
                    <TouchableOpacity
                          style={styles.button}
                          onPress={()=>this.sendCode()}>
                          
                          <Text style={styles.text}>Resend Code</Text>
                        
                    </TouchableOpacity>
         </View>
         <View style={styles.inputWrapper}>
                    <TouchableOpacity
                          style={styles.button}
                          onPress={()=>this.reset()}>
                          <Text style={styles.text}>Retype Code</Text>
                        
                    </TouchableOpacity>
         </View>
       </View>
       </ScrollView>
       </Content>
      
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  titleText1: {
    ...Platform.select({
      ios: {
        fontSize:15,
      },
      android: {
        fontSize:20,
      },
    }),
    color: 'green',
    marginLeft:DEVICE_WIDTH/2-55,
    marginTop:70
  },
  titleText2: {
    ...Platform.select({
      ios: {
        fontSize:15,
      },
      android: {
        fontSize:20,
      },
    }),
    color: 'green',
    marginLeft:DEVICE_WIDTH/2-110,
  },
  button: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00f000',
    height: 40,
    width: DEVICE_WIDTH - 150,
    marginTop:15,
    marginLeft:(DEVICE_WIDTH-150)/2-25,
    borderRadius: 20,
    zIndex: 100,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: DEVICE_WIDTH - 100,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 10,
    color: '#00ff00',
    borderColor: "#0000ff",
  },
  inputWrapper1: {
    flex: 1,
    marginLeft:DEVICE_WIDTH/2-60-DEVICE_WIDTH/4,
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
