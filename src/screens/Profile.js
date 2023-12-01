import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState,useContext,useEffect} from 'react';
import {Button, ListItem} from '@rneui/base';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../constants/globalStyles';
import colors from '../constants/colors';
import { Appcontext } from '../context/AppContext';
import { getProfileName } from '../utils/Helper';

const {height, width} = Dimensions.get('window');

const Landing = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {userData,Logout,setUserData}= useContext(Appcontext);

  // console.log(userData,'userData')


  const handlenavigate = path => {
    if(userData?.length || path === 'Help'){
      navigation.navigate(path);
    }else{
      navigation.navigate('Auth');
    }
  };

  const listItems = [
    { id:1,
      title: 'Settings & Personalization',
      icon: <MaterialIcons name="settings" size={30} color={'white'} />,
      onPress: () => handlenavigate('Settings'),
    },
    { id:2,
      title: 'Addresses',
      icon: <MaterialIcons name="add-home-work" size={30} color={'white'} />,
      onPress: () => handlenavigate('Addresses'),
    },
    { id:3,
      title: 'Help & Support',
      icon: <MaterialIcons name="support-agent" size={30} color={'white'} />,
      onPress: () => handlenavigate('Help'),
    },
    // {
    //   title:'Video Engagement and Rewards',
    //   icon: <MaterialIcons name='videocam' size={30} color={'white'}/>,
    //   onPress:()=> handlenavigate('FoodReels')
    // },
    { id:4,
      title: 'Orders',
      icon: <Feather name="truck" size={30} color={'white'} />,
      onPress: () => handlenavigate('Orders'),
    },
    // {
    //   title: 'Logout',
    //   icon: <MaterialIcons name="logout" size={30} color={'white'} />,
    //   onPress: () => handleLogout(),
    // },
  ];

  const renderRow = ({item}) => {
    return (
      <ListItem
        onPress={item.onPress}
        bottomDivider
        containerStyle={{
          backgroundColor: 'transparent',
          padding: 0,
          margin: 0,
          paddingVertical: 15,
        }}>
        {item.icon}
        <ListItem.Content>
          <ListItem.Title style={[globalStyles.text]}>
            {item.title}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  async function handleLogout() {
    Alert.alert('Are you sure', 'You want to logout?', [
      {
        text: 'Yes',

        onPress: async() => {
          await Logout();
          Alert.alert('Success!', 'Logged out successfully');
          navigation.navigate('Auth');
        },
      },
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };


  return (
    <ScrollView style={styles.container}>
      {!userData.length? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 15,
            marginHorizontal: 20,
          }}>
          <View>
            <Text style={[globalStyles.text, {fontSize: 18}]}>
              Your Account
            </Text>
            <Text style={[globalStyles.text, {fontWeight: '400'}]}>
              Login to manage your account.
            </Text>
          </View>
          <View>
            <Button
              title="Login"
              onPress={() => navigation.navigate('Auth')}
              color={colors.red}
              buttonStyle={{paddingHorizontal: width / 9, borderRadius: 10}}
              containerStyle={{justifyContent: 'center', alignItems: 'center'}}
            />
          </View>
        </View>
      ) : (
        <View style={styles.headerContainer}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons name="person" size={25} color={'white'} />
            <Text style={[globalStyles.text, {fontSize: 18}]}>{getProfileName(userData) || 'Unknown'}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Rewards')}>
            <MaterialIcons name="emoji-events" size={25} color={'white'} />
          </TouchableOpacity>
        </View>
      )}
      <View style={{margin: 20, marginTop: 30}}>
        <FlatList
          data={listItems}
          keyExtractor={(item,index) => item?.id?.toString()}
          renderItem={renderRow}
        />
        {
          userData.length ?
          <TouchableOpacity style={{flexDirection:'row',gap:10,alignItems:'center',paddingVertical:10}} onPress={()=>handleLogout()}>
            <MaterialIcons name="logout" size={30} color={'white'} />
            <Text style={[globalStyles.text]}>Logout</Text>
          </TouchableOpacity>:null
        }
      </View>
    </ScrollView>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  profileimgStyle: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  redLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'red',
    margin: 10,
  },
});
