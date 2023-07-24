import {ReactNode} from 'react';
import {
  Platform,
  PressableProps,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../utils/colors';

export interface SafeContainerProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

function SafeContainer(props: SafeContainerProps) {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
}

export default SafeContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.secondary,
  },
});
