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

class Setting extends Component {

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
         this.getMyProfile();
     
    }
    getMyProfile = async() => {

       const user = firebase.auth().currentUser;
       var userId = user.uid;
       var interestItems = [];
       userRef = firebase.database().ref("/users/" + userId);
       
       userRefInterest =  firebase.database().ref("/users/" + userId + "/interest");
    
       await  userRef.once('value').then(snapshot =>
        {
                this.setState({name : snapshot.val().name});
           
                this.setState({phoneNumber : snapshot.val().phoneNumber});

                this.setState({email : snapshot.val().email});
        });


        await  userRefInterest.on('value', (snap) => {
          // get children as an array
          snap.forEach((child) => {
                    interestItems.push({
                    id: child.key,
                    name : child.val()
                  });
                  this.setState({interestItems : interestItems});

                 
          });
      });
        // userRefInterest.on("child_added")
        // this.state.interestItems.map((item)=>
        // {
        
        //     console.log("id ======"  + item.id);
        //     console.log("name ======"  + item.name);

       
        // });


       
    }
    
    onLogout = () =>
    {
      //interestItems.map(({ id, name}) => (



        this.props.navigation.navigate("Login");

        

    }
   
    onSave = () => {
      const user = firebase.auth().currentUser;
      var userId = user.uid;

      userRef = firebase.database().ref("/users").child( userId);

      userRef.update({"name" : this.state.name , "email" : this.state.email, "phoneNumber" : this.state.phoneNumber}).then(
        () =>{
          console.log("success update");
        },(error) =>
        {
          console.log("failed update");
        }

      );
      this.setState({confirmerror : false});
      this.setState({passworderror : false});
    
      
      user.updateEmail(this.state.phoneNumber + "@gmail.com").then(function() {
        console.log("Update successful."); 
      }).catch(function(error) {
        console.log(" An error happened.."); 
      });



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
                  <View style={styles.inputWrapper1}>
                  <Image source={usernameImg} style={styles.inlineImg} />
                  <TextInput
                    style={styles.input}
             
                    value = {this.state.name}

                    onChangeText={name => this.setState({ name })}     
                    autoCapitalize="none"    
                    placeholderTextColor="green"
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.inputWrapper}>
                {/* {this.state.nameerror && <Text style={{marginLeft :20, marginTop:-25, color: 'red' }}>  {this.state.passErrorMessage} </Text>} */}
                <PhoneInput style={{backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                width: DEVICE_WIDTH - 40,
                                height: 40,
                                marginHorizontal: 20,
                                paddingLeft: 15,
                                borderRadius: 10,}} 
                                value={this.state.phoneNumber}
                                confirmText='set' 
                                textStyle={{color:'green'}}
                                onChangePhoneNumber={(value)=> this.setState({phoneNumber:value})}
                                />
                </View>
           
                <View style={styles.inputWrapper}>

                <Image source={usernameImg} style={styles.inlineImg} />
                  <TextInput
                    style={styles.input}

                    value = {this.state.email}
                 
                    onChangeText={email => this.setState({ email })}     
                    autoCapitalize="none"    
                    placeholderTextColor="green"
                    underlineColorAndroid="transparent"
                  />
                </View>
            

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
                    <Button style={{backgroundColor:'#FFFFFF'}}  transparent onPress = {()=>navigate("Home")}>
                    <Icon type="FontAwesome" name="home" style={{color: 'green'}}/>
                    <Text style={{color: 'green'}}>Home</Text>
                    </Button>
                    <Button style={{backgroundColor:'#FFFFFF'}}  transparent  onPress = {()=>navigate("Create")} >
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

export default Setting;
