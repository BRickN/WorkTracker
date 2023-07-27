import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useContext, useEffect} from 'react';
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

function OverviewDetails() {
  const {weeks} = useContext(WeeksContext) as WeeksContextType;
  const {settings} = useContext(SettingsContext) as SettingsContextType;

  const renderOverviewDetails = ({item}: {item: Week}) => {
    const headerText: string = `Week: ${item.weekNr.toString()}`;
    const subHeaderTextFrom: string = `${GetFormattedDateString(
      item.startDate,
    )}`;
    const subHeaderTextTill: string = `${GetFormattedDateString(item.endDate)}`;

    const totalHoursWorked = CalcTotalHours(item);
    const difference =
      totalHoursWorked - parseFloat(settings?.hoursPerWeek ?? '');

    const diff = parseFloat(difference.toFixed(2));

    return (
      <Card>
        <View style={styles.cardContainer}>
          <View style={styles.cardColumn}>
            <HeaderText text={headerText} style={styles.headerText} />
            <HeaderText text={subHeaderTextFrom} style={styles.subHeaderText} />
            <HeaderText text={subHeaderTextTill} style={styles.subHeaderText} />
          </View>
          <View style={[styles.cardColumn, styles.alignCenter]}>
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

export default OverviewDetails;
const styles = StyleSheet.create({
  headerText: {
    fontSize: 15,
  },
  subHeaderText: {
    fontSize: 12,
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 2,
  },
  cardColumn: {
    flex: 1,
  },
  alignCenter: {
    justifyContent: 'center',
  },
  textPositive: {
    color: 'green',
  },
  textNegative: {
    color: 'red',
  },
});
