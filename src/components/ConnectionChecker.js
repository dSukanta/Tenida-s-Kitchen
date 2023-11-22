// ConnectionChecker.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const ConnectionChecker = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    // Redirect to the offline screen or any other logic
    return (
      <View>
        <Text>You are offline. Please check your internet connection.</Text>
      </View>
    );
  }

  return <>{children}</>;
};

export default ConnectionChecker;
