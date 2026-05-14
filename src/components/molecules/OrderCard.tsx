import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import { textStyles } from '../theme/textStyles';
import { palette } from '../theme/colors';

const OrderCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.orderNumber}>№18900</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Поиск перевозчика</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dotsButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title}>Металл конструкция</Text>
      <Text style={styles.parameters}>0,004 т • 40 м³</Text>

      {/* Цена */}
      <Text style={styles.price}>700 000 ₸</Text>

      <View style={styles.routeContainer}>
        <View style={styles.timelineVisual}>
          <Ionicons name="radio-button-on" size={16} color={palette.BLUE_500} />

          <View style={styles.line} />
          <Ionicons
            name="radio-button-on"
            size={16}
            color={palette.GREEN_500}
          />
        </View>

        <View style={styles.routeDetails}>
          <View style={styles.routePoint}>
            <Text style={styles.address}>
              Астана, Проспект Богенбай батыр 48Б
            </Text>
            <Text style={styles.dateTime}>14.09.25 | 10:00</Text>
          </View>

          <View style={[styles.routePoint, { marginTop: 12 }]}>
            <Text style={styles.address}>г. Караганда, просп. Женис, 61</Text>
            <Text style={styles.dateTime}>15.09.25 | 18:00</Text>
          </View>
        </View>
      </View>

      <Text style={styles.offersCount}>8 предложений</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: palette.GRAY_200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderNumber: {
    ...textStyles.text_16r,
    color: palette.GRAY_800,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: palette.BLUE_500,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 12,
    backgroundColor: palette.BLUE_50,
  },
  buttonText: {
    ...textStyles.text_12l,
    color: palette.BLUE_500,
  },
  dotsButton: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 16,
    paddingHorizontal: 4,
  },
  dot: {
    width: 3.5,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: palette.GRAY_800,
  },
  title: {
    ...textStyles.text_20s,
    marginBottom: 4,
  },
  parameters: {
    ...textStyles.text_12l,
    color: palette.GRAY_500,
    marginBottom: 16,
  },
  price: {
    ...textStyles.text_16m,
    color: palette.blue,
    marginBottom: 20,
  },
  routeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineVisual: {
    alignItems: 'center',
    marginRight: 12,
    paddingVertical: 4,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  blueCircle: {
    borderColor: '#3B82F6',
  },
  greenCircle: {
    borderColor: '#10B981',
  },
  innerCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  line: {
    width: 1,
    flex: 1,
    backgroundColor: palette.GRAY_200,
    borderStyle: 'dashed',
    marginVertical: 4,
  },
  routeDetails: {
    flex: 1,
  },
  routePoint: {
    justifyContent: 'center',
  },
  address: {
    ...textStyles.text_14l,
    color: palette.GRAY_800,
    marginBottom: 2,
  },
  dateTime: {
    ...textStyles.text_12l,
    color: palette.GRAY_500,
  },
  offersCount: {
    ...textStyles.text_14l,
    color: palette.GRAY_800,
  },
});

export default OrderCard;
