import {Text, View} from 'react-native';
import {useContext} from 'react';
import {WeeksContext, WeeksContextType} from '../services/context/weekscontext';
import SafeContainer from '../components/safeContainer';

function OverviewDetailsScreen() {
  const {weeks, isLoadingWeeks, update} = useContext(
    WeeksContext,
  ) as WeeksContextType;

  return (
    <SafeContainer>
      <Text>Details</Text>
    </SafeContainer>
  );
}

export default OverviewDetailsScreen;
