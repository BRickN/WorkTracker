import WeekDetailScreen from '../../screens/weekDetailScreen';
import DayDetailScreen from '../../screens/dayDetailScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeStackParamList} from './navTypes';
import HomeScreen from '../../screens/homeScreen';

const Stack = createStackNavigator<HomeStackParamList>();

function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName={'HomeStack'}>
      <Stack.Screen
        name={'HomeStack'}
        component={HomeScreen}
        options={{
          headerShown: true,
          title: 'Home',
        }}
      />
      <Stack.Screen
        name={'WeekDetail'}
        component={WeekDetailScreen}
        options={{
          headerShown: true,
          title: 'Week',
        }}
      />
      <Stack.Screen
        name={'DayDetail'}
        component={DayDetailScreen}
        options={{
          headerShown: true,
          title: 'Register hours',
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
