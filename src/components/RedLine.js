import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RedLine = ({text="",fontSize=15}) => {
  return (
    <View style={{flexDirection: 'row', paddingVertical: 10,justifyContent:'center',alignItems:'center',alignSelf:'center',marginHorizontal:10}}>
      <View style={styles.redLine} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: 'red',
            fontSize: fontSize,
            fontWeight: '900',
            flexWrap: 'wrap',
            textAlign: 'center',
            textTransform:'uppercase'
          }}>
          {text}
        </Text>
      </View>
      <View style={styles.redLine} />
    </View>
  );
};

export default RedLine;

const styles = StyleSheet.create({
  redLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'red',
    margin: 10,
  },
});
