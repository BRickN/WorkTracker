import {NavigationContainer} from '@react-navigation/native';

// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../utils/colors';
import {StyleSheet} from 'react-native';
import AppNavigator from './appNavigator';

function Navigation() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default Navigation;
