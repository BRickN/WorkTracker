import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../utils/colors';
import {Day} from '../infrastructure/types/timeData';
import {CalcHourDifference} from '../services/functions/timeFunctions';

function WeekListTotal({title, hours}: {title: string; hours: number}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.textDay]}>{title}</Text>
      <View style={styles.spacer} />
      <Text style={[styles.text]}>{hours}</Text>
    </View>
  );
}

export default WeekListTotal;

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
