import {
  View,
  Text,
  TouchableOpacity,
  Touchable,
  Image,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Slider} from '@rneui/base';
import {globalStyles} from '../constants/globalStyles';
import colors from '../constants/colors';
import { Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

const VideoPlayer = ({navigation}) => {
  const [clicked, setClicked] = useState(false);
  const [puased, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [mute, setMute] = useState(false);
  const [videoDim,setVideoDim] = useState({width:width,height:height});

//   console.log(width,'wd');

  const ref = useRef();

  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleBackward = () => {
    const newTime = parseInt(progress?.currentTime) - 10;
    const validTime = Math.max(newTime, 0);
    ref?.current?.seek(validTime);
  };

  const handleForward = () => {
    const newTime = parseInt(progress?.currentTime) + 10;
    const validTime = Math.min(newTime, parseInt(progress?.seekableDuration));
    ref?.current?.seek(validTime);
  };

  const handleLoad = () => {
    setLoading(false);
  };

 

  // useEffect(() => {
  //   const handleBackPress = () => {
  //     // Lock the orientation to portrait when navigating back
  //     Orientation.lockToPortrait();
  //     // Navigate back
  //     navigation.goBack();
  //     // Return true to prevent default back behavior
  //     return true;
  //   };

  //   // Add the back press event listener
  //   BackHandler.addEventListener('hardwareBackPress', handleBackPress);

  //   return () => {
  //     // Remove the back press event listener when the component unmounts
  //     BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  //   };
  // }, [navigation]);
  useEffect(()=>{
    if(fullScreen){
        setVideoDim({width:height,height:width});
    }else{
        setVideoDim({width:width,height:height}); 
    }
  },[fullScreen])

  return (
    <View>
      <TouchableOpacity
        style={{width: videoDim.width, height: fullScreen ? videoDim.height/1.2 : 200}}
        onPress={() => {
          setClicked(true);
        }}>
        <Video
          paused={puased}
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          ref={ref}
          onProgress={x => {
            setProgress(x);
          }}
          muted={mute}
          style={{width: videoDim.width, height: fullScreen ? videoDim.height/1.2 : 200}}
          resizeMode="cover"
          onLoad={handleLoad}
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
        {clicked && (
          <TouchableOpacity
            style={{
              width: videoDim.width,
              height: fullScreen ? videoDim.height/1.2 : 200,
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setClicked(false);
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={handleBackward}>
                <MaterialIcons name="replay-10" color={'white'} size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPaused(!puased);
                }}>
                {puased ? (
                  <MaterialIcons name="play-arrow" color={'white'} size={30} />
                ) : (
                  <MaterialIcons name="pause" color={'white'} size={30} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleForward}>
                <MaterialIcons name="forward-10" color={'white'} size={30} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 0,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>
                {format(progress.currentTime)}
              </Text>
              <Slider
                style={{width: '60%', height: 40, marginHorizontal: 5}}
                minimumValue={0}
                maximumValue={progress?.seekableDuration}
                minimumTrackTintColor="red"
                maximumTrackTintColor="#fff"
                onValueChange={x => {
                  console.log(x, 'x');
                  ref?.current?.seek(x);
                }}
                thumbStyle={{width: 10, height: 10}}
                value={progress?.currentTime}
              />
              <Text style={{color: 'white'}}>
                {format(progress.seekableDuration)}
              </Text>
              <TouchableOpacity onPress={() => setMute(!mute)}>
                {mute ? (
                  <MaterialCommunityIcons
                    name="volume-mute"
                    color={'white'}
                    size={20}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="volume-medium"
                    color={'white'}
                    size={20}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: videoDim.width,
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                top: 10,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setFullScreen(!fullScreen)
                  if (fullScreen) {
                    Orientation.lockToPortrait();
                  } else {
                    setFullScreen(!fullScreen);
                    Orientation.lockToLandscape();
                  }

                }}>
                {!fullScreen ? (
                  <MaterialCommunityIcons
                    name="phone-rotate-landscape"
                    color={'white'}
                    size={20}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="phone-rotate-portrait"
                    color={'white'}
                    size={20}
                  />
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default VideoPlayer;

//http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4

// {
//   /* <Pressable
// onPress={() => setViewControl(!viewControl)}
// style={[styles.mainVideoContainer,{width:width, height: fullScreen? height/1.2:200}]}>
// <Video
//   ref={videoRef}
//   source={{
//     uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//   }}
//   resizeMode="cover"
//   paused={paused}
//   onProgress={x => {
//     setProgress(x);
//   }}
//   onEnd={handleComplete}
//   muted={mute}
//   onLoad={handleLoad}
//   style={{width:width, height: fullScreen? height:200}}
// />
// {isLoading && (
//   <View
//     style={{
//       position: 'absolute',
//       top: 0,
//       bottom: 0,
//       left: 0,
//       right: 0,
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}>
//     <ActivityIndicator size="large" color={colors.red} />
//   </View>
// )}
// {viewControl && !isLoading && (
//   <View style={styles.controlContainer}>
//     <TouchableOpacity onPress={handleBackward}>
//       <MaterialIcons name="replay-10" color={'white'} size={30} />
//     </TouchableOpacity>
//     <TouchableOpacity
//       onPress={() => {
//         setPaused(!paused);
//       }}>
//       {paused ? (
//         <MaterialIcons name="play-arrow" color={'white'} size={30} />
//       ) : (
//         <MaterialIcons name="pause" color={'white'} size={30} />
//       )}
//     </TouchableOpacity>
//     <TouchableOpacity onPress={handleForward}>
//       <MaterialIcons name="forward-10" color={'white'} size={30} />
//     </TouchableOpacity>
//   </View>
// )}


// {!isLoading && (
//   <View style={styles.sliderContainer}>
//     <Text style={{color: 'white'}}>
//       {format(progress?.currentTime)}
//     </Text>
//     <Slider
//       style={{width: '60%', height: 40, marginHorizontal: 5}}
//       minimumValue={0}
//       maximumValue={progress?.seekableDuration}
//       minimumTrackTintColor="red"
//       maximumTrackTintColor="#fff"
//       onValueChange={x => {
//         console.log(x, 'x');
//         videoRef?.current?.seek(x);
//       }}
//       thumbStyle={{width: 10, height: 10}}
//       value={progress?.currentTime}
//     />
//     <Text style={{color: 'white'}}>
//       {format(progress?.seekableDuration)}
//     </Text>
//     <TouchableOpacity onPress={() => setMute(!mute)}>
//       {mute ? (
//         <MaterialCommunityIcons
//           name="volume-mute"
//           color={'white'}
//           size={20}
//         />
//       ) : (
//         <MaterialCommunityIcons
//           name="volume-medium"
//           color={'white'}
//           size={20}
//         />
//       )}
//     </TouchableOpacity>
//     <TouchableOpacity onPress={handleOrientation}>
//       {!fullScreen ? (
//         <MaterialCommunityIcons name="phone-rotate-landscape" color={'white'} size={20}/>
//       ) : (
//         <MaterialCommunityIcons name="phone-rotate-portrait" color={'white'} size={20}/>
//       )}
//       </TouchableOpacity>
//   </View>
// )}
// </Pressable> */
// }