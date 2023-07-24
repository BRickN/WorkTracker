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
    padding: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 25,
    backgroundColor: colors.secondary,
  },
});
