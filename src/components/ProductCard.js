import React, {useContext, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import {globalStyles} from '../constants/globalStyles';
import {BottomSheet, Button} from '@rneui/base';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Appcontext} from '../context/AppContext';
import colors from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProductDetails from '../screens/ProductDetails';
import {BASE_URI} from '@env'
import { addCartServer, addToCart, decreaseQuantity, getCartfromLocal, increaseQuantity } from '../utils/Functions';
import { saveToStorage } from '../utils/Helper';

const ProductCard = ({data}) => {
  const {userData, userCart, setUserCart} = useContext(Appcontext);
  const [readMore, setReadMore] = useState(false);
  const cartData = userCart?.find(item => item?.product?._id === data._id);
  const quantity = cartData ? cartData.quantity : 0;
  const [loading, setLoading] = useState({state:false,type:''});

  const updatedAndFormatCart = async (product) => {
    // console.log(product,'update cart func');

    let updatedCart;
    let formatCartData;
    if(cartData){
      updatedCart =await userCart?.map(item =>item?.product?._id === data._id ? {...item, quantity: item.quantity + 1} : item,);
      formatCartData= await updatedCart?.map((item)=> {return {product: item?.product?._id,quantity:item?.quantity}});
    }else{
      updatedCart = [...userCart,{product:product,quantity:1,},];
      formatCartData= await updatedCart?.map((item)=> {return {product: item?.product?._id,quantity:item?.quantity}});
    };
    return {updatedCart,formatCartData}
  };

  const handleAddToCart = async(product) =>{
    setLoading({state:true,type:'addcart'});
    const cartData = await addToCart(userData, product,!!cartData,userCart);
    // console.log(cartData,'cartData');
    setUserCart(cartData);
    setLoading({state:false,type:''});
  };

  const handleIncreaseQuantity = async(id) => {
    setLoading({state:true,type:'inc'});
   
      const upCartData = await increaseQuantity(userData,userCart,!!cartData,data?._id);
      setUserCart(upCartData);
    setLoading({state:false,type:''});
  };

  const handleDecreaseQuantity = async() => {
    setLoading({state:true,type:'dec'});
    const upCartData = await decreaseQuantity(userData,userCart,!!cartData,data?._id,quantity);
    setUserCart(upCartData);
    setLoading({state:false,type:''});
  }; 

  // console.log(`${BASE_URI}${data?.images[0]}`,'cartitem')


  // console.log(userData,userCart,'user');


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
          {
            loading?.state && (loading?.type ==='inc' || loading?.type ==='dec')?
            <ActivityIndicator size={'small'} color={colors.red}/>:
            <View>
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
                  onPress={() => handleAddToCart(data)}
                  loading={loading?.state && loading?.type ==='addcart'}
                  disabled={loading?.state && loading?.type ==='addcart'}
                  disabledStyle={{backgroundColor: colors.disabledRed}}
                />
              )}
            </View>
          }
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
