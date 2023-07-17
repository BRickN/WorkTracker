import {Week} from '../types/timeData';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {getWeeks} from '../../services/storage/week';

export const useWeeks = (): Week[] => {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getWeeks().then(result => {
        setWeeks(result);
      });
    }
  }, [isFocused]);

  return weeks;
};
