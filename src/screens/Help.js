import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking,
  Modal,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../constants/globalStyles';
import {Button, ListItem} from '@rneui/base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RedLine from '../components/RedLine';
import colors from '../constants/colors';
import {Rating} from 'react-native-ratings';
import { Alert } from 'react-native';

const Help = ({navigation}) => {
  const [expanded, setExpanded] = useState({status: false, id: null});
  const [feedBackVisible, setFeedBackVisible] = useState(false);
  const [userFeedBack, setUserFeedBack] = useState({
    email: '',
    name: '',
    message: '',
    rating: 0,
  });

  const questions = [
    {
      q: 'Q:1',
      a: 'A:1',
    },
    {
      q: 'Q:2',
      a: 'A:2',
    },
    {
      q: 'Q:3',
      a: 'A:3',
    },
    {
      q: 'Q:4',
      a: 'A:4',
    },
    {
      q: 'Q:5',
      a: 'A:5',
    },
  ];

  const actions = [
    {
      title: 'Call',
      icon: <Ionicons name="call" size={30} color={colors.red} />,
      onPress: () => Linking.openURL('tel:8777111223'),
    },
    {
      title: 'Email',
      icon: <Ionicons name="mail" size={30} color={colors.red} />,
      onPress: () => Linking.openURL('mailto:abc@xyz.com'),
    },
    {
      title: 'Send Feedback',
      icon: <MaterialIcons name="feedback" size={30} color={colors.red} />,
      onPress: () => setFeedBackVisible(true),
    },
  ];

  const renderRow = ({item}) => {
    return (
      <ListItem
        onPress={item.onPress}
        bottomDivider
        containerStyle={{
          backgroundColor: 'transparent',
          padding: 0,
          margin: 0,
          paddingVertical: 15,
        }}>
        {item.icon}
        <ListItem.Content>
          <ListItem.Title
            style={[
              globalStyles.text,
              {color: colors.red, marginHorizontal: 10},
            ]}>
            {item.title}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  const completeRating = rating => {
    setUserFeedBack({...userFeedBack, rating: rating});
  };

  const handleSubmit = () => {
    if(!userFeedBack.name){
      return Alert.alert('Name required', `Please enter a valid name.`)
    };
    if(!userFeedBack.email){
       return Alert.alert('Email required', `Please enter a valid email.`)
    };
    if(!userFeedBack.message){
      return Alert.alert('Message required', `Please enter a valid message.`)
    };
    if(!userFeedBack.rating){
      return Alert.alert('Rating required', `Please rate us.`)
    };
    console.log(userFeedBack,'userfeedback')
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <RedLine text="Frequently asked questions" fontSize={12} />
        </View>
        <View style={styles.accordianContainer}>
          {questions?.map((question, i) => (
            <ListItem.Accordion
              key={i}
              containerStyle={{
                backgroundColor:
                  expanded.status && expanded.id === i ? 'white' : 'black',
                borderWidth: expanded.status && expanded.id === i ? 0 : 1,
                borderColor: colors.red,
                borderRadius: 10,
                margin: 5,
                marginBottom: expanded.status && expanded.id === i ? 0 : 5,
                borderBottomLeftRadius:
                  expanded.status && expanded.id === i ? 0 : 10,
                borderBottomRightRadius:
                  expanded.status && expanded.id === i ? 0 : 10,
              }}
              content={
                <ListItem.Content>
                  <ListItem.Title
                    style={{
                      color:
                        expanded.status && expanded.id === i
                          ? 'black'
                          : colors.red,
                    }}>
                    {question.q}
                  </ListItem.Title>
                </ListItem.Content>
              }
              icon={{
                name: 'downcircleo',
                type: 'antdesign',
                size: 25,
                color: colors.red,
              }}
              isExpanded={expanded.status && expanded.id === i}
              onPress={() => {
                if (expanded.status) {
                  setExpanded({status: false, id: null});
                  if (expanded.status && expanded.id !== i) {
                    setExpanded({status: true, id: i});
                  }
                } else {
                  setExpanded({status: !expanded.status, id: i});
                }
              }}>
              <ListItem
                containerStyle={{
                  margin: 5,
                  margintop: expanded.status && expanded.id === i ? 0 : 5,
                  borderRadius: 10,
                  borderTopLeftRadius:
                    expanded.status && expanded.id === i ? 0 : 10,
                  borderTopRightRadius:
                    expanded.status && expanded.id === i ? 0 : 10,
                }}>
                <ListItem.Content>
                  <Text>{question.a}</Text>
                </ListItem.Content>
              </ListItem>
            </ListItem.Accordion>
          ))}
        </View>
        <View>
          <RedLine text="Contact Us" />
        </View>
        <View style={{padding: 10, margin: 10}}>
          <FlatList
            data={actions}
            keyExtractor={(item, index) => index}
            renderItem={renderRow}
          />
        </View>
        <Modal visible={feedBackVisible} animationType="slide">
          <View style={[styles.container, {flex: 1}]}>
            <View>
              <RedLine text="Share valuable Feedback" fontSize={13} />
            </View>
            <ScrollView>
            <View>
              <TextInput
                style={[styles.inputStyle,{marginVertical:0}]}
                placeholderTextColor={colors.red}
                placeholder="Enter your Name*"
                onChangeText={text =>
                  setUserFeedBack({...userFeedBack, name: text})
                }
              />
              <TextInput
                style={styles.inputStyle}
                placeholderTextColor={colors.red}
                placeholder="Enter your Email*"
                onChangeText={text =>
                  setUserFeedBack({...userFeedBack, email: text})
                }
              />
              <TextInput
                multiline
                numberOfLines={4}
                style={[
                  styles.inputStyle,
                  {marginVertical: 0, textAlignVertical: 'top'},
                ]}
                placeholderTextColor={colors.red}
                placeholder="Your Message*"
                onChangeText={text =>
                  setUserFeedBack({...userFeedBack, message: text})
                }
              />
            </View>
            <View style={{marginHorizontal: 25, marginVertical:15}}>
              <Text style={globalStyles.text}>Rate Us (between 0-5) </Text>
              <View style={{alignSelf: 'flex-start', marginVertical: 10}}>
                <Rating
                  type="star"
                  ratingCount={5}
                  startingValue={0}
                  onFinishRating={completeRating}
                />
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button
                title={'Close'}
                onPress={() => setFeedBackVisible(false)}
                buttonStyle={{
                  width: '80%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  paddingVertical: 10,
                }}
                containerStyle={{margin: 10}}
              />
              <Button
                title={'Submit'}
                onPress={handleSubmit}
                buttonStyle={{
                  width: '80%',
                  alignSelf: 'flex-start',
                  borderRadius: 10,
                  paddingVertical: 10,
                }}
                containerStyle={{margin: 10}}
              />
            </View>
            </ScrollView>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  accordianContainer: {
    marginHorizontal: 10,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: colors.red,
    padding: 10,
    paddingHorizontal: 20,
    margin: '5%',
    borderRadius: 10,
    color: 'white',
  },
});
