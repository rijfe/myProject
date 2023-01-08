import React from 'react';

import { RecoilRoot } from 'recoil';

import AppNavivation from './navigator/appNavigator';

export default function App() {
  return (
    <RecoilRoot>
      <AppNavivation/>
    </RecoilRoot>
  );
}
