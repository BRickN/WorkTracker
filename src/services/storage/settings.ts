import {getData, storeData} from './index';
import {Settings} from '../../infrastructure/types/settings';

const SETTINGS_DATA_KEY: string = 'settings-data';

export const getSettings = async (): Promise<Settings> => {
  const settings = (await getData(SETTINGS_DATA_KEY)) as Settings;
  return settings;
};

export const updateCacheSettings = async (
  settings: Settings,
): Promise<boolean> => {
  try {
    await storeData(SETTINGS_DATA_KEY, settings);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
