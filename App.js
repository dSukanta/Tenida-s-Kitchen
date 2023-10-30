import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigator/AppNavigator';




function App(){
  

  return (
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
  );
}

export default App;
