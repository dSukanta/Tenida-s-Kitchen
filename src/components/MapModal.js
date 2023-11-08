import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button} from '@rneui/base';
import RedLine from './RedLine';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GOOGLE_API_KEY} from '@env';
import {Input} from '@rneui/themed';
import MapView from 'react-native-maps';
import colors from '../constants/colors';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const MapModal = ({visible, setVisible}) => {
  const [loaction, setLoacation] = useState({
    latitude: 22.5726,
    longitude: 88.3639,
    latitudeDelta: 0.02,
    longitudeDelta: 0.2,
  });
    console.log(GOOGLE_API_KEY)
  return (
    <View style={styles.container}>
      {/* <AntDesign name='close' size={20}/> */}
      {/* <View>
        <RedLine text="Location Search" fontSize={12} />
      </View> */}
      {/* <View>
        <Input
          rightIcon={{name: 'search1', type: 'antdesign'}}
          containerStyle={{
            width: '90%',
            alignSelf: 'center',
            height: 50,
            alignItems: 'center',
            marginVertical: 5,
          }}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
          placeholder="Search your location"
        />
      </View> */}

      <GooglePlacesAutocomplete
        placeholder="Where From?"
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
          },
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={200}
        fetchDetails
        // onFail={error => console.error(error)}
      />

      <MapView style={{flex: 1}} region={loaction} />

      <View style={styles.buttonBox}>
        <Button
          title={'Close'}
          onPress={() => setVisible(false)}
          containerStyle={{width: '45%'}}
          buttonStyle={{backgroundColor: colors.red, borderRadius: 10}}
        />
        <Button
          title={'Confirm'}
          onPress={() => setVisible(false)}
          containerStyle={{width: '45%'}}
          buttonStyle={{backgroundColor: colors.green, borderRadius: 10}}
        />
      </View>
    </View>
  );
};

export default MapModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonBox: {
    position: 'absolute',
    bottom: '5%',
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});
