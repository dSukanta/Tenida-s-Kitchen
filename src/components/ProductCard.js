import React, {useContext, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {globalStyles} from '../constants/globalStyles';
import {BottomSheet, Button} from '@rneui/base';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Appcontext} from '../context/AppContext';
import colors from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProductDetails from '../screens/ProductDetails';
import {BASE_URI} from '@env'
import { EditCart, handleAddToCart } from '../utils/Functions';

const ProductCard = ({data}) => {
  const {userData, userCart, setUserCart} = useContext(Appcontext);
  const [readMore, setReadMore] = useState(false);
  const cartData = userCart?.find(item => item?.product?._id === data._id);
  const quantity = cartData ? cartData.quantity : 0;
  const [loading,setLoading]= useState({state:false,type: ''});

  // const handleAddToCart = async product => {
  //   if (cartData) {
  //     const updatedCart = userCart.map(item =>
  //       item._id === data._id ? {...item, quantity: item.quantity + 1} : item,
  //     );
  //     setUserCart(updatedCart);
  //   } else {
  //     setUserCart([
  //       ...userCart,
  //       {
  //         _id: data._id,
  //         image: data.images[0],
  //         name: data.title,
  //         price: data.price,
  //         quantity: 1,
  //       },
  //     ]);
  //   }
  // };

  const handleIncreaseQuantity = async() => {
    if (cartData) {
      const updatedCart = userCart.map(item =>
        item?.product?._id === data._id ? {...item, quantity: item.quantity + 1} : item,
      );
      await EditCart(userData,updatedCart,setUserCart)
    }
  };

  const handleDecreaseQuantity = async() => {
    if (cartData && quantity > 1) {
      const updatedCart = userCart.map(item =>
        item?.product?._id === data._id ? {...item, quantity: item.quantity - 1} : item,
      );
      await EditCart(userData,updatedCart,setUserCart)
    }
  };

  // console.log(cartData.quantity,'cartitem')

  return (
    <TouchableOpacity style={styles.card} onPress={()=>setReadMore(true)}>
      <View style={styles.leftSide}>
        <Text style={styles.title}>{data?.title}</Text>
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
          <Text style={styles.ratingCount}>{96} ratings</Text>
        </View>
        <Text style={[globalStyles.text, {color: 'black'}]}>₹{data?.price}</Text>

        <Text style={styles.detailsText}>
          {data?.description?.length>100 ? data?.description.substring(
            0,100)+"...": data?.description}
        </Text>
      </View>
      <View style={styles.rightSide}>
        <Image source={{uri:`${BASE_URI}${data?.images[0]}`}} style={styles.image} />
        <View style={styles.buttonContainer}>
          {cartData ? (
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
              onPress={() => handleAddToCart(userData,data,setUserCart)}
            />
          )}
        </View>
      </View>
      <BottomSheet isVisible={readMore} onBackdropPress={()=>setReadMore(false)}>
        <ProductDetails setReadMore={setReadMore}/>
      </BottomSheet>
    </TouchableOpacity>
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
    top: '-13%',
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
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 10,
  },
  quantityButton: {
    borderRadius: 5,
    paddingHorizontal: 5,
    margin: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default ProductCard;