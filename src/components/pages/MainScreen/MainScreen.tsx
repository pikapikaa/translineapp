import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { palette } from '../../theme/colors';
import { textStyles } from '../../theme/textStyles';
import FastImage from 'react-native-fast-image';
import MainTile from '../../molecules/MainTile';
import Spacing from '../../atoms/Spacing';
import OrderCard from '../../molecules/OrderCard';

const images = [
  'https://thumbs.dreamstime.com/b/shop-window-sale-sign-shopping-mall-shop-window-sale-sign-shopping-mall-135775850.jpg',
  'https://thumbs.dreamstime.com/b/shop-window-sale-sign-shopping-mall-shop-window-sale-sign-shopping-mall-135775850.jpg',
  'https://thumbs.dreamstime.com/b/shop-window-sale-sign-shopping-mall-shop-window-sale-sign-shopping-mall-135775850.jpg',
];

const MainScreen = () => {
  const { top } = useSafeAreaInsets();

  const renderItem = ({ item }) => {
    return (
      <Pressable
        //  onPress={() => onItemPress?.(item)}
        style={styles.imageWrapper}
      >
        <FastImage
          source={{ uri: item }}
          style={styles.image}
          resizeMode="cover"
        />
      </Pressable>
    );
  };

  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={{ paddingTop: top }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>IP Fenix</Text>
          <View style={styles.rightHeader}>
            <Text style={styles.headerText}>KAZ</Text>
            <Ionicons name="headset-outline" size={24} color="white" />
          </View>
        </View>

        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal={true}
          contentContainerStyle={styles.listContent}
          style={styles.list}
          showsHorizontalScrollIndicator={false}
        />

        <Spacing height={16} />

        <View style={styles.tiles}>
          <View style={styles.tilesRow}>
            <MainTile title="Заказы" icon="documents-outline" />
            <MainTile title="Пользователи" icon="people-outline" />
            <MainTile title="Моя компания" icon="briefcase-outline" />
          </View>
          <View style={styles.tilesRow}>
            <MainTile title="Страхование" icon="shield-outline" />
            <MainTile title="Кредит" icon="card-outline" />
            <MainTile title="Мониторинг" icon="location-outline" />
          </View>
        </View>

        <Spacing height={24} />

        <View style={styles.ordersContainer}>
          <View style={styles.ordersHeader}>
            <Text style={styles.ordersTitle}>Активные заказы</Text>
          </View>

          <View style={styles.orderList}>
            <OrderCard />
            <OrderCard />
          </View>
        </View>

        <View />
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.blue,
  },
  scrollContainer: {
    height: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 19,
  },
  rightHeader: { flexDirection: 'row', alignItems: 'center', gap: 27 },
  headerText: { ...textStyles.text_16m, color: 'white' },
  imageWrapper: {
    width: 226,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  listContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  list: {
    flexGrow: 0,
    height: 100,
  },
  tiles: { alignItems: 'center', justifyContent: 'center', gap: 10 },
  tilesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  ordersContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 16,
  },
  ordersHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  ordersTitle: { ...textStyles.text_16b, color: 'rgba(0, 0, 0, 1)' },
  orderList: { paddingHorizontal: 16, gap: 16 },
});
