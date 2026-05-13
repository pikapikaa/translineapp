import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import { useAppDispatch } from '../../../store/hooks';
import { signOut } from '../../../store/slices/authSlice';

interface MainScreenProps {}

const MainScreen = (props: MainScreenProps) => {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <Button
        title="logout"
        onPress={() => {
          dispatch(signOut());
        }}
      />
      <Text>MainScreen</Text>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
