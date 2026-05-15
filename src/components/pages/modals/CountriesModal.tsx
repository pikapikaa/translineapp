import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import { TranslinePressable } from '../../atoms/Pressables';
import { palette } from '../../theme/colors';
import { textStyles } from '../../theme/textStyles';

interface CountriesModalProps {
  isVisible: boolean;
  onClose: (d: boolean) => void;
  onSelect: (item: any) => void;
}

export const COUNTRIES = [
  {
    id: '1',
    name: 'Казахстан',
    code: '+7',
    flag: '🇰🇿',
    placeholder: '(000) 000-00-00',
  },
  {
    id: '2',
    name: 'Монголия',
    code: '+7',
    flag: '🇲🇳',
    placeholder: '(000) 000-00-00',
  },
  {
    id: '3',
    name: 'Узбекистан',
    code: '+998',
    flag: '🇺🇿',
    placeholder: '(00) 000-00-00',
  },
];

const CountriesModal = ({
  isVisible,
  onClose,
  onSelect,
}: CountriesModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        onClose(!isVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={COUNTRIES}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Pressable
                style={styles.countryRow}
                onPress={() => {
                  onSelect(item);
                  onClose(!isVisible);
                }}
              >
                <Text style={styles.rowFlag}>{item.flag}</Text>
                <Text style={styles.rowName}>{item.name}</Text>
                <Text style={styles.rowCode}>{item.code}</Text>
              </Pressable>
            )}
          />

          <TranslinePressable
            onPress={() => onClose(!isVisible)}
            style={{
              backgroundColor: palette.blue,
            }}
          >
            <Text style={styles.buttonText}>Закрыть</Text>
          </TranslinePressable>
        </View>
      </View>
    </Modal>
  );
};

export default CountriesModal;

const styles = StyleSheet.create({
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  rowFlag: { fontSize: 20 },
  rowName: { ...textStyles.text_16l, flex: 1, fontSize: 16 },
  rowCode: { ...textStyles.text_16l, color: '#888' },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  list: { flexGrow: 0, marginBottom: 20 },
  listContent: { gap: 10 },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: { ...textStyles.text_16r, color: 'white' },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
