import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Button} from '@rneui/base';
import colors from '../constants/colors';
import {Input} from '@rneui/themed';
import RedLine from './RedLine';
import {Alert} from 'react-native';
import {globalStyles} from '../constants/globalStyles';
import {clientRequest, serverRequest} from '../utils/ApiRequests';
import {Appcontext} from '../context/AppContext';
import {getFromStorage} from '../utils/Helper';

const EditAddress = ({visibleEdit, setVisibleEdit, address}) => {
  const [userInput, setUserInput] = useState({
    phone: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
  });
  const [loading,setLoading]= useState(false);

  const {userData, getAddress} = useContext(Appcontext);

  useEffect(() => {
    setUserInput({
      ...userInput,
      phone: address?.phone,
      city: address?.city,
      state: address?.state,
      pincode: address?.pincode,
      landmark: address?.landmark,
    });
  }, [address]);

  const handleSubmit = async () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const numberRegex = /^\d+$/;

    if (!numberRegex.test(userInput.phone)) {
      return Alert.alert(
        'Phone Number Required',
        'Please enter a valid phone number',
      );
    }
    if (!userInput.city) {
      return Alert.alert('City required', 'Please enter a valid city');
    }
    if (!userInput.landmark) {
      return Alert.alert('Landmark required', 'Please enter a valid landmark');
    }
    if (!nameRegex.test(userInput.state)) {
      return Alert.alert('State required', 'Please enter a valid state');
    }
    if (!numberRegex.test(userInput.pincode)) {
      return Alert.alert('Pin code required', 'Please enter a valid pincode');
    }
    const devideId = await getFromStorage('deviceId');
    // console.log(userInput,address?._id,'updtaed')
    setLoading(true);

    const EditRes = await serverRequest(
        `api/v1/private/address/${address?._id}`,
        'PUT',
        userInput,
        {
          deviceid: devideId,
          devicename: 'Android',
          userid: userData[0]?._id || null,
        },
      );
    //   console.log(EditRes,'edit res..')
    if(EditRes?.success){
        Alert.alert('Success', EditRes?.message);
        getAddress();
        setVisibleEdit(false)
    }else{
        Alert.alert('Error', EditRes?.message);
    }
    setLoading(false);

  };

  return (
    <View style={globalStyles.container}>
      <View>
        <RedLine text="Edit Address" />
      </View>
      <ScrollView>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Input
            placeholder="Enter your nearest landmark"
            leftIcon={{type: 'entypo', name: 'location-pin', color: 'white'}}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={{color: 'white'}}
            value={userInput?.landmark}
            onChangeText={text => setUserInput({...userInput, landmark: text})}
          />
          <Input
            placeholder="Enter your city"
            leftIcon={{
              type: 'material-icons',
              name: 'location-city',
              color: 'white',
            }}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={{color: 'white'}}
            value={userInput?.city}
            onChangeText={text => setUserInput({...userInput, city: text})}
          />
          <Input
            placeholder="Enter your state"
            leftIcon={{type: 'foundation', name: 'map', color: 'white'}}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={{color: 'white'}}
            value={userInput?.state}
            onChangeText={text => setUserInput({...userInput, state: text})}
          />
          <Input
            placeholder="Enter your pincode"
            keyboardType="phone-pad"
            leftIcon={{type: 'entypo', name: 'location-pin', color: 'white'}}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={{color: 'white'}}
            value={userInput?.pincode}
            onChangeText={text => setUserInput({...userInput, pincode: text})}
          />
          <Input
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            leftIcon={{
              type: 'material-icons',
              name: 'phone-iphone',
              color: 'white',
            }}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={{color: 'white'}}
            value={userInput?.phone}
            onChangeText={text => setUserInput({...userInput, phone: text})}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '85%',
            alignSelf: 'center',
          }}>
          <Button
            title={'Cancel '}
            containerStyle={{width: '45%', alignSelf: 'red'}}
            buttonStyle={{
              paddingVertical: 10,
              backgroundColor: colors.red,
              borderRadius: 10,
            }}
            onPress={() => setVisibleEdit(false)}
            icon={{
                name:'cancel',
                type:'material-icons',
                size:20,
                color: 'white',
            }}
          />
          <Button
            title={'Edit'}
            containerStyle={{width: '45%', alignSelf: 'red'}}
            buttonStyle={{
              paddingVertical: 10,
              backgroundColor: colors.red,
              borderRadius: 10,
            }}
            onPress={handleSubmit}
            icon={{
                name:'edit',
                type:'material-icons',
                size:20,
                color: 'white',
            }}
            loading={loading}
            disabled={loading}
            disabledStyle={{backgroundColor:colors.disabledRed}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: colors.red,
    padding: 10,
    paddingHorizontal: 20,
    margin: '5%',
    borderRadius: 10,
    color: 'white',
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.red,
    paddingHorizontal: 10,
  },
});
