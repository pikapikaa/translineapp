import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

interface Registration_Step_1Props {}

const Registration_Step_2 = (props: Registration_Step_1Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Registration_Step_2</Text>
      <Button
        title="next2"
        onPress={() => navigation.navigate('Registration_Step3')}
      />
    </View>
  );
};

export default Registration_Step_2;

const styles = StyleSheet.create({
  container: {},
});
