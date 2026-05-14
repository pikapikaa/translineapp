import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';

import { signOut } from '../../../store/slices/authSlice';
import { useAppDispatch } from '../../../store/hooks';
import { textStyles } from '../../theme/textStyles';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.header}>
        <Text style={textStyles.text_24bold}>Profile</Text>
        <Pressable
          onPress={() => {
            dispatch(signOut());
          }}
          style={styles.exitButton}
        >
          <Ionicons
            name="log-out-outline"
            size={30}
            color="black"
            style={styles.icon}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {},
  header: { alignItems: 'center' },
  exitButton: { position: 'absolute', top: 0, right: 0 },
  icon: { marginRight: 10 },
});
