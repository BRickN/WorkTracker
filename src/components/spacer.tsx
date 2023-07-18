import {StyleSheet, View} from 'react-native';

export interface SpacerProps {
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
}

export default function Spacer(props: SpacerProps) {
  return <View style={styles(props).spacer} />;
}

const styles = (props: SpacerProps) =>
  StyleSheet.create({
    spacer: {
      marginTop: props.marginTop,
      marginBottom: props.marginBottom,
      marginLeft: props.marginLeft,
      marginRight: props.marginRight,
    },
  });
