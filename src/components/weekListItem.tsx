import {Week} from '../infrastructure/types/timeData';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import WeekListDay from './weekListDay';
import {colors} from '../utils/colors';
import Card from './card';
import {
  CalcHourDifference,
  CalcTotalHours,
  GetFormattedDateString,
} from '../services/functions/timeFunctions';
import {getWeeks, removeWeek} from '../services/storage/week';
import {useContext, useState} from 'react';
import SubmitButton from './submitButton';
import {WeeksContext, WeeksContextType} from '../services/context/weekscontext';

function WeekListItem({week}: {week: Week}) {
  const {weeks, isLoadingWeeks, updateWeeksContext} = useContext(
    WeeksContext,
  ) as WeeksContextType;
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const handleRemoveWeek = async (week: Week) => {
    const success = await removeWeek(week);
    if (success) {
      setModalVisible(false);
      await updateWeeksContext(await getWeeks());
    }
  };

  return (
    <>
      <Card key={week.slug}>
        <Pressable onPress={showModal} style={styles.pressable}>
          <Text style={styles.buttonClose}>X</Text>
        </Pressable>
        <View style={styles.listHeaderContainer}>
          <Text>Week: {week.weekNr}</Text>
          <Text>
            From: {GetFormattedDateString(week.startDate)} - Till:{' '}
            {GetFormattedDateString(week.endDate)}
          </Text>
        </View>
        <View style={styles.listDaysContainer}>
          {week.days?.length > 0 &&
            week.days.map(day => (
              <WeekListDay
                key={day.day}
                day={day.day[0]}
                hours={CalcHourDifference(day.startTime, day.endTime)}
              />
            ))}
          <WeekListDay day={'Total'} hours={CalcTotalHours(week)} />
        </View>
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.closeContainer}>
                <Pressable onPress={hideModal}>
                  <Text style={styles.buttonClose}>X</Text>
                </Pressable>
              </View>
              <Text style={styles.modalText}>
                Are you sure you want to delete week {week.weekNr}?
              </Text>
              <SubmitButton
                text={'Delete'}
                onPress={() => handleRemoveWeek(week)}
                style={styles.deleteButton}
              />
            </View>
          </View>
        </Modal>
      </Card>
    </>
  );
}

export default WeekListItem;

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    borderRadius: 15,
    marginBottom: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.tertiary,
    position: 'relative',
  },
  boxShadow: {
    shadowColor: 'rgba(0,0,0)',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  listHeaderContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  listDaysContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  modalText: {
    margin: 15,
  },
  pressable: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
    right: 5,
    zIndex: 99,
  },
  deleteButton: {
    backgroundColor: 'red',
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
});
