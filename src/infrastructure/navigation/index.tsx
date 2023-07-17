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

// function RootNavigator() {
//   return (
//     <Stack.Navigator initialRouteName={'Root'}>
//       <Stack.Screen
//         name={'Root'}
//         component={BottomTabNavigator}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name={'WeekDetail'}
//         component={WeekDetailScreen}
//         options={{headerShown: true}}
//       />
//       <Stack.Screen
//         name={'DayDetail'}
//         component={DayDetailScreen}
//         options={{headerShown: true}}
//       />
//     </Stack.Navigator>
//   );
// }

// function BottomTabNavigator() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name={'Home'}
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({size, color}) => (
//             <Icon name={'home'} size={size} color={color} />
//           ),
//           tabBarActiveTintColor: colors.primary,
//           headerStyle: {backgroundColor: colors.tertiary},
//         }}
//       />
//       <Tab.Screen
//         name={'Overview'}
//         component={OverviewScreen}
//         options={{
//           tabBarIcon: ({size, color}) => (
//             <Icon name={'calendar'} size={size} color={color} />
//           ),
//           tabBarActiveTintColor: colors.primary,
//           headerStyle: {backgroundColor: colors.tertiary},
//         }}
//       />
//       <Tab.Screen
//         name={'Settings'}
//         component={SettingsScreen}
//         options={{
//           tabBarIcon: ({size, color}) => (
//             <Icon name={'gear'} size={size} color={color} />
//           ),
//           tabBarActiveTintColor: colors.primary,
//           headerStyle: {backgroundColor: colors.tertiary},
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

export default Navigation;

const styles = StyleSheet.create({
  stackStyle: {
    backgroundColor: colors.secondary,
  },
});
