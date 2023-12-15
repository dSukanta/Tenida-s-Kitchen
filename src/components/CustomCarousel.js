import {Dimensions, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const CustomCarousel = ({data = [], time = 3000}) => {
  let currentSlide = 0;
  let interval = time || 3000;
  let timerId = null;
  const quoteRef = useRef();
  const [currQuoteIdx, setCurrQuoteIdx] = useState(0);
  const opacity = useSharedValue(0);

  const handleNext = () => {
    if (currentSlide >= data.length - 1) currentSlide = 0;
    quoteRef?.current?.scrollToIndex({
      index: ++currentSlide,
      animated: true,
    });
  };

  const startAutoPlay = () => {
    timerId = setInterval(handleNext, interval);
  };

  const stopAutoPlay = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  useEffect(() => {
    stopAutoPlay();
    startAutoPlay();
    return () => {
      stopAutoPlay();
    };
  }, []);

  useEffect(() => {
    const nextQuote = () => {
      setCurrQuoteIdx(prevIndex => (prevIndex + 1) % data.length);
      opacity.value = 0;
    };
    let interval;
    if (data.length > 0) {
      interval = setInterval(() => {
        nextQuote();
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
    // console.log(currQuoteIdx,quoteData.length,"Quotes")
  }, [data]);

  useEffect(() => {
    // Trigger the fade-in animation when the quote changes
    opacity.value = withTiming(1, {duration: 3000, easing: Easing.ease});
  }, [currQuoteIdx]);

  const imageStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'start',
            marginTop: 10,
            marginLeft: 10,
          },
          imageStyles,
        ]}>
        <ImageBackground
          source={{
            uri: data[currQuoteIdx].image,
          }}
          style={[
            styles.image,
            {width: width - 20, marginLeft: 0, borderRadius: 8},
          ]}></ImageBackground>
      </Animated.View>
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
    image: {
        // width: 220,
        height: 160,
        resizeMode: 'cover',
        flexDirection: 'row',
        borderRadius: 5,
        marginLeft: 13,
        // marginTop:15,
        borderRadius: 8,
    
        overflow: 'hidden',
      },
});
