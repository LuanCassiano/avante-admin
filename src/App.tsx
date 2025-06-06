import './gesture-handler';

import React from 'react';

import Routes from './routes/routes';
import MainNavigation from './routes/MainNavigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from './service/NavigationService';

import Toast from './components/Toast/Toast';
import { useAuthStore } from './zustand/useAuthStore';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef}>
        {user ? <MainNavigation /> : <Routes />}
        <Toast />
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App;
