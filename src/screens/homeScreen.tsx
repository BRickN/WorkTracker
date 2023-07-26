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
import {Week} from '../infrastructure/types/timeData';
import WeekListItem from '../components/weekListItem';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../utils/colors';
import {useContext, useState} from 'react';
import {Modal} from 'react-native';
import NewWeekForm, {NewWeekFormData} from '../components/newWeekForm';
import {getWeekBySlug, storeWeek} from '../services/storage/week';
import {WeeksContext, WeeksContextType} from '../services/context/weekscontext';
import Loader from '../components/loader';

type HomeNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  'HomeStack'
>;

function HomeScreen({navigation}: HomeNavigationProps) {
  const {weeks, isLoadingWeeks, updateWeeksContext} = useContext(
    WeeksContext,
  ) as WeeksContextType;

  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState('');

  const showModal = () => setModalVisible(true);
  const hideModal = () => {
    setErrorText('');
    setModalVisible(false);
  };

  const storeData = async (data: NewWeekFormData) => {
    const week = new Week(data);

    const existingWeek = await getWeekBySlug(week.slug);
    if (existingWeek) {
      setErrorText(`Week ${week.weekNr} already exists!`);
    } else {
      const success = await storeWeek(week);
      if (success) {
        hideModal();
        updateWeeksContext([week, ...weeks]);
      }
    }
  };

  const renderWeek = ({item}: {item: Week}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('WeekDetail', {
              weekSlug: item.slug,
            })
          }>
          <WeekListItem key={item.slug} week={item} />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <SafeContainer style={{paddingTop: 10}}>
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
                    <NewWeekForm
                      onSubmit={data => storeData(data)}
                      errorMessage={errorText}
                    />
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
