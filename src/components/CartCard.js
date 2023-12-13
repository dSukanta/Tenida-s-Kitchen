import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { globalStyles } from '../constants/globalStyles';
import { Button } from '@rneui/base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Appcontext } from '../context/AppContext';
import colors from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { serverRequest } from '../utils/ApiRequests';
import { EditCart, handledeleteCart } from '../utils/Functions';

const CartCard = ({ data }) => {
  const { userData, userCart, setUserCart } = useContext(Appcontext);
  const cartData = userCart.find(item => item._id === data._id);
  const quantity = cartData ? cartData.quantity : 0;
  const [loading,setLoading]= useState({state:false,type: ''});

  const handleIncreaseQuantity = async() => {
    setLoading({state:true,type:'inc'})
    if (cartData) {
      const updatedCart = userCart.map(item =>
        item?.product?._id === data?.product?._id ? {...item, quantity: item.quantity + 1} : item,
      );
      await EditCart(userData,updatedCart,setUserCart)
    }
    setLoading({state:false,type:''})
  };

  const handleDecreaseQuantity = async() => {
    setLoading({state:true,type:'inc'})
    if (cartData && quantity > 1) {
      const updatedCart = userCart.map(item =>
        item?.product?._id === data?.product?._id ? {...item, quantity: item.quantity - 1} : item,
      );
      await EditCart(userData,updatedCart,setUserCart)
    }
    setLoading({state:false,type:''})
  };

  // const deleteItem=async(id)=>{
  //    if(userData?.length){
  //       const deleteRes= await serverRequest(`/${id}`,'DELETE',{},{});
  //    }else{
  //      const updatedCart= userCart?.filter((item,i)=>item._id!==id);
  //      setUserCart(updatedCart);

  //    }
  // }

  // console.log(userCart,'usercart cart page')

  const deleteCartItem= async()=>{
    setLoading({state:true, type: 'delete'});
    await handledeleteCart(userData,data,setUserCart);
    setLoading({state:false,name:''})
  }

  return (
    <View style={styles.card}>
      <View style={styles.leftSide}>
        <Text style={styles.title}>{data?.product?.title}</Text>
        <Text style={[globalStyles.text, { color: 'black',marginVertical:5}]}>₹{data?.product?.price}</Text>
        {
          loading?.state && loading?.type==='delete'?
          <ActivityIndicator size={'small'} color={colors.red}/>:
        <TouchableOpacity style={{flexDirection:'row',gap:5,alignItems:'center',width:50}} onPress={deleteCartItem}>
          <MaterialCommunityIcons name='delete' color={'grey'} size={20}/>
          <Text style={[globalStyles.text,{color:'black',fontSize:12}]}>Delete</Text>
        </TouchableOpacity>
        }
      </View>
      <View style={styles.rightSide}>
        <View style={styles.buttonContainer}>
          {
            loading?.state && (loading?.type==='dec' || loading.type==='inc')?
            <ActivityIndicator size={'small'} color={colors.red}/>:
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleDecreaseQuantity}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={globalStyles.text}>{data?.quantity}</Text>
              <TouchableOpacity onPress={handleIncreaseQuantity}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
        <View>
          <Text style={[globalStyles.text,{color:'black',marginVertical:5}]}>₹ {Number(data?.product?.price)* Number(data.quantity)}</Text>
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
