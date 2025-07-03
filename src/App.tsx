import './gesture-handler';

import React from 'react';

import Routes from './routes/routes';
import MainNavigation from './routes/MainNavigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from './service/NavigationService';

import Toast from './components/Toast/Toast';
import { useAuthStore } from './zustand/useAuthStore';
import { ActivityIndicator } from 'react-native';
import Container from './components/Container/Container';
import { Colors } from './global/Colors';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { hydrated, user } = useAuthStore((state) => state);

  if(!hydrated) {
    return (
      <Container>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </Container>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef}>
        {user.uid ? <MainNavigation /> : <Routes />}
        <Toast />
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App;
