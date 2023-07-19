function CalcHourDifference(start: Date, end: Date): number {
  const startDateFormatted: Date = new Date(start);
  const endDateFormatted: Date = new Date(end);
  let diff = (endDateFormatted.getTime() - startDateFormatted.getTime()) / 1000;
  diff /= 60 * 60;
  return parseFloat(diff.toFixed(2));
}

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

export {
  GetFormattedTimeFromDate,
  CalcHourDifference,
  GetStartDateByWeek,
  GetWeekNrByDate,
};
