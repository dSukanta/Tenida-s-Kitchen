import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import {ListItem} from '@rneui/base';
import RedLine from '../components/RedLine';
  
  const Rewards = () => {
    const rewardHistory = [
      {
        id: 1,
        type: 'credit',
        point: 15,
        description: 'point for view on 1st Video',
      },
      {
        id: 2,
        type: 'debit',
        point: 15,
        description: 'Expire points',
      },
      {
        id: 3,
        type: 'credit',
        point: 20,
        description: 'point for view on 2nd Video',
      },   
    ];
  
    const calculateRemainingPoints = () => {
      let remainingPoints = {credit: 0, debit: 0};
  
      rewardHistory.forEach(item => {
        if (item.type === 'credit') {
          remainingPoints.credit += item.point;
        } else if (item.type === 'debit') {
          remainingPoints.debit += item.point;
        }
      });
  
      return remainingPoints.credit - remainingPoints.debit;
    };
  
    return (
      <View style={styles.container}>
        <View>
          <RedLine text='Reward Points' fontSize={13}/>
        </View>
        <ImageBackground
          source={require('../images/reward_point.png')}
          style={styles.cardContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{'You have own'}</Text>
            <Text style={[styles.text, {fontSize: 18}]}>
              {calculateRemainingPoints()} reward points
            </Text>
          </View>
        </ImageBackground>
        <View>
          <Text style={[styles.text, {padding: 10}]}>Reward Points History</Text>
        </View>
        <ScrollView>
          {rewardHistory.map(
            (history, i) => (
              <ListItem bottomDivider key={i} containerStyle={{width:'95%',alignSelf:'center'}}>
                <ListItem.Content>
                  <ListItem.Title>{history.description}</ListItem.Title>
                </ListItem.Content>
                <Text
                  style={[
                    styles.text,
                    {color: history.type === 'debit' ? 'red' : 'green'},
                  ]}>{`${history.type === 'debit' ? '-' : '+'} ${
                  history.point
                }`}</Text>
              </ListItem>
            ),
            //  <View style={styles.historyCard} key={i}>
            //   <Text style={[styles.text,{color:'black'}]}>{history.description}</Text>
            //   <Text style={[styles.text,{color:history.type==='debit'?'red':'green'}]}>{`${history.type==='debit'?'-':'+'} ${history.point}`}</Text>
            //  </View>
          )}
        </ScrollView>
      </View>
    );
  };
  
  export default Rewards;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    text: {
      fontSize: 15,
      color: 'white',
      fontWeight: '500',
    },
    cardContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      overflow: 'hidden',
      margin: 10,
      height: 150, // Set your preferred height
    },
    textContainer: {
      padding: 10,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });