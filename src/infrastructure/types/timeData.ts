export interface Week {
  slug: string;
  weekNr: number;
  startDate: Date;
  endDate: Date;
  days: Day[];
}

export interface Day {
  date: Date;
  day: string;
  startTime: number;
  endTime: number;
}
