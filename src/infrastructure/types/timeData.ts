import {NewWeekFormData} from '../../components/newWeekForm';
import slugify from 'slugify';
import {
  GetDayNameByDayNumber,
  GetFormattedDateString,
  GetWorkDaysBetweenStartEndDate,
} from '../../services/functions/timeFunctions';

export class Week {
  slug: string;
  weekNr: number;
  startDate: Date;
  endDate: Date;
  days: Day[];

  constructor(weekFormData: NewWeekFormData) {
    this.startDate = new Date(
      weekFormData.startDate.getFullYear(),
      weekFormData.startDate.getMonth(),
      weekFormData.startDate.getDate(),
    );
    this.endDate = new Date(weekFormData.endDate);

    this.weekNr = parseFloat(weekFormData.weekNumber);
    this.days = GetWorkDaysBetweenStartEndDate(
      weekFormData.startDate,
      weekFormData.endDate,
    );
    this.slug = slugify(
      'week ' +
        this.weekNr +
        ' ' +
        GetFormattedDateString(weekFormData.startDate) +
        ' ' +
        GetFormattedDateString(weekFormData.endDate),
    );
  }
}

export class Day {
  date: Date;
  day: string;
  startTime?: Date;
  endTime?: Date;

  constructor(date: Date) {
    this.date = date;
    this.day = GetDayNameByDayNumber(date.getDay());
    this.startTime = undefined;
    this.endTime = undefined;
  }
}
