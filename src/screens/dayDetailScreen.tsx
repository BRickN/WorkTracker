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

type DayDetailNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  'DayDetail'
>;

function DayDetailScreen({route}: DayDetailNavigationProps) {
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const day = route.params.day;
  useEffect(() => {
    if (route.params.day.startTime != null) {
      setStartTime(day.startTime);
    }
    if (route.params.day.endTime != null) {
      setEndTime(day.endTime);
    }
  }, []);

  return (
    <>
      <SafeContainer>
        <View style={styles.inputContainer}>
          <Text>Start</Text>
          <TimePicker date={day.startTime} />
          {/*<TextInput*/}
          {/*  value={GetFormattedTimeFromDate(startTime)}*/}
          {/*  placeholder={'hh:mm'}*/}
          {/*  style={styles.input}*/}
          {/*  editable={true}*/}
          {/*  onChangeText={text => setStartTime(text)}*/}
          {/*/>*/}
          {/*<Button*/}
          {/*  mode={'contained'}*/}
          {/*  disabled={startTime !== null}*/}
          {/*  style={styles.button}>*/}
          {/*  <Text style={styles.text}>Start</Text>*/}
          {/*</Button>*/}
        </View>
        <Spacer marginTop={2} marginBottom={2} marginLeft={0} marginRight={0} />
        <View style={styles.inputContainer}>
          {/*<TextInput*/}
          {/*  value={GetFormattedTimeFromDate(endTime)}*/}
          {/*  placeholder={'End'}*/}
          {/*  style={styles.input}*/}
          {/*  editable={true}*/}
          {/*/>*/}
          {/*/!*disabled={endTime !== null}*!/*/}
          {/*<Button*/}
          {/*  mode={'contained'}*/}
          {/*  disabled={startTime !== null}*/}
          {/*  onPress={() => console.log('press')}*/}
          {/*  style={styles.button}>*/}
          {/*  <Text style={styles.text}>End</Text>*/}
          {/*</Button>*/}
        </View>
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
