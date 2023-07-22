import SafeContainer from '../components/safeContainer';
import {HomeStackParamList} from '../infrastructure/navigation/navTypes';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useWeeks} from '../infrastructure/hooks/useWeeks';
import {Week} from '../infrastructure/types/timeData';
import WeekListItem from '../components/weekListItem';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../utils/colors';
import {useContext, useEffect, useState} from 'react';
import {Modal} from 'react-native';
import NewWeekForm, {NewWeekFormData} from '../components/newWeekForm';
import {getWeeks, storeWeek} from '../services/storage/week';
import {useIsFocused} from '@react-navigation/native';
import {WeeksContext, WeeksContextType} from '../services/context/weekscontext';
import Loader from '../components/loader';

type HomeNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  'HomeStack'
>;

function HomeScreen({navigation}: HomeNavigationProps) {
  const {weeks, isLoadingWeeks, error, update} = useContext(
    WeeksContext,
  ) as WeeksContextType;

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const storeData = async (data: NewWeekFormData) => {
    console.log(data);
    const week = new Week(data);
    console.log(week);

    const success = await storeWeek(week);
    if (success) {
      setModalVisible(false);
      update([week, ...weeks]);
    }
  };

  const renderWeek = ({item}: {item: Week}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('WeekDetail', {
            week: item,
          })
        }>
        <WeekListItem key={item.slug} week={item} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeContainer>
        {isLoadingWeeks ? (
          <Loader />
        ) : (
          <View style={styles.weeksContainer}>
            <FlatList data={weeks} renderItem={renderWeek} />
            <TouchableOpacity onPress={showModal}>
              <Icon
                name={'plus-circle'}
                size={60}
                style={styles.plusIcon}
                color={colors.textPrimary}
              />
            </TouchableOpacity>
            <Modal visible={modalVisible} transparent={true}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.closeContainer}>
                    <Pressable onPress={hideModal} style={styles.pressable}>
                      <Text style={styles.buttonClose}>X</Text>
                    </Pressable>
                  </View>
                  <View style={styles.formContainer}>
                    <NewWeekForm onSubmit={data => storeData(data)} />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </SafeContainer>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  weeksContainer: {
    flex: 1,
    position: 'relative',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    width: '80%',
  },
  closeContainer: {
    position: 'absolute',
    top: 8,
    right: 10,
    zIndex: 99,
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: colors.textPrimary,
    borderRadius: 15,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 7,
    paddingRight: 7,
  },
  formContainer: {
    margin: 10,
  },
});
