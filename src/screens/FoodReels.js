import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import RedLine from '../components/RedLine';
import {globalStyles} from '../constants/globalStyles';
import {BottomSheet} from '@rneui/themed';
import VideoDetails from './VideoDetails';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {videos} from '../../videos.json';

const FoodReels = ({route,navigation}) => {
  const videoRef = useRef();
  // const [videos, setVideos] = useState([]);
  const [isVisible, setIsVisible] = useState(false);


  // useEffect(() => {
  //   setVideos([
  //     {
  //       id: 1,
  //       title: 'Video Title 1',
  //       description: 'Video Description',
  //       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  //       thumImage: 'https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg',
  //       posted: '1 month ago',
  //     },
  //     {
  //       id: 2,
  //       title: 'Video Title 2',
  //       description: 'Video Description second',
  //       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  //       thumImage: 'https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg',
  //       posted: '2 years ago',
  //     },
  //   ]);
  // }, []);

  return (
    <View style={globalStyles.container}>
      <View>
        <RedLine text="Food Reels" />
      </View>
      <ScrollView>
        {videos?.map((video, i) => (
          <TouchableOpacity
            style={styles.videoCard}
            key={i}
            onPress={()=>navigation.navigate('VideoDetails',{vid:video?.id})}
            >
            <View>
              <Image
                source={{uri: video.thumb}}
                style={{width: '100%', height: 200}}
              />
            </View>
            <View>
              {/* <Text style={[globalStyles.text, {fontSize: 13}]}>
                {video.posted}
              </Text> */}
              <Text style={[globalStyles.text, {fontSize: 16}]}>
                {video.title}
              </Text>
              <Text style={[globalStyles.text, {fontSize: 12}]}>
                {video.description.substring(0,50)}...
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* <Modal
        visible={isVisible}
        presentationStyle="slide">
        <View style={[globalStyles.container]}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', paddingHorizontal: 10}}
            onPress={() => setIsVisible(false)}>
            <AntDesign name="close" color={'white'} size={30} />
          </TouchableOpacity>
          <VideoDetails video={videos[0]} />
        </View>
      </Modal> */}
    </View>
  );
};

export default FoodReels;

const styles = StyleSheet.create({
  videoCard: {
    width: '95%',
    marginVertical: 10,
    alignSelf: 'center',
  },
});
