import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  CalcHourDifference,
  GetFormattedDateString,
  GetFormattedTimeFromDate,
} from '../services/functions/timeFunctions';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../utils/colors';
import TitleText from './titleText';
import React from 'react';
import {Day, Week} from '../infrastructure/types/timeData';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {HomeStackParamList} from '../infrastructure/navigation/navTypes';

export interface WeekDetailItem {
  week: Week;
  day: Day;
  onPress: (param?: object) => void;
}

function WeekDetailItem(props: WeekDetailItem) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => props.onPress(props.day)}
      key={props.day.date.toString()}>
      <View style={styles.infoContainer}>
        <View style={styles.headerInfoContainer}>
          <Text style={styles.header}>
            {props.day.day} - {GetFormattedDateString(props.day.date)}
          </Text>
          {props.day.workAtHome && (
            <Icon
              name={'home'}
              size={18}
              color={colors.textPrimary}
              style={styles.dayTypeIcon}
            />
          )}
          {props.day.vacation && (
            <Icon
              name={'plane'}
              size={18}
              color={colors.textPrimary}
              style={styles.dayTypeIcon}
            />
          )}
        </View>
        <View style={styles.timesInfoContainer}>
          <View>
            <TitleText
              title={'Start'}
              text={GetFormattedTimeFromDate(props.day.startTime)}
            />
          </View>
          <View>
            <TitleText
              title={'End'}
              text={GetFormattedTimeFromDate(props.day.endTime)}
            />
          </View>
          <View>
            <TitleText
              title={'Hours worked'}
              text={
                CalcHourDifference(
                  props.day.startTime,
                  props.day.endTime,
                )?.toString() ?? ''
              }
            />
          </View>
        </View>
      </View>
      <View style={styles.chevronContainer}>
        <Icon name={'chevron-right'} size={20} color={colors.textPrimary} />
      </View>
    </TouchableOpacity>
  );
}

export default WeekDetailItem;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    marginBottom: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.tertiary,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',

    marginRight: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  headerInfoContainer: {
    flexDirection: 'row',
  },
  timesInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    padding: 10,
  },
  horizontalSpacer: {
    marginTop: 2,
    marginBottom: 2,
  },
  header: {
    fontWeight: 'bold',
    color: colors.textPrimary,
    fontSize: 17,
  },
  title: {
    fontWeight: 'bold',
  },
  dayTypeIcon: {
    marginLeft: 7,
  },
});
