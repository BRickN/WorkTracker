import {Text, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {HomeStackParamList} from '../infrastructure/navigation/navTypes';
import SafeContainer from '../components/safeContainer';

type DayDetailNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  'DayDetail'
>;

function DayDetailScreen({route}: DayDetailNavigationProps) {
  return (
    <>
      <SafeContainer>
        <View>
          <Text>{route.params.date.toString()}</Text>
        </View>
      </SafeContainer>
    </>
  );
}

export default DayDetailScreen;
