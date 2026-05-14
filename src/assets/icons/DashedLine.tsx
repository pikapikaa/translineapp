import React from 'react';
import Svg, { Line } from 'react-native-svg';

const DashedLine = ({ color = 'lightgray' }: { color?: string }) => (
  <Svg height="2" width="100%">
    <Line
      x1="0"
      y1="0"
      x2="100%"
      y2="0"
      stroke={color}
      strokeWidth="2"
      strokeDasharray="7, 4"
    />
  </Svg>
);

export default DashedLine;
