import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {globalStyles} from '../constants/globalStyles';
import {Button} from '@rneui/base';
import {Rating, AirbnbRating} from 'react-native-ratings';

const ProductCard = ({data}) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftSide}>
        <Text style={styles.title}>{data?.name}</Text>
        <View style={styles.ratingContainer}>
          <View
            style={{
              padding: 5,
              borderWidth: 1,
              borderColor: '#f1c40e',
              borderRadius: 5,
            }}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={10}
              readonly
              startingValue={4.5}
            />
          </View>
          {/* <Text style={styles.rating}>{4.5}</Text> */}
          <Text style={styles.ratingCount}>{96} ratings</Text>
        </View>
        <Text style={[globalStyles.text, {color: 'black'}]}>${299}</Text>
        <Text
          style={styles.detailsText}>{(`Lorem Ipsum is simply dummy text of the printing and typesetting industry.`).substring(0,60)}<Text style={[styles.detailsText,{color:'black',fontWeight:'600'}]}>...read more</Text></Text>
      </View>
      <View style={styles.rightSide}>
        <Image source={data?.image} style={styles.image} />
        <View style={styles.buttonContainer}>
          <Button title="Add" buttonStyle={{backgroundColor: 'red'}} />
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
    color: 'black',
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
    fontSize: 12,
    color: 'black',
    margin: 10,
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
  detailsText:{
    fontSize:13,
    fontWeight:'400',
    color:'grey',
  }
});

export default ProductCard;
