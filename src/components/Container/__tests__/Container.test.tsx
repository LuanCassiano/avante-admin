import React from 'react';
import { render } from '@testing-library/react-native';
import Container from '../Container';
import { Text } from 'react-native';

describe('Container', () => {
  it('snapshot', () => {
    const tree = render(<Container><Text>Snapshot</Text></Container>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render container with children', () => {
    const { getByText } = render(
      <Container>
        <Text>Teste container</Text>
      </Container>
    );

    expect(getByText('Teste container')).toBeTruthy();
  });
});