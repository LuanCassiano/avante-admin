import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';

import { FAB } from '../FAB';

import { MaterialIcons } from '@expo/vector-icons';

describe('FAB Component', () => {
  it('matches snapshot', () => {
    const tree = render(<FAB onPressButton={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the button with the icon', () => {
    const { getByRole } = render(<FAB onPressButton={() => {}}/>);
  
    const button = getByRole('button');
    expect(button).toBeTruthy();
  });

  it('calls onPressButton when pressed', () => {
    const mockPress = jest.fn();

    const { getByRole } = render(<FAB onPressButton={mockPress}/>);

    const button = getByRole('button');
    fireEvent.press(button);

    expect(mockPress).toHaveBeenCalledTimes(1);
  });

  it('renders the add icon', () => {
    const { getByRole, UNSAFE_getByType } = render(<FAB onPressButton={() => {}} />);
    const icon = UNSAFE_getByType(MaterialIcons);
    expect(icon.props.name).toBe('add');
  });
});
