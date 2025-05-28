import './gesture-handler';

import React from 'react';

import Routes from './routes/routes';

import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from './service/NavigationService';

const App: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Routes />
    </NavigationContainer>
  )
}

export default App;
