import {useEffect, useState} from 'react';
import {initWeeks} from '../../services/storage/week';

export default function useCachedResources() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      await initWeeks();
    }

    loadResourcesAndDataAsync()
      .catch(e => console.log('error useCachedResources' + e))
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading;
}
