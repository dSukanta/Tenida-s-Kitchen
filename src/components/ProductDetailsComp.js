import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {globalStyles} from '../constants/globalStyles';
import colors from '../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';
import CarouselComp from './CarouselComp';
import {BASE_URI} from '@env';

const {height, width} = Dimensions.get('window');

const ProductDetailsComp = ({setReadMore, data}) => {

  const [isLoading, setLoading] = useState(true);

    // console.log(data,'dataaaa')

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => setReadMore(false)}>
            <Entypo name="reply" color={'white'} size={20} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>{data?.title}</Text>
          </View>
        </View>
        {data?.shortVideo? <View style={styles.videoContainer}>
          <Video
            source={{uri: `${BASE_URI}${data?.shortVideo}`}}
            muted={true}
            style={{flex: 1, width, height: height / 3}}
            controls={false}
            repeat
            onLoad={() => setLoading(false)}
          />
          {isLoading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={colors.red} />
          </View>
        )}
        </View>: null}
        <View style={{flexDirection: data?.shortVideo? 'column':'column-reverse'}}>
        <View style={{margin:10,padding:10,marginTop:0}}>
          <Text
            style={globalStyles.text}>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsComp;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  backContainer: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  headerTitle: {
    paddingHorizontal: 10,
    fontWeight: '800',
    color: colors.red,
    fontSize: 18,
  },
  videoContainer: {
    flex: 1,
    margin: 10,
  },
});
