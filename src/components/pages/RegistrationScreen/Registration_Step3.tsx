import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

interface Registration_Step_3Props {}

const Registration_Step_3 = (props: Registration_Step_3Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Registration_Step_3</Text>
      <Button
        title="next2"
        onPress={() => navigation.navigate('Registration_Step4')}
      />
    </View>
  );
};

export default Registration_Step_3;

const styles = StyleSheet.create({
  container: {},
});
