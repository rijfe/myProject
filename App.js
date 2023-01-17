import React from 'react';

import { RecoilRoot } from 'recoil';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavivation from './navigator/appNavigator';

export default function App() {
  return (
      <RecoilRoot>
        <AppNavivation />
      </RecoilRoot>
  );
}
