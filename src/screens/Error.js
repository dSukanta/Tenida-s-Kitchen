import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from '@rneui/base';

const ErrorPage = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1.2),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleGoBack = () => {
    // Handle the "Go Back" action
    // You can navigate to a previous screen or perform any desired action
    // For now, we'll go back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.card, { transform: [{ scale: scaleValue }] }]}
      >
        <Icon name="error-outline" size={80} color="red" />
        <Text style={styles.errorMessage}>Payment Failed</Text>
        <Text style={styles.errorText}>
          If money was deducted from your account,
        </Text>
        <Text style={styles.errorText}>
          please wait for 24 hours or contact us.
        </Text>
        <Button
          title="Go Back & Retry"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonTitle}
          onPress={handleGoBack}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  card: {
    backgroundColor: 'white',
    width: '85%',
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'red',
    marginVertical: 10,
  },
  errorText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    marginVertical: 5,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  buttonTitle: {
    fontSize:15,
  },
});

export default ErrorPage;
