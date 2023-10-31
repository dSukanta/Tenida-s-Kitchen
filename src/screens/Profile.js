import {View, Text,ScrollView,StyleSheet,Image} from 'react-native';
import React from 'react';
import {Button} from '@rneui/base';
import { globalStyles } from '../constants/globalStyles';

const Profile = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <Button
        title="Login/Signup"
        onPress={() => navigation.navigate('Auth')}
        color={'red'}
      />
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          alignItems: 'center',
        }}>
        <View style={styles.redLine} />
        <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
           <Image source={require('../images/user.jpg')} style={styles.profileimgStyle}/>
        </View>
        <View style={styles.redLine} />
      </View>
      <View style={{alignItems:'center',borderBottomWidth:1,borderColor:'red',paddingBottom:10,marginHorizontal:'5%'}}>
        <Text style={{fontWeight:'900',color:'red',fontSize:18,flexWrap:'wrap',marginHorizontal:10}}>{'User Name'}</Text>
        <Text style={[globalStyles.text,{color:'red',marginHorizontal:10}]}>{'user@email'}</Text>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles= StyleSheet.create({
  container:{
    backgroundColor:'black',
  },
  profileimgStyle:{
    width:100,
    height:100,
    resizeMode:'cover',
    borderRadius:100,
  },
  redLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'red',
    margin: 10,
  },
})
