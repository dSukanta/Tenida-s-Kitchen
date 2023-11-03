import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../constants/globalStyles';
import { Button } from '@rneui/base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Appcontext } from '../context/AppContext';
import colors from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 

const CartCard = ({ data }) => {
  const { userData, userCart, setUserCart } = useContext(Appcontext);
  const [quantity, setQuantity] = useState(1);

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

  const deleteItem=(id)=>{
     const updatedCart= userCart.filter((item,i)=>item.id!==id);
     setUserCart(updatedCart);
  }

  return (
    <View style={styles.card}>
      <View style={styles.leftSide}>
        <Text style={styles.title}>{data?.name}</Text>
        <Text style={[globalStyles.text, { color: 'black',marginVertical:5}]}>₹{299}</Text>
        <TouchableOpacity style={{flexDirection:'row',gap:5,alignItems:'center',width:50}} onPress={()=>deleteItem(data?.id)}>
          <MaterialCommunityIcons name='delete' color={'grey'} size={20}/>
          <Text style={[globalStyles.text,{color:'black',fontSize:12}]}>Delete</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rightSide}>
        <View style={styles.buttonContainer}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleDecreaseQuantity}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={globalStyles.text}>{quantity}</Text>
              <TouchableOpacity onPress={handleIncreaseQuantity}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View>
          <Text style={[globalStyles.text,{color:'black',marginVertical:5}]}>₹ {Number(data?.price)* Number(data.quantity)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
  },
  leftSide: {
    flex: 1,
    marginRight: 10,
    padding: 10,
  },
  rightSide: {
    flex: 1,
    alignItems:'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '50%',
    marginTop: 10,
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

export default CartCard;
