import {Text, View} from 'react-native';
import SafeContainer from '../components/safeContainer';

function OverviewScreen() {
  return (
    <>
      <SafeContainer>
        <View>
          <Text>Hi from overview</Text>
        </View>
      </SafeContainer>
    </>
  );
}

export default OverviewScreen;
