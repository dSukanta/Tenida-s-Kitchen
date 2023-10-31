import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../constants/globalStyles'

const Help = () => {
  return (
    <View>
      <Text style={[globalStyles.text,{color:'black'}]}>Help</Text>
    </View>
  )
}

export default Help

const styles = StyleSheet.create({})