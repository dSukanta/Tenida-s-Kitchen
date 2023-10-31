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

import {Card} from '@rneui/base';
import {globalStyles} from '../constants/globalStyles';

const ProductDetails = ({route, navigation}) => {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flexDirection: 'row', paddingVertical: 10}}>
        <View style={styles.redLine} />
        <View style={{flex: 1}}>
          <Text
            style={{
              color: 'red',
              fontSize: 18,
              fontWeight: '700',
              flexWrap: 'wrap', // Allow text to wrap to the next line
            }}>
            Product Name:{route?.params?.id}
          </Text>
        </View>
        <View style={styles.redLine} />
      </View>
      <Card containerStyle={{padding: 10, margin: 0, backgroundColor: 'white'}}>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderRadius: 30,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}
          onPress={handleBack}>
          <Entypo name="reply" color={'white'} size={20} />
        </TouchableOpacity>
        <Card.Image
          source={require('../images/dummy1.jpg')}
          style={{width: '100%', borderRadius: 10, marginBottom: 15}}
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
          <Text
            style={[globalStyles.text, {color: 'black', fontWeight: '400'}]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: 'black',
              fontWeight: '700',
              fontSize: 18,
              marginBottom: 10,
            }}>
            How Is It Cooked?
          </Text>
          <ImageBackground
            source={require('../images/dummy1.jpg')}
            style={{
              width: '100%',
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            resizeMode="cover"
            imageStyle={{borderRadius: 10}}>
            <AntDesign name="play" color={'white'} size={50} />
          </ImageBackground>
        </View>
      </Card>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
