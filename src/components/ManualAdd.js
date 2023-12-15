import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, { useContext, useState } from 'react';
import {Button} from '@rneui/base';
import colors from '../constants/colors';
import {Input} from '@rneui/themed';
import RedLine from './RedLine';
import { Alert } from 'react-native';
import { globalStyles } from '../constants/globalStyles';
import { clientRequest, serverRequest } from '../utils/ApiRequests';
import { Appcontext } from '../context/AppContext';
import { getFromStorage } from '../utils/Helper';

const ManualAdd = ({manualVisible, setManualvisible}) => {
  const [userInput,setUserInput] = useState({
    phone:'',
    city:'',
    state:'',
    pincode:'',
    landmark:'',
  });

  const {userData,getAddress}= useContext(Appcontext);
  const [loading,setLoading]= useState(false);




  const handleSubmit= async()=>{
    const nameRegex = /^[a-zA-Z\s]+$/;
    const numberRegex = /^\d+$/;

    if(!numberRegex.test(userInput.phone) ){
      return Alert.alert('Phone Number Required','Please enter a valid phone number')
    };
    if(!userInput.city){
      return Alert.alert('City required','Please enter a valid city')
    };
    if(!userInput.landmark){
      return Alert.alert('Landmark required','Please enter a valid landmark')
    };
    if(!nameRegex.test(userInput.state)){
      return Alert.alert('State required','Please enter a valid state')
    };
    if(!numberRegex.test(userInput.pincode)){
      return Alert.alert('Pin code required','Please enter a valid pincode')
    }; 
    setLoading(true);
    const devideId= await getFromStorage('deviceId');
    const AddaddressRes= await serverRequest('api/v1/private/address','POST',userInput,{deviceid: devideId,devicename: 'Android',userid:userData[0]?._id || null});
    if(AddaddressRes?.success){
      setManualvisible(false);
      await getAddress();
      Alert.alert('Success',AddaddressRes?.message);
    }else{
        Alert.alert('Error!',AddaddressRes?.message || 'Unable to add address, try again later')
    }
    setLoading(false);
  }


  return (
    <View style={globalStyles.container}>
      <View>
        <RedLine text='Add New Address'/>
      </View>
      <ScrollView>
      <View style={{width:'90%',alignSelf:'center',justifyContent:'center',marginTop:20}}>
        {/* <Input
          placeholder="Enter your name"
          leftIcon={{ type: 'antdesign', name: 'user',color:'white', }}
          // style={[styles.inputStyle]}
          inputContainerStyle={styles.inputContainerStyle}
          onChangeText={(text)=>setUserInput({...userInput,name:text})}
          inputStyle={{color:'white'}}
        /> */}
        
        <Input
          placeholder="Enter your nearest landmark"
          leftIcon={{ type: 'entypo', name: 'location-pin',color:'white', }}
           inputContainerStyle={styles.inputContainerStyle}
           inputStyle={{color:'white'}}
           onChangeText={(text)=>setUserInput({...userInput,landmark:text})}
        />
        <Input
          placeholder="Enter your city"
          leftIcon={{ type: 'material-icons', name: 'location-city',color:'white', }}
           inputContainerStyle={styles.inputContainerStyle}
           inputStyle={{color:'white'}}
           onChangeText={(text)=>setUserInput({...userInput,city:text})}
        />
        <Input
          placeholder="Enter your state"
          leftIcon={{ type: 'foundation', name: 'map',color:'white', }}
           inputContainerStyle={styles.inputContainerStyle}
           inputStyle={{color:'white'}}
           onChangeText={(text)=>setUserInput({...userInput,state:text})}
        />
        <Input
          placeholder="Enter your pincode"
          keyboardType='phone-pad'
          leftIcon={{ type: 'entypo', name: 'location-pin',color:'white', }}
           inputContainerStyle={styles.inputContainerStyle}
           inputStyle={{color:'white'}}
           onChangeText={(text)=>setUserInput({...userInput,pincode:text})}
        />
        <Input
          placeholder="Enter your phone number"
          keyboardType='phone-pad'
          leftIcon={{ type: 'material-icons', name: 'phone-iphone',color:'white', }}
           inputContainerStyle={styles.inputContainerStyle}
           inputStyle={{color:'white'}}
           onChangeText={(text)=>setUserInput({...userInput,phone:text})}
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
        loading={loading}
        disabled={loading}
        disabledStyle={{backgroundColor: colors.disabledRed}}
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
    borderColor: colors.red,
    paddingHorizontal:10
  },
});
