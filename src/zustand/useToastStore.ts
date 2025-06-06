import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';

export type TToastType = 'success' | 'error' | 'info' | 'warning';

type TToastStoreProps = {
  showToast: boolean;
  toastMessage: string;
  toastType: TToastType | null,
  onShow: (toastType: TToastType, message: string, callback?: () => void) => void;
  onHide: () => void;
  onHideCallback?: () => void;
}

export const {
  useStore: useToastStore,
  rawStore: toastRawStore,
} = createZustandStoreWithSelectors<TToastStoreProps>((set, _) => ({
  showToast: false,
  toastMessage: '',
  toastType: null,
  onHideCallback: undefined,
  onShow: (toastType, message, callback) => {
    set({
      showToast: true,
      toastType,
      toastMessage: message,
      onHideCallback: callback,
    });
  },
  onHide: () => {
    set((state) => {
      const callback = state.onHideCallback;
      if (callback) {
        setTimeout(callback, 0)
      }

      return {
        showToast: false,
        toastMessage: '',
        toastType: null,
        onHideCallback: undefined,
      }
    });
  },
}));
