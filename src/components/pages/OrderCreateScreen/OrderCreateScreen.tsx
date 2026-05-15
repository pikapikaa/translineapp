import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { textStyles } from '../../theme/textStyles';
import { palette } from '../../theme/colors';

const OrdersScreen = () => {
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Text style={textStyles.text_24b}>Order Create Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: palette.BG,
  },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
