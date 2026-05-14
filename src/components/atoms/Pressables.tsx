import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type View,
} from 'react-native';
import { useLinkProps } from '@react-navigation/native';

import { palette } from '../theme/colors';

type TranslineButtonProps = Parameters<typeof useLinkProps>[0] & {
  children: React.ReactNode;
};
type TTranslinePressable = PressableProps & React.RefAttributes<View>;

export const TranslinePressable = ({ ...props }: TTranslinePressable) => {
  return (
    <Pressable {...props} style={[styles.container, { ...props.style }]}>
      {props.children}
    </Pressable>
  );
};

export const TranslineLink = ({
  screen,
  params,
  action,
  href,
  children,
  ...rest
}: TranslineButtonProps) => {
  const linkProps = useLinkProps({ screen, params, action, href });
  return (
    <Pressable {...linkProps} {...rest}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: palette.blue,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Geologica-Light',
  },
});
