import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import React from 'react';
import {Button} from '@rneui/base';
import {Card} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {globalStyles} from '../constants/globalStyles';

const {height,width}= Dimensions.get('window')

const Home = ({navigation}) => {
  const data = [1, 1, 1,];

  const renderCard = item => (
    <Card containerStyle={{padding:10,margin:5,borderRadius:10}}>
        <Card.Image source={require('../images/slider_image.jpg')} style={{width:160,borderRadius:10}}/>
        <View>
        <Text style={[globalStyles.text,{color:'black'}]}>Name</Text>
        <Text style={{color:'black',fontWeight:'400',fontSize:12}}>Subtitle</Text>
        </View>
    </Card>
  );

  return (
    <ScrollView>
      <Button
        title="Login/Signup"
        onPress={() => navigation.navigate('Auth')}
        color={'red'}
      />
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

      <View style={{alignSelf:'center',marginBottom:'18%'}}>
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
