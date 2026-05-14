import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface NotificationsScreenProps {}

const NotificationsScreen = (props: NotificationsScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>NotificationsScreen</Text>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {},
});
