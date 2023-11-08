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

const {height, width} = Dimensions.get('window');

const Cart = ({navigation, route}) => {
  const {userCart, cartTotal,userAddress} = useContext(Appcontext);

  const defAdd= userAddress?.filter((add)=>add?.default)



  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <RedLine text={'your cart'} />
      </View>
      {userCart.length ? (
        <View>
          <Text style={[globalStyles.text, {alignSelf: 'center', margin: 10}]}>
            Ites(s) Added
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
              <Text style={[globalStyles.text]}>{(cartTotal * 18) / 100}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[globalStyles.text]}>Grand Total :</Text>
              <Text style={[globalStyles.text]}>
                {cartTotal + (cartTotal * 18) / 100}
              </Text>
            </View>
          </View>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text style={[globalStyles.text]}>Address:</Text>
          </View>
          {defAdd && <View
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
              <Text style={[globalStyles.text]}>Name</Text>
              <Text style={[globalStyles.text]}>{defAdd[0]?.landmark}</Text>
              <Text style={[globalStyles.text]}>{`${defAdd[0]?.city}, ${defAdd[0]?.state}, ${defAdd[0]?.pincode}`}</Text>
              <Text style={[globalStyles.text]}>phone no.</Text>
            </View>
            <View>
              <Button
                title={'Change'}
                buttonStyle={{backgroundColor: colors.red, borderRadius: 10}}
                containerStyle={{margin: 10}}
                titleStyle={{fontSize:15}}
                onPress={()=>navigation.navigate('Addresses')}
              />
            </View>
          </View>}
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
          />
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../images/empty-cart.jpg')}
            style={{
              width: 300,
              height: 300,
              resizeMode: 'contain',
              borderRadius: 10,
            }}
          />
          <Button
            title={'Explore Menu'}
            onPress={() => navigation.navigate('Menu')}
            buttonStyle={{
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: colors.red,
            }}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginVertical: 15,
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  redLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'red',
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    margin: 10,
    padding: 10,
  },
});
