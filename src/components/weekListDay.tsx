import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../utils/colors';
import {Day} from '../infrastructure/types/timeData';
import {CalcHourDifference} from '../services/functions/timeFunctions';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

function WeekListDay({day}: {day: Day}) {
  const dayName = day.day[0];
  const hours = CalcHourDifference(day.startTime, day.endTime);
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {day.workAtHome && (
          <Icon
            name={'home'}
            size={15}
            color={colors.textPrimary}
            style={styles.dayTypeIcon}
          />
        )}
        {day.vacation && (
          <Icon
            name={'plane'}
            size={15}
            color={colors.textPrimary}
            style={styles.dayTypeIcon}
          />
        )}
      </View>
      <Text style={[styles.text, styles.textDay]}>{dayName}</Text>
      <View style={styles.spacer} />
      <Text style={[styles.text]}>{hours}</Text>
    </View>
  );
}

export default WeekListDay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  text: {},
  textDay: {
    fontWeight: 'bold',
  },
  spacer: {
    borderTopWidth: 1,
    borderColor: colors.primary,
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  iconContainer: {
    marginLeft: 7,
    position: 'absolute',
    top: -7,
    right: -4,
    flexDirection: 'row',
  },
  dayTypeIcon: {},
});
