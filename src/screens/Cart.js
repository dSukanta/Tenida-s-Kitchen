import {ScrollView, StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useContext} from 'react';
import RedLine from '../components/RedLine';
import {globalStyles} from '../constants/globalStyles';
import {Appcontext} from '../context/AppContext';
import CartCard from '../components/CartCard';
import {Button} from '@rneui/base';
import colors from '../constants/colors';

const {height, width} = Dimensions.get('window');

const Cart = ({navigation,route}) => {
  const {userCart} = useContext(Appcontext);

  const getCartTotal = () => {
    const total = userCart.reduce(
      (init, next) => init + Number(next.price) * Number(next.quantity),
      0,
    );
    return total;
  };

  return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <View>
          <RedLine text={'your cart'} />
        </View>
        {userCart.length ? (
          <View>
            <Text style={[globalStyles.text,{alignSelf:'center',margin:10}]}>Ites(s) Added</Text>
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
              containerStyle={{width:'90%',alignSelf: 'center'}}
              titleStyle={globalStyles.text}
              onPress={()=>navigation.navigate('Menu')}
            />
            <View style={styles.rowContainer}>
            <View style={styles.row}>
              <Text style={[globalStyles.text]}>Total Price :</Text>
              <Text style={[globalStyles.text]}>{getCartTotal()}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[globalStyles.text]}>GST :</Text>
              <Text style={[globalStyles.text]}>
                {(getCartTotal() * 18) / 100}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[globalStyles.text]}>Grand Total :</Text>
              <Text style={[globalStyles.text]}>
                {getCartTotal() + (getCartTotal() * 18) / 100}
              </Text>
            </View>
            </View>
            <Button
              title={'Proceed to Checkout'}
              buttonStyle={{
                padding: 10,
                backgroundColor: colors.red,
                borderWidth: 1,
                borderColor: colors.red,
              }}
              containerStyle={{width:'90%',borderRadius:10,marginBottom:'18%',alignSelf: 'center'}}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={globalStyles.text}>No Items</Text>
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
  rowContainer:{
    margin: 10,
    padding: 10,
  }
});
