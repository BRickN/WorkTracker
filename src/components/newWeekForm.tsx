import {View, StyleSheet, TextInput} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import SubmitButton from './submitButton';
import {
  GetStartDateByWeek,
  GetWeekNrByDate,
} from '../services/functions/timeFunctions';
import Spacer from './spacer';

export type NewWeekFormData = {
  weekNumber: string;
  startDate: Date;
  endDate: Date;
};

type NewWeekFormProps = {
  onSubmit: (form: NewWeekFormData) => void;
};

function NewWeekForm({onSubmit}: NewWeekFormProps) {
  const {control, handleSubmit, setValue} = useForm<NewWeekFormData>();

  const determineStartEndDate = (text: string) => {
    const weeknr = parseFloat(text);
    if (weeknr === null || isNaN(weeknr)) {
      return;
    }
    const startDate = GetStartDateByWeek(
      weeknr,
      new Date(Date.now()).getFullYear(),
    );
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 6,
    );

    setValue('startDate', startDate);
    setValue('endDate', endDate);
  };

  const setCurrentWeek = () => {
    const weekNr = GetWeekNrByDate(new Date()).toString();
    setValue('weekNumber', weekNr);
    determineStartEndDate(weekNr);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.formRow}>
          <Controller
            rules={{required: true}}
            name={'weekNumber'}
            control={control}
            render={({field: {onChange, value}}) => (
              <TextInput
                onChangeText={text => {
                  onChange(text);
                  determineStartEndDate(text);
                }}
                value={value}
                style={styles.input}
                placeholder={'Week number'}
                keyboardType={'numeric'}
              />
            )}
          />
          <Spacer
            marginTop={0}
            marginBottom={0}
            marginLeft={6}
            marginRight={6}
          />
          <SubmitButton text={'Current'} onPress={setCurrentWeek} />
        </View>
        <Spacer marginTop={6} marginBottom={6} marginLeft={0} marginRight={0} />
        <View style={styles.formRow}>
          <Controller
            rules={{required: true}}
            name={'startDate'}
            control={control}
            render={({field: {onChange, value}}) => (
              <TextInput
                onChangeText={onChange}
                value={value?.toLocaleDateString('nl-NL')}
                style={styles.input}
                placeholder={'Start date'}
                editable={false}
              />
            )}
          />
          <Spacer
            marginTop={0}
            marginBottom={0}
            marginLeft={6}
            marginRight={6}
          />
          <Controller
            rules={{required: true}}
            name={'endDate'}
            control={control}
            render={({field: {onChange, value}}) => (
              <TextInput
                onChangeText={onChange}
                value={value?.toLocaleDateString('nl-NL')}
                style={styles.input}
                placeholder={'End date'}
                editable={false}
              />
            )}
          />
        </View>
        <Spacer marginTop={6} marginBottom={6} marginLeft={0} marginRight={0} />
        <SubmitButton
          text={'Submit'}
          onPress={handleSubmit(data => onSubmit(data as NewWeekFormData))}
        />
      </View>
    </View>
  );
}

export default NewWeekForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: 'gray',
    width: 110,
  },
  formRow: {
    flexDirection: 'row',
  },
});
