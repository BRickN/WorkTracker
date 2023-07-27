import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {HomeStackParamList} from '../infrastructure/navigation/navTypes';
import SafeContainer from '../components/safeContainer';
import {useContext, useEffect, useState} from 'react';
import {colors} from '../utils/colors';
import Spacer from '../components/spacer';
import TimePicker from '../components/timePicker';
import HeaderText from '../components/headerText';
import SubmitButton from '../components/submitButton';
import {getWeeks, updateWeek} from '../services/storage/week';
import {WeeksContext, WeeksContextType} from '../services/context/weekscontext';
import {Day} from '../infrastructure/types/timeData';
import {Switch} from 'react-native-paper';

type DayDetailNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  'DayDetail'
>;

function DayDetailScreen({navigation, route}: DayDetailNavigationProps) {
  const {weeks, updateWeeksContext} = useContext(
    WeeksContext,
  ) as WeeksContextType;
  const [startDateTime, setStartDateTime] = useState<Date>();
  const [endDateTime, setEndDateTime] = useState<Date>();
  const [endDateTimePickerVisible, setEndDateTimePickerVisible] =
    useState(false);
  const [isWorkAtHome, setIsWorkAtHome] = useState(false);
  const [isVacation, setIsVacation] = useState(false);

  const week = weeks.find(x => x.slug === route.params.weekSlug);
  const day = week?.days.find((x: Day) => x.date === route.params.dayDate);

  useEffect(() => {
    if (day?.startTime != null) {
      setStartDateTime(day.startTime);
    }
    if (day?.endTime != null) {
      setEndDateTime(day.endTime);
      setEndDateTimePickerVisible(true);
    }
    if (day?.workAtHome) {
      setIsWorkAtHome(true);
    }
    if (day?.vacation) {
      setIsVacation(true);
    }
  }, []);

  if (!day || !week) {
    return <Text>Not found</Text>;
  }

  const submit = async () => {
    day.startTime = startDateTime;
    day.endTime = endDateTime;
    day.workAtHome = isWorkAtHome;
    day.vacation = isVacation;
    console.log(day);
    await updateWeek(week);
    updateWeeksContext(await getWeeks());
    navigation.pop(1);
  };

  return (
    <>
      <SafeContainer style={{paddingTop: 10}}>
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
        <Spacer marginTop={2} marginBottom={2} marginLeft={0} marginRight={0} />
        <View style={styles.inputContainer}>
          <View style={styles.columnContainer}>
            <HeaderText text={'Work @ home'} />
          </View>
          <View style={styles.columnContainer}>
            <Switch
              value={isWorkAtHome}
              onValueChange={() => setIsWorkAtHome(!isWorkAtHome)}
              color={colors.textPrimary}
            />
          </View>
        </View>
        <Spacer marginTop={2} marginBottom={2} marginLeft={0} marginRight={0} />
        <View style={styles.inputContainer}>
          <View style={styles.columnContainer}>
            <HeaderText text={'Vacation'} />
          </View>
          <View style={styles.columnContainer}>
            <Switch
              value={isVacation}
              onValueChange={() => setIsVacation(!isVacation)}
              color={colors.textPrimary}
            />
          </View>
        </View>
        <Spacer marginTop={2} marginBottom={2} marginLeft={0} marginRight={0} />
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
