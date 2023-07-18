import {Day, Week} from '../types/timeData';

export type BottomTabParamList = {
  Home: undefined;
  Overview: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  HomeStack: undefined;
  WeekDetail: {
    week: Week;
  };
  DayDetail: {
    day: Day;
  };
};
