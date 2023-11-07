import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { globalStyles } from '../constants/globalStyles';
import RedLine from '../components/RedLine';
import { Appcontext } from '../context/AppContext';
import colors from '../constants/colors';
import { Button } from '@rneui/base';

const Addresses = () => {
  const { userAddress, setUserAddress } = useContext(Appcontext);

  // Function to set the default address
  const setDefaultAddress = (addressId) => {
    const updatedAddresses = userAddress.map((address) => ({
      ...address,
      default: address.id === addressId,
    }));
    // Update the state with the new default address
    // console.log(updatedAddresses,'addresses')
    // setUserAddress(updatedAddresses);
    // setAddresses(updatedAddresses);
    // setUserAddress(updatedAddresses.filter((add,i)=>add.default))
      setUserAddress(updatedAddresses)
  };


  return (
    <View style={styles.container}>
      <View>
        <RedLine text='Addresses' />
      </View>
      <ScrollView>
        {userAddress.map((address, i) => (
          <View
            key={address.id}
            style={{
              width: '90%',
              alignSelf: 'center',
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              borderRadius: 10,
            }}>
            <View>
              <Text style={[globalStyles.text]}>Name</Text>
              <Text style={[globalStyles.text]}>{address.landmark}</Text>
              <Text style={[globalStyles.text]}>{`${address.city}, ${address.state}, ${address.pincode}`}</Text>
              <Text style={[globalStyles.text]}>phone no.</Text>
            </View>
            <View>
              <Button
                title={address.default ? 'Default' : 'Make as Default'}
                buttonStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: colors.red,
                  borderRadius: 10,
                }}
                containerStyle={{ margin: 10 }}
                titleStyle={{ fontSize: 15, color: address.default ? 'black' : 'white' }}
                disabled={address.default}
                onPress={() => setDefaultAddress(address.id)} // Call the function to set as default
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
