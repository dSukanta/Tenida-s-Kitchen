import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState,useContext } from 'react';
import {globalStyles} from '../constants/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from '@rneui/base';
import colors from '../constants/colors';
import Geolocation from '@react-native-community/geolocation';
import { Appcontext } from '../context/AppContext';


const HomeHeader = ({navigation}) => {
const [curLocation,setCurlocation] = useState(null);
const {userData,Logout}= useContext(Appcontext);


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

const getLoc= async(lat,long)=>{
   const res= await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`);
  //  console.log(await res.json(),'response')
  const data = await res.json();
  setCurlocation(data);
}

useEffect(()=>{
  Geolocation.getCurrentPosition(info => getLoc(info?.coords?.latitude,info?.coords?.longitude));
},[]);



  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <Image source={require('../images/logo.jpg')} style={styles.imgStyle} />
     <View>
        <Text style={globalStyles.text}>You are now in</Text>
        {/* <Text style={[globalStyles.text, {fontSize: 12}]}>{curLocation?.address?.road?.substring(0,20)}...</Text> */}
        <Text style={[globalStyles.text, {fontSize: 12}]}>{curLocation?(curLocation.address?.city?.length>20?substring(0,20)+"...":curLocation?.address?.city):('Kolkata')}</Text>
        <Text style={[globalStyles.text, {fontSize: 12}]}>{curLocation?curLocation.address?.postcode:700001}</Text>
      </View>
      </View>
      {userData.length ? <View>
        <Button
          title={'Logout'}
          icon={{
            name:'logout',
            type:'antdesign',
            size:15,
            color:'white'
          }}
          buttonStyle={{backgroundColor:colors.red,borderRadius:10}}
          titleStyle={globalStyles.text}
          onPress={handleLogout}
        />
      </View>:
      <View>
      <Button
        title={'Login'}
        icon={{
          name:'login',
          type:'antdesign',
          size:15,
          color:'white'
        }}
        buttonStyle={{backgroundColor:colors.red,borderRadius:10,}}
        titleStyle={globalStyles.text}
        onPress={()=>navigation.navigate('Auth')}
      />
    </View>
      }
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    margin:10,
    padding:10,
  },
  childContainer:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,
  },
  imgStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'cover',
  },
});
