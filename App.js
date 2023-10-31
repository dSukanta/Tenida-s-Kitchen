import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import {
  SafeAreaView,
  Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigator/AppNavigator';
import SplashScreen from 'react-native-splash-screen';



function App(){
  
useEffect(() => {
  SplashScreen.hide();
}, [])

  return (
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
  );
}

export default App;
