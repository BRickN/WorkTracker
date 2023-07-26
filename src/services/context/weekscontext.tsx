import {createContext, ReactNode, useEffect, useState} from 'react';
import {Week} from '../../infrastructure/types/timeData';
import {initWeeks, storeWeek} from '../storage/week';

export interface WeeksContextType {
  weeks: Week[];
  isLoadingWeeks: boolean;
  error?: Error;
  updateWeeksContext: (weeks: Week[]) => void;
}

export const WeeksContext = createContext<WeeksContextType | null>(null);

const WeeksContextProvider = ({children}: {children: ReactNode}) => {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const retrieveWeeks = () => {
    setIsLoading(true);
    initWeeks()
      .then(result => {
        setWeeks(result);
      })
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateWeeks = async (weeks: Week[]) => {
    setWeeks(weeks);
  };

  useEffect(() => {
    retrieveWeeks();
  }, []);

  return (
    <WeeksContext.Provider
      value={{
        weeks: weeks,
        isLoadingWeeks: isLoading,
        error: error,
        updateWeeksContext: updateWeeks,
      }}>
      {children}
    </WeeksContext.Provider>
  );
};

export default WeeksContextProvider;
