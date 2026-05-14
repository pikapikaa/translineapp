import React from 'react';
import { View, DimensionValue } from 'react-native';

interface SpacingProps {
  height?: DimensionValue;
  width?: DimensionValue;
}

const Spacing = ({ width = '100%', height = 0 }: SpacingProps) => {
  return <View style={{ width, height }} />;
};

export default Spacing;
