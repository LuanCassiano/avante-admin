import React from 'react';
import { render } from '@testing-library/react-native';
import Title, { TTitleProps } from '../../Title/Title';
import { Colors } from '../../../global/Colors';

describe('Title Component', () => {
  it('snapshot', () => {
    const tree = render(<Title />)

    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders with default props', () => {
    const { getByText } = render(<Title />);
    const titleElement = getByText('Default Title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.props.style).toEqual(
      expect.objectContaining({
        color: Colors.PRIMARY,
        fontSize: 16,
        fontWeight: 'normal',
      })
    );
  });

  it('renders with custom props', () => {
    const customProps = {
      textColor: 'red',
      textSize: 20,
      fontStyle: 'bold',
      title: 'Custom Title',
    } as TTitleProps;
    const { getByText } = render(<Title {...customProps} />);
    const titleElement = getByText('Custom Title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.props.style).toEqual(
      expect.objectContaining({
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
      })
    );
  });
});