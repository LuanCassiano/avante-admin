import { toastRawStore, TToastType } from '../zustand/useToastStore';

export function useToast() {
  const show = (type: TToastType, message: string) => {
    toastRawStore.getState().onShow(type, message);
  };

  return {
    success: (msg: string) => show('success', msg),
    error: (msg: string) => show('error', msg),
    warning: (msg: string) => show('warning', msg),
    info: (msg: string) => show('info', msg),
  };
}