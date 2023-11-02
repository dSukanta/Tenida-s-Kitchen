import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking,
  Modal,
  TextInput
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../constants/globalStyles';
import {Button, ListItem} from '@rneui/base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RedLine from '../components/RedLine';

const Help = ({navigation}) => {
  const [expanded, setExpanded] = useState({status: false, id: null});
  const [feedBackVisible,setFeedBackVisible] = useState(false);

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
      icon: <Ionicons name="call" size={30} color={'red'} />,
      onPress: () => Linking.openURL('tel:8777111223'),
    },
    {
      title: 'Email',
      icon: <Ionicons name="mail" size={30} color={'red'} />,
      onPress: () => Linking.openURL('mailto:abc@xyz.com'),
    },
    {
      title: 'Send Feedback',
      icon: <MaterialIcons name="feedback" size={30} color={'red'} />,
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
          <ListItem.Title style={[globalStyles.text,{color:'red',marginHorizontal:10}]}>
            {item.title}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          margin: 10,
        }}>
        <Text style={[globalStyles.text, {fontSize: 18}]}>
          
        </Text>
      </View> */}
      <View>
        <RedLine text='Frequently asked questions' fontSize={12}/>
      </View>
      <View style={styles.accordianContainer}>
        {questions?.map((question, i) => (
          <ListItem.Accordion
            containerStyle={{
              backgroundColor:
                expanded.status && expanded.id === i ? 'white' : 'black',
              borderWidth: expanded.status && expanded.id === i ? 0 : 1,
              borderColor: 'red',
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
                      expanded.status && expanded.id === i ? 'black' : 'red',
                  }}>
                  {question.q}
                </ListItem.Title>
              </ListItem.Content>
            }
            icon={{
              name: 'downcircleo',
              type: 'antdesign',
              size: 25,
              color: 'red',
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
      <RedLine text='Contact Us'/>
     </View>
      <View style={{padding: 10, margin: 10}}>
        <FlatList
          data={actions}
          keyExtractor={(item, index) => index}
          renderItem={renderRow}
        />
      </View>
      <Modal visible={feedBackVisible} animationType='slide'>
        <View style={[styles.container,{flex:1}]}>
        <View>
          <RedLine text='Share valuable Feedback' fontSize={13}/>
        </View>
        <View>
          <TextInput style={styles.inputStyle} placeholderTextColor={'red'} placeholder='Enter your Email*'/>
          <TextInput multiline numberOfLines={4} style={[styles.inputStyle,{marginTop:0}]} placeholderTextColor={'red'} placeholder='Your Suggestion*'/>
        </View>
        <View>
          <Text style={globalStyles.text}>How much you Rate us (between 0-5) </Text>
        </View>
        <Button title={'Close'} onPress={()=>setFeedBackVisible(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  accordianContainer: {
    marginHorizontal: 10,
  },
  inputStyle:{
    borderWidth:1,
    borderColor:'red',
    padding:10,
    paddingHorizontal:20,
    margin:'5%',
    borderRadius:10,
    color:'white'
  }
});
