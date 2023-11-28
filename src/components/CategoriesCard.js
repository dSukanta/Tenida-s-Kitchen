import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { globalStyles } from '../constants/globalStyles';

const CategoriesCard = ({ data ,navigation , index}) => {
  return (
    <TouchableOpacity style={{margin:10,justifyContent:'center',alignItems:'center'}} onPress={()=>navigation.navigate('Menu',{index})}>
      <Image source={data?.image || require('../images/slider_image.jpg')} style={styles.image} />
      <Text style={[globalStyles.text,{fontSize:13,marginVertical:10}]}>{data?.category || 'Category'}</Text>
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
