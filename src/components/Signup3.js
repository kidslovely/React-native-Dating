import React from 'react'
import { StyleSheet, Text, TextInput, View, Image , Button,Dimensions,TouchableOpacity, Alert, ScrollView,} from 'react-native'

import * as firebase from 'firebase'; // Version can be specified in package.json
import Expo, {FileSystem,ImagePicker,Permissions, SQLite} from 'expo'
import { Container, Content } from 'native-base';

import cameraBack from '../assets/images/cameraBack.png';
import humenBack from '../assets/images/humenBack.png';
import Global from './Global';



export default class SignUp3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
             email: '', 
             password: '', 
             errorMessage: null, 
             camera: '', 
             humen : '',
             downloadURL : '',
             is_camera:false,
             is_humne:false,
            };
  }  
 
 static navigationOptions = {
    title: "Sign Up",
  };

handleUploadImage = async(progressCallback) =>
{
  if(this.state.camera === '' && this.state.humen === '') return;

  const response1 = await fetch(this.state.camera);
  const blob1 =  await response1.blob();
  var ref1 = firebase.storage().ref().child("images/" + Global.u_id + "/realPhoto" );
  const task1 = ref1.put(blob1);
      new Promise((resolve, reject) => {
        task1.on(
          'state_changed',
          (snapshot) => {
            progressCallback && progressCallback(snapshot.bytesTransferred / snapshot.totalBytes)

            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => reject(error), /* this is where you would put an error callback! */
          () => {

            task1.snapshot.ref.getDownloadURL().then(function(downloadURL) {

              Global.downloadURLCamera = downloadURL;
          
            });

          }
        );
      });


  
const response2 = await fetch(this.state.humen);
  const blob2 =  await response2.blob();
  var ref2 = firebase.storage().ref().child("images/" + Global.u_id + "/picPhoto" );
  const task2 = ref2.put(blob2);

   new Promise((resolve, reject) => {
        task2.on(
          'state_changed',
          (snapshot) => {
            progressCallback && progressCallback(snapshot.bytesTransferred / snapshot.totalBytes)

            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => reject(error), /* this is where you would put an error callback! */
          () => {

            task2.snapshot.ref.getDownloadURL().then(function(downloadURL) {

              Global.downloadURLPic = downloadURL;
          
            });

          }
        );
      });

      setTimeout(function() { //Start the timer
        this.props.navigation.navigate("Signup4",{url: this.state.camera});
    }.bind(this), 4000)
      

}



pickCamera= async () =>
{
  const {
    cancelled,
    uri,
  }= await ImagePicker.launchCameraAsync({
    allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
       
  });

  if (!cancelled) {
    this.setState({ camera: uri });
    this.setState({is_camera:true});
  }
};

pickImage = async () => {
  const {
    cancelled,
    uri,
  } = await Expo.ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.1,
   
  });

  if (!cancelled) {
    this.setState({ humen:uri });
    this.setState({is_humne:true});
  }
};

UploadImage()
{

  this.handleUploadImage();

 // this.props.navigation.navigate("Signup4");
}

render() {
  let { humen,camera } = this.state;
    return (
      <Container>
        <Content>
        <ScrollView style={{flex: 1,height:DEVICE_HEIGHT*1.5}}> 
            <View style={{marginTop : 30, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontSize:15, color:'green'}}>You must pick your private picture</Text>
            <Text style={{fontSize:15, color:'green'}}>This picture will not be shown to the other person</Text> 
            <TouchableOpacity onPress={() => this.pickCamera()}>
            {this.state.is_camera &&
              <Image source={{ uri: camera }} style={{ width: 150, height: 150 }}/>}
            {!this.state.is_camera &&
              <Image source={cameraBack} style={{ width: 150, height: 150 }}/>}
            </TouchableOpacity>  
            <Text style={{fontSize:20, color:'green'}} onPress={this.pickCamera}>Take your picture from camera</Text>
          </View>

          <View style={{marginTop : 20, flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
           <TouchableOpacity onPress={() => this.pickImage()}>       
            {this.state.is_humne &&
              <Image source={{ uri: humen }} style={{ width: 150, height: 150 }} />}
            {!this.state.is_humne &&
              <Image source={ humenBack } style={{ width: 150, height: 150 }} />}
            </TouchableOpacity>  
            <Text style={{fontSize:20, color:'green'}} onPress={this.pickImage}>Pick an image  you like from gallary</Text>           
                <TouchableOpacity
                          style={styles.button}
                          onPress={()=>this.UploadImage()}>                          
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  button: {
    marginTop : 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    height: 40,
    width: DEVICE_WIDTH - 40,
    borderRadius: 20,
    zIndex: 100,
  },
})