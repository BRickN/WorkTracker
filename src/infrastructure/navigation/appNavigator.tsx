// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../utils/colors';
import OverviewScreen from '../../screens/overviewScreen';
import SettingsScreen from '../../screens/settingsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from './navTypes';
import HomeNavigator from './homeNavigator';

const Tab = createBottomTabNavigator<BottomTabParamList>();

function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={'Home'}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'home'} size={size} color={color} />
          ),
          tabBarActiveTintColor: colors.primary,
          headerStyle: {backgroundColor: colors.tertiary},
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'Overview'}
        component={OverviewScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'calendar'} size={size} color={color} />
          ),
          tabBarActiveTintColor: colors.primary,
          headerStyle: {backgroundColor: colors.tertiary},
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'Settings'}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'gear'} size={size} color={color} />
          ),
          tabBarActiveTintColor: colors.primary,
          headerStyle: {backgroundColor: colors.tertiary},
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
