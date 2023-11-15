import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Settings = () => {
  return (
    <View>
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
        </View>
    </View>
  )
}

export default Settings

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
