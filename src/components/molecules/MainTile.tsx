import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { palette } from '../theme/colors';
import { textStyles } from '../theme/textStyles';

interface MainTileProps {
  title: string;
  icon: string;
}

const MainTile = ({ title, icon }: MainTileProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={36} color={palette.blue} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default MainTile;

const styles = StyleSheet.create({
  container: {
    width: 109,
    aspectRatio: 109 / 97,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    ...textStyles.text_14l,
    color: palette.GRAY_800,
  },
});
