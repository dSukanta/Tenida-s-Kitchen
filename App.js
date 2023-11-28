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
import { getUniqueId} from 'react-native-device-info';
import { getFromStorage, saveToStorage } from './src/utils/Helper';



function App(){
  
useEffect(() => {
  SplashScreen.hide();
  GoogleSignin.configure({
    webClientId: '369626514007-or3ins64v3pn6pm49g5lb7cgmfn30rbc.apps.googleusercontent.com', 
  });
  getDevice();
}, []);

const getDevice=async()=>{
  let deviceId= await getFromStorage("deviceId");
  if(!deviceId){
     deviceId = await getUniqueId();
    saveToStorage("deviceId", deviceId);
  }
 return deviceId;
}


  return (
    <AppContextProvider>
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
    </AppContextProvider>
  );
}

export default App;
