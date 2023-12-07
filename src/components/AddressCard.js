import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Card} from '@rneui/base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalStyles} from '../constants/globalStyles';
import colors from '../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { serverRequest } from '../utils/ApiRequests';

const AddressCard = ({address}) => {
  const handleDefault = async id => {
    console.log(id);
  };

  const handleEdit= async id => {
    console.log(id,'edit id');
  }

  const handleDelete= async id => {
    const devideId= await getFromStorage('deviceId');
    // const deleteadd= await serverRequest('','DELETE',{},{deviceid: devideId,devicename: 'Android',userid:userData[0]?._id || null})
  }

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.sticker}>
        <View style={styles.flex}>
          <Text
            style={[
              globalStyles.text,
              {paddingHorizontal: 10, color: 'black'},
            ]}>
            {address?.userInfo?.fullname || 'Unknown'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={
            !address?.default ? () => handleDefault(address?._id) : null
          }>
          <Text
            style={[
              globalStyles.text,
              {
                color: 'black',
                backgroundColor: address?.default ? colors.green : colors.red,
                padding: 5,
                borderRadius: 5,
              },
            ]}>
            {' '}
            {address?.default ? 'Default address' : 'Make Default'}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.flex}>
          <MaterialCommunityIcons
            name="map-marker-account-outline"
            size={25}
            color={'black'}
          />
          <Text
            style={[
              globalStyles.text,
              {color: 'black'},
            ]}>{`${address.city}, ${address.state}, ${address.pincode}`}</Text>
        </View>
        <View style={styles.flex}>
          <MaterialCommunityIcons name="phone" size={25} color={'black'} />
          <Text style={[globalStyles.text, {color: 'black'}]}>
            {address?.phone}
          </Text>
        </View>
      </View>
      <View style={styles.flex}>
        <TouchableOpacity onPress={()=> handleEdit(address?._id)}>
          <MaterialIcons name="edit-location-alt" color={'black'} size={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> handleDelete(address?._id)}>
          <MaterialCommunityIcons
            name="map-marker-remove-variant"
            color={'black'}
            size={25}
          />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    padding: 5,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    margin: 0,
    padding: 0,
    marginBottom: 5,
  },
  sticker: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
