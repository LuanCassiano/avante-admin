import { toastRawStore } from '../useToastStore';

describe('toastStore', () => {
  beforeEach(() => {
    toastRawStore.setState({
      showToast: false,
      toastMessage: '',
      toastType: null,
    });
  });

  it('should display toast with type and message', () => {
    toastRawStore.getState().onShow('success', 'Sucesso ao salvar');

    const state = toastRawStore.getState();
    expect(state.showToast).toBe(true);
    expect(state.toastType).toBe('success');
    expect(state.toastMessage).toBe('Sucesso ao salvar');
  });

  it('should be hide the toast and reset the state', () => {
    toastRawStore.getState().onShow('error', 'Erro ao salvar');
    toastRawStore.getState().onHide();

    const state = toastRawStore.getState();
    expect(state.showToast).toBe(false);
    expect(state.toastType).toBe(null);
    expect(state.toastMessage).toBe('');
  });
});
