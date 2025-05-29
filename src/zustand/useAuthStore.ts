import { IUser } from '../interfaces/IUser';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';

type TAuthStoreProps = {
  user: IUser;
  setUser: (user: IUser) => void;
}

export const {
  useStore: useAuthStore,
  rawStore: authRawStore
} = createZustandStoreWithSelectors<TAuthStoreProps>((set, _) => ({
  user: {
    email: '',
    uid: '',
  },
  setUser: (user) => set({ user })
}));
