import {StyleSheet, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {HomeStackParamList} from '../infrastructure/navigation/navTypes';
import SafeContainer from '../components/safeContainer';
import {useEffect, useState} from 'react';
import {GetFormattedTimeFromDate} from '../services/functions/timeFunctions';
import {colors} from '../utils/colors';
import {Button} from 'react-native-paper';
import Spacer from '../components/spacer';

type DayDetailNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  'DayDetail'
>;

function DayDetailScreen({route}: DayDetailNavigationProps) {
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();

  useEffect(() => {
    if (route.params.day.startTime != null) {
      setStartTime(route.params.day.startTime);
    }
    if (route.params.day.endTime != null) {
      setEndTime(route.params.day.endTime);
    }
  }, []);

  return (
    <>
      <SafeContainer>
        <View style={styles.inputContainer}>
          <TextInput
            value={GetFormattedTimeFromDate(startTime)}
            placeholder={'Start'}
            style={styles.input}
            editable={false}
          />
          <Button mode={'contained'} disabled={startTime !== null}>
            Start
          </Button>
        </View>
        <Spacer marginTop={2} marginBottom={2} marginLeft={0} marginRight={0} />
        <View style={styles.inputContainer}>
          <TextInput
            value={GetFormattedTimeFromDate(endTime)}
            placeholder={'End'}
            style={styles.input}
            editable={false}
          />
          {/*disabled={endTime !== null}*/}
          <Button mode={'contained'} onPress={() => console.log('press')}>
            End
          </Button>
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
    width: '60%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: colors.tertiary,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    width: '25%',
    backgroundColor: 'red',
  },
});
