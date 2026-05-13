import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface RegistrationScreenProps {}

const RegistrationScreen = (props: RegistrationScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>RegistrationScreen</Text>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {},
});
