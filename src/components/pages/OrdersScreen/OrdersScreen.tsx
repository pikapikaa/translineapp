import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface OrdersScreenProps {}

const OrdersScreen = (props: OrdersScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>OrdersScreen</Text>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {},
});
