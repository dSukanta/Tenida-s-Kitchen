import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import RedLine from './RedLine';
import {Appcontext} from '../context/AppContext';
import {globalStyles} from '../constants/globalStyles';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Avatar, ListItem} from '@rneui/base';

const OrderDetails = ({orderId, visible, setVisible}) => {
  // console.log(orderId,'orderId')

  const [order, setOrder] = useState([]);
  const {userOrders,userAddress} = useContext(Appcontext);
  // console.log(userOrders,'userOrders')
  const [address, setAddress] = useState([]);


  useEffect(() => {
    function getOrder() {
      const curOrder = userOrders?.filter((el, i) => el?.orderId === orderId);
      setOrder(curOrder);
    };
    function getAddress(){
      const defaultAddress = userAddress?.filter((el, i) => el.default);
      setAddress(defaultAddress);
    };
    getOrder();
    getAddress();
  }, []);

  // console.log(order[0]?.orderedAt,'curorder')

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          width: '5%',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          marginRight: '5%',
        }}
        onPress={() => setVisible({status: false, id: ''})}>
        <AntDesign name="close" size={20} />
      </TouchableOpacity>
      <View>
        <RedLine text={`Order Details`} fontSize={12} />
      </View>
      <ScrollView>
        <View style={styles.card}>
          <View>
            <Text style={[globalStyles.text, {color: 'black'}]}>
              Order ID: {order[0]?.orderId}
            </Text>
            <Text style={[globalStyles.text, {color: 'black'}]}>
              Amount Paid: {order[0]?.totalAmount}
            </Text>
            {/* <Text style={[globalStyles.text, {color: 'black'}]}>
              Paid By: {order[0]?.order_data?.method?order[0]?.order_data?.method:'Cash' }
            </Text> */}
            <Text style={[globalStyles.text, {color: 'black'}]}>
              Ordered at:
              {moment(order[0]?.orderedAt).format('MMMM Do YYYY, h:mm:ss')}
            </Text>
          </View>
          <View
            style={{marginVertical: 10, borderBottomWidth: 1, width: '27%'}}>
            <Text style={[globalStyles.text, {color: 'black'}]}>
              Order Details:
            </Text>
          </View>
          <View>
            <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{'Name'}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Content>
                <ListItem.Title>{'Quantity'}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Content>
                <ListItem.Title>{'Price'}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            {order[0]?.products?.map((el, i) => (
              <ListItem bottomDivider key={i}>
                <ListItem.Content>
                  <ListItem.Title>{el?.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content>
                  <ListItem.Title>{el?.quantity}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content>
                  <ListItem.Title>₹299</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
          <View
            style={{marginVertical: 10, borderBottomWidth: 1, width: '35%'}}>
            <Text style={[globalStyles.text, {color: 'black'}]}>
             Delivery Address:
            </Text>
          </View>
          <View>
              <Text style={[globalStyles.text,{color:'black'}]}>{address[0]?.landmark}</Text>
              <Text style={[globalStyles.text,{color:'black'}]}>{`${address[0]?.city}, ${address[0]?.state}, ${address[0]?.pincode}`}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  card: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
  },
});
