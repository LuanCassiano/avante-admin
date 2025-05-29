import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';

export type TToastType = 'success' | 'error' | 'info' | 'warning';

type TToastStoreProps = {
  showToast: boolean;
  toastMessage: string;
  toastType: TToastType | null,
  onShow: (toastType: TToastType, message: string) => void;
  onHide: () => void;
}

export const {
  useStore: useToastStore,
  rawStore: toastRawStore,
} = createZustandStoreWithSelectors<TToastStoreProps>((set, _) => ({
  showToast: false,
  toastMessage: '',
  toastType: null,
  onShow: (toastType, message) => {
    set({
      showToast: true,
      toastType,
      toastMessage: message,
    });
  },
  onHide() {
    set({
      showToast: false,
      toastType: null,
      toastMessage: '',
    });
  },
}));
