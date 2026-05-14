import React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

import { textStyles } from '../theme/textStyles';

interface HeaderProps {
  title: string;
  onClose?: () => void;
  onPrevious?: () => void;
  style?: ViewStyle;
}

const Header = ({ title, onClose, onPrevious, style }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleContainer}>
        <Icon
          name="chevron-back"
          size={24}
          onPress={() => {
            onPrevious && onPrevious();
          }}
        />
        <Text style={textStyles.text_16m}>{title}</Text>
      </View>

      <Icon
        name="close"
        size={24}
        onPress={() => {
          onClose && onClose();
        }}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: { flexDirection: 'row', alignItems: 'center', gap: 25 },
});
