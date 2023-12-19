import {
  Dimensions,
  FlatList,
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

import {Card, color} from '@rneui/base';
import {globalStyles} from '../constants/globalStyles';
import RedLine from '../components/RedLine';
import colors from '../constants/colors';
import {BASE_URI} from '@env';
import CarouselComp from '../components/CarouselComp';
import Video from 'react-native-video';

const {height, width} = Dimensions.get('window');

const ProductDetails = ({setReadMore, data}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={{padding: 10, margin: 0, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
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
          <View style={{flex: 1}}>
            <Text
              style={{
                paddingHorizontal: 10,
                fontWeight: '800',
                color: colors.red,
                fontSize: 18,
              }}>
              {data?.title}
            </Text>
          </View>
        </View>
        <View>
          <View style={{flex:1,width:width/1.3, alignSelf:'center'}}>
            <Video
              source={{
                uri: `https://sendspark.com/share/p2l9iuchofgxmgn1gmi3wcgqqqudzyht`,
              }}
              muted={true}
              style={{flex: 1, width, height: height / 3}}
              controls={false}
              repeat
            />
          </View>
        </View>
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
            {data?.description}
          </Text>
        </View>
        <View>
          <CarouselComp
            data={data?.images?.map((image, i) => {
              return {id: i, image: image};
            })}
          />
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
