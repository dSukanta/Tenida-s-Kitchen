import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RedLine from '../components/RedLine';

const Orders = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <RedLine text={'yours previous orders'} fontSize={12}/>
      </View>
    </ScrollView>
  );
};

export default Orders;

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
