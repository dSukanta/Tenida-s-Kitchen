import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import colors from '../constants/colors';
import {BottomFabBar} from 'rn-wave-bottom-bar';
import Menu from '../screens/Menu';
import Orders from '../screens/Orders';
import FoodReels from '../screens/FoodReels';
import Cart from '../screens/Cart';
import withConnection from '../components/WithConnection';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.red,
        tabBarActiveBackgroundColor: colors.red,
        tabBarInactiveBackgroundColor: colors.red,
        tabBarHideOnKeyboard:true
      }}
      tabBar={props => (
        <BottomFabBar
          mode={'default'}
          isRtl={false}
          // Add Shadow for active tab bar button
          focusedButtonStyle={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,
            elevation: 14,
          }}
          // - You can add the style below to show screen content under the tab-bar
          // - It will makes the "transparent tab bar" effect.
          bottomBarContainerStyle={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
          {...props}
        />
      )}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
        name="Home"
        component={withConnection(Home)}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <Feather name="video" color={color} size={size} />
          ),
        }}
        name="FoodReels"
        component={withConnection(FoodReels)}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <Fontisto name="shopping-bag-1" color={color} size={size} />
          ),
        }}
        name="Cart"
        component={withConnection(Cart)}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
        name="Profile"
        component={withConnection(Profile)}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    margin: 10,
    borderRadius: 5,
    height: 60,
    backgroundColor: colors.red,
  },
  activeIconStyle: {
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'white',
  },
});
