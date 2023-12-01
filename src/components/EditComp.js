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
import {Input, ListItem} from '@rneui/themed';
import {Button} from '@rneui/base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalStyles} from '../constants/globalStyles';
import colors from '../constants/colors';
import {Appcontext} from '../context/AppContext';
import {getProfileName} from '../utils/Helper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

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
      <Input
        placeholder="Enter your name"
        leftIcon={
          <MaterialCommunityIcons name="account" size={24} color="white" />
        }
        inputContainerStyle={styles.inputStyle}
      />
      <Input
        placeholder="Enter your email"
        leftIcon={
          <MaterialCommunityIcons name="email" size={24} color="white" />
        }
        inputContainerStyle={styles.inputStyle}
      />
     <TouchableOpacity style={styles.dateContainer} onPress={()=>setOpen(true)}>
        <MaterialCommunityIcons name='calendar-account' size={24} color="white" />
        <Text style={globalStyles.text}>{inputData?.dob? moment(inputData?.dob)?.format('ll') : 'Select your date of birth'}</Text>
     </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setInputData({...inputData, dob:date});
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
      />

      {/* <ListItem bottomDivider containerStyle={styles.contentContainer}>
        <ListItem.Content>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name="account" size={25} />
            <ListItem.Subtitle>Name</ListItem.Subtitle>
          </View>
          <TextInput
            placeholder="name"
            style={styles.inputStyle}
            onChangeText={text => setInputData({...inputData, fullname: text})}
            value={inputData.fullname}
            placeholderTextColor={'black'}
          />
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.contentContainer}>
        <ListItem.Content>
          <ListItem.Subtitle>Email</ListItem.Subtitle>

          <TextInput
            placeholder="email"
            style={styles.inputStyle}
            onChangeText={text => setInputData({...inputData, email: text})}
            value={inputData.email}
            placeholderTextColor={'black'}
          />
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.contentContainer}>
        <ListItem.Content>
          <ListItem.Subtitle>Date of Birth</ListItem.Subtitle>

          <TextInput
            placeholder="Date of Birth"
            style={styles.inputStyle}
            value={inputData.dob || moment(date).format('ll')}
            placeholderTextColor={'black'}
            onPressIn={() => setOpen(true)}
          />
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            mode="date"
            maximumDate={new Date('2022-12-31')}
          />
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.contentContainer}>
        <ListItem.Content>
          <ListItem.Subtitle>Phone no.</ListItem.Subtitle>
          <TextInput
            placeholder="Phone no."
            style={styles.inputStyle}
            onChangeText={text => setInputData({...inputData, phone: text})}
            value={inputData.phone}
            placeholderTextColor={'black'}
          />
        </ListItem.Content>
      </ListItem> */}
    </ScrollView>
  );
};

export default EditComp;

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    paddingHorizontal:15,
  },
  dateContainer:{
    flexDirection:'row',
    gap:15,
    alignItems: 'center',
    borderWidth:1,
    borderColor:'white',
    padding:15,
    width:'95%',
    alignSelf: 'center',
    borderRadius:5,
    marginBottom:'5%'
  }
});


//     height: height / 2.5




