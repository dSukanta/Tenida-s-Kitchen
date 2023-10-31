import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Orders = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flexDirection: 'row', paddingVertical: 10}}>
        <View style={styles.redLine} />
        <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
          <Text
            style={{
              color: 'red',
              fontSize: 15,
              fontWeight: '900',
              flexWrap: 'wrap',
              textAlign:'center'
            }}>
           YOUR PREVIOUS ORDERS
          </Text>
        </View>
        <View style={styles.redLine} />
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
