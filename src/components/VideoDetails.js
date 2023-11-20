import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
   TextInput,
   Image,
   Modal,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import {globalStyles} from '../constants/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Slider,Avatar, ListItem, Button} from '@rneui/base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';

const VideoDetails = ({video}) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [viewControl, setViewControl] = useState(false);
  const [progress, setProgress] = useState(null);
  const [visible,setVisible] = useState(false);

   const comments = [
    {
      id: 1,
      user: 'abc@xyz',
      image: 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png',
      comment: 'comment for this video',
      like: 10,
      dislike: 0,
    },
    {
      id: 2,
      user: 'mnop@stuv',
      image: 'https://randomuser.me/api/portraits/men/36.jpg',
      comment: 'comment2 for this video',
      like: 5,
      dislike: 0,
    },
  ];

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
          {/* <Video
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
          /> */}
          <Text style={globalStyles.text}>Video</Text>
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
          {/* {viewControl && (
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
          )} */}
        </TouchableOpacity>
        <View>
        <Text style={[globalStyles.text, {fontSize: 18, margin: 10}]}>
          Video Title
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 5,
          flexWrap: 'wrap',
          marginHorizontal: 10,
        }}>
        <Text style={globalStyles.text}>{50} Views</Text>
        <Text style={globalStyles.text}>{10} Minutes ago</Text>
        <Text style={[globalStyles.text, {color: 'blue'}]}>
          #Foodreels #tenida'skitchen
        </Text>
      </View>
      <View>
        <Text style={[globalStyles.text, {fontSize: 13, margin: 10}]}>
          Video Details
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          margin: 10,
        }}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
          }}
          style={styles.authorImage}
        />

        <Text style={[globalStyles.text, {fontSize: 13, margin: 10}]}>
          Video Author
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          margin: 10,
        }}>
        <View style={styles.iconContainer}>
          <AntDesign name="like2" size={25} color={'white'} />
          <Text style={styles.text}>10</Text>
        </View>
        <View style={styles.iconContainer}>
          <AntDesign name="dislike2" size={25} color={'white'} />
          <Text style={styles.text}>1</Text>
        </View>
        <MaterialCommunityIcons name="share" size={25} color={'white'} />
      </View>
      <TouchableOpacity style={styles.commentBox} onPress={()=>setVisible(true)}>
      <Text style={globalStyles.text}>Comments {10}</Text>
      <View
        style={{
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
          margin: 10,
          padding: 10,
        }}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
          }}
          style={styles.authorImage}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="add a comment"
          placeholderTextColor={'black'}
        />
        <Button title={'Post'} buttonStyle={{borderRadius:10,backgroundColor:colors.red}}/>
      </View>
      </TouchableOpacity>      
      </ScrollView>
      <Modal visible={visible}>
        <Button title={'close'} onPress={()=>setVisible(false)}/>
      <View>
        {comments.map((comment, i) => (
          <ListItem bottomDivider containerStyle={{width:'90%',alignSelf:'center'}}>
            <Avatar rounded source={{uri: comment.image}} />
            <ListItem.Content>
              <ListItem.Title>{comment.user}</ListItem.Title>
              <ListItem.Subtitle>{comment.comment}</ListItem.Subtitle>
              <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                <View style={styles.iconContainer}>
                  <AntDesign name="like2" size={25} color={'black'} />
                  <Text style={[styles.text,{color:'black'}]}>{comment.like}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <AntDesign name="dislike2" size={25} color={'black'} />
                <Text style={[styles.text,{color:'black'}]}>{comment.dislike}</Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      </Modal>
    </View>
  );
};

export default VideoDetails;

const styles = StyleSheet.create({
  authorImage:{
    width:30,
    height:30,
    resizeMode:'contain',
    borderRadius:30,
  },
  iconContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:10,
  },
  inputStyle:{
    flex:1,
    width:'70%',
    backgroundColor:'white',
    paddingHorizontal:10,
    borderRadius:10,
    color:'black',
  },
  commentBox:{
    padding:10,
    borderWidth:1,
    borderColor:'grey',
    borderRadius:10,
    marginTop:10,
  }
});