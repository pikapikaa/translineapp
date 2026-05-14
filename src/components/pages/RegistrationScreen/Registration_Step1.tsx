import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { palette } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';

interface Registration_Step_1Props {}

const Registration_Step_1 = (props: Registration_Step_1Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>ыыыыы</Text>
      <Button
        title="next"
        onPress={() => navigation.navigate('Registration_Step2')}
      />
    </View>
  );
};

export default Registration_Step_1;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.BG },
});
