import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../constants/globalStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');

const RecomendedCard = ({ data,navigation,index }) => {
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('Menu',{index})}>
    <ImageBackground source={data?.image} style={styles.card}>
      <View style={styles.overlay}>
        <Text style={[globalStyles.text,{fontSize:18}]}>{data?.category}</Text>
      </View>
    </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width:width/2.5,
    borderRadius: 10,
    overflow: 'hidden',
    height: width/2.5, // adjust the height as needed
    margin: 10,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // adjust the opacity as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecomendedCard;
