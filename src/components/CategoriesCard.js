import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { Card } from '@rneui/base';
import { globalStyles } from '../constants/globalStyles';

const {height, width} = Dimensions.get('window');


const CategoriesCard = ({data,navigation,index}) => {
  return (
    <View style={styles.cardPair}>
      <TouchableOpacity onPress={()=>navigation.navigate('Menu',{index})}>
        <Card containerStyle={styles.card}>
          <Card.Image
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 10,
            }}
            source={data?.image}
          />

          <View style={{position: 'absolute', left: '20%', top:5}}>
            <Text
              style={[globalStyles.text]}>
              {data?.category}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default CategoriesCard;

const styles = StyleSheet.create({
    cardPair: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems: 'center',
        // gap:15
      },
      card: {
        width: width / 2.2,
        height: 150,
        padding: 0,
        margin: 5,
        position: 'relative',
        borderRadius: 10,
      },
});
