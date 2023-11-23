import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import {
  SafeAreaView,
  Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigator/AppNavigator';
import SplashScreen from 'react-native-splash-screen';
import { AppContextProvider } from './src/context/AppContext';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';



function App(){
  
useEffect(() => {
  SplashScreen.hide();
  GoogleSignin.configure({
    webClientId: '369626514007-or3ins64v3pn6pm49g5lb7cgmfn30rbc.apps.googleusercontent.com', 
  });
}, [])

  return (
    <AppContextProvider>
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
    </AppContextProvider>
  );
}

export default App;
