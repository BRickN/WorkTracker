import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {colors} from '../utils/colors';

export interface SubmitButtonProps {
  onPress: PressableProps;
  text: string;
}

// function SubmitButton(props: PressableProps & {text: string}) {
function SubmitButton(props: TouchableOpacityProps & {text: string}) {
  return (
    <TouchableOpacity {...props} style={styles.button}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.textPrimary,
    padding: 10,
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});
