import {StyleSheet, Text, View} from 'react-native';
import SafeContainer from '../components/safeContainer';
import {useContext, useEffect, useState} from 'react';
import {WeeksContext, WeeksContextType} from '../services/context/weekscontext';
import {getSettings} from '../services/storage/settings';
import {CalcHourDifference} from '../services/functions/timeFunctions';
import SubmitButton from '../components/submitButton';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {OverviewStackParamList} from '../infrastructure/navigation/navTypes';

type OverviewNavigationProps = NativeStackScreenProps<
  OverviewStackParamList,
  'OverviewStackRoot'
>;

function OverviewScreen({navigation}: OverviewNavigationProps) {
  const {weeks, isLoadingWeeks, update} = useContext(
    WeeksContext,
  ) as WeeksContextType;

  const [hoursWorked, setHoursWorked] = useState(0);
  const [hoursToWork, setHoursToWork] = useState(0);
  const [hoursResult, setHoursResult] = useState(0);

  useEffect(() => {
    const setData = async () => {
      setHoursWorked(await calcHoursWorked());
      setHoursToWork(await calcHoursToWork());
      setHoursResult(await calcHoursResult());
    };

    setData().catch(e => {
      console.log(e);
    });
  }, []);

  const calcHoursWorked = async (): Promise<number> => {
    let result = 0;
    weeks.forEach(week =>
      week.days.forEach(day => {
        let hoursDifference = CalcHourDifference(day.startTime, day.endTime);
        if (hoursDifference) {
          result += hoursDifference;
        }
      }),
    );
    return result;
  };

  const calcHoursToWork = async (): Promise<number> => {
    const settings = await getSettings();
    return parseFloat(settings.yearlyHours);
  };

  const calcHoursResult = async (): Promise<number> => {
    console.log(hoursWorked);
    console.log(hoursToWork);
    return hoursWorked - hoursToWork;
  };

  const handleDetailsPress = () => {
    navigation.navigate('OverviewDetail');
  };

  return (
    <>
      <SafeContainer>
        <View style={styles.overviewContainer}>
          <View style={styles.formRow}>
            <View style={styles.columnContainer}>
              <Text style={styles.formLabel}>Hours worked:</Text>
            </View>
            <View style={styles.columnContainer}>
              <Text>{hoursWorked}</Text>
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={styles.columnContainer}>
              <Text style={styles.formLabel}>Hours to work:</Text>
            </View>
            <View style={styles.columnContainer}>
              <Text>{hoursToWork}</Text>
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={styles.columnContainer} />
            <View style={styles.columnContainer}>
              <Text>{hoursResult}</Text>
            </View>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <SubmitButton
            text={'Details'}
            onPress={handleDetailsPress}
            style={styles.detailButton}
          />
        </View>
      </SafeContainer>
    </>
  );
}

export default OverviewScreen;

const styles = StyleSheet.create({
  overviewContainer: {
    flex: 9,
  },
  detailsContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: 'gray',
    width: 110,
    backgroundColor: '#fff',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  formLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  columnContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailButton: {
    justifyContent: 'flex-end',
  },
});
