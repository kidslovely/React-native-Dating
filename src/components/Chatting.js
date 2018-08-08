import React from 'react';

import {View, Text,StyleSheet} from 'react-native';

import {GiftedChat,} from 'react-native-gifted-chat';
import firebase from 'firebase';

class Chat extends React.Component
{
    uid = '';
    messagesRef = null;

    static navigationOptions = {
        title: " Chatting ",
      };
    state = {

          messages:[],  
    };
    loadMessages(callback) {
        // this.messagesRef = firebase.database().ref('messages');
        this.messagesRef.off();
        const onReceive = (data) => {
          const message = data.val();
          
          callback({
            _id: data.key,
            text: message.text,
            createdAt: new Date(message.createdAt),
            user: {
              _id: message.user._id,
              name: message.user.name,
            },
          });
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
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
    
     render()
    {
        const user = firebase.auth().currentUser;
        
        var userId = user.uid;

        console.log("user id  ======" + userId);
        
        return (
            
              <GiftedChat
                     messages={this.state.messages}
                     onSend={(message)=>{
                         //send message to your backend
                         this.sendMessage(message);
                     }}
                     keyboardShouldPersistTaps="never"
                    
                      user={{
                        _id: userId,
                        name : 'aaa'
                     
                      }}
              />
            
        );
    }
    componentDidMount() {
        this.messagesRef = firebase.database().ref('messages');
        this.loadMessages((message) => {
        this.setState((previousState) => {
            return {
              messages: GiftedChat.append(previousState.messages, message),
            };
          });
        });
      }

    componentWillUnmount()
    {
        // Backend.closeChat();
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;