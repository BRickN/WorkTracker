import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SafeContainer from '../components/safeContainer';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {HomeStackParamList} from '../infrastructure/navigation/navTypes';
import {Day, Week} from '../infrastructure/types/timeData';
import {colors} from '../utils/colors';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import TitleText from '../components/titleText';
import {
  CalcHourDifference,
  GetFormattedDateString,
  GetFormattedTimeFromDate,
} from '../services/functions/timeFunctions';
import {useContext} from 'react';
import {WeeksContext, WeeksContextType} from '../services/context/weekscontext';
import WeekDetailItem from '../components/weekDetailItem';

type WeekDetailNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  'WeekDetail'
>;

function WeekDetailScreen({navigation, route}: WeekDetailNavigationProps) {
  const {weeks} = useContext(WeeksContext) as WeeksContextType;

  const week: Week | undefined = weeks.find(
    x => x.slug === route.params.weekSlug,
  );

  if (!week) {
    return null;
  }

  const goTo = (navigationDay: Day) => {
    navigation.navigate('DayDetail', {
      dayDate: navigationDay.date,
      weekSlug: week.slug,
    });
  };

  return (
    <>
      <SafeContainer style={{paddingTop: 10}}>
        {week.days.map(day => {
          return (
            <WeekDetailItem week={week} day={day} onPress={() => goTo(day)} />
          );
        })}
      </SafeContainer>
    </>
  );
}

export default WeekDetailScreen;
