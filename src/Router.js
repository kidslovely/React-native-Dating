import Login from './components/Login';
import Signup1 from './components/Signup1';
import Signup2 from './components/Signup2';

import Signup3 from './components/Signup3';
import Signup4 from './components/Signup4';

import Profile from './components/Profile';

import Create from './components/Create';
import Home from './components/Home';
import BeforeHome from './components/BeforeHome';
import Setting from './components/Setting';


///// admin
import BeforeHomeAdmin from './components/BeforeHomeAdmin';
import HomeAdmin from './components/HomeAdmin';
import SettingAdmin from './components/SettingAdmin';
import ProfileAdmin from './components/ProfileAdmin';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {createStackNavigator} from 'react-navigation';

export default Router = createStackNavigator({
  
    Login:   {  screen: Login   },
    Signup1: {  screen: Signup1 },
    Signup2: {  screen: Signup2 },
    Signup3: {  screen: Signup3 },
    Signup4: {  screen: Signup4 },
   
    BeforeHome: {  screen: BeforeHome},
    Home: {  screen: Home},
    Profile: { screen: Profile},
    Setting: { screen: Setting},
    Create : {screen: Create},


    // for admin
    BeforeHomeAdmin: {  screen: BeforeHomeAdmin},
    HomeAdmin:    {  screen: HomeAdmin  },
    SettingAdmin: { screen: SettingAdmin},
    ProfileAdmin: { screen: ProfileAdmin},

 
},
);