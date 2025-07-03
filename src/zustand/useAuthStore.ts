import { IUser } from '../interfaces/IUser';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'zustand/middleware';

type TAuthStoreProps = {
  user: IUser;
  setUser: (user: IUser) => void;
  setHydrated: (hydrated: boolean) => void;
  hydrated: boolean;
}

export const {
  useStore: useAuthStore,
  rawStore: authRawStore
} = createZustandStoreWithSelectors<TAuthStoreProps>((set) => ({
  user: { email: null, uid: null },
  setUser: (user) => set({ user }),
  setHydrated: (hydrated) => set({ hydrated }),
  hydrated: false
}), {
  name: 'auth-storage',
  storage: createJSONStorage(() => AsyncStorage),
  onRehydrateStorage: () => (state) => {
    if(state) {
      authRawStore.getState().setHydrated(true);
    }
  }
});
