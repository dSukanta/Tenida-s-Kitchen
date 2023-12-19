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
import { getFromStorage } from '../utils/Helper';
import { clientRequest } from '../utils/ApiRequests';

const OrderDetails = ({orderId,setVisible}) => {
  // console.log(orderId,'orderId')

  const [order, setOrder] = useState([]);
  const {userData}= useContext(Appcontext);
  const [loading, setLoading] = useState(false);


  const getOrder= async()=>{
    setLoading(true);
    const devideId = await getFromStorage('deviceId');
    let headerObj = {
      deviceid: devideId,
      devicename: 'Android',
    };
    if (userData?.length) {
      headerObj.userid = userData[0]?._id;
    };

    // console.log(headerObj,"headerObj")

    const response= await clientRequest(`api/v1/private/order`,'GET',headerObj);
    if(response?.success){
      setOrder(response?.data?.filter((item,i)=> item?._id === orderId))
    }
    setLoading(false);
  }

  useEffect(()=>{
    getOrder();
  },[userData]);

  // console.log(order[0]?.products,'curorder')

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
              Order ID: {order[0]?.order_id}
            </Text>
            <Text style={[globalStyles.text, {color: 'black'}]}>
              Amount Paid: {order[0]?.amount}
            </Text>
            {/* <Text style={[globalStyles.text, {color: 'black'}]}>
              Paid By: {order[0]?.order_data?.method?order[0]?.order_data?.method:'Cash' }
            </Text> */}
            <Text style={[globalStyles.text, {color: 'black'}]}>
              Ordered at:
              {moment(order[0]?.payment_date).format('MMMM Do YYYY, h:mm:ss')}
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
                  <ListItem.Title>{el?.product?.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content>
                  <ListItem.Title>{el?.quantity}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content>
                  <ListItem.Title>₹{el?.product?.price}</ListItem.Title>
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
              <Text style={[globalStyles.text,{color:'black'}]}>{order[0]?.address?.landmark}</Text>
              <Text style={[globalStyles.text,{color:'black'}]}>{`${order[0]?.address?.city}, ${order[0]?.address?.state}, ${order[0]?.address?.pincode}`}</Text>
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
