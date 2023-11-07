import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '@rneui/base';
import {globalStyles} from '../constants/globalStyles';
import colors from '../constants/colors';
import RedLine from './RedLine';

const Checkout = () => {
  return (
    <View style={styles.container}>
      <View>
        <RedLine text='Review your order'/>
      </View>
      <Text style={[globalStyles.text,{width:'90%',alignSelf:'center'}]}>
        Total Paybal Anmount:<Text>₹500</Text>
      </Text>
      <Button
        title={'Delivery Address'}
        containerStyle={{width: '90%', alignSelf: 'center', margin: 10}}
        buttonStyle={{
          paddingVertical: 10,
          borderRadius: 10,
          backgroundColor: colors.red,
        }}
      />
      <View style={{width:'90%',alignSelf:'center'}}>
        <Text style={[globalStyles.text]}>Name</Text>
        <Text style={[globalStyles.text]}>landmark</Text>
        <Text style={[globalStyles.text]}>city,state ,pincode</Text>
        <Text style={[globalStyles.text]}>phone no.</Text>
      </View>
      <View>
      <Button
        title={'Pay'}
        containerStyle={{width: '90%', alignSelf: 'center', margin: 10}}
        buttonStyle={{
          paddingVertical: 10,
          borderRadius: 10,
          backgroundColor: colors.red,
        }}
      />
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'black',
    }
});
