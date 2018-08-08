
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

class SettingAdmin extends Component {

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
     
        email: '',
        password: '',
        confirm : '',
        birthday:'',
        errorMessage: null,
        passErrorMessage : null,
        phoneNumber : '+44',
        userId : '',

        interestItems :[],

      }
    }
    static navigationOptions = {
      title: "Sign Up",
    };
  
    componentWillMount() {
        /////////// based on Global.toPerson, to get user's profile.
        //  this.getMyProfile();
     
    }
    // getMyProfile = async() => {

    //    const user = firebase.auth().currentUser;
    //    var userId = user.uid;
    //    var interestItems = [];
    //    userRef = firebase.database().ref("/users/" + userId);
       
    //    userRefInterest =  firebase.database().ref("/users/" + userId + "/interest");
    
    //    await  userRef.once('value').then(snapshot =>
    //     {
    //             this.setState({name : snapshot.val().name});
           
    //             this.setState({phoneNumber : snapshot.val().phoneNumber});

    //             this.setState({email : snapshot.val().email});
    //     });


    //     await  userRefInterest.on('value', (snap) => {
    //       // get children as an array
    //       snap.forEach((child) => {
    //                 interestItems.push({
    //                 id: child.key,
    //                 name : child.val()
    //               });
    //               this.setState({interestItems : interestItems});

                 
    //       });
    //   });
      
    // }
    
    onLogout = () =>
    {
        this.props.navigation.navigate("Login");
    }
   
    onSave = () => {
      const user = firebase.auth().currentUser;
      var userId = user.uid;

      this.setState({confirmerror : false});
      this.setState({passworderror : false});

      try
      {
            if(this.state.password !=='' && this.state.password === this.state.confirm)
            {
              user.updatePassword(this.state.password).then(() =>{
                         
              },(error) =>
              {
                 this.setState({passErrorMessage :  error.message});
            
                 this.setState({passworderror : true});
              });

          
            }
            else if(this.state.password !=='' || this.state.confirm !=='')
            {
              this.setState({passErrorMessage : "* confirm password"});
              this.setState({confirmerror : true});
            }

      }
      catch(error)
      {
        console.log("error========" + error);
      }

    }

  render() {
    var {navigate} = this.props.navigation;
    return (
      
      <Container>
                    
           <Content>

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
                                          
                <View style={styles.inputWrapper}>
                    <TouchableOpacity
                          style={styles.button}
                          onPress={()=>this.onSave()}>
                          <Text style={styles.text}> Save </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputWrapper}>
                    <TouchableOpacity
                          style={styles.button}
                          onPress={()=>this.onLogout()}>
                          <Text style={styles.text}> Log Out </Text>
                        
                    </TouchableOpacity>
                </View>
            </Content>

            <Footer>
                <FooterTab>
                    <Button style={{backgroundColor:'#FFFFFF'}}  transparent onPress = {()=>navigate("HomeAdmin")}>
                    <Icon type="FontAwesome" name="home" style={{color: 'green'}}/>
                    <Text style={{color: 'green'}}>Home</Text>
                    </Button>
                
                    <Button style={{backgroundColor:'#FFFFFF'}}  transparent >
                    <Icon type="Zocial" name="persona" style={{color: 'green'}}/>
                    <Text style={{color: 'green'}}>Profile</Text>
                    </Button>      

                    {/* <Button style={{backgroundColor:'#FFFFFF'}}  transparent  >
                    <Icon type="MaterialIcons" name="delete-forever" style={{color: 'green'}}/>
                    <Text style={{color: 'green'}}> Delete</Text>
                    </Button> */}

                    <Button style={{backgroundColor:'#FFFFFF'}} transparent  onPress = {()=>navigate("SettingAdmin")}>              
                    <Icon type="MaterialIcons" name="settings" style={{color: 'green'}}/>
                    <Text style={{color: 'green'}}>Setting</Text>
                    </Button>
                </FooterTab>
            </Footer>
      
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
    backgroundColor: 'green',
    height: 40,
    width: DEVICE_WIDTH - 40,
    borderRadius: 14,
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
    marginTop:100   
  },
inputWrapper: {
  flex: 1,
  marginTop:60
 
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

export default SettingAdmin;
