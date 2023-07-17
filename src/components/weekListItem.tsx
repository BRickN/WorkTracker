import {Week} from '../infrastructure/types/timeData';
import {StyleSheet, Text, View} from 'react-native';
import WeekListDay from './weekListDay';
import {colors} from '../utils/colors';
import Card from './card';

function WeekListItem({week}: {week: Week}) {
  return (
    <Card style={{backgroundColor: 'blue'}}>
      <View style={styles.listHeaderContainer}>
        <Text>Week: {week.weekNr}</Text>
        <Text>
          From: {week.startDate.toString()} - Till: {week.endDate.toString()}
        </Text>
      </View>
      <View style={styles.listDaysContainer}>
        {week.days?.length > 0 &&
          week.days.map(day => <WeekListDay day={day.day[0]} hours={8} />)}
        <WeekListDay day={'Total'} hours={48} />
      </View>
    </Card>
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
});
