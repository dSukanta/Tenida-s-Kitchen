import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { globalStyles } from '../constants/globalStyles';
import {BASE_URI} from '@env'

const CategoriesCard = ({ data ,navigation}) => {
  return (
    <TouchableOpacity style={{margin:10,justifyContent:'center',alignItems:'center'}} onPress={()=>navigation.navigate('Menu',{category: data?.title})}>
      <Image source={data?.image? {uri:BASE_URI+data?.image}  : require('../images/slider_image.jpg')} style={styles.image} />
      <Text style={[globalStyles.text,{fontSize:13,marginVertical:10}]}>{data?.title || 'Category'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius:100,
  },
});

export default CategoriesCard;
