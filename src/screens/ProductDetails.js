import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Card, color } from '@rneui/base';
import { globalStyles } from '../constants/globalStyles';
import RedLine from '../components/RedLine';
import colors from '../constants/colors';

const ProductDetails = ({ setReadMore }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={{ padding: 10, margin: 0, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
              backgroundColor: colors.red,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}
            onPress={() => setReadMore(false)}>
            <Entypo name="reply" color={'white'} size={20} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ paddingHorizontal: 10, fontWeight: '800', color: colors.red,fontSize:18 }}>
              Product Name
            </Text>
          </View>
        </View>
        <Card.Image
          source={require('../images/dummy1.jpg')}
          style={{ width: '100%', borderRadius: 10, marginBottom: 15 }}
          resizeMode="contain"
        />

        <View
          style={{
            padding: 5,
            margin: 10,
            paddingHorizontal: 10,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: 'red',
          }}>
          <Text style={[globalStyles.text, { color: 'black', fontWeight: '400' }]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a type specimen
            book
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    margin: 0,
    padding: 0,
  },
  redLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'red',
    margin: 10,
  },
});
