import {Day} from '../types/timeData';

export type BottomTabParamList = {
  Home: undefined;
  Overview: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  HomeStack: undefined;
  WeekDetail: {
    weekSlug: string;
  };
  DayDetail: {
    day: Day;
    weekSlug: string;
  };
};
