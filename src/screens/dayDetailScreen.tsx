import {StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {HomeStackParamList} from '../infrastructure/navigation/navTypes';
import SafeContainer from '../components/safeContainer';
import {useContext, useEffect, useState} from 'react';
import {GetFormattedTimeFromDate} from '../services/functions/timeFunctions';
import {colors} from '../utils/colors';
import {Button} from 'react-native-paper';
import Spacer from '../components/spacer';
import TimePicker from '../components/timePicker';
import HeaderText from '../components/headerText';
import SubmitButton from '../components/submitButton';
import navigation from '../infrastructure/navigation';
import {getWeeks, updateWeek} from '../services/storage/week';
import {WeeksContext, WeeksContextType} from '../services/context/weekscontext';
import {Day, Week} from '../infrastructure/types/timeData';

type DayDetailNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  'DayDetail'
>;

function DayDetailScreen({navigation, route}: DayDetailNavigationProps) {
  const {weeks, isLoadingWeeks, error, update} = useContext(
    WeeksContext,
  ) as WeeksContextType;
  const [startDateTime, setStartDateTime] = useState<Date>();
  const [endDateTime, setEndDateTime] = useState<Date>();
  const [endDateTimePickerVisible, setEndDateTimePickerVisible] =
    useState(false);

  const week = weeks.find(x => x.slug === route.params.weekSlug);
  const day = week?.days.find((x: Day) => x.date === route.params.dayDate);

  useEffect(() => {
    if (day?.startTime != null) {
      setStartDateTime(day.startTime);
    }
    if (day?.endTime != null) {
      setEndDateTime(day.endTime);
    }
  }, []);

  if (!day || !week) {
    return <Text>Not found</Text>;
  }

  const submit = async () => {
    console.log('start ' + startDateTime);
    console.log('end ' + endDateTime);
    console.log('day before update' + JSON.stringify(day));
    day.startTime = startDateTime;
    day.endTime = endDateTime;
    console.log(week);
    await updateWeek(week);
    update(await getWeeks());
    console.log('day after update' + JSON.stringify(day));

    navigation.pop(1);
  };

  return (
    <>
      <SafeContainer>
        <View style={styles.inputContainer}>
          <View style={styles.columnContainer}>
            <HeaderText text={'Start'} />
          </View>
          <View style={styles.columnContainer}>
            <TimePicker
              date={day.startTime}
              parentOnChange={selectedDate => {
                setStartDateTime(selectedDate);
              }}
            />
          </View>
        </View>
        <Spacer marginTop={2} marginBottom={2} marginLeft={0} marginRight={0} />
        <View style={styles.inputContainer}>
          <View style={styles.columnContainer}>
            <HeaderText text={'End'} />
          </View>
          <View style={styles.columnContainer}>
            {endDateTimePickerVisible ? (
              <TimePicker
                date={day.endTime}
                parentOnChange={selectedDate => {
                  setEndDateTime(selectedDate);
                }}
              />
            ) : (
              <SubmitButton
                onPress={() => setEndDateTimePickerVisible(true)}
                text={'Set'}
              />
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <SubmitButton
            onPress={submit}
            text={'Submit'}
            style={styles.submitTimeButton}
          />
        </View>
      </SafeContainer>
    </>
  );
}

export default DayDetailScreen;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    width: '50%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: colors.tertiary,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  columnContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitTimeButton: {
    width: '40%',
  },
});
