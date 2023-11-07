import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../constants/globalStyles'

const Addresses = () => {
  return (
    <View>
      <Text style={[globalStyles.text,{color:'black'}]}>Addresses</Text>
    </View>
  )
}

export default Addresses

const styles = StyleSheet.create({})