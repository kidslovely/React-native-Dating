
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


import { Dropdown } from 'react-native-material-dropdown';
import logoImg from '../assets/images/logo.png';
import usernameImg from '../assets/images/username.png';
import passwordImg from '../assets/images/password.png';

///rjc


class BeforeHome extends Component {
  uid = '';
  messagesRef = null;
 sexual = [{
    value: 'man',
  }, {
    value: 'women',
  }, {
    value: 'both',
  },
];
around = [{
    value: '3km',
  }, {
    value: '10km',
  }, {
    value: '100km',
  },
  {
    value: '150km',
  },
  {
    value: '200km',
  },
  {
    value: 'all over the world',
  },
];
age = [{ value: '18', }, {value: '20', }, {  value: '22',  }, {    value: '24',  }, 
  {  value: '26',  }, {  value: '28',  }, {  value: '30',  },
  {  value: '32',  }, {  value: '34',  }, {  value: '36',  }, {  value: '38',  },  {    value: '40',  }, 
  {  value: '42',  }, {  value: '44',  }, {  value: '46',  }, {  value: '48',  },  {    value: '50',  },
  {  value: '52',  }, {  value: '54',  }, {  value: '56',  }, {  value: '58',  },  {    value: '60',  },  
  {  value: '62',  }, {  value: '64',  }, {  value: '66',  }, {  value: '68',  },  {    value: '70',  },  
];
to_age = [];
  constructor(props)
  {
    super(props);

    this.state = {
        flag_param : 0,
       isLoading : false,

       lookingfor:'',
       fromage: '',
       toage:'',
       aroundme:'',
    };
  }
 

