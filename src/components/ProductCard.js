import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../constants/globalStyles';
import { Button } from '@rneui/base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Appcontext } from '../context/AppContext';
import colors from '../constants/colors';

const ProductCard = ({ data }) => {
  const { userData, userCart, setUserCart } = useContext(Appcontext);
  const [readMore, setReadMore] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async (product) => {
    const cartData = userCart?.find((item) => item.id === product.id);

    if (cartData) {
      // Product already in cart, increment quantity
      const updatedCart = userCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setUserCart(updatedCart);
      setQuantity(quantity + 1);
    } else {
      setUserCart([...userCart, { id: product.id,image:product.image, name: product.name, price: 299, quantity: 1 }]);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    const updatedCart = userCart.map((item) =>
      item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setUserCart(updatedCart);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      const updatedCart = userCart.map((item) =>
        item.id === data.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setUserCart(updatedCart);
    }
  };

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
            <Rating type="star" ratingCount={5} imageSize={10} readonly startingValue={4.5} />
          </View>
          <Text style={styles.ratingCount}>{96} ratings</Text>
        </View>
        <Text style={[globalStyles.text, { color: 'black' }]}>₹{299}</Text>
        {!readMore && (
          <Text style={styles.detailsText}>
            {`Lorem Ipsum is simply dummy text of the printing and typesetting industry.`.substring(0, 60)}
            <Text
              style={[styles.detailsText, { color: 'black', fontWeight: '600' }]
              } onPress={() => setReadMore(true)}>
              ...read more
            </Text>
          </Text>
        )}
        {readMore && (
          <Text style={styles.detailsText}>
            {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. `}
            <Text
              style={[styles.detailsText, { color: 'black', fontWeight: '600' }]
              } onPress={() => setReadMore(false)}>
              read less
            </Text>
          </Text>
        )}
      </View>
      <View style={styles.rightSide}>
        <Image source={data?.image} style={styles.image} />
        <View style={styles.buttonContainer}>
          {userCart?.find((item) => item.id === data.id) ? (
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleDecreaseQuantity}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={globalStyles.text}>{quantity}</Text>
              <TouchableOpacity onPress={handleIncreaseQuantity}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Button
              title="Add"
              buttonStyle={{
                backgroundColor: colors.red,
                borderRadius: 10,
              }}
              onPress={() => handleAddToCart(data)}
            />
          )}
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
  },
  buttonContainer: {
    position: 'relative',
    top:'-13%',
    left: '25%',
    width: '50%',
  },
  detailsText: {
    fontSize: 13,
    fontWeight: '400',
    color: 'grey',
  },
  quantityContainer: {
    flexDirection: 'row',
    gap:5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.red,
    borderRadius:10,
  },
  quantityButton: {
    borderRadius: 5,
    paddingHorizontal: 5,
    margin: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize:20,
    marginBottom: 10,
  },
});

export default ProductCard;
