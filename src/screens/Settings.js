import {
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {globalStyles} from '../constants/globalStyles';
import {Button, Card, ListItem} from '@rneui/base';
import {Dimensions} from 'react-native';
import colors from '../constants/colors';
import {Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Appcontext} from '../context/AppContext';
import EditComp from '../components/EditComp';
import CustomHeader from '../components/CustomHeader';
import RedLine from '../components/RedLine';
import { getFromStorage, getProfileName, saveToStorage } from '../utils/Helper';
import { serverRequest } from '../utils/ApiRequests';
import moment from 'moment';

const {height, width} = Dimensions.get('window');

const Settings = ({route,navigation}) => {
  const [edit, setEdit] = useState(false);
  const [inputData, setInputData] = useState({});
  const {userData, setUserData} = useContext(Appcontext);
  const [date, setDate] = useState(new Date('2000-12-31'));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setInputData(userData[0]);
  }, [userData]);

  const handleLeftClick = () => {
    navigation.goBack();
  };

  const handleRightClick = () => {
    setEdit(true);
  };

  const handleSubmit= async()=>{
    // console.log(inputData,userData[0]?._id,'data');
    const devideId = await getFromStorage('deviceId');
    let headerObj = {
      deviceid: devideId,
      devicename: 'Android',
    };
    if (userData?.length) {
      headerObj.userid = userData[0]?._id;
    };
    try {
      const res= await serverRequest(`api/v1/userauth/updateprofile/${userData[0]?._id}`,'PUT',inputData,headerObj);
      console.log(res,'updated profile response');
      if(res?.success){
        setEdit(false);
        await saveToStorage('user', [res?.data]);
        setUserData([res?.data]);
      }
    } catch (error) {
        console.log(error,'error')
    }
  };

  // console.log(inputData,'data');


  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={{uri: inputData?.profile_picture || 'https://shorturl.at/LXZ16',}}
        style={styles.upperContainer}
        imageStyle={{opacity: 0.5}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleLeftClick}>
            <MaterialCommunityIcons
              name={'keyboard-backspace'}
              size={25}
              color={'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRightClick}>
            <MaterialCommunityIcons
              name={'account-edit'}
              size={25}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: inputData?.profile_picture || 'https://shorturl.at/LXZ16',
          }}
          style={styles.image}
        />
        <Text style={[globalStyles.text, {marginBottom: 10, fontSize: 15,alignSelf:'center',}]}>
        {getProfileName(userData)}
        </Text>
      </View>
      <Card containerStyle={[styles.upperContainer, {height: height,width:'90%',alignSelf:'center'}]}>
        <ScrollView contentContainerStyle={{marginTop: '25%'}}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <View style={{flexDirection:'row',gap:10,justifyContent:'center',alignItems:'center'}}>
              <MaterialCommunityIcons name='account' size={25} color={'black'}/>
              <ListItem.Subtitle>Name</ListItem.Subtitle>
              </View>
              <ListItem.Title>
                {inputData?.fullname || 'No name provided'}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <View style={{flexDirection:'row',gap:10,justifyContent:'center',alignItems:'center'}}>
              <MaterialCommunityIcons name='email' size={25} color={'black'}/>
              <ListItem.Subtitle>Email</ListItem.Subtitle>
              </View>
              <ListItem.Title>
                {inputData?.email || 'No email provided'}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <View style={{flexDirection:'row',gap:10,justifyContent:'center',alignItems:'center'}}>
              <MaterialCommunityIcons name='calendar-account-outline' size={25} color={'black'}/>
              <ListItem.Subtitle>BirthDay</ListItem.Subtitle>
              </View>
              <ListItem.Title>
                {moment(inputData?.date_of_birth)?.format('ll') || 'No date of birth provided'}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <View style={{flexDirection:'row',gap:10,justifyContent:'center',alignItems:'center'}}>
              <MaterialCommunityIcons name='cellphone' size={25} color={'black'}/>
              <ListItem.Subtitle>Phone no.</ListItem.Subtitle>
              </View>
              <ListItem.Title>
                {inputData?.phone || 'Phone number not provided'}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </ScrollView>
        <Modal animationType='slide' visible={edit}>
          <View style={globalStyles.container}>
            <MaterialCommunityIcons name='close-circle' size={25} color={'white'} style={{alignSelf:'flex-end',margin:5}} onPress={()=>setEdit(false)}/>
          <RedLine text='Edit Profile'/>
          <EditComp setEdit={setEdit} inputData={inputData} setInputData={setInputData}/>
          <Button title={'Submit'} onPress={handleSubmit} buttonStyle={{backgroundColor:colors.red}}/>
          </View>
        </Modal>
      </Card>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  upperContainer: {
    height: height / 3.5,
    backgroundColor: 'transparent',
    width: width,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    position: 'relative',
  },
  imageContainer: {
    width: width / 4,
    height: width / 4,
    borderRadius: width / 4,
    alignSelf: 'center',
    position: 'absolute',
    top: width / 2.5,
    left: width / 2.6,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    marginVertical: 5,
    borderWidth: 5,
    borderColor: 'white',
  },
});
