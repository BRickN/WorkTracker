import {StyleSheet, Text} from 'react-native';
import Spacer from './spacer';

export interface TitleTextProps {
  title: string;
  text: string;
}

function TitleText(props: TitleTextProps) {
  return (
    <>
      <Text style={styles.title}>{props.title}</Text>
      <Spacer marginTop={2} marginBottom={2} marginLeft={0} marginRight={0} />
      <Text>{props.text}</Text>
    </>
  );
}

export default TitleText;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
  horizontalSpacer: {
    marginTop: 2,
    marginBottom: 2,
  },
});
