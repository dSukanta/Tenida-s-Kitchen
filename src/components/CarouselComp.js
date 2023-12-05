import {Dimensions, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {BASE_URI} from '@env'; 

const {height, width} = Dimensions.get('window');

const CarouselComp = ({data}) => {
  return (
    <View>
      <Carousel
        loop
        width={width}
        height={160}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({item,index}) => (
          <ImageBackground
          source={{
            uri: `${BASE_URI}${item.image}`,
          }}
          style={[
            styles.image,
            {width: width-20, marginLeft: 0, borderRadius: 8},
          ]}></ImageBackground>
        )}
      />
    </View>
  );
};

export default CarouselComp;

const styles = StyleSheet.create({
  image: {
    height: 160,
    resizeMode: 'cover',
    flexDirection: 'row',
    borderRadius: 5,
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
});
