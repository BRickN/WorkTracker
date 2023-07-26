import {createContext, ReactNode, useEffect, useState} from 'react';
import {Settings} from '../../infrastructure/types/settings';
import {getSettings, updateCacheSettings} from '../storage/settings';

export interface SettingsContextType {
  settings?: Settings;
  isLoadingSettings: boolean;
  error?: Error;
  updateSettingsContext: (newSettings: Settings) => void;
}

export const SettingsContext = createContext<SettingsContextType | null>(null);

const SettingsContextProvider = ({children}: {children: ReactNode}) => {
  const [settings, setSettings] = useState<Settings>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const retrieveSettings = () => {
    setIsLoading(true);
    getSettings()
      .then(result => {
        setSettings(result);
      })
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateSettings = async (newSettings: Settings) => {
    setSettings(newSettings);
  };

  useEffect(() => {
    retrieveSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings: settings,
        isLoadingSettings: isLoading,
        error: error,
        updateSettingsContext: updateSettings,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
