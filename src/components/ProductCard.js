import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { globalStyles } from '../constants/globalStyles';
import { Button } from '@rneui/base';

const ProductCard = ({ data }) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftSide}>
        <Text style={styles.title}>{data?.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{4.5}</Text>
          <Text style={styles.ratingCount}>({96})</Text>
        </View>
        <Text style={[globalStyles.text,{color:'black'}]}>${299}</Text>
        <Text style={[globalStyles.text,{color:'grey'}]}>{'details'}</Text>
      </View>
      <View style={styles.rightSide}>
        <Image source={data?.image} style={styles.image} />
        <View style={styles.buttonContainer}>
          <Button title="Add" buttonStyle={{backgroundColor:'red'}}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  leftSide: {
    flex: 1,
    marginRight: 10,
    padding: 10,
  },
  rightSide: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    marginRight: 5,
  },
  ratingCount: {
    fontSize: 14,
    color: 'gray',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: '25%',
    width: '50%',
    backgroundColor: 'white',
  },
});

export default ProductCard;
