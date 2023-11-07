import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, { useState } from 'react';
import {Button} from '@rneui/base';
import colors from '../constants/colors';
import {Input} from '@rneui/themed';
import RedLine from './RedLine';
import { Alert } from 'react-native';

const ManualAdd = ({manualVisible, setManualvisible}) => {
  const [userInput,setUserInput] = useState({
    name:'',
    phone_no:'',
    city:'',
    state:'',
    pincode:'',
    landmark:'',
  });

  const handleSubmit= ()=>{
    if(!userInput.name){
      return Alert.alert('Name required','Please enter your name')
    };
    if(!userInput.phone_no){
      return Alert.alert('Phone Number Required','Please enter your phone number')
    };
    if(!userInput.city){
      return Alert.alert('City required','Please enter your city')
    };
    if(!userInput.landmark){
      return Alert.alert('Landmark required','Please enter your landmark')
    };
    if(!userInput.state){
      return Alert.alert('State required','Please enter your state')
    };
    if(!userInput.pincode){
      return Alert.alert('Pin code required','Please enter your pincode')
    };
    console.log(userInput);
  }


  return (
    <View style={styles.container}>
      <View>
        <RedLine text='Add New Address'/>
      </View>
      <ScrollView>
      <View style={{width:'90%',alignSelf:'center',justifyContent:'center'}}>
        <Input
          placeholder="Enter your name"
          leftIcon={{ type: 'antdesign', name: 'user' }}
          // style={[styles.inputStyle]}
          inputContainerStyle={styles.inputContainerStyle}
          onChangeText={(text)=>setUserInput({...userInput,name:text})}
        />
        <Input
          placeholder="Enter your phone number"
          keyboardType='phone-pad'
          leftIcon={{ type: 'font-awesome', name: 'mobile-phone' }}
           inputContainerStyle={styles.inputContainerStyle}
           onChangeText={(text)=>setUserInput({...userInput,phone_no:text})}
        />
        <Input
          placeholder="Enter your nearest landmark"
          leftIcon={{ type: 'entypo', name: 'location-pin' }}
           inputContainerStyle={styles.inputContainerStyle}
           onChangeText={(text)=>setUserInput({...userInput,landmark:text})}
        />
        <Input
          placeholder="Enter your city"
          leftIcon={{ type: 'material-icons', name: 'location-city' }}
           inputContainerStyle={styles.inputContainerStyle}
           onChangeText={(text)=>setUserInput({...userInput,city:text})}
        />
        <Input
          placeholder="Enter your state"
          leftIcon={{ type: 'foundation', name: 'map' }}
           inputContainerStyle={styles.inputContainerStyle}
           onChangeText={(text)=>setUserInput({...userInput,state:text})}
        />
        <Input
          placeholder="Enter your pincode"
          keyboardType='phone-pad'
          leftIcon={{ type: 'entypo', name: 'location-pin' }}
           inputContainerStyle={styles.inputContainerStyle}
           onChangeText={(text)=>setUserInput({...userInput,pincode:text})}
        />
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',width:'85%',alignSelf:'center'}}>
      <Button
        title={'Cancel '}
        containerStyle={{width: '45%', alignSelf: 'red'}}
        buttonStyle={{
          paddingVertical: 10,
          backgroundColor: colors.red,
          borderRadius: 10,
        }}
        onPress={() => setManualvisible(false)}
      />
      <Button
        title={'+ Add '}
        containerStyle={{width: '45%', alignSelf: 'red'}}
        buttonStyle={{
          paddingVertical: 10,
          backgroundColor: colors.red,
          borderRadius: 10,
        }}
        onPress={handleSubmit}
      />
      </View>
      </ScrollView>
    </View>
  );
};

export default ManualAdd;

const styles = StyleSheet.create({
  container:{
    flex:1,
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
  inputContainerStyle:{
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    paddingHorizontal:10
  },
});
