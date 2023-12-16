import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { globalStyles } from '../constants/globalStyles';
import { Button } from '@rneui/base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Appcontext } from '../context/AppContext';
import colors from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { saveToStorage } from '../utils/Helper';
import { addCartServer, decreaseQuantity, getCartfromLocal, increaseQuantity } from '../utils/Functions';

const CartCard = ({ data }) => {
  const { userData, userCart, setUserCart } = useContext(Appcontext);
  const cartData = userCart?.find(item => item?.product?._id === data?.product?._id);
  const quantity = cartData ? cartData.quantity : 0;
  const [loading, setLoading] = useState({state:false,type:''});

  const handleIncreaseQuantity = async() => {
    setLoading({state:true,type:'inc'});
    const updatedCart= await increaseQuantity(userData,userCart,!!cartData,data?.product?._id);
    setUserCart(updatedCart);
    setLoading({state:false,type:''});
  };

  const handleDecreaseQuantity = async() => {
    setLoading({state:true,type:'dec'});
    const updatedCart= await decreaseQuantity(userData,userCart,!!cartData,data?.product?._id,quantity);
    setUserCart(updatedCart)
    setLoading({state:false,type:''});
  };

  const deleteItem=async(id)=>{
    setLoading({state:true,type:'delete'});
    if(userData?.length){
      // console.log(userCart,'uk')
      const updatedCart= await userCart?.filter((item,i)=>item?.product?._id!==id);
        const formatCartData =await  updatedCart?.map(item => {return{product: item?.product?._id, quantity: item.quantity}});
        try {
          const upCartData= await addCartServer(userData,formatCartData);
          // console.log(upCartData,'uddata')
          setUserCart(upCartData);
          Alert.alert('Success','Cart item deleted successfully.');
        } catch (error) {
          console.log(error,'error deleting cart item')
          Alert.alert('Error','Something went wrong. Try again later.');
        }
      
      // console.log(formatCartData,'fcart','updated cart')
    }else{
      try {
        const updatedCart= userCart.filter((item,i)=>item?.product?._id!==id);
        await saveToStorage('cart', updatedCart);
        const cartData= await getCartfromLocal();
        setUserCart(cartData);
        Alert.alert('Success', 'Item removed from cart successfully.')
      } catch (error) {
        console.log(error,'error deleting cart item')
        Alert.alert('Error', 'Something went wrong. Try again later')
      }
    }
    setLoading({state:false,type:''});
  }

  // console.log(data,'title')

  return (
    <View style={styles.card}>
      <View style={styles.leftSide}>
        <Text style={styles.title}>{data?.product?.title}</Text>
        <Text style={[globalStyles.text, { color: 'black',marginVertical:5}]}>₹{data?.product?.price}</Text>
        {loading?.state && loading?.type === 'delete' ?
          <ActivityIndicator size={'small'} color={colors.red}/>:          
          <TouchableOpacity style={{flexDirection:'row',gap:5,alignItems:'center',width:50}} onPress={()=>deleteItem(data?.product?._id)}>
          <MaterialCommunityIcons name='delete' color={'grey'} size={20}/>
          <Text style={[globalStyles.text,{color:'black',fontSize:12}]}>Delete</Text>
        </TouchableOpacity>}
      </View>
      <View style={styles.rightSide}>
        <View style={styles.buttonContainer}>
          {
            loading?.state && (loading?.type==='inc'||loading?.type==='dec') ?
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
