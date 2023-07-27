import {StyleSheet, Text, View} from 'react-native';
import SafeContainer from '../components/safeContainer';
import {useContext, useEffect, useState} from 'react';
import {WeeksContext, WeeksContextType} from '../services/context/weekscontext';
import {CalcTotalHours} from '../services/functions/timeFunctions';
// import {NativeStackScreenProps} from 'react-native-screens/native-stack';
// import {OverviewStackParamList} from '../infrastructure/navigation/navTypes';
import OverviewDetails from '../components/overviewDetails';
import HeaderText from '../components/headerText';
import {
  SettingsContext,
  SettingsContextType,
} from '../services/context/settingsContext';

// type OverviewNavigationProps = NativeStackScreenProps<
//   OverviewStackParamList,
//   'OverviewStackRoot'
// >;
//{navigation}: OverviewNavigationProps
function OverviewScreen() {
  const {weeks} = useContext(WeeksContext) as WeeksContextType;
  const {settings} = useContext(SettingsContext) as SettingsContextType;
  const [hoursResult, setHoursResult] = useState(0);

  useEffect(() => {
    calcHoursResult();
  }, [weeks, settings]);

  const calcHoursResult = () => {
    let result: number = 0;

    weeks.forEach(week => {
      const hoursWorked = CalcTotalHours(week);
      result += hoursWorked - parseFloat(settings.hoursPerWeek);
    });
    setHoursResult(parseFloat(result.toFixed(2)));
  };

  return (
    <>
      <SafeContainer>
        <View style={styles.overviewContainer}>
          <View style={styles.formRow}>
            <View style={styles.columnContainer}>
              <HeaderText text={'Result:'} style={styles.formLabel} />
            </View>
            <View style={styles.columnContainer}>
              <Text
                style={
                  hoursResult >= 0 ? styles.textPositive : styles.textNegative
                }>
                {hoursResult}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <HeaderText text={'Details:'} style={styles.detailsHeader} />
          <OverviewDetails />
        </View>
      </SafeContainer>
    </>
  );
}

export default OverviewScreen;

const styles = StyleSheet.create({
  overviewContainer: {
    flex: 1,
    paddingTop: 15,
  },
  detailsContainer: {
    flex: 9,
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
  detailsHeader: {
    paddingLeft: 20,
  },
  detailButton: {
    justifyContent: 'flex-end',
  },
  textPositive: {
    color: 'green',
  },
  textNegative: {
    color: 'red',
  },
});
