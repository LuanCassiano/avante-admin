import React from 'react';
import { render } from '@testing-library/react-native';
import ListItemTitle from '../ListItemTitle';

describe('ListItemTitle component', () => {
  it('render title', () => {
    const { getByText } = render(<ListItemTitle title="Título de Teste" />);
    expect(getByText('Título de Teste')).toBeTruthy();
  });
});
