import './gesture-handler';

import React from 'react';

import Routes from './routes/routes';
import AppStack from './routes/AppStack';

import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from './service/NavigationService';

import Toast from './components/Toast/Toast';
import { useAuthStore } from './zustand/useAuthStore';

const App: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <NavigationContainer ref={navigationRef}>
      {user ? <AppStack /> : <Routes />}
      <Toast />
    </NavigationContainer>
  )
}

export default App;
