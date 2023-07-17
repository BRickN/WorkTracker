import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../utils/colors';

function WeekListDay({day, hours}: {day: string; hours: number}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.textDay]}>{day}</Text>
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
});
