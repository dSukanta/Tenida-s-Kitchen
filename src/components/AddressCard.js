import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {BottomSheet, Button, Card} from '@rneui/base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalStyles} from '../constants/globalStyles';
import colors from '../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {serverRequest} from '../utils/ApiRequests';
import EditAddress from './EditAddress';
import {getFromStorage} from '../utils/Helper';
import {Appcontext} from '../context/AppContext';

const AddressCard = ({address}) => {
  const [visibleEdit, setVisibleEdit] = useState(false);
  const {userData, getAddress} = useContext(Appcontext);
  const [loading, setLoading] = useState({state: false, type: ''});

  const handleDefault = async id => {
    // console.log(id);
    setLoading({state: true, type: 'setdefault'});
    const devideId = await getFromStorage('deviceId');
    const defRes = await serverRequest(
      `api/v1/private/address/${id}`,
      'PUT',
      {default: true},
      {
        deviceid: devideId,
        devicename: 'Android',
        userid: userData[0]?._id || null,
      },
    );
    if (defRes?.success) {
      await getAddress();
      Alert.alert('Success', defRes?.message);
    } else {
      Alert.alert('Error', defRes?.message);
    }
    setLoading({state: false, type: ''});
    // console.log(defRes,'derfes...')
  };

  const handleEdit = async id => {
    // console.log(id, 'edit id');
    setVisibleEdit(true);
  };

  const handleDelete = async id => {
    setLoading({state: true, type: 'delete'});
    const devideId = await getFromStorage('deviceId');
    const deleteres = await serverRequest(
      `api/v1/private/address/${id}`,
      'DELETE',
      {},
      {
        deviceid: devideId,
        devicename: 'Android',
        userid: userData[0]?._id || null,
      },
    );
    // console.log(deleteres,'delres');
    if (deleteres?.success) {
      await getAddress();
      Alert.alert('Success', deleteres?.message);
    } else {
      Alert.alert('Error', deleteres?.message);
    }
    setLoading({state: false, type: ''});
  };

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
          {loading?.state && loading.type === 'setdefault' ? (
            <ActivityIndicator
              color={colors.red}
              size={'small'}
              style={{padding: 5}}
            />
          ) : (
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
          )}
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
            ]}>{`${address.landmark}, ${address.city}, ${address.pincode}`}</Text>
        </View>
        <View style={styles.flex}>
          <MaterialCommunityIcons name="phone" size={25} color={'black'} />
          <Text style={[globalStyles.text, {color: 'black'}]}>
            {address?.phone}
          </Text>
        </View>
      </View>
      <View style={styles.flex}>
        {/* <Button
          title={'Edit'}
          buttonStyle={{backgroundColor: colors.green}}
        />
        <Button
          title={'Delete'}
          buttonStyle={{backgroundColor: colors.red}}
        /> */}

        <TouchableOpacity onPress={() => handleEdit(address?._id)}>
         <Text style={[globalStyles.text,{color: colors.deepGreen}]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(address?._id)}>
        {loading?.state && loading.type==='delete'?
        <ActivityIndicator color={colors.red} size={'small'} style={{padding:5}}/>:
        <Text style={[globalStyles.text,{color: colors.red}]}>Delete</Text>
        }
        </TouchableOpacity>
      </View>
      <BottomSheet
        isVisible={visibleEdit}
        onBackdropPress={() => setVisibleEdit(false)}>
        <EditAddress
          visibleEdit={visibleEdit}
          setVisibleEdit={setVisibleEdit}
          address={address}
        />
      </BottomSheet>
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
