import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';

const withConnection = WrappedComponent => {
  const EnhancedComponent = props => {
    const navigation = useNavigation();
    const [isConnected, setIsConnected] = useState(true);

    console.log(isConnected,'connected');
    
    useEffect(() => {
      NetInfo.fetch().then(state => {
        setIsConnected(state.isConnected);
      });
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
      });

      // Unsubscribe
      return () => {
        unsubscribe();
      };
    }, []);

    if(!isConnected){
        return  navigation.reset({
          index: 0,
          routes: [{name: 'Offline'}],
        });
    }

    return (
      <View style={styles.container}>
        {isConnected && <WrappedComponent {...props} />}
      </View>
    );
  };

  return EnhancedComponent;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
});

export default withConnection;
