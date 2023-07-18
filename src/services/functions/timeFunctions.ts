function CalcHourDifference(start: Date, end: Date): number {
  const startDateFormatted: Date = new Date(start);
  const endDateFormatted: Date = new Date(end);
  let diff = (endDateFormatted.getTime() - startDateFormatted.getTime()) / 1000;
  diff /= 60 * 60;
  return parseFloat(diff.toFixed(2));
}

function GetFormattedTimeFromDate(date?: Date) {
  if (!date) {
    return;
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

export {GetFormattedTimeFromDate, CalcHourDifference};
