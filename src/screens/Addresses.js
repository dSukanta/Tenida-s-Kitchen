import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {globalStyles} from '../constants/globalStyles';
import RedLine from '../components/RedLine';
import {Appcontext} from '../context/AppContext';
import colors from '../constants/colors';
import {BottomSheet, Button, ListItem} from '@rneui/base';
import ManualAdd from '../components/ManualAdd';
import MapModal from '../components/MapModal';
import CustomHeader from '../components/CustomHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddressCard from '../components/AddressCard';

const Addresses = ({route, navigation}) => {
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

  const handleMapView = () => {
    setIsVisible(false);
    setMapVisible(true);
  };

  // const setDefaultAddress = addressId => {
  //   const updatedAddresses = userAddress.map(address => ({
  //     ...address,
  //     default: address.id === addressId,
  //   }));
  //   setUserAddress(updatedAddresses);
  // };

  return (
    <View style={styles.container}>
      <CustomHeader route={route} navigation={navigation} />
      <View>
        <RedLine text="Addresses" />
      </View>
      {userAddress?.length ? (
        <ScrollView>
          {userAddress?.map((address, i) => (
            <AddressCard address={address} key={i}/>
          ))}
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="home-group-plus"
            size={50}
            color={'white'}
          />
          <Text style={[globalStyles.text, {paddingVertical: 10}]}>
            You Does not have any saved address.
          </Text>
        </View>
      )}
      <Button
        title={'+ Add New Address '}
        containerStyle={{width: '90%', alignSelf: 'center'}}
        buttonStyle={{
          paddingVertical: 10,
          backgroundColor: colors.red,
          borderRadius: 10,
        }}
        onPress={() => setIsVisible(true)}
        disabled={userAddress?.length >=5}
      />
      <BottomSheet
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}>
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
        <ManualAdd
          manualVisible={visibleManual}
          setManualvisible={setVisibleManual}
        />
      </Modal>
      <Modal visible={mapVisible} animationType="slide">
        <MapModal visible={mapVisible} setVisible={setMapVisible} />
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
