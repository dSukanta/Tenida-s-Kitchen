import { StyleSheet, Text, View,} from 'react-native'
import React from 'react'
import { Button } from '@rneui/base'

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Home</Text>
      <Button title='Login/Signup' onPress={()=> navigation.navigate('Auth')} color={'red'}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({

})