import {containsKey, getData, removeItem, storeData} from './index';
import tempData from '../tempData.json';
import {Week} from '../../infrastructure/types/timeData';

const WEEKS_DATA_KEY: string = 'weeks-data';

export const initWeeks = async (): Promise<boolean> => {
  const hasWeeks = await containsKey(WEEKS_DATA_KEY);

  if (!hasWeeks) {
    await storeData(WEEKS_DATA_KEY, tempData);
    return true;
  }
  return false;
};

export const getWeeks = async (): Promise<Week[]> => {
  return await getData(WEEKS_DATA_KEY);
};

export const getWeekBySlug = async (slug: string): Promise<Week> => {
  return await getWeeks().then(
    result => result.filter(w => w.slug === slug)[0],
  );
};

export const storeWeek = async (newWeek: Week): Promise<boolean> => {
  try {
    const weeks = await getWeeks();
    const newWeeks = [newWeek, ...weeks];
    await storeData(WEEKS_DATA_KEY, newWeeks);
    return true;
  } catch (e) {
    return false;
  }
};
