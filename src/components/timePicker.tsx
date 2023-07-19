import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useState} from 'react';

export interface TimePickerProps {
  date: Date;
  parentOnChange: (selectedDate: Date) => void;
}

function TimePicker(props: TimePickerProps) {
  const [date, setDate] = useState(new Date(props.date));
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      props.parentOnChange(selectedDate);
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
