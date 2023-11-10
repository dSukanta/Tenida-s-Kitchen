import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import {globalStyles} from '../constants/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Slider} from '@rneui/base';

const VideoDetails = ({video}) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [viewControl, setViewControl] = useState(false);
  const [progress, setProgress] = useState(null);

  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleBackward = () => {
    const newTime = parseInt(progress.currentTime) - 10;
    const validTime = Math.max(newTime, 0);
    videoRef.current.seek(validTime);
  };

  const handleForward = () => {
    const newTime = parseInt(progress.currentTime) + 10;
    const validTime = Math.min(newTime, parseInt(progress.seekableDuration));
    videoRef.current.seek(validTime);
  };

  const handleComplete = () => {
    setPaused(true);
    setProgress({...progress, currentTime: 0, currentPlaybackTime: 0});
    videoRef.current.seek(0);
  };

  return (
    <View style={{width: '95%', alignSelf: 'center'}}>
      <ScrollView>
        <TouchableOpacity
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setViewControl(!viewControl)}>
          <Video
            source={{uri: video.url}}
            style={{width: '100%', height: 200}}
            resizeMode="cover"
            ref={videoRef}
            // controls={true}
            onProgress={x => {
              // console.log(x);
              setProgress(x);
            }}
            paused={paused}
            onEnd={handleComplete}
          />
          {viewControl && (
            <View
              style={{
                width: '50%',
                position: 'absolute',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={handleBackward}>
                <MaterialIcons name="replay-10" color={'white'} size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPaused(!paused);
                }}>
                {paused ? (
                  <MaterialIcons name="play-arrow" color={'white'} size={30} />
                ) : (
                  <MaterialIcons name="pause" color={'white'} size={30} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleForward}>
                <MaterialIcons name="forward-10" color={'white'} size={30} />
              </TouchableOpacity>
            </View>
          )}
          {viewControl && (
            <View
              style={{
                width: '100%',
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
                style={{width: '80%', height: 40, marginHorizontal: 5}}
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor="red"
                maximumTrackTintColor="#fff"
                onValueChange={x => {
                  videoRef.current.seek(x);
                }}
                thumbStyle={{width: 10, height: 10}}
                value={progress.currentTime}
              />
              <Text style={{color: 'white'}}>
                {format(progress.seekableDuration)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={{marginVertical: 10}}>
          <Text style={[globalStyles.text, {fontSize: 13}]}>
            {video.posted}
          </Text>
          <Text style={[globalStyles.text, {fontSize: 16}]}>{video.title}</Text>
          <Text style={[globalStyles.text, {fontSize: 12}]}>
            {video.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default VideoDetails;

const styles = StyleSheet.create({});
