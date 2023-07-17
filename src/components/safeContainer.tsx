import {ReactNode} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {colors} from '../utils/colors';

function SafeContainer({children}: {children: ReactNode}) {
  return <View style={styles.container}>{children}</View>;
}

export default SafeContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
    backgroundColor: colors.secondary,
    padding: 10,
  },
});
