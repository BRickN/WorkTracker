import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';

export interface TimePickerProps {
  date: Date;
}

function TimePicker(props: TimePickerProps) {
  const [date, setDate] = useState(new Date(props.date));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={'time'}
        is24Hour={true}
        onChange={onChange}
      />
    </>
  );
}

export default TimePicker;
