import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RedLine from '../components/RedLine';

const Cart = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <RedLine text={'your cart'}/>
      </View>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
  },
  redLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'red',
    margin: 10,
  },
});
