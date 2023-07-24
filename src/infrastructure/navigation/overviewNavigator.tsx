import WeekDetailScreen from '../../screens/weekDetailScreen';
import DayDetailScreen from '../../screens/dayDetailScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeStackParamList, OverviewStackParamList} from './navTypes';
import HomeScreen from '../../screens/homeScreen';
import OverviewScreen from '../../screens/overviewScreen';
import OverviewDetailsScreen from '../../screens/overviewDetailsScreen';

const Stack = createStackNavigator<OverviewStackParamList>();

function OverviewNavigator() {
  return (
    <Stack.Navigator initialRouteName={'OverviewStackRoot'}>
      <Stack.Screen
        name={'OverviewStackRoot'}
        component={OverviewScreen}
        options={{
          headerShown: true,
          title: 'Overview',
        }}
      />
      <Stack.Screen
        name={'OverviewDetail'}
        component={OverviewDetailsScreen}
        options={{
          headerShown: true,
          title: 'Overview details',
        }}
      />
    </Stack.Navigator>
  );
}

export default OverviewNavigator;
