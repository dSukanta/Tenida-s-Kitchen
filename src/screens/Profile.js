import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';
import React, {useState} from 'react';
import {Button, ListItem} from '@rneui/base';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {height, width} = Dimensions.get('window');

const Landing = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const listItems = [
    {
      title: 'Settings & Personalization',
      icon: <MaterialIcons name="settings" size={30} color={'white'} />,
      onPress: () => handlenavigate('Settings'),
    },
    {
      title: 'Addresses',
      icon: <MaterialIcons name="add-home-work" size={30} color={'white'} />,
      onPress: () => handlenavigate('Addresses'),
    },
    {
      title: 'Help & Support',
      icon: <MaterialIcons name="support-agent" size={30} color={'white'} />,
      onPress: () => handlenavigate('Help'),
    },
    {
      title: 'Passwords',
      icon: <MaterialIcons name="fingerprint" size={30} color={'white'} />,
      onPress: () => handlenavigate('Passwords'),
    },
    // {
    //   title:'Video Engagement and Rewards',
    //   icon: <MaterialIcons name='videocam' size={30} color={'white'}/>,
    //   onPress:()=> handlenavigate('FoodReels')
    // },
    {
      title: 'Orders',
      icon: <Feather name="truck" size={30} color={'white'} />,
      onPress: () => handlenavigate('Orders'),
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
          <ListItem.Title style={[globalStyles.text]}>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* {!isLoggedIn && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
              marginHorizontal: 20,
            }}>
            <View>
              <Text>Your Account</Text>
              <Text>Login to manage your account.</Text>
            </View>
            <View>
              <Button
                title="Login"
                onPress={() => navigation.navigate('Auth')}
                // color={colors.red}
                buttonStyle={{paddingHorizontal: width / 9, borderRadius: 10}}
                containerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          </View>
          <View style={{margin: 20, marginTop: 30}}>
            <FlatList
              data={listItems}
              keyExtractor={index => index.toString()}
              renderItem={renderRow}
            />
          </View>
        </View>
      )}
      {isLoggedIn && (
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
              borderColor: 'red',
              paddingBottom: 10,
              marginHorizontal: '5%',
            }}>
            <Text
              style={{
                fontWeight: '900',
                color: 'red',
                fontSize: 18,
                flexWrap: 'wrap',
                marginHorizontal: 10,
              }}>
              {'User Name'}
            </Text>
            <Text>{'user@email'}</Text>
          </View>
          <View style={{margin: 20, marginTop: 30}}>
            <FlatList
              data={listItems}
              keyExtractor={index => index.toString()}
              renderItem={renderRow}
            />
          </View>
        </View>
      )} */}
      {!isLoggedIn ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 15,
            marginHorizontal: 20,
          }}>
          <View>
            <Text style={[globalStyles.text, {fontSize: 18}]}>Your Account</Text>
            <Text style={[globalStyles.text, {fontWeight: '400'}]}>Login to manage your account.</Text>
          </View>
          <View>
            <Button
              title="Login"
              onPress={() => navigation.navigate('Auth')}
              color={colors.red}
              buttonStyle={{paddingHorizontal: width / 9, borderRadius: 10}}
              containerStyle={{justifyContent: 'center', alignItems: 'center'}}
            />
          </View>
        </View>
      ) : (
        <View style={styles.headerContainer}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons name="person" size={25} />
            <Text style={[globalStyles.text, {fontSize: 18}]}>Sukanta</Text>
          </View>
          <TouchableOpacity>
        <MaterialIcons name="emoji-events" size={25} />
      </TouchableOpacity>
        </View>
      )}
      <View style={{margin: 20, marginTop: 30}}>
        <FlatList
          data={listItems}
          keyExtractor={index => index.toString()}
          renderItem={renderRow}
        />
      </View>
    </ScrollView>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: 'red',
    margin: 10,
  },
});
