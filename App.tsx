import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StatusBarStyle} from 'react-native';
import Navigation from './src/infrastructure/navigation';
import useCachedResources from './src/infrastructure/hooks/useCachedResources';
import Loader from './src/components/loader';

const STYLES = ['default', 'dark-content', 'light-content'] as const;

function App(): JSX.Element {
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
    STYLES[0],
  );
  const isLoading: boolean = useCachedResources();

  return (
    <>
      <Navigation />
      <StatusBar barStyle={statusBarStyle} />
    </>
  );
}

export default App;
