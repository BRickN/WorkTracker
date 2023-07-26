import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useContext} from 'react';
import {WeeksContext, WeeksContextType} from '../services/context/weekscontext';
import SafeContainer from '../components/safeContainer';
import {
  SettingsContext,
  SettingsContextType,
} from '../services/context/settingsContext';
import Card from '../components/card';
import {Week} from '../infrastructure/types/timeData';
import HeaderText from '../components/headerText';
import {
  CalcTotalHours,
  GetFormattedDateString,
} from '../services/functions/timeFunctions';

function OverviewDetailsScreen() {
  const {weeks, isLoadingWeeks, updateWeeksContext} = useContext(
    WeeksContext,
  ) as WeeksContextType;
  const {settings, isLoadingSettings, error, updateSettingsContext} =
    useContext(SettingsContext) as SettingsContextType;

  const renderOverviewDetails = ({item}: {item: Week}) => {
    const headerText: string = `Week: ${item.weekNr.toString()}`;
    const subHeaderTextFrom: string = `${GetFormattedDateString(
      item.startDate,
    )}`;
    const subHeaderTextTill: string = `${GetFormattedDateString(item.endDate)}`;

    const totalHoursWorked = CalcTotalHours(item);
    const diff = totalHoursWorked - parseInt(settings?.hoursPerWeek ?? '');
    return (
      <Card>
        <View style={styles.cardContainer}>
          <View style={styles.cardColumn}>
            <HeaderText text={headerText} style={styles.headerText} />
            <HeaderText text={subHeaderTextFrom} style={styles.subHeaderText} />
            <HeaderText text={subHeaderTextTill} style={styles.subHeaderText} />
          </View>
          <View style={styles.cardColumn}>
            <Text>Worked: {CalcTotalHours(item)}</Text>
            <Text style={diff >= 0 ? styles.textPositive : styles.textNegative}>
              Difference: {diff}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <SafeContainer>
      <FlatList data={weeks} renderItem={renderOverviewDetails} />
    </SafeContainer>
  );
}

export default OverviewDetailsScreen;
const styles = StyleSheet.create({
  headerText: {
    fontSize: 15,
  },
  subHeaderText: {
    fontSize: 12,
  },
  cardContainer: {
    flexDirection: 'row',
  },
  cardColumn: {
    flex: 1,
  },
  textPositive: {
    color: 'green',
  },
  textNegative: {
    color: 'red',
  },
});
