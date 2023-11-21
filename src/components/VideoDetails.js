// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   Modal,
//   Dimensions,
// } from 'react-native';
// import React, {useRef, useState} from 'react';
// import Video from 'react-native-video';
// import {globalStyles} from '../constants/globalStyles';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {Slider, Avatar, ListItem, Button} from '@rneui/base';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import colors from '../constants/colors';

// const {height, width} = Dimensions.get('window');

// const VideoDetails = ({video}) => {
//   const videoRef = useRef(null);
//   const [paused, setPaused] = useState(false);
//   const [viewControl, setViewControl] = useState(false);
//   const [progress, setProgress] = useState(null);
//   const [visible, setVisible] = useState(false);
//   const [mute, setMute] = useState(false);
//   // const [fullscreenOrientation,setFullscreenOrientation]= useState(true);

//   const comments = [
//     {
//       id: 1,
//       user: 'abc@xyz',
//       image: 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png',
//       comment: 'comment for this video',
//       like: 10,
//       dislike: 0,
//     },
//     {
//       id: 2,
//       user: 'mnop@stuv',
//       image: 'https://randomuser.me/api/portraits/men/36.jpg',
//       comment: 'comment2 for this video',
//       like: 5,
//       dislike: 0,
//     },
//   ];

//   const format = seconds => {
//     let mins = parseInt(seconds / 60)
//       .toString()
//       .padStart(2, '0');
//     let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
//     return `${mins}:${secs}`;
//   };

//   const handleBackward = () => {
//     const newTime = parseInt(progress.currentTime) - 10;
//     const validTime = Math.max(newTime, 0);
//     videoRef.current.seek(validTime);
//   };

//   const handleForward = () => {
//     const newTime = parseInt(progress.currentTime) + 10;
//     const validTime = Math.min(newTime, parseInt(progress.seekableDuration));
//     videoRef.current.seek(validTime);
//   };

//   const handleComplete = () => {
//     setPaused(true);
//     setProgress({...progress, currentTime: 0, currentPlaybackTime: 0});
//     videoRef.current.seek(0);
//   };

//   return (
//     <View style={{width: '95%', alignSelf: 'center'}}>
//       <ScrollView>
//         <TouchableOpacity
//           style={{
//             position: 'relative',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//           onPress={() => setViewControl(!viewControl)}>
//           <Video
//             source={{uri: video.url}}
//             style={{width: width, height: 200}}
//             resizeMode="cover"
//             ref={videoRef}
//             // controls={true}
//             onProgress={x => {
//               // console.log(x);
//               setProgress(x);
//             }}
//             paused={paused}
//             onEnd={handleComplete}
//             muted={mute}
//             // fullscreenOrientation={fullscreenOrientation}
//           />
//           {/* <Text style={globalStyles.text}>Video</Text> */}
//           {viewControl && (
//             <View
//               style={{
//                 width: '50%',
//                 position: 'absolute',
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <TouchableOpacity onPress={handleBackward}>
//                 <MaterialIcons name="replay-10" color={'white'} size={30} />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => {
//                   setPaused(!paused);
//                 }}>
//                 {paused ? (
//                   <MaterialIcons name="play-arrow" color={'white'} size={30} />
//                 ) : (
//                   <MaterialIcons name="pause" color={'white'} size={30} />
//                 )}
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleForward}>
//                 <MaterialIcons name="forward-10" color={'white'} size={30} />
//               </TouchableOpacity>
//             </View>
//           )}
// {viewControl && (
//   <View
//     style={{
//       width: '100%',
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       position: 'absolute',
//       bottom: 0,
//       paddingLeft: 20,
//       paddingRight: 20,
//       alignItems: 'center',
//     }}>
//     <Text style={{color: 'white'}}>
//       {format(progress.currentTime)}
//     </Text>
//     <Slider
//       style={{width: '60%', height: 40, marginHorizontal: 5}}
//       minimumValue={0}
//       maximumValue={progress.seekableDuration}
//       minimumTrackTintColor="red"
//       maximumTrackTintColor="#fff"
//       onValueChange={x => {
//         videoRef.current.seek(x);
//       }}
//       thumbStyle={{width: 10, height: 10}}
//       value={progress.currentTime}
//     />
//     <Text style={{color: 'white'}}>
//       {format(progress.seekableDuration)}
//     </Text>
//     <TouchableOpacity onPress={()=>setMute(!mute)}>
//     {mute ? (
//       <MaterialCommunityIcons name="volume-mute" color={'white'} size={20}/>
//     ) : (
//       <MaterialCommunityIcons name="volume-medium" color={'white'} size={20}/>
//     )}
//     </TouchableOpacity>
//     {/* <TouchableOpacity onPress={()=>setFullscreenOrientation(!fullscreenOrientation)}>
//     {fullscreenOrientation==='portrait' ? (
//       <MaterialCommunityIcons name="phone-rotate-landscape" color={'white'} size={20}/>
//     ) : (
//       <MaterialCommunityIcons name="phone-rotate-portrait" color={'white'} size={20}/>
//     )}
//     </TouchableOpacity> */}
//   </View>
// )}
//         </TouchableOpacity>
//         <View>
//           <Text style={[globalStyles.text, {fontSize: 18, margin: 10}]}>
//             Video Title
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             gap: 5,
//             flexWrap: 'wrap',
//             marginHorizontal: 10,
//           }}>
//           <Text style={globalStyles.text}>{50} Views</Text>
//           <Text style={globalStyles.text}>{10} Minutes ago</Text>
//           <Text style={[globalStyles.text, {color: 'blue'}]}>
//             #Foodreels #tenida'skitchen
//           </Text>
//         </View>
//         <View>
//           <Text style={[globalStyles.text, {fontSize: 13, margin: 10}]}>
//             Video Details
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             gap: 10,
//             alignItems: 'center',
//             margin: 10,
//           }}>
//           <Image
//             source={{
//               uri: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
//             }}
//             style={styles.authorImage}
//           />

