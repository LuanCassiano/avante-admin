import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Toast from '../Toast';
import { toastRawStore } from '../../../zustand/useToastStore';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

describe('Toast', () => {
  beforeEach(() => {
    toastRawStore.getState().onHide();
  });

  it('snapshot', () => {
    const tree = render(<Toast />)

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render success toast', async () => {
    toastRawStore.getState().onShow('success', 'Salvo com sucesso!');

    const { getByText, queryByText } = render(<Toast />);

    expect(getByText('Salvo com sucesso!')).toBeTruthy();

    await waitFor(() => {
      expect(queryByText('Salvo com sucesso!')).toBeNull();
    }, { timeout: 3500 });
  });

  it('should render error toast', async () => {
    toastRawStore.getState().onShow('error', 'Falha ao salvar');

    const { getByText } = render(<Toast />);

    expect(getByText('Falha ao salvar')).toBeTruthy();
  });

  it('should render info toast', async () => {
    toastRawStore.getState().onShow('info', 'Info');

    const { getByText } = render(<Toast />);

    expect(getByText('Info')).toBeTruthy();
  });

  it('should render warning toast', async () => {
    toastRawStore.getState().onShow('warning', 'Alerta');

    const { getByText } = render(<Toast />);

    expect(getByText('Alerta')).toBeTruthy();
  });
});