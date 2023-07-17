import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SafeContainer from '../components/safeContainer';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {HomeStackParamList} from '../infrastructure/navigation/navTypes';
import {Week} from '../infrastructure/types/timeData';
import {colors} from '../utils/colors';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';

type WeekDetailNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  'WeekDetail'
>;

function WeekDetailScreen({navigation, route}: WeekDetailNavigationProps) {
  const week: Week = route.params.week;

  return (
    <>
      <SafeContainer>
        {week.days.map(day => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() =>
              navigation.navigate('DayDetail', {
                date: day.date,
              })
            }>
            <View style={styles.infoContainer}>
              <View>
                <Text style={styles.header}>
                  {day.day} - {day.date.toString()}
                </Text>
              </View>
              <View style={styles.timesInfoContainer}>
                <View>
                  <Text style={styles.title}>Start</Text>
                  <View style={styles.horizontalSpacer} />
                  <Text>{day.startTime}</Text>
                </View>
                <View>
                  <Text style={styles.title}>End</Text>
                  <View style={styles.horizontalSpacer} />
                  <Text>{day.endTime}</Text>
                </View>
                <View>
                  <Text style={styles.title}>Hours worked</Text>
                  <View style={styles.horizontalSpacer} />

                  <Text>8</Text>
                </View>
              </View>
            </View>
            <View style={styles.chevronContainer}>
              <Icon
                name={'chevron-right'}
                size={20}
                color={colors.textPrimary}
              />
            </View>
          </TouchableOpacity>
        ))}
      </SafeContainer>
    </>
  );
}

export default WeekDetailScreen;

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
});
