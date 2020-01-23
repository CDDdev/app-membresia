import React from 'react'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { Ionicons } from '@expo/vector-icons'

import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import PlanScreen from './screens/PlanScreen'
import PostScreen from './screens/PostScreen'
import AgendarScreen from './screens/AgendarScreen'
import ProfileScreen from './screens/ProfileScreen'

import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyC4aH44QFAuVE9a0mtpMAj1P38Jbu-Wy80",
  authDomain: "app-membresia-e4bb1.firebaseapp.com",
  databaseURL: "https://app-membresia-e4bb1.firebaseio.com",
  projectId: "app-membresia-e4bb1",
  storageBucket: "app-membresia-e4bb1.appspot.com",
  messagingSenderId: "241490730113",
  appId: "1:241490730113:web:b31a015bce1ff4ea428180",
  measurementId: "G-21R00BXJZF"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor} />
      }
    },
    Agendar: {
      screen: AgendarScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-list-box" size={24} color={tintColor} />
      }
    },
    Post: {
      screen: PostScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-add-circle" size={24} color={tintColor} />
      }
    },
    Plan: {
      screen: PlanScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-document" size={24} color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-person" size={24} color={tintColor} />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#161F3D",
      inactiveTintColor: "#B8BBC4",
      showLabel: false
    }
  }
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Loading'
    }
  )
)