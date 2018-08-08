
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
    
} from "native-base"
import {   Image, SectionList, View,Dimensions,StyleSheet, ImageBackground,TouchableOpacity,TextInput, ScrollView,  } from "react-native";
import { LinearGradient } from 'expo';
// import logoImg from '../assets/images/logo.png';
import btn_prev from '../assets/images/btn_prev.png';
import btn_next from '../assets/images/btn_next.png';

import circle_white from '../assets/images/circle_white.png';
import circle_green from '../assets/images/email.gif';

import * as Animatable from 'react-native-animatable';
import Global from "./Global";
import * as firebase from 'firebase'; // Version can be specified in package.json

import { Constants, Location, Permissions } from 'expo';
///rjc


class Home extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
       flag_param : 0,
       isLoading : false,
       gender : false,

       lookingfor : this.props.navigation.state.params.lookingfor,
       fromage : this.props.navigation.state.params.fromage,
       toage : this.props.navigation.state.params.toage,
       aroundme : this.props.navigation.state.params.aroundme,
       m_id:-1,

      //  selected : false,
    };
  }
 
  static navigationOptions = {
    title: "Home",
  };

 componentWillMount() {




}
async getGender()
{
  // const user = firebase.auth().currentUser;
  // var userId = user.uid;
  // const userPath = `/users/${userId}`;
  // var gender = false;
  
  //   await firebase.database().ref(userPath).once('value').then(function(snapshot)
  //     {
  //       gender = snapshot.val().gender;
  //       console.log("gender before" + gender);
  //     });
  //     console.log("gender after" + gender);
  // this.setState({gender: !gender});
  // console.log("gender ffff   " + this.state.gender);
}
handleNext()
{
    const uid = Global.u_id;     
    const imageRef = firebase.storage().ref('/images/').child(uid);
    const sampleImage = imageRef.getDownloadURL().then();
    const imageUrl = sampleImage.i;
    console.log(sampleImage);    
    console.log(imageUrl);

}
handlePrev()
{

}
// onSelected()
// {
//   this.setState({selected : !selected});
// }
onProfile()
{
   if(Global.toPerson === '' ) return ;
   this.props.navigation.navigate("Profile");
}
onCreate()
{
   if(Global.toPerson === '' ) return ;
   this.props.navigation.navigate("Create");
}
render() {
    
   var {navigate} = this.props.navigation;
    
   return (
           <Container>
            <Content>
                <ScrollView> 
                <Persons
                   navigation = {navigate}
                   lookingfor = {this.state.lookingfor}
                   fromage = {this.state.fromage}
                   toage = {this.state.toage}
                   aroundme = {this.state.aroundme}
                   gender = {this.state.gender}
                   ref={done => (this.done = done)}  />
                </ScrollView>
                </Content>
                <Footer>
                <FooterTab>
                    <Button style={{backgroundColor:'#FFFFFF'}}  transparent>
                    <Icon type="FontAwesome" name="home" style={{color: 'green'}}/>
                    <Text style={{color: 'green'}}>Home</Text>
                    </Button>
                    <Button style={{backgroundColor:'#FFFFFF'}}  transparent  onPress = {()=>this.onCreate()} >
                    <Icon type="MaterialIcons" name="person-add" style={{color: 'green'}}/>
                    <Text style={{color: 'green'}}> Create</Text>
                    </Button>
                    <Button style={{backgroundColor:'#FFFFFF'}}  transparent onPress = {()=>this.onProfile()}>
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

class Persons extends React.Component {
    constructor(props) {
          super(props);
          }
    state = {
      persons: [],
      selected : false,

      lookingfor : this.props.lookingfor,
      fromage : this.props.fromage,
      toage : this.props.toage,
      aroundme : this.props.aroundme,
      gender : this.props.lookingfor
    };
  
    onSelected(id)
    {
     // alert("rfdfvdsgds")
       Global.toPerson = id;
       this.state.m_id=id;
       this.setState({selected : !this.state.selected}) ;

       userRef = firebase.database().ref("/users/" + id);
      
       userRef.once('value').then(snapshot =>
         {
                 Global.toPersonName =  snapshot.val().name;
                 Global.toPersonPhone =  snapshot.val().phoneNumber;
            
         });
    }
    componentWillMount() {
      
      this.update();

    //   this.setState({gender : this.props.gender });
    //   this.update(this.state.gender);
      }
    render() {
      
      const { persons } = this.state;
       if (persons === null || persons.length === 0) {
        return null;
      }
      return (
  
        <View style={{ margin: 7 } }>
  
          {persons.map(({ id, name,cameraUrl, mark, mark_create,birthday,distance }) => (
              <TouchableOpacity                
                style = {(this.state.selected && this.state.m_id==id)? styles.selected_list : styles.person_list}                
                key={id}
                onPress = {()=> this.onSelected(id)} >
               
                <ImageBackground source = {{uri: cameraUrl} } style = {styles.image}>
                <View style = {{ marginTop : 70, marginLeft : 40,  width : 20, height : 20}}>                  
                  <Image source = {(mark)? circle_green : null } style={{height: 40, width: 80}}/>                  
                  </View>
                </ImageBackground> 
                <View style = {{flexDirection:'column',paddingTop : 10, paddingLeft : 50}}>
                    <Text style={{flex:1, marginLeft:10,fontWeight: 'bold',}}> Name :      {name}         </Text>
                    <Text style={{flex:1, marginLeft:10,fontWeight: 'bold',}}> Age :         {birthday}   </Text>
                    <Text style={{flex:1, marginLeft:10,fontWeight: 'bold',}}> Distance : {distance} km   </Text>
                    <View style={{flexDirection:'row',marginLeft:10}}>
                    {/* <Image source = {(mark_create)? circle_green : circle_white } /> */}
                    {mark_create && <Icon type="Ionicons" name="md-checkmark-circle-outline" style={{color: 'green'}}/>}
                    {mark_create && (<Text style={{flex:1, marginLeft:5,fontWeight: 'bold',}}> You created</Text>)}
                    </View>
                </View>
               
             </TouchableOpacity>

   
          ))}
        </View>
      );
    }

    update = async(gender) => {
        
        /////////  using looking for key//////////////////////////////
        
        const user = firebase.auth().currentUser;
        var userId = user.uid;

        userRef = firebase.database().ref("/users");
        var itemsRefMark = firebase.database().ref("/applicants_dating/" + userId ).orderByKey();
        var itemsCreateRefMark = firebase.database().ref("/user_dating/" + userId ).orderByKey();
       
        var cur_year  = new Date().getFullYear();
        var to_birth_year = cur_year - this.state.fromage;
        var from_birth_year = cur_year - this.state.toage;
    
        from_birth_year = from_birth_year + "-01-01";
        to_birth_year = to_birth_year + "-12-31";

        let location = await Location.getCurrentPositionAsync({});
      
        locationResult =  JSON.stringify(location);

        locationLatitude =  JSON.parse(locationResult)["coords"]["latitude"];
      
        locationLogitude =  JSON.parse(locationResult)["coords"]["longitude"];

        var m_dist = this.state.aroundme;

        var items = [];  
        var itemsMark = [];
        var itemsCreateMark = [];
      

        if(this.state.lookingfor ==='man')
        {

          await  userRef.orderByChild("birthday").startAt(from_birth_year).endAt(to_birth_year).on('child_added', function(snapshot){
       
            if(snapshot.val().gender === 1 &&   snapshot.key !== userId)
            {

              /////////// to calculate the distance ///////
              var radlat1 = Math.PI * locationLatitude/180;
              var radlat2 = Math.PI * snapshot.val().latitude/180;

              var theta = locationLogitude-snapshot.val().longitude;
              var radtheta = Math.PI * theta/180
              var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
              if (dist > 1) {
                dist = 1;
              }
              dist = Math.acos(dist)
              dist = dist * 180/Math.PI
              dist = dist * 60 * 1.1515
              dist = dist * 1.609344 
              dist = dist.toFixed(0);
              
              var birthday =new Date( snapshot.val().birthday);
              var age = cur_year - birthday.getFullYear();

                     /////////// to calculate the distance ///////
              if(dist <= m_dist)
              {
                  items.push({
                  name: snapshot.val().name,
                  birthday : age,
                  distance : dist,
                  cameraUrl : snapshot.val().picUrl,
                  id: snapshot.key,
                  mark : 0,
              });

             }
            }
            
          });
          await  itemsRefMark.on('value', (snap) => {
                    // get children as an array
                    snap.forEach((child) => {
                              itemsMark.push({
                              id: child.key,
                            });
                    });
                    items.map((item)=>
                    {
                      itemsMark.map((markChild) =>
                      {
                        if(item.id === markChild.id) item.mark  = 1;
                      });
                    });
                });

          await  itemsCreateRefMark.on('value', (snap) => {
                  // get children as an array
                  snap.forEach((child) => {
                    // console.log("child - key   " + child.key);
                    itemsCreateMark.push({
                            id: child.key,
                          });
                  });
                  items.map((item)=>
                  {
                    itemsCreateMark.map((markChild) =>
                    {
                      if(item.id === markChild.id) item.mark_create  = 1;
                    });
                  });
                
                this.setState({
                  persons: items
                });

              });


        }
        else  if(this.state.lookingfor ==='women')
        {
          await  userRef.orderByChild("birthday").startAt(from_birth_year).endAt(to_birth_year).on('child_added', function(snapshot){
           
            if(snapshot.val().gender === 2 &&   snapshot.key !== userId)
            {
              /////////// to calculate the distance ///////
              var radlat1 = Math.PI * locationLatitude/180;
              var radlat2 = Math.PI * snapshot.val().latitude/180;

              var theta = locationLogitude-snapshot.val().longitude;
              var radtheta = Math.PI * theta/180
              var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
              if (dist > 1) {
                dist = 1;
              }
              dist = Math.acos(dist)
              dist = dist * 180/Math.PI
              dist = dist * 60 * 1.1515
              dist = dist * 1.609344 
              dist = dist.toFixed(0);

              var birthday =new Date( snapshot.val().birthday);
              var age = cur_year - birthday.getFullYear();
                     /////////// to calculate the distance ///////
              if(dist <= m_dist)
              {
                  items.push({
                  name: snapshot.val().name,
                  cameraUrl : snapshot.val().picUrl,
                  birthday : age,
                  distance : dist,
                  id: snapshot.key,
                  mark : 0,
              });

             }
            }
            
          });
          await  itemsRefMark.on('value', (snap) => {
                    // get children as an array
                    snap.forEach((child) => {
                              itemsMark.push({
                              id: child.key,
                            });
                    });
                    items.map((item)=>
                    {
                      itemsMark.map((markChild) =>
                      {
                        if(item.id === markChild.id) item.mark  = 1;
                      });
                    });
                  });

          await  itemsCreateRefMark.on('value', (snap) => {
            // get children as an array
            snap.forEach((child) => {
              // console.log("child - key   " + child.key);
              itemsCreateMark.push({
                      id: child.key,
                    });
            });
            items.map((item)=>
            {
              itemsCreateMark.map((markChild) =>
              {
                if(item.id === markChild.id) item.mark_create  = 1;
              });
            });
          
          this.setState({
            persons: items
          });

        });
       }
        else
        {
          await  userRef.orderByChild("birthday").startAt(from_birth_year).endAt(to_birth_year).on('child_added', function(snapshot){
           
            if( snapshot.key !== userId)
            {
              /////////// to calculate the distance ///////
              var radlat1 = Math.PI * locationLatitude/180;
              var radlat2 = Math.PI * snapshot.val().latitude/180;

              var theta = locationLogitude-snapshot.val().longitude;
              var radtheta = Math.PI * theta/180
              var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
              if (dist > 1) {
                dist = 1;
              }
              dist = Math.acos(dist)
              dist = dist * 180/Math.PI
              dist = dist * 60 * 1.1515
              dist = dist * 1.609344 
              dist = dist.toFixed(0);
              var birthday =new Date( snapshot.val().birthday);
              var age = cur_year - birthday.getFullYear();
                     /////////// to calculate the distance ///////
              if(dist <= m_dist)
              {
                  items.push({
                  name: snapshot.val().name,
                  cameraUrl : snapshot.val().picUrl,
                  birthday : age,
                  distance : dist,
                  id: snapshot.key,
                  mark : 0,
              });

             }
            }
            
          });
          await  itemsRefMark.on('value', (snap) => {
                    // get children as an array
                    snap.forEach((child) => {
                              itemsMark.push({
                              id: child.key,
                            });
                    });
                    items.map((item)=>
                    {
                      itemsMark.map((markChild) =>
                      {
                        if(item.id === markChild.id) item.mark  = 1;
                      });
                    });
                   
                  });

              await  itemsCreateRefMark.on('value', (snap) => {
                // get children as an array
                snap.forEach((child) => {
                  // console.log("child - key   " + child.key);
                  itemsCreateMark.push({
                          id: child.key,
                        });
                });
                items.map((item)=>
                {
                  itemsCreateMark.map((markChild) =>
                  {
                    if(item.id === markChild.id) item.mark_create  = 1;
                  });
                });
              
              this.setState({
                persons: items
              });

            });
        }
    }
  }
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


const styles = StyleSheet.create({
    
    logo: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      top : 100
    },

    image: {
      width: 100,
      height: 100,
      borderRadius : 30 
    },
    person_list : 
    {
      flexDirection:'row',
      height:150,
      alignItems:'center',
      backgroundColor:'white',
      borderTopColor:'#ccc',
      borderTopWidth:1,
      paddingHorizontal:15
    },
    selected_list : 
    {
      flexDirection:'row',
      height:150,
      alignItems:'center',
      backgroundColor:'#f9dfa2',
      borderTopColor:'#ccc',
      borderTopWidth:1,
      paddingHorizontal:15
    },
    btn_image: {
  
        width: 50,
        height: 50,
      },
    
    form:{    flex: 1, top : 200 },

    btn_container :
    {
        alignItems: 'center',
        justifyContent: 'center',
    },
    sidewise:{
        flex: 1,
        top: 200,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

  });


export default Home;
