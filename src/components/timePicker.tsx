import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useEffect, useState} from 'react';
import {LocalizeDateString} from '../services/functions/timeFunctions';

export interface TimePickerProps {
  date?: Date;
  parentOnChange: (selectedDate: Date) => void;
}

function TimePicker(props: TimePickerProps) {
  // const [date, setDate] = useState(
  //   !props.date ? new Date() : new Date(props.date),
  // );
  const [date, setDate] = useState(
    !props.date ? LocalizeDateString(new Date()) : new Date(props.date),
  );

  useEffect(() => {
    props.parentOnChange(date);
  }, [date]);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={'time'}
        is24Hour={true}
        onChange={onChange}
        timeZoneOffsetInMinutes={0}
      />
    </>
  );
}

export default TimePicker;
