import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import RedLine from '../components/RedLine';
import {Appcontext} from '../context/AppContext';
import {Avatar, BottomSheet, Button, ListItem} from '@rneui/base';
import {globalStyles} from '../constants/globalStyles';
import OrderDetails from '../components/OrderDetails';
import colors from '../constants/colors';

const Orders = ({route, navigation}) => {
  const {userOrders, setUserOrders} = useContext(Appcontext);
  const [isVisible, setIsVisible] = useState({status: false, id: ''});

  if (!userOrders?.length) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <Text
          style={[
            globalStyles.text,
            {
              fontSize: 18,
              alignSelf: 'center',
              marginVertical: 20,
              fontWeight: '900',
            },
          ]}>
          There are no recent orders to show!
        </Text>
        <Image
          source={require('../images/no_order.jpg')}
          style={{width: '90%', alignSelf: 'center', resizeMode: 'contain'}}
        />
        <Button
          title={'Start Explore'}
          buttonStyle={{
            backgroundColor: colors.red,
            borderRadius: 10,
            padding: 10,
          }}
          containerStyle={{marginVertical: 20}}
          onPress={()=>navigation.navigate('Menu')}
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <RedLine text={'yours previous orders'} fontSize={12} />
      </View>
      <View>
        {userOrders?.map((order, i) => (
          <TouchableOpacity
            onPress={() => setIsVisible({status: true, id: order?.orderId})} key={i}>
            <ListItem bottomDivider containerStyle={styles.listItemStyle}>
              <Avatar
                rounded
                source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
                size={70}
              />
              <ListItem.Content style={{width: '100%', margin: 0, padding: 0}}>
                <ListItem.Title style={styles.title}>
                  {' '}
                  Order ID: {order?.orderId}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={[globalStyles.text, {color: 'black'}]}>
                  You ordered {order?.products?.length} Items for ₹
                  {order?.totalAmount}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content style={{flex: 0.7}}>
                {/* <Text>{'In-Progress'}</Text> */}
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
      </View>
      <BottomSheet
        isVisible={isVisible.status}
        onBackdropPress={() => setIsVisible({status: false, id: ''})}>
        <OrderDetails
          orderId={isVisible.id}
          visible={isVisible}
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
