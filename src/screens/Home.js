import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Button} from '@rneui/base';
import {Card} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {globalStyles} from '../constants/globalStyles';

const {height, width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const data = [1, 1, 1];

  const renderCard = item => (
    <TouchableOpacity
      style={{
        padding: 10,
        margin: 5,
        borderRadius: 10,
        width: width / 2.2,
        backgroundColor: 'white',
        overflow: 'hidden', // Add this line
      }}
      onPress={()=>navigation.navigate('ProductDetails',{id:1})}
      >
      <View style={{position: 'relative'}}>
        <Card.Image
          source={require('../images/slider_image.jpg')}
          style={{borderRadius: 10, resizeMode: 'cover'}}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: '90%',
            left: '30%',
            backgroundColor: 'transparent',
          }}>
          <Text
            style={{
              backgroundColor: '#f12a2a',
              color: 'white',
              padding: 5,
              paddingHorizontal: 15,
              borderRadius: 5,
            }}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#74c93f',
            padding: 5,
            paddingVertical:2,
            borderRadius: 5,
            gap: 5,
            alignSelf: 'flex-end',
            marginTop:10,
          }}>
          <Text style={[globalStyles.text, {color: 'white'}]}>{'4.5'}</Text>
          <AntDesign name="star" color={'white'} size={12} />
        </View>
        <View style={{paddingHorizontal: 7}}>
        <Text style={[globalStyles.text, {color: 'black'}]} numberOfLines={1}>
          Name
        </Text>
        <Text
          style={{color: 'black', fontWeight: '400', fontSize: 12}}
          numberOfLines={2}>
          Subtitle
        </Text>
      </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.loginTextContainer, {marginVertical: 10}]}>
        <View style={styles.redLine} />
        <Text style={[globalStyles.text, {color: 'red'}]}>OFFERS FOR YOU</Text>
        <View style={styles.redLine} />
      </View>
      <View>
        <FlatList
          horizontal
          data={data}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Card
              containerStyle={{
                width: 250,
                height: 150,
                padding: 0,
                margin: 0,
                marginLeft: 7,
                position: 'relative',
                borderRadius: 10,
                marginRight: index === data?.length - 1 ? 7 : 0,
              }}>
              <Card.Image
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 10,
                }}
                source={require('../images/slider_image.jpg')}
              />
            </Card>
          )}
        />
      </View>
      <View style={{marginTop: 20}}>
        <FlatList
          horizontal
          data={data}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ImageBackground
              source={require('../images/slider_image.jpg')}
              resizeMode="cover"
              style={[styles.secondSlider, {marginLeft: index === 0 ? 7 : 0}]}
              imageStyle={{borderRadius: 10}}>
              <View>
                <AntDesign name="play" color={'white'} size={30} />
              </View>
            </ImageBackground>
          )}
        />
      </View>

      <View style={[styles.loginTextContainer, {marginVertical: 10}]}>
        <View style={styles.redLine} />
        <Text style={[globalStyles.text, {color: 'red'}]}>TOP PICKS</Text>
        <View style={styles.redLine} />
      </View>

      <View style={{alignSelf: 'center', marginBottom: '18%'}}>
        <FlatList
          numColumns={2}
          data={data}
          renderItem={({item}) => renderCard(item)}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  secondSlider: {
    width: 250,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
    borderRadius: 10,
  },
  loginTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'red',
    margin: 10,
  },
});
