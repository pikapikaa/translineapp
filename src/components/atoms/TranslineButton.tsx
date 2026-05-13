import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { useLinkProps } from '@react-navigation/native';
import { palette } from '../theme/colors';

type TranslineButtonProps = Parameters<typeof useLinkProps>[0] & {
  children: React.ReactNode;
};

const TranslineButton = ({
  screen,
  params,
  action,
  href,
  children,
  ...rest
}: TranslineButtonProps) => {
  const linkProps = useLinkProps({ screen, params, action, href });
  return (
    <Pressable {...linkProps} {...rest} style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default TranslineButton;

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
