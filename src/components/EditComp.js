import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Input, ListItem} from '@rneui/themed';
import {Button} from '@rneui/base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalStyles} from '../constants/globalStyles';
import colors from '../constants/colors';
import {Appcontext} from '../context/AppContext';
import {getProfileName} from '../utils/Helper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const {height, width} = Dimensions.get('window');

const EditComp = ({route, navigation}) => {
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

  // console.log(inputData.dob || date, 'date');

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
       <ImageBackground
        source={{uri: 'https://shorturl.at/LXZ16'}}
        style={styles.upperContainer}
        imageStyle={{opacity: 0.5}}>
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
      <View style={{marginTop:'23%'}}>
      <Input
        placeholder="Enter your name"
        leftIcon={
          <MaterialCommunityIcons name="account" size={24} color="white" />
        }
        inputContainerStyle={styles.inputStyle}
        inputStyle={{color:'white'}}
        value={inputData?.fullname}
        onChangeText={(text)=>setInputData({...inputData, fullname: text})}
      />
      <Input
        placeholder="Enter your email"
        leftIcon={
          <MaterialCommunityIcons name="email" size={24} color="white" />
        }
        inputContainerStyle={styles.inputStyle}
        inputStyle={{color:'white'}}
        value={inputData?.email}
        onChangeText={(text)=>setInputData({...inputData, email: text})}
        disabled={inputData?.loginMethod==='email'}
      />
      <TouchableOpacity
        style={styles.dateContainer}
        onPress={() => setOpen(true)}>
        <MaterialCommunityIcons
          name="calendar-account"
          size={24}
          color="white"
        />
        <Text style={globalStyles.text}>
          {inputData?.dob
            ? moment(inputData?.dob)?.format('ll')
            : 'Select your date of birth'}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setInputData({...inputData, dob: date});
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode="date"
        maximumDate={new Date('2022-12-31')}
      />
      <Input
        placeholder="Enter your Phone Number"
        leftIcon={
          <MaterialCommunityIcons name="cellphone" size={24} color="white" />
        }
        inputContainerStyle={styles.inputStyle}
        inputStyle={{color:'white'}}
        value={inputData?.phone}
        onChangeText={(text)=>setInputData({...inputData, phone: text})}
        disabled={inputData?.loginMethod==='phone'}
      />
      </View>
    </ScrollView>
  );
};

export default EditComp;

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    paddingHorizontal: 15,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    padding: 15,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: '5%',
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
