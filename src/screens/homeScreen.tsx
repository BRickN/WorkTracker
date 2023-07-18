import SafeContainer from '../components/safeContainer';
import {HomeStackParamList} from '../infrastructure/navigation/navTypes';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useWeeks} from '../infrastructure/hooks/useWeeks';
import {Week} from '../infrastructure/types/timeData';
import WeekListItem from '../components/weekListItem';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';

// type HomeNavigationProps = CompositeScreenProps<
//   BottomTabScreenProps<BottomTabParamList, 'Home'>,
//   StackScreenProps<RootStackParamList, 'Root'>
// >;

type HomeNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  'HomeStack'
>;

function HomeScreen({navigation}: HomeNavigationProps) {
  const weeks = useWeeks();

  const renderWeek = ({item}: {item: Week}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('WeekDetail', {
            week: item,
          })
        }>
        <WeekListItem key={item.slug} week={item} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeContainer>
        <View style={styles.weeksContainer}>
          <FlatList data={weeks} renderItem={renderWeek} />
        </View>
      </SafeContainer>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  weeksContainer: {
    flex: 1,
  },
});
