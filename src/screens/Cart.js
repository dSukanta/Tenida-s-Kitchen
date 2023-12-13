import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import RedLine from '../components/RedLine';
import {globalStyles} from '../constants/globalStyles';
import {Appcontext} from '../context/AppContext';
import CartCard from '../components/CartCard';
import {Button} from '@rneui/base';
import colors from '../constants/colors';
import RazorpayCheckout from 'react-native-razorpay';
import {RAZORPAY_KEY} from '@env';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getCart } from '../utils/Functions';

const {height, width} = Dimensions.get('window');

const Cart = ({navigation}) => {
  const {
    userCart,
    getCartTotal,
    userAddress,
    setUserCart,
    userOrders,
    setUserOrders,
    userData,
  } = useContext(Appcontext);

  const defAdd = userAddress?.length?userAddress.filter(add => add?.default):null;
  const [grandTotal, setGrandTotal] = useState(0);

  // console.log(defAdd,'def');

  const handleCheckout = async() => {

      if (!userData?.length) {
      return navigation.navigate('Auth', {source: 'Cart'});
    }
    var options = {
      description: 'Payment for checkout',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: RAZORPAY_KEY,
      amount: grandTotal *100,
      name: `Sukanta`,
      order_id: '',
      prefill: {
        email: 'sukanta@example.com',
        contact: '9191919191',
        name: 'Sukanta Dolai',
      },
      theme: {color: colors.red},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        const order = {
          order_data: data,
          orderId: data.razorpay_payment_id,
          totalAmount: grandTotal *100,
          products: [],
        };
        userCart?.forEach(item => {
          order.products.push(item);
        });
        setUserOrders([...userOrders, order]);
        setUserCart([]);
        navigation.navigate('Success', {data: data});
      })
      .catch(error => {
        console.log(`Error: ${error.code} | ${error.description}`);
        navigation.navigate('Error', {data: error});
      });
  };


  useEffect(()=>{
    const cartTotalAmount= getCartTotal();
    const gst= (getCartTotal() * 12) / 100;

    const grandTotal = cartTotalAmount+ gst;
    setGrandTotal(grandTotal);
  },[userData,userCart]);

  console.log(userCart,'cart data')


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
            {userCart?.map((cart, i) => (
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
                <Text style={[globalStyles.text]}>{getCartTotal()}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[globalStyles.text]}>GST :</Text>
                <Text style={[globalStyles.text]}>
                  {(getCartTotal() * 12) / 100}
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
