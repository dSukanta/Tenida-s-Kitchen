import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {globalStyles} from '../constants/globalStyles';
import RedLine from '../components/RedLine';
import {Appcontext} from '../context/AppContext';
import colors from '../constants/colors';
import {BottomSheet, Button, ListItem} from '@rneui/base';
import ManualAdd from '../components/ManualAdd';
import MapModal from '../components/MapModal';

const Addresses = () => {
  const {userAddress, setUserAddress} = useContext(Appcontext);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleManual, setVisibleManual] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  
  const list = [
    {title: 'Add Manually', onPress: () => handleManuallyadd()},
    {title: 'Add from Map', onPress: () => handleMapView(false)},
    {
      title: 'Cancel',
      containerStyle: {backgroundColor: 'red'},
      titleStyle: {color: 'white'},
      onPress: () => setIsVisible(false),
    },
  ];

  const handleManuallyadd = () => {
    setIsVisible(false);
    setVisibleManual(true);
  };

  const handleMapView=()=>{
    setIsVisible(false);
    setMapVisible(true);
  }

  const setDefaultAddress = addressId => {
    const updatedAddresses = userAddress.map(address => ({
      ...address,
      default: address.id === addressId,
    }));
    setUserAddress(updatedAddresses);
  };

  return (
    <View style={styles.container}>
      <View>
        <RedLine text="Addresses" />
      </View>
      <ScrollView>
        {userAddress?.map((address, i) => (
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
              <Text
                style={[
                  globalStyles.text,
                ]}>{`${address.city}, ${address.state}, ${address.pincode}`}</Text>
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
                containerStyle={{margin: 10}}
                titleStyle={{
                  fontSize: 15,
                  color: address.default ? 'black' : 'white',
                }}
                disabled={address.default}
                onPress={() => setDefaultAddress(address.id)} // Call the function to set as default
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <Button
        title={'+ Add New Address '}
        containerStyle={{width: '90%', alignSelf: 'center'}}
        buttonStyle={{
          paddingVertical: 10,
          backgroundColor: colors.red,
          borderRadius: 10,
        }}
        onPress={() => setIsVisible(true)}
      />
      <BottomSheet isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      <Modal visible={visibleManual} animationType="slide">
        <ManualAdd manualVisible={visibleManual} setManualvisible={setVisibleManual}/>
      </Modal>
      <Modal visible={mapVisible} animationType="slide">
         <MapModal visible={mapVisible} setVisible={setMapVisible}/>
      </Modal>
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
