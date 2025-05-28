import './gesture-handler';

import React from 'react';

import Routes from './routes/routes';

import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from './service/NavigationService';

import Toast from './components/Toast/Toast';

const App: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Routes />
      <Toast />
    </NavigationContainer>
  )
}

export default App;