//           <Text style={[globalStyles.text, {fontSize: 13, margin: 10}]}>
//             Video Author
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             gap: 10,
//             margin: 10,
//           }}>
//           <View style={styles.iconContainer}>
//             <AntDesign name="like2" size={25} color={'white'} />
//             <Text style={styles.text}>10</Text>
//           </View>
//           <View style={styles.iconContainer}>
//             <AntDesign name="dislike2" size={25} color={'white'} />
//             <Text style={styles.text}>1</Text>
//           </View>
//           <MaterialCommunityIcons name="share" size={25} color={'white'} />
//         </View>
//         <TouchableOpacity
//           style={styles.commentBox}
//           onPress={() => setVisible(true)}>
//           <Text style={globalStyles.text}>Comments {10}</Text>
//           <View
//             style={{
//               flexDirection: 'row',
//               gap: 15,
//               alignItems: 'center',
//               margin: 10,
//               padding: 10,
//             }}>
//             <Image
//               source={{
//                 uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
//               }}
//               style={styles.authorImage}
//             />
//             <TextInput
//               style={styles.inputStyle}
//               placeholder="add a comment"
//               placeholderTextColor={'black'}
//             />
//             <Button
//               title={'Post'}
//               buttonStyle={{borderRadius: 10, backgroundColor: colors.red}}
//             />
//           </View>
//         </TouchableOpacity>
//       </ScrollView>
// <Modal visible={visible}>
//   <Button title={'close'} onPress={() => setVisible(false)} />
//   <View>
//     {comments.map((comment, i) => (
//       <ListItem
//       key={i}
//         bottomDivider
//         containerStyle={{width: '90%', alignSelf: 'center'}}>
//         <Avatar rounded source={{uri: comment.image}} />
//         <ListItem.Content>
//           <ListItem.Title>{comment.user}</ListItem.Title>
//           <ListItem.Subtitle>{comment.comment}</ListItem.Subtitle>
//           <View
//             style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
//             <View style={styles.iconContainer}>
//               <AntDesign name="like2" size={25} color={'black'} />
//               <Text style={[styles.text, {color: 'black'}]}>
//                 {comment.like}
//               </Text>
//             </View>
//             <View style={styles.iconContainer}>
//               <AntDesign name="dislike2" size={25} color={'black'} />
//               <Text style={[styles.text, {color: 'black'}]}>
//                 {comment.dislike}
//               </Text>
//             </View>
//           </View>
//         </ListItem.Content>
//       </ListItem>
//     ))}
//   </View>
// </Modal>
//     </View>
//   );
// };

// export default VideoDetails;

// const styles = StyleSheet.create({
//   authorImage: {
//     width: 30,
//     height: 30,
//     resizeMode: 'contain',
//     borderRadius: 30,
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 10,
//   },
//   inputStyle: {
//     flex: 1,
//     width: '70%',
//     backgroundColor: 'white',
//     paddingHorizontal: 10,
//     borderRadius: 10,
//     color: 'black',
//   },
//   commentBox: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'grey',
//     borderRadius: 10,
//     marginTop: 10,
//   },
// });

