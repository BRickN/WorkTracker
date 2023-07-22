import {containsKey, getData, storeData} from './index';
import tempData from '../tempData.json';
import {Week} from '../../infrastructure/types/timeData';

const WEEKS_DATA_KEY: string = 'weeks-data';

export const initWeeks = async (): Promise<Week[]> => {
  const hasWeeks = await containsKey(WEEKS_DATA_KEY);

  if (!hasWeeks) {
    await storeData(WEEKS_DATA_KEY, tempData);
  }
  return await getWeeks();
};

export const getWeeks = async (): Promise<Week[]> => {
  const weeks = (await getData(WEEKS_DATA_KEY)) as Week[];
  return weeks.sort(x => x.weekNr);
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
    console.log(e);
    return false;
  }
};

export const updateWeek = async (updatedWeek: Week) => {
  try {
    let currentWeeks = await getWeeks();
    let currentWeek = currentWeeks.find(x => x.slug === updatedWeek.slug);
    if (!currentWeek) {
      throw new Error('no week found for slug: ' + updatedWeek.slug);
    }
    currentWeek = updatedWeek;
    await storeData(WEEKS_DATA_KEY, currentWeeks);
  } catch (e) {
    console.log(e);
  }
};
