import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../constants/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from '@rneui/base';
import colors from '../constants/colors';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <Image source={require('../images/logo.jpg')} style={styles.imgStyle} />
      <View>
        <Text style={globalStyles.text}>Deliver to </Text>
        <Text style={[globalStyles.text, {fontSize: 12}]}>{'Durgapur'.substring(0,20)}...</Text>
      </View>
      </View>
      <View>
        <Button
          title={'Logout'}
          icon={{
            name:'logout',
            type:'antdesign',
            size:20,
            color:'white'
          }}
          buttonStyle={{backgroundColor:colors.red,borderRadius:10}}
          titleStyle={globalStyles.text}
        />
      </View>
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
    // justifyContent: 'space-between',
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
