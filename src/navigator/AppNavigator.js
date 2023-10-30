import * as React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Auth from '../screens/Auth';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={TabNavigator} options={{headerShown:false}}/>
      <Stack.Screen name="Auth" component={Auth} options={{headerShown:false}}/>

      {/* <Stack.Screen name="Home" component={Profile} /> */}
    </Stack.Navigator>
  );
}

export default AppNavigator;
