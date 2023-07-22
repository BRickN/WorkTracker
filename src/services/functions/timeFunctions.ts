import {Day, Week} from '../../infrastructure/types/timeData';

function CalcHourDifference(start?: Date, end?: Date): number | undefined {
  if (!start || !end) {
    return undefined;
  }
  const startDateFormatted: Date = new Date(start);
  const endDateFormatted: Date = new Date(end);
  let diff = (endDateFormatted.getTime() - startDateFormatted.getTime()) / 1000;
  diff /= 60 * 60;
  return parseFloat(diff.toFixed(2));
}

//return dd-mm-yyy
function GetFormattedDateString(date: Date): string {
  if (!date) {
    return '';
  }
  try {
    return new Date(date).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch (e) {
    console.log(e);
    return '';
  }
}

//returns time as hh:mm
function GetFormattedTimeFromDate(date?: Date): string {
  if (!date) {
    return '';
  }
  const dateFormatted: Date = new Date(date);
  const hours = dateFormatted.getUTCHours().toLocaleString('nl-NL', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const minutes = dateFormatted.getMinutes().toLocaleString('nl-NL', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return `${hours}:${minutes}`;
}

function GetStartDateByWeek(week: number, year: number): Date {
  //https://stackoverflow.com/questions/17855064/how-to-get-a-javascript-date-from-a-week-number
  // Create a date for 1 Jan in required year
  var d = new Date(year, 0, 1);
  // Get day of week number, sun = 0, mon = 1, etc.
  var dayNum = d.getDay();
  // Get days to add
  var requiredDate = --week * 7;

  // For ISO week numbering
  // If 1 Jan is Friday to Sunday, go to next week
  if (dayNum !== 0 || dayNum > 4) {
    requiredDate += 7;
  }

  // Add required number of days
  d.setDate(1 - d.getDay() + ++requiredDate);
  return d;
}

function GetWeekNrByDate(date: Date): number {
  const dowOffset = 1; //default dowOffset to zero
  const newYear = new Date(date.getFullYear(), 0, 1);
  let day = newYear.getDay() - dowOffset; //the day of week the year begins on
  day = day >= 0 ? day : day + 7;
  const daynum =
    Math.floor(
      (date.getTime() -
        newYear.getTime() -
        (date.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
        86400000,
    ) + 1;
  let weeknum;
  //if the year starts before the middle of a week
  if (day < 4) {
    weeknum = Math.floor((daynum + day - 1) / 7) + 1;
    if (weeknum > 52) {
      const nYear = new Date(date.getFullYear() + 1, 0, 1);
      let nday = nYear.getDay() - dowOffset;
      nday = nday >= 0 ? nday : nday + 7;
      /*if the next year starts before the middle of
        the week, it is week #1 of that year*/
      weeknum = nday < 4 ? 1 : 53;
    }
  } else {
    weeknum = Math.floor((daynum + day - 1) / 7);
  }
  return weeknum;
}

function CalcTotalHours(week: Week): number {
  let sum = 0;
  week.days.forEach(day => {
    let hoursWorked = CalcHourDifference(day.startTime, day.endTime);
    if (hoursWorked) {
      sum += hoursWorked;
    }
  });
  return sum;
}

function GetWorkDaysBetweenStartEndDate(startDate: Date, endDate: Date): Day[] {
  let dayArray = new Array<Day>();
  let currentDate = startDate;

  const endDateNew = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate() - 2,
  );

  while (currentDate <= endDateNew) {
    let dayToAdd = new Day(currentDate);
    dayArray.push(JSON.parse(JSON.stringify(dayToAdd)));
    addDays(currentDate, 1);
  }
  return dayArray;
}

const addDays = (date: Date, days: number): void => {
  date.setDate(date.getDate() + days);
};

function GetDayNameByDayNumber(dayNumber: number): string {
  if (dayNumber < 0 || dayNumber > 7) {
    return '';
  }
  const weekdays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return weekdays[dayNumber];
}

// function LocalizeDateString(date_to_convert_str: string) {
//   const date_to_convert = new Date(date_to_convert_str);
//   const local_date = new Date();
//   date_to_convert.setHours(
//     date_to_convert.getHours() + local_date.getTimezoneOffset() / 60,
//   );
//   return date_to_convert;
// }
function LocalizeDateString(date: Date) {
  const newDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000,
  );

  const offset = date.getTimezoneOffset() / 60;
  const hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
}

export {
  GetFormattedTimeFromDate,
  CalcHourDifference,
  GetStartDateByWeek,
  GetWeekNrByDate,
  GetWorkDaysBetweenStartEndDate,
  GetDayNameByDayNumber,
  GetFormattedDateString,
  CalcTotalHours,
  LocalizeDateString,
};
