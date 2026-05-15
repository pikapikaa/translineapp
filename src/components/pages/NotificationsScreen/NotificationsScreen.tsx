import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { textStyles } from '../../theme/textStyles';
import { palette } from '../../theme/colors';

const NotificationsScreen = () => {
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Text style={textStyles.text_24b}>NotificationsScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: palette.BG,
  },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
