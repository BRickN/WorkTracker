import {Week} from '../../infrastructure/types/timeData';
import {containsKey, getData, storeData} from './index';
import tempData from '../tempData.json';
import {getWeeks} from './week';
import {Settings} from '../../infrastructure/types/settings';

const SETTINGS_DATA_KEY: string = 'settings-data';

// export const initSettings = async (): Promise<Settings> => {
//   const hasSettings = await containsKey(SETTINGS_DATA_KEY);
//   return await getSettings();
// };

export const getSettings = async (): Promise<Settings> => {
  const settings = (await getData(SETTINGS_DATA_KEY)) as Settings;
  return settings;
};

export const updateSettings = async (settings: Settings): Promise<boolean> => {
  try {
    await storeData(SETTINGS_DATA_KEY, settings);
    console.log(await getSettings());
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
