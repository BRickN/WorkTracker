import {StyleSheet, Text, TextInput, View} from 'react-native';
import SafeContainer from '../components/safeContainer';
import {useEffect, useState} from 'react';
import SubmitButton from '../components/submitButton';
import {NewWeekFormData} from '../components/newWeekForm';
import {Controller, useForm} from 'react-hook-form';
import {getSettings, updateSettings} from '../services/storage/settings';
import {Settings} from '../infrastructure/types/settings';
import Spacer from '../components/spacer';

export type SettingsFormData = {
  yearlyHours: string;
  hoursPerWeek: string;
  breakTime: string;
};

function SettingsScreen() {
  const {control, handleSubmit, setValue} = useForm<SettingsFormData>();

  useEffect(() => {
    const initSettings = async () => {
      const cacheSettings = await getSettings();
      if (cacheSettings) {
        setValue('breakTime', cacheSettings.breakTime);
        setValue('yearlyHours', cacheSettings.yearlyHours);
      }
    };

    initSettings();
  }, []);

  const onSubmit = async (data: SettingsFormData) => {
    await updateSettings(new Settings(data));
  };

  return (
    <>
      <SafeContainer>
        <View style={styles.formRow}>
          <View style={styles.columnContainer}>
            <Text style={styles.formLabel}>Yearly hours to work:</Text>
          </View>
          <View style={styles.columnContainer}>
            <Controller
              rules={{required: true}}
              name={'yearlyHours'}
              control={control}
              render={({field: {onChange, value}}) => (
                <TextInput
                  onChangeText={text => {
                    onChange(text);
                  }}
                  value={value}
                  style={styles.input}
                  placeholder={'Yearly hours'}
                  keyboardType={'numeric'}
                />
              )}
            />
          </View>
        </View>
        <Spacer marginTop={5} marginBottom={5} marginLeft={0} marginRight={0} />

        <View style={styles.formRow}>
          <View style={styles.columnContainer}>
            <Text style={styles.formLabel}>Avg. break time in hours:</Text>
          </View>
          <View style={styles.columnContainer}>
            <Controller
              rules={{required: true}}
              name={'breakTime'}
              control={control}
              render={({field: {onChange, value}}) => (
                <TextInput
                  onChangeText={text => {
                    onChange(text);
                  }}
                  value={value}
                  style={styles.input}
                  placeholder={'Break in hours'}
                  keyboardType={'numeric'}
                />
              )}
            />
          </View>
        </View>
        <Spacer marginTop={5} marginBottom={5} marginLeft={0} marginRight={0} />

        <View style={styles.formRow}>
          <View style={styles.columnContainer}>
            <Text style={styles.formLabel}>Hours per week:</Text>
          </View>
          <View style={styles.columnContainer}>
            <Controller
              rules={{required: true}}
              name={'hoursPerWeek'}
              control={control}
              render={({field: {onChange, value}}) => (
                <TextInput
                  onChangeText={text => {
                    onChange(text);
                  }}
                  value={value}
                  style={styles.input}
                  placeholder={'Hours per week'}
                  keyboardType={'numeric'}
                />
              )}
            />
          </View>
        </View>
        <Spacer marginTop={5} marginBottom={5} marginLeft={0} marginRight={0} />

        <View style={styles.formRow}>
          <SubmitButton
            text={'Submit'}
            onPress={handleSubmit(data => onSubmit(data as SettingsFormData))}
          />
        </View>
      </SafeContainer>
    </>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: 'gray',
    width: 110,
    backgroundColor: '#fff',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  formLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  columnContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
