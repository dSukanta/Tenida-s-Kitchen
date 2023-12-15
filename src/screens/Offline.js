import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles } from '../constants/globalStyles';

const Offline = () => {
  return (
    <View style={globalStyles.container}>
      <View style={styles.innercontainer}>
      <MaterialCommunityIcons name='access-point-network-off' color={'red'} size={55}/>
      <View style={{alignItems:'center', padding:10,paddingVertical:20}}>
      <Text style={globalStyles.text}>You are currently offline.</Text>
      <Text style={globalStyles.text}>Check your internet connection and try again.</Text>
      </View>
      </View>
    </View>
  )
}

export default Offline;

const styles = StyleSheet.create({
  innercontainer:{
    flex:1,
    width:'95%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})