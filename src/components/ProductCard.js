import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Card} from '@rneui/base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { globalStyles } from '../constants/globalStyles';

const {height, width} = Dimensions.get('window');


const ProductCard = ({data}) => {
  return (
    <TouchableOpacity style={styles.cardStyle}>
      <View style={{position: 'relative'}}>
        <Card.Image
          source={require('../images/slider_image.jpg')}
          style={{borderRadius: 10, resizeMode: 'cover'}}
        />
        <TouchableOpacity style={styles.addToCartBtn}>
          <Text style={styles.addToCartText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={styles.ratingContainer}>
          <Text style={[globalStyles.text, {color: 'white'}]}>{'4.5'}</Text>
          <AntDesign name="star" color={'white'} size={12} />
        </View>
        <View style={{paddingHorizontal: 7}}>
          <Text style={[globalStyles.text, {color: 'black'}]} numberOfLines={1}>
            {data?.name}
          </Text>
          <Text
            style={{color: 'black', fontWeight: '400', fontSize: 12}}
            numberOfLines={2}>
            Subtitle
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardStyle: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    width: width / 2.2,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  addToCartBtn: {
    position: 'absolute',
    top: '90%',
    left: '30%',
    backgroundColor: 'transparent',
  },
  addToCartText: {
    backgroundColor: '#f12a2a',
    color: 'white',
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  ratingContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#74c93f',
    padding: 5,
    paddingVertical: 2,
    borderRadius: 5,
    gap: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  }
});
