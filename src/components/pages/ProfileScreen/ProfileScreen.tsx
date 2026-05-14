import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { signOut } from '../../../store/slices/authSlice';
import { useAppDispatch } from '../../../store/hooks';

interface ProfileScreenProps {}

const ProfileScreen = (props: ProfileScreenProps) => {
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

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {},
});
