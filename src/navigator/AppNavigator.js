import * as React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Auth from '../screens/Auth';
import ProductDetails from '../screens/ProductDetails';
import Settings from '../screens/Settings';
import Help from '../screens/Help';
import Passwords from '../screens/Passwords';
import FoodReels from '../screens/FoodReels';
import Menu from '../screens/Menu';
import Orders from '../screens/Orders';
import Addresses from '../screens/Addresses';
import Success from '../screens/Success';
import Error from '../screens/Error';
import Rewards from '../screens/Rewards';
import CustomHeader from '../components/CustomHeader';
import Offline from '../screens/Offline';
import VideoDetails from '../screens/VideoDetails';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={TabNavigator} options={{headerShown:false}}/>
      <Stack.Screen name="Auth" component={Auth} options={{headerShown:false}}/>
      <Stack.Screen name="Menu" component={Menu} options={{headerShown:false}}/>
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{headerShown:false}}/>
      <Stack.Screen name="VideoDetails" component={VideoDetails} options={{headerShown:false}}/>
      <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}}/>
      <Stack.Screen name="Rewards" component={Rewards} options={{headerShown:false}}/>
      <Stack.Screen name="Addresses" component={Addresses} options={{headerShown:false}}/>
      <Stack.Screen name="Help" component={Help} options={{headerShown:false}}/>
      <Stack.Screen name="Passwords" component={Passwords} options={{headerShown:false}}/>
      <Stack.Screen name="Orders" component={Orders} options={{headerShown:false}}/>
      <Stack.Screen name="Success" component={Success} options={{headerShown:false}}/>
      <Stack.Screen name="Error" component={Error} options={{headerShown:false}}/>
      <Stack.Screen name="Offline" component={Offline} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default AppNavigator;