import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Avatar, BottomSheet, Button, ListItem, Slider} from '@rneui/base';
import {globalStyles} from '../constants/globalStyles';
import {Image} from '@rneui/themed';
import colors from '../constants/colors';

const {height, width} = Dimensions.get('window');

const VideoDetails = () => {
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

  const [viewControl, setViewControl] = useState(false);
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [complete, setComplete] = useState(false);
  const [mute, setMute] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  // console.log(isLoading, 'prg');

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
    videoRef?.current?.seek(validTime);
  };

  const handleForward = () => {
    const newTime = parseInt(progress?.currentTime) + 10;
    const validTime = Math.min(newTime, parseInt(progress?.seekableDuration));
    videoRef?.current?.seek(validTime);
  };

  const handleComplete = () => {
    setPaused(true);
  };

  const handleLoad = () => {
    setLoading(false);
  };



  return (
    <View>
      <Pressable
        onPress={() => setViewControl(!viewControl)}
        style={styles.mainVideoContainer}>
        <Video
          ref={videoRef}
          style={{
            width: width,
            height: 200,
          }}
          source={{
            uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          resizeMode="cover"
          paused={paused}
          onProgress={x => {
            setProgress(x);
          }}
          onEnd={handleComplete}
          muted={mute}
          onLoad={handleLoad}
        />
        {isLoading && (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.red} />
        </View>
      )}
        {/* control buttons */}
        {viewControl && !isLoading && (
          <View style={styles.controlContainer}>
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

        {/* slider */}

        {!isLoading && <View style={styles.sliderContainer}>
          <Text style={{color: 'white'}}>{format(progress?.currentTime)}</Text>
          <Slider
            style={{width: '60%', height: 40, marginHorizontal: 5}}
            minimumValue={0}
            maximumValue={progress?.seekableDuration}
            minimumTrackTintColor="red"
            maximumTrackTintColor="#fff"
            onValueChange={x => {
              console.log(x, 'x');
              videoRef?.current?.seek(x);
            }}
            thumbStyle={{width: 10, height: 10}}
            value={progress?.currentTime}
          />
          <Text style={{color: 'white'}}>
            {format(progress?.seekableDuration)}
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
          {/* <TouchableOpacity onPress={()=>setFullscreenOrientation(!fullscreenOrientation)}>
              {fullscreenOrientation==='portrait' ? (
                <MaterialCommunityIcons name="phone-rotate-landscape" color={'white'} size={20}/>
              ) : (
                <MaterialCommunityIcons name="phone-rotate-portrait" color={'white'} size={20}/>
              )}
              </TouchableOpacity> */}
        </View>}
      </Pressable>
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
      <TouchableOpacity
        style={styles.commentBox}
        onPress={() => setVisible(true)}>
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
          <Button
            title={'Post'}
            buttonStyle={{borderRadius: 10, backgroundColor: colors.red}}
          />
        </View>
      </TouchableOpacity>
      <BottomSheet
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {comments.map((comment, i) => (
            <ListItem
              key={i}
              bottomDivider
              // containerStyle={{width: '90%', alignSelf: 'center'}}
            >
              <Avatar rounded source={{uri: comment.image}} />
              <ListItem.Content>
                <ListItem.Title>{comment.user}</ListItem.Title>
                <ListItem.Subtitle>{comment.comment}</ListItem.Subtitle>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <View style={styles.iconContainer}>
                    <AntDesign name="like2" size={25} color={'black'} />
                    <Text style={[styles.text, {color: 'black'}]}>
                      {comment.like}
                    </Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <AntDesign name="dislike2" size={25} color={'black'} />
                    <Text style={[styles.text, {color: 'black'}]}>
                      {comment.dislike}
                    </Text>
                  </View>
                </View>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
        <Button
          title={'close'}
          onPress={() => setVisible(false)}
          buttonStyle={{backgroundColor: colors.red}}
        />
      </BottomSheet>
    </View>
  );
};

export default VideoDetails;

const styles = StyleSheet.create({
  mainVideoContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignContent: 'center',
  },
  controlContainer: {
    width: width / 2,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  sliderContainer: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  authorImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 30,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  inputStyle: {
    flex: 1,
    width: '70%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
    color: 'black',
  },
  commentBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginTop: 10,
  },
});
