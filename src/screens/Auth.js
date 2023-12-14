import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {globalStyles} from '../constants/globalStyles';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {Appcontext} from '../context/AppContext';
import {getFromStorage, saveToStorage} from '../utils/Helper';
import {serverRequest} from '../utils/ApiRequests';

const Auth = ({route,navigation}) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const {setUserData, Logout} = useContext(Appcontext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleBottomSheet = () => {
    setShowBottomSheet(!showBottomSheet);
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false);
  };

  // console.log(route?.params,'params')

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {user} = await GoogleSignin.signIn();
      const deviceid = await getFromStorage('deviceId');

      // console.log(user,deviceid,'g-user');
      if (user && deviceid) {
        const manageUser = await serverRequest(
          'api/v1/userauth/register',
          'POST',
          {
            email: user?.email,
            fullname: user?.name,
            profile_picture: user?.photo,
            deviceId: deviceid,
          },
          {
            loginmethod: 'email',
            uid: user?.id,
            deviceid: deviceid,
            devicename: 'Android',
          },
        );
        // console.log(manageUser,'user')
        await saveToStorage('user', [manageUser?.data]);
        await saveToStorage('token', manageUser?.data?._id);
        setUserData([manageUser]);
        // const {source}= await route?.params?.source
        // console.log(source,'source');
        // if(source){
        //   console.log('if running....');
        //   await navigation.reset({
        //     index: 0,
        //     routes: [{name: 'Main', screen: source}],
        //   });
        // }else{
        //   console.log('else running....');
        //   await navigation.reset({
        //     index: 0,
        //     routes: [{name: 'Main', screen: 'Home'}],
        //   });
        // }
        navigation.reset({
          index: 0,
          routes: [{name: 'Main', screen: 'Home'}],
        });
      } else {
        Alert.alert('INVALID', 'Invalid user or device');
        await Logout();
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'Sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Wait', 'Sign in already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Unavilable', 'Google Play Services is not available');
      } else {
        Alert.alert('Error: ', error);
      }
    }
  };

  const extractErrorMessage = (error) => {
    // Use a regular expression to remove the error code from the message
    const regex = /\[.*\] (.*)/;
    const match = regex.exec(error.message);
    return match ? match[1] : error.message;
  };

  const phoneAuth = async () => {
    setLoading(true);
    // console.log(`+91${phoneNumber}`,'phoneAuth');
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`);
      // console.log(confirmation,'cnf');
      setConfirm(confirmation);
      Alert.alert('Success!', 'Confirmation code sent to your phone.');
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      Alert.alert('Error!',errorMessage)
      // Alert.alert('Error!', 'Error sending code');
      console.error('Error sending code:', error);
    }
    setLoading(false);
  };

  const confirmCode = async () => {
    setLoading(true);
    try {
      const confirmRes = await confirm.confirm(confirmationCode);
      // console.log(confirmRes,'phone confirmation response');
      const deviceid = await getFromStorage('deviceId');

      if (confirmRes?.user?.phoneNumber) {
        // console.log(confirmRes?.user?.phoneNumber,'phone number');

        try {
          const manageUser = await serverRequest(
            'api/v1/userauth/register',
            'POST',
            {phone: confirmRes?.user?.phoneNumber?.split("+91")[1]},
            {
              loginmethod: 'phone',
              deviceid: deviceid,
              devicename: 'Android',
            },
          );
          await saveToStorage('user', [manageUser?.data]);
          await saveToStorage('token', manageUser?.data?._id);
          setUserData([manageUser]);
          navigation.reset({
            index: 0,
            routes: [{name: 'Main', screen: 'Home'}],
          });
          // console.log(manageUser,'ph user');
          Alert.alert('Success', 'Phone number confirmed and logged in successfully!');
        } catch (error) {
          Alert.alert('Error!',error?.message||'Internal Error');
        }
      }
    } catch (err) {
      console.log(err, 'err');
      const errorMessage = extractErrorMessage(err);
      Alert.alert('Error!',errorMessage)
    }
    setLoading(false);
  };

  // const phoneAuthR = async () => {
  //   const deviceid = await getFromStorage('deviceId');
  //   console.log(deviceid,'deviceId');
  //   try {
  //     const manageUser = await makeRequest(
  //       'api/v1/userauth/register',
  //       'POST',
  //       {phone: '7872528238'},
  //       {
  //         loginmethod: 'phone',
  //         deviceid: deviceid,
  //         devicename: 'Android',
  //       },
  //     );
  //     console.log(manageUser, 'manage');
  //   } catch (err) {
  //     console.log(err.response.data.message, 'err');
  //   }
  // };

  // console.log(phoneNumber,confirmationCode,'input')

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
        <View style={[styles.loginTextContainer, {marginBottom: 10}]}>
          <View style={styles.redLine} />
          <Text style={globalStyles.text}>Login or Sign Up</Text>
          <View style={styles.redLine} />
        </View>

        {!confirm ? (
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            keyboardType="numeric"
            onChangeText={setPhoneNumber}
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit code"
            keyboardType="numeric"
            onChangeText={setConfirmationCode}
          />
        )}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={!confirm ? phoneAuth : confirmCode}
          // onPress={phoneAuthR}
        >
          {!loading ? (
            <Text style={styles.continueButtonText}>
              {confirm ? 'Verify' : 'Continue'}
            </Text>
          ) : (
            <ActivityIndicator size={'small'} color={'white'} />
          )}
        </TouchableOpacity>

        <View style={[styles.loginTextContainer, {marginTop: 10}]}>
          <View style={styles.redLine} />
          <Text style={globalStyles.text}>Or</Text>
          <View style={styles.redLine} />
        </View>

        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.icon} onPress={signInWithGoogle}>
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
              style={{backgroundColor: 'white', borderRadius: 35, padding: 5}}
            />
          </TouchableOpacity>
        </View>
        {showBottomSheet && (
          <View style={styles.bottomSheet}>
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Entypo name="facebook-with-circle" size={20} color={'blue'} />
              <Text>Continue with facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomSheetItem}
              // onPress={handleLogin}
              >
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
    color: 'black',
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
    margin: 10,
  },
});

export default Auth;