  static navigationOptions = {
   header :null
  };
  onChangeLookingFor(text)
  {
      this.setState({lookingfor:text});

  }
  onChangeFromAge(text)
  {
      this.setState({fromage:text});
     this.to_age.length=0;
     for (var i = Number(text); i < 70; i=i+2)
    {
      this.to_age.push({value:i.toString()});
    }
  }
  onChangeToAge(text)
  {
      this.setState({toage:text});
      
  }
  onChangeAroundMe(text)
  {
      if(text === "3km") this.setState({aroundme : 3});
      else if(text === "10km") this.setState({aroundme : 10});
      else if(text === "100km") this.setState({aroundme : 100});
      else if(text === "150km") this.setState({aroundme : 150});
      else if(text === "200km") this.setState({aroundme : 200});
      else if(text === "all over the world") this.setState({aroundme : 20000});
  }
  onNext()
  {
    this.props.navigation.navigate("Home",{lookingfor:this.state.lookingfor,fromage:this.state.fromage,toage:this.state.toage,aroundme:this.state.aroundme});
  }
  
render() {
   var {navigate} = this.props.navigation;
   
   return (
        //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
        //    <Image style={{ height: 100, flex: 1 }}  source = {require('../../images/home.jpg')} />
        //   </View> 
        <Container>
      
                <Content>
                <ScrollView style={{flex: 1,height:DEVICE_HEIGHT*1.5}}>  
                <View style={{flex: 1, flexDirection:'row', marginTop:20}}>
                   <Text style = {{marginTop:30, marginLeft :DEVICE_WIDTH/2-150, fontSize:35,color : 'green',}}>Success your log in</Text>
                </View>
                <View style={styles.inputWrapper}>
                <Text style = {{marginLeft : 20, fontSize:20,color : 'green',}}>What gender do you want?</Text>
                 </View> 
                  <View style={styles.inputTop}>                        
                    <Dropdown
                     textColor = '#000000'
                     containerStyle={[styles.drop_input,  { backgroundColor:'#ccc',borderColor:'green', borderRadius:5,}]   }
                     rippleCentered={true}
                     inputContainerStyle={{marginTop:-20, borderBottomColor: 'transparent'}}
                     data={this.sexual}
                     selectedItemColor	='green'
                     onChangeText = {(text) => this.onChangeLookingFor(text)}
                     disabledItemColor= '#ffff00'
                     pickerStyle = {{backgroundColor:'#fff'}}
                     value = "Looking for"
                     baseColor = '#000000'
                   />                            
                 </View>
                            <View style={{flex: 1, flexDirection:'row', marginTop:20}}>
                                  <Text style = {{marginLeft : 20, fontSize:20,color : 'green',}}>What age do you want?</Text>
                            </View>
                            <View style={{flex: 1, flexDirection:'row', marginTop:10}}>
                                   <Dropdown
                                        textColor = '#000000'
                                        containerStyle={[styles.drop_age,  { backgroundColor:'#ccc', borderColor:'green', borderRadius:5,}]   }
                                        rippleCentered={true}
                                        inputContainerStyle={{marginTop:-20, borderBottomColor: 'transparent'}}
                                        data={this.age}
                                        selectedItemColor	='green'
                                        
                                        onChangeText = {(text) => this.onChangeFromAge(text)}
                                        
                                        disabledItemColor= '#ffff00'
                                        pickerStyle = {{backgroundColor:'#fff'}}
                                        value = "from"
                                        baseColor = '#000000'
                                />     
                                    <Dropdown
                                        textColor = '#000000'
                                        containerStyle={[styles.drop_age,  { backgroundColor:'#ccc',borderColor:'green', borderRadius:5,}]   }
                                        rippleCentered={true}
                                        inputContainerStyle={{marginTop:-20, borderBottomColor: 'transparent'}}
                                        data={this.to_age}
                                        selectedItemColor	='green'
                                        
                                        onChangeText = {(text) => this.onChangeToAge(text)}
                                        
                                        disabledItemColor= '#ffff00'
                                        pickerStyle = {{backgroundColor:'#fff'}}
                                        value = "to"
                                        baseColor = '#000000'
                                    />                     

                            </View>
                            <View style={{flex: 1, flexDirection:'row', marginTop:20}}>
                                  <Text style = {{marginLeft : 20, fontSize:20,color : 'green',}}>How long distance do you want?</Text>
                            </View>
                            <View style={{flex: 1, flexDirection:'row', marginTop:10}}>
                           
                                    <Dropdown
                                        textColor = '#000000'
                                        containerStyle={[styles.drop_input,  { backgroundColor:'#ccc', borderColor:'green',borderRadius:5,}]   }
                                        rippleCentered={true}
                                        inputContainerStyle={{marginTop:-20, borderBottomColor: 'transparent'}}
                                        data={this.around}
                                        selectedItemColor	='green'
                                        
                                        onChangeText = {(text) => this.onChangeAroundMe(text)}
                                        disabledItemColor= '#ffff00'
                                        pickerStyle = {{backgroundColor:'#fff'}}
                                        value = "Around me"
                                        baseColor = '#000000'
                                />                         

                            </View>
                            
                            <TouchableOpacity
                                    style={styles.button}
                                    onPress = {()=>this.onNext()}>
                                    <Text style={{color:'#fff'}}> Next </Text>                                    
                          </TouchableOpacity>
                 </ScrollView>      
                </Content>
          </Container>  
    );
  }  
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


const styles = StyleSheet.create({
    inputTop: {
        flex: 1,
        flexDirection:'row',
        marginTop:10
      },

      inputWrapper: {
        flex: 1,
        flexDirection:'row',
        marginTop:60
      },
      txt_title:
      {
        marginHorizontal: 20,
        marginBottom : 10,
      },
      drop_age: {
        width: (DEVICE_WIDTH - 40) / 2.5,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 10,
        borderRadius: 10,
        borderColor: '#101010',
        borderWidth: 1,
    
        
      },
      drop_input: {
        width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 10,
        borderRadius: 10,
        borderColor: '#101010',
        borderWidth: 1,
     
        
      },
      button: {
        marginTop:60,
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
        borderColor: '#101010',
        borderWidth: 1,
        color:'#000000',
      },
});


export default BeforeHome;
