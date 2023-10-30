import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {globalStyles} from '../constants/globalStyles';

const Auth = ({navigation}) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const toggleBottomSheet = () => {
    setShowBottomSheet(!showBottomSheet);
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const handleLogin=async()=>{
    navigation.navigate('Main', { screen: 'Home' });
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={closeBottomSheet}>
      <Image
        source={require('../images/back_image.png')}
        style={styles.backgroundImage}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.loginTextContainer,{marginBottom:10}]}>
          <View style={styles.redLine} />
          <Text style={globalStyles.text}>Login or Sign Up</Text>
          <View style={styles.redLine} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <View style={[styles.loginTextContainer,{marginTop:10}]}>
          <View style={styles.redLine} />
          <Text style={globalStyles.text}>Or</Text>
          <View style={styles.redLine} />
        </View>

        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.icon} onPress={toggleBottomSheet}>
            <Image
              source={require('../images/google-icon.webp')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={toggleBottomSheet}>
            <Entypo
              name="dots-three-horizontal"
              size={35}
              color={'grey'}
              style={{backgroundColor: 'white', borderRadius: 35,padding:5}}
            />
          </TouchableOpacity>
        </View>
        {showBottomSheet && (
          <View style={styles.bottomSheet}>
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Entypo name="facebook-with-circle" size={20} color={'blue'} />
              <Text>Continue with facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Entypo name="mail" size={20} color={'grey'} />
              <Text>Continue with Email</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </TouchableOpacity>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
    position: 'absolute',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  continueButton: {
    width: '80%',
    height: 40,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '800',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    margin: 10,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'column',
  },
  bottomSheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
  loginTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'red',
    margin:10,
  },
});

export default Auth;
