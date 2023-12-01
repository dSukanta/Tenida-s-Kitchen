import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ListItem} from '@rneui/themed';
import {Button} from '@rneui/base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '../constants/globalStyles';
import colors from '../constants/colors';
import { Appcontext } from '../context/AppContext';
import { getProfileName } from '../utils/Helper';

const Settings = ({route, navigation}) => {
  const [edit, setEdit] = useState(false);
  const [inputData, setInputData] = useState({});
  const {userData,setUserData} = useContext(Appcontext);

  const handleSave = () => {
    setEdit(false);
  };

  useEffect(()=>{
    setInputData(userData[0])
  },[userData])

  return (
    <View style={styles.container}>
      {!edit ? (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={25} color={'white'} />
          </TouchableOpacity>
          <Text style={[globalStyles.text]}>Profile</Text>
          <Button
            title={'Edit Profile'}
            icon={{
              name: 'edit',
              type: 'antdesign',
              size: 15,
              color: 'white',
            }}
            buttonStyle={{borderRadius: 10, backgroundColor: colors.red}}
            onPress={() => setEdit(true)}
          />
        </View>
      ) : (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setEdit(false)}>
            <Ionicons name="close" size={20} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Ionicons name="checkmark-sharp" size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              alignItems: 'center',
            }}>
            <View style={styles.redLine} />
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
                }}
                style={styles.profileimgStyle}
              />
            </View>
            <View style={styles.redLine} />
          </View>
          <View
            style={{
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: colors.red,
              paddingBottom: 10,
              marginHorizontal: '5%',
            }}>
            {!edit ? (
              <Text
                style={{
                  fontWeight: '900',
                  color: colors.red,
                  fontSize: 18,
                  flexWrap: 'wrap',
                  marginHorizontal: 10,
                }}>
                {getProfileName(userData)}
              </Text>
            ) : (
              <Button
                title={'Change Profile Picture'}
                buttonStyle={{borderRadius: 10}}
              />
            )}
            {/* <Text>{'user@email'}</Text> */}
          </View>
        </View>
        <View style={styles.contentContainer}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Subtitle>Name</ListItem.Subtitle>
              {!edit ? (
                <ListItem.Title>
                  {inputData?.name || 'No name provided'}
                </ListItem.Title>
              ) : (
                <TextInput
                  placeholder="name"
                  style={styles.inputStyle}
                  onChangeText={text =>
                    setInputData({...inputData, name: text})
                  }
                  value={inputData.name}
                  placeholderTextColor={'black'}
                />
              )}
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Subtitle>Email</ListItem.Subtitle>
              {!edit ? (
                <ListItem.Title>
                  {inputData?.email || 'No email provided'}
                </ListItem.Title>
              ) : (
                <TextInput
                  placeholder="email"
                  style={styles.inputStyle}
                  onChangeText={text =>
                    setInputData({...inputData, email: text})
                  }
                  value={inputData.email}
                  placeholderTextColor={'black'}
                />
              )}
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Subtitle>Date of Birth</ListItem.Subtitle>
              {!edit ? (
                <ListItem.Title>
                  {inputData?.dob || 'No DOB provided'}
                </ListItem.Title>
              ) : (
                <TextInput
                  placeholder="Date of Birth"
                  style={styles.inputStyle}
                  onChangeText={text => setInputData({...inputData, dob: text})}
                  value={inputData.dob}
                  placeholderTextColor={'black'}
                />
              )}
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Subtitle>Phone no.</ListItem.Subtitle>
              {!edit ? (
                <ListItem.Title>
                  {inputData?.phone || 'Phone number not added'}
                </ListItem.Title>
              ) : (
                <TextInput
                  placeholder="Phone no."
                  style={styles.inputStyle}
                  onChangeText={text =>
                    setInputData({...inputData, town: text})
                  }
                  value={inputData.town}
                  placeholderTextColor={'black'}
                />
              )}
            </ListItem.Content>
          </ListItem>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  profileimgStyle: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  redLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.red,
    margin: 10,
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 5,
    color:'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});
