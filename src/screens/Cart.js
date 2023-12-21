import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Modal,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import RedLine from '../components/RedLine';
import {globalStyles} from '../constants/globalStyles';
import {Appcontext} from '../context/AppContext';
import CartCard from '../components/CartCard';
import {BottomSheet, Button} from '@rneui/base';
import colors from '../constants/colors';
import RazorpayCheckout from 'react-native-razorpay';
import {RAZORPAY_KEY} from '@env';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { serverRequest } from '../utils/ApiRequests';
import { addCartServer, createOrder, dataBaseOrderCreate } from '../utils/Functions';
import SuccessPage from './Success';
import ErrorPage from './Error';

const {height, width} = Dimensions.get('window');

const Cart = ({navigation}) => {
  const {
    userCart,
    cartTotal,
    userAddress,
    setUserCart,
    userOrders,
    setUserOrders,
    userData,
  } = useContext(Appcontext);

  const defAdd = userAddress?.length?userAddress.filter(add => add?.default):null;
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading,setLoading] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState({open: false,status:'',payload:null});

  // console.log(userCart,'def');

  const handleCheckout = async() => {
    setLoading(true)

      if (!userData?.length) {
      return navigation.navigate('Auth', {source: 'Cart'});
    };

    if(!userAddress?.length){
        return Alert.alert('Address Required','Address is required to make order!')
    };

    if(!userData[0]?.phone){
      return Alert.alert('Phone Required','Phone number is required to complete purchase')
    }

    const orderid= await createOrder(userCart,userData);

    var options = {
      description: `Payment for checkout at Tenida's Kitchen`,
      image: 'https://res.cloudinary.com/dcqbgh3vt/image/upload/v1702894890/huroqdadrvgkgw243hki.jpg',
      currency: 'INR',
      key: RAZORPAY_KEY,
      // amount: grandTotal *100,
      name: `Tenida's Kitchen`,
      order_id: orderid? orderid:'',
      prefill: {
        email: userData[0]?.email || '',
        contact: userData[0]?.phone || '',
        name: userData[0]?.fullname,
      },
      theme: {color: colors.red},
    };

    // console.log(options,'options')

    try {
      const data = await RazorpayCheckout.open(options);
      if (data && data.razorpay_payment_id){
        // console.log(data,'payment data...');
        const captureRes= await dataBaseOrderCreate(userData,orderid,userCart,(defAdd[0]?._id || userAddress[0]?._id));
        if(captureRes?.data){
          const refreshCart= await addCartServer(userData,[]);
          // console.log(refreshCart,'rfcart')
          setUserCart(refreshCart);
          // navigation.navigate('Success', {order_id: orderid, payment_id:data?.razorpay_payment_id}); 
          setPaymentResponse({open:true, status: 'success', payload:{payment_id:data?.razorpay_payment_id, order_id:orderid}})
      }else{
        Alert.alert('Error','Something went wrong , try again later.');
      }
      }
    } catch (error) {
      console.log(`Error: ${error.code} | ${error.description}`);
      // navigation.navigate('Error', {data: error});
      setPaymentResponse({open:true,status:'error',payload:{error}})
    }
    setLoading(false);
  };

  useEffect(()=>{
    const cartTotalAmount= cartTotal;
    const gst= (cartTotal * 12) / 100;

    const grandTotal = cartTotalAmount+ gst;
    setGrandTotal(grandTotal);
  },[userData,cartTotal]);

  // useEffect(()=>{
  //   const defAdd = userAddress?.filter(add => add?.default);
  //   if(defAdd?.length){
  //     setDefAddress(defAdd)
  //   }else if(!defAdd?.length && userAddress?.length){
  //     setDefAddress(userAddress[0])
  //   }
  // },[userAddress])

  return (
    <View style={globalStyles.container}>
      <View>
        <RedLine text={'your cart'} />
      </View>
      {userCart?.length ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: userCart.length ? 'start' : 'center',
          }}>
          <View>
            <Text
              style={[globalStyles.text, {alignSelf: 'center', margin: 10}]}>
              Item(s) Added
            </Text>
            {userCart.map((cart, i) => (
              <CartCard data={cart} key={i} />
            ))}
            <Button
              title={'+ Add More'}
              buttonStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: colors.red,
                borderRadius: 10,
                marginVertical: 5,
              }}
              containerStyle={{width: '90%', alignSelf: 'center'}}
              titleStyle={globalStyles.text}
              onPress={() => navigation.navigate('Menu')}
            />
            <View style={styles.rowContainer}>
              <View style={styles.row}>
                <Text style={[globalStyles.text]}>Total Price :</Text>
                <Text style={[globalStyles.text]}>{cartTotal}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[globalStyles.text]}>GST :</Text>
                <Text style={[globalStyles.text]}>
                  {(cartTotal * 12) / 100}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[globalStyles.text]}>Grand Total :</Text>
                <Text style={[globalStyles.text]}>
                  {grandTotal}
                </Text>
              </View>
            </View>
            <View style={{width: '90%', alignSelf: 'center'}}>
              <Text style={[globalStyles.text]}>Address:</Text>
            </View>
            {(userData?.length && defAdd?.length && userAddress?.length) ? (
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderColor: colors.red,
                  padding: 10,
                  borderRadius: 10,
                }}>
                <View>
                  <Text style={[globalStyles.text]}>{defAdd[0]?.userInfo?.fullname}</Text>
                  <Text style={[globalStyles.text]}>{defAdd[0]?.landmark}</Text>
                  <Text
                    style={[
                      globalStyles.text,
                    ]}>{`${defAdd[0]?.city}, ${defAdd[0]?.state}, ${defAdd[0]?.pincode}`}</Text>
                  <Text style={[globalStyles.text]}>{defAdd[0]?.phone}</Text>
                </View>
                <View>
                  <Button
                    title={'Change'}
                    buttonStyle={{
                      backgroundColor: colors.red,
                      borderRadius: 10,
                    }}
                    containerStyle={{margin: 10}}
                    titleStyle={{fontSize: 15}}
                    onPress={() => navigation.navigate('Addresses')}
                  />
                </View>
              </View>
            ):(
              <View>
                <Button 
                  title={'Add / Set a address'}
                  buttonStyle={{backgroundColor:'transparent', borderRadius:10,borderWidth:1,borderColor:colors.red}}
                  containerStyle={{width:'90%',alignSelf: 'center', marginVertical:10}}
                  onPress={()=> userData?.length? navigation.navigate('Addresses'):navigation.navigate('Auth',{source:'Addresses'})}
                />
              </View>
            )}
            <Button
              title={'Proceed to Checkout'}
              buttonStyle={{
                padding: 10,
                backgroundColor: colors.red,
                borderWidth: 1,
                borderColor: colors.red,
              }}
              containerStyle={{
                width: '90%',
                borderRadius: 10,
                marginBottom: '18%',
                alignSelf: 'center',
              }}
              onPress={handleCheckout}
              loading={loading}
              disabled={loading}
              disabledStyle={{backgroundColor: colors.disabledRed}}
            />
          </View>
        </ScrollView>
      ) : (
        <View
          style={[
            globalStyles.container,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <MaterialCommunityIcons
            name="cart-remove"
            size={50}
            color={'white'}
          />
          <Text style={[globalStyles.text, {marginVertical: 10}]}>
            No item available in your cart
          </Text>
          <Button
            title={'Explore Menu'}
            onPress={() => navigation.navigate('Menu')}
            buttonStyle={{
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: colors.red,
            }}
            containerStyle={{
              width: '70%',
              alignSelf: 'center',
              marginVertical: 15,
            }}
          />
        </View>
      )}
      <BottomSheet isVisible={paymentResponse?.open}>
        {
          paymentResponse?.open && paymentResponse?.status ==='success' &&
          <SuccessPage paymentId={paymentResponse?.payload?.payment_id} orderId={paymentResponse?.payload?.order_id} navigation={navigation} setPaymentResponse={setPaymentResponse}/>
        }
        {
           paymentResponse?.open && paymentResponse?.status ==='error' &&
           <ErrorPage data={paymentResponse?.payload} setPaymentResponse={setPaymentResponse}/>
        }
      </BottomSheet>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
   row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    margin: 10,
    padding: 10,
  },
});
