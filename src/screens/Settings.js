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

const {height, width} = Dimensions.get('window');

const Settings = ({route,navigation}) => {
  const [edit, setEdit] = useState(false);
  const [inputData, setInputData] = useState({});
  const {userData, setUserData} = useContext(Appcontext);
  const [date, setDate] = useState(new Date('2000-12-31'));
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    setEdit(false);
    // console.log(inputData,'input data');
    // setUserData([inputData]);
  };

  useEffect(() => {
    setInputData(userData[0]);
  }, [userData]);

  const handleLeftClick = () => {
    navigation.goBack();
  };

  const handleRightClick = () => {
    setEdit(!edit);
  };

  const handleSubmit= async()=>{
    console.log(userData,'data');
    setEdit(false);
  }

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={{uri: 'https://shorturl.at/LXZ16'}}
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
            uri: 'https://shorturl.at/LXZ16',
          }}
          style={styles.image}
        />
        <Text style={[globalStyles.text, {marginBottom: 10, fontSize: 18}]}>
          Name
        </Text>
      </View>
      <Card containerStyle={[styles.upperContainer, {height: height,width:'90%',alignSelf:'center'}]}>
        <ScrollView contentContainerStyle={{marginTop: '25%'}}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <View style={{flexDirection:'row',gap:10,justifyContent:'center',alignItems:'center'}}>
              <MaterialCommunityIcons name='account' size={25}/>
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
              <MaterialCommunityIcons name='email' size={25}/>
              <ListItem.Subtitle>Email</ListItem.Subtitle>
              </View>
              <ListItem.Title>
                {inputData?.fullname || 'No email provided'}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <View style={{flexDirection:'row',gap:10,justifyContent:'center',alignItems:'center'}}>
              <MaterialCommunityIcons name='calendar-account-outline' size={25}/>
              <ListItem.Subtitle>BirthDay</ListItem.Subtitle>
              </View>
              <ListItem.Title>
                {inputData?.fullname || 'No date of birth provided'}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <View style={{flexDirection:'row',gap:10,justifyContent:'center',alignItems:'center'}}>
              <MaterialCommunityIcons name='cellphone' size={25}/>
              <ListItem.Subtitle>Phone no.</ListItem.Subtitle>
              </View>
              <ListItem.Title>
                {inputData?.fullname || 'Phone number not provided'}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </ScrollView>
        <Modal animationType='slide' visible={edit}>
          <View style={globalStyles.container}>
          <RedLine text='Edit Profile'/>
          <EditComp/>
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
