import React from 'react';
import { render } from '@testing-library/react-native';
import ListItemLabel from '../ListItemLabel';

describe('ListItemLabel', () => {
  it('renderiza o label corretamente', () => {
    const { getByText } = render(<ListItemLabel label="Nome" />);
    expect(getByText('Nome')).toBeTruthy();
  });
});
