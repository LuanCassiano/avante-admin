import { useToast } from '../useToast';
import { toastRawStore } from '../../zustand/useToastStore';

jest.mock('../../zustand/useToastStore', () => {
  const onShowMock = jest.fn();
  return {
    toastRawStore: {
      getState: () => ({
        onShow: onShowMock,
      }),
    },
  };
});

describe('useToast', () => {
  it('calls onShow with type success and message', () => {
    const { success } = useToast();
    success('Tudo certo!');

    const onShow = toastRawStore.getState().onShow;
    expect(onShow).toHaveBeenCalledWith('success', 'Tudo certo!', undefined);
  });

  it('calls onShow with type error and message', () => {
    const { error } = useToast();
    error('Algo deu errado');

    const onShow = toastRawStore.getState().onShow;
    expect(onShow).toHaveBeenCalledWith('error', 'Algo deu errado', undefined);
  });

  it('calls onShow with type info and message', () => {
    const { info } = useToast();
    info('Info Toast');

    const onShow = toastRawStore.getState().onShow;
    expect(onShow).toHaveBeenCalledWith('info', 'Info Toast', undefined);
  });

  it('calls onShow with type warning and message', () => {
    const { warning } = useToast();
    warning('Alert Toast');

    const onShow = toastRawStore.getState().onShow;
    expect(onShow).toHaveBeenCalledWith('warning', 'Alert Toast', undefined);
  });
});
