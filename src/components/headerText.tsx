import {StyleSheet, Text} from 'react-native';
import {colors} from '../utils/colors';

export interface HeaderTextProps {
  text: string;
}

export default function HeaderText(props: HeaderTextProps) {
  return <Text style={styles.header}>{props.text}</Text>;
}

const styles = StyleSheet.create({
  header: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 17,
  },
});
