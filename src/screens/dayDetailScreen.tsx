import {StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {HomeStackParamList} from '../infrastructure/navigation/navTypes';
import SafeContainer from '../components/safeContainer';
import {useEffect, useState} from 'react';
import {GetFormattedTimeFromDate} from '../services/functions/timeFunctions';
import {colors} from '../utils/colors';
import {Button} from 'react-native-paper';
import Spacer from '../components/spacer';
import TimePicker from '../components/timePicker';
import HeaderText from '../components/headerText';

type DayDetailNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  'DayDetail'
>;

function DayDetailScreen({route}: DayDetailNavigationProps) {
  const [startDateTime, setStartDateTime] = useState<Date>();
  const [endDateTime, setEndDateTime] = useState<Date>();
  const day = route.params.day;

  useEffect(() => {
    if (route.params.day.startTime != null) {
      setStartDateTime(day.startTime);
    }
    if (route.params.day.endTime != null) {
      setEndDateTime(day.endTime);
    }
  }, []);

  const submit = () => {
    console.log(startDateTime);
    console.log(endDateTime);
  };

  return (
    <>
      <SafeContainer>
        <View style={styles.inputContainer}>
          <HeaderText text={'Start'} />
          <TimePicker
            date={day.startTime}
            parentOnChange={selectedDate => {
              setStartDateTime(selectedDate);
            }}
          />
        </View>
        <Spacer marginTop={2} marginBottom={2} marginLeft={0} marginRight={0} />
        <View style={styles.inputContainer}>
          <HeaderText text={'End'} />
          <TimePicker
            date={day.endTime}
            parentOnChange={selectedDate => {
              setEndDateTime(selectedDate);
            }}
          />
        </View>
        <Button onPress={submit}>Submit</Button>
      </SafeContainer>
    </>
  );
}

export default DayDetailScreen;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  header: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 17,
  },
  text: {
    color: '#fff',
  },
  button: {
    width: '40%',
    padding: 2,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
});
