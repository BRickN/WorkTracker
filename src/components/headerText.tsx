import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {colors} from '../utils/colors';

export interface HeaderTextProps {
  text: string;
  style?: StyleProp<TextStyle>;
}

export default function HeaderText(props: HeaderTextProps) {
  return <Text style={[props.style, styles.header]}>{props.text}</Text>;
}

const styles = StyleSheet.create({
  header: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 17,
  },
});
