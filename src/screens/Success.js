import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from '@rneui/base';
import { Linking } from 'react-native';
import colors from '../constants/colors';

const SuccessPage = ({paymentId,orderId,navigation,setPaymentResponse}) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  // const {order_id,payment_id}= route?.params;

  // console.log(route?.params,'params');
  

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1.2),
      useNativeDriver: true,
    }).start();
  }, []);

//   const orderId = '1234'; // Replace with the actual order ID

  const handleSeeOrders = () => {
    // Navigate to the orders page or your desired route
    setPaymentResponse({open:false,status:'',payload:null});
    navigation.navigate('Orders');
  };

  const handleExploreMore = () => {
    // Handle the "Explore More" action
    // You can navigate to another screen or perform any desired action
    // For now, we'll go back to the previous screen
    setPaymentResponse({open:false,status:'',payload:null});
    // navigation.navigate('Menu')
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.card, { transform: [{ scale: scaleValue }] }]}
      >
        <Icon name="check-circle" size={80} color="green" />
        <Text style={styles.successMessage}>Thank You!</Text>
        <Text style={styles.successText}>
          Your payment was successful.
        </Text>
       { orderId && paymentId && <Text style={styles.successText}>
           Congratulation! We have received your order with order id: {orderId} and payment id: {paymentId}
        </Text>}
        <Text
          style={styles.linkText}
          onPress={handleSeeOrders}
        >
          See Orders
        </Text>
        <Button
          title="Got it"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonTitle}
          onPress={handleExploreMore}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  card: {
    backgroundColor: 'white',
    width: '85%',
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
  },
  successMessage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 10,
  },
  successText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    marginVertical: 5,
  },
  linkText: {
    fontSize: 15,
    color: 'blue',
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  button: {
    backgroundColor:colors.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  buttonTitle: {
    fontSize: 15,
  },
});

export default SuccessPage;
