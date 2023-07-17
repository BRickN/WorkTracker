import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {colors} from '../utils/colors';

// type CardProps = {
//   viewProps?: View['props'];
//   children: ReactNode;
//   style: StyleProp<ViewStyle>;
// };

// function Card({viewProps, children}: CardProps) {
//   return (
//     <View
//       {...viewProps}
//       style={[viewProps?.style, styles.listItemContainer, styles.boxShadow]}>
//       {children}
//     </View>
//   );
// }

function Card(props: View['props']) {
  return (
    <View
      {...props}
      style={[props.style, styles.listItemContainer, styles.boxShadow]}>
      {props.children}
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    borderRadius: 15,
    marginBottom: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.tertiary,
  },
  boxShadow: {
    shadowColor: 'rgba(0,0,0)',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
