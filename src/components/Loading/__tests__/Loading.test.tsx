import React from 'react';
import { render } from '@testing-library/react-native';
import Loading from '../Loading';
import { ActivityIndicator } from 'react-native';
import { Colors } from '../../../global/Colors';

describe('Loading', () => {
  it('renderiza o ActivityIndicator com tamanho e cor corretos', () => {
    const { getByTestId } = render(<Loading />);
    const spinner = getByTestId('loading-spinner');

    expect(spinner.props.size).toBe('large');
    expect(spinner.props.color).toBe(Colors.PRIMARY);
  });
});