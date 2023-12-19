import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import RedLine from '../components/RedLine';
import {Appcontext} from '../context/AppContext';
import {Avatar, BottomSheet, Button, ListItem} from '@rneui/base';
import {globalStyles} from '../constants/globalStyles';
import OrderDetails from '../components/OrderDetails';
import colors from '../constants/colors';
import CustomHeader from '../components/CustomHeader';
import { clientRequest } from '../utils/ApiRequests';
import { getFromStorage } from '../utils/Helper';
import {BASE_URI} from '@env'

const Orders = ({route, navigation}) => {
  const [isVisible, setIsVisible] = useState({status: false, id: ''});
  const [userOrders, setUserOrders] = useState([]);
  const {userData}= useContext(Appcontext);
  const [loading, setLoading] = useState(false);


  // if (!userOrders?.length) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         backgroundColor: 'black',
  //       }}>
  //       <Text
  //         style={[
  //           globalStyles.text,
  //           {
  //             fontSize: 18,
  //             alignSelf: 'center',
  //             marginVertical: 20,
  //             fontWeight: '900',
  //           },
  //         ]}>
  //         There are no recent orders to show!
  //       </Text>
  //       <Image
  //         source={require('../images/no_order.jpg')}
  //         style={{width: '90%', alignSelf: 'center', resizeMode: 'contain'}}
  //       />
  //       <Button
  //         title={'Start Explore'}
  //         buttonStyle={{
  //           backgroundColor: colors.red,
  //           borderRadius: 10,
  //           padding: 10,
  //         }}
  //         containerStyle={{marginVertical: 20}}
  //         onPress={()=>navigation.navigate('Menu')}
  //       />
  //     </View>
  //   );
  // };

  const getOrders= async()=>{
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
      setUserOrders(response?.data)
    }
    setLoading(false);
  }

  useEffect(()=>{
    getOrders();
  },[userData]);

  // console.log(userOrders[0]?.products[0]?.product?.images,'product')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomHeader route={route} navigation={navigation}/>
      <View>
        <RedLine text={'your orders'} fontSize={12} />
      </View>
      {loading?
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={'large'} color={colors.red}/>
      </View>:
      <View>
        {userOrders?.map((order, i) => (
          <TouchableOpacity
            onPress={() => setIsVisible({status: true, id: order?._id})} key={i}>
            <ListItem bottomDivider containerStyle={styles.listItemStyle}>
              <Avatar
                rounded
                source={{uri: `${BASE_URI}${order?.products[0]?.product?.images[0]}`}}
                size={70}
              />
              <ListItem.Content style={{width: '100%', margin: 0, padding: 0}}>
                <ListItem.Title style={styles.title}>
                  {' '}
                  Order ID: {order?.order_id}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={[globalStyles.text, {color: 'black'}]}>
                  You ordered {order?.products?.length} Item(s) for ₹
                  {order?.amount}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content style={{flex: 0.7}}>
                <Button
                  title={'In-Progress'}
                  containerStyle={{padding: 0, margin: 0}}
                  titleStyle={{fontSize: 11}}
                  buttonStyle={{backgroundColor: 'red'}}
                />
              </ListItem.Content>
              <ListItem.Chevron size={20} />
            </ListItem>
          </TouchableOpacity>
        ))}
      </View>}
      <BottomSheet
        isVisible={isVisible.status}
        onBackdropPress={() => setIsVisible({status: false, id: ''})}>
        <OrderDetails
          orderId={isVisible.id}
          setVisible={setIsVisible}
        />
      </BottomSheet>
    </ScrollView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  redLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'red',
    margin: 10,
  },
  listItemStyle: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: 'black',
  },
});
