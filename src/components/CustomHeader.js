import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../constants/globalStyles';


const CustomHeader = ({route,navigation,onPress}) => {
    
  return (
    <View style={styles.headerContainer}>
       <TouchableOpacity style={styles.iconTextContainer} onPress={onPress? onPress:()=>navigation.goBack()}>
            <Ionicons name='return-up-back' color={'white'} size={25}/>
            <Text style={[globalStyles.text]}>Go Back</Text>
       </TouchableOpacity>
       {/* <View style={styles.headerTitleBox}>
            <Text style={[globalStyles.text,{fontSize:18}]}>Menu</Text>
       </View> */}
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    headerContainer:{
        backgroundColor:'black',
        gap:10,
        paddingHorizontal:10,
    },
    iconTextContainer:{
        flexDirection:'row',
        alignItems: 'center',
        margin:10,
        gap:10,
        alignSelf: 'flex-end',
    },
    headerTitleBox:{
        marginHorizontal:10,
        justifyContent: 'center',
        alignItems:'center'
    }
})