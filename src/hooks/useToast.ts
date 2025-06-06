import { toastRawStore, TToastType } from '../zustand/useToastStore';

export function useToast() {
  const show = (type: TToastType, message: string, callback?: () => void) => {
    toastRawStore.getState().onShow(type, message, callback);
  };

  return {
    success: (msg: string, cb?: () => void) => show('success', msg, cb),
    error: (msg: string, cb?: () => void) => show('error', msg, cb),
    warning: (msg: string, cb?: () => void) => show('warning', msg, cb),
    info: (msg: string, cb?: () => void) => show('info', msg, cb),
  };
}