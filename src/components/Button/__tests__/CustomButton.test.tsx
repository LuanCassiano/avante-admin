import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../CustomButton';
import { Colors } from '../../../global/Colors';

describe('CustomButton Component', () => {
  it('renders with default props', () => {
    const mockPress = jest.fn();
    const { getByText } = render(<CustomButton onButtonPress={mockPress} />);
    
    const buttonText = getByText('Default button');
    expect(buttonText).toBeTruthy();
  });

  it('renders with custom title', () => {
    const mockPress = jest.fn();
    const { getByText } = render(<CustomButton title="Click Me" onButtonPress={mockPress} />);
    
    const buttonText = getByText('Click Me');
    expect(buttonText).toBeTruthy();
  });

  it('calls onButtonPress when pressed', () => {
    const mockPress = jest.fn();
    const { getByText } = render(<CustomButton title="Press Me" onButtonPress={mockPress} />);
    
    const button = getByText('Press Me');
    fireEvent.press(button);
    expect(mockPress).toHaveBeenCalledTimes(1);
  });

  it('applies custom background color', () => {
    const mockPress = jest.fn();
    const { getByTestId } = render(
      <CustomButton buttonBgColor={Colors.SECONDARY} onButtonPress={mockPress} />
    );

    const button = getByTestId('TouchableOpacity');
    expect(button.props.style.backgroundColor).toBe(Colors.SECONDARY);
  });

  it('applies custom title styles', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <CustomButton
        title="Styled Button"
        buttonTitleColor={Colors.BLACK}
        buttonTitleSize={20}
        buttonTitleFontStyle="bold"
        onButtonPress={mockPress}
      />
    );

    const buttonText = getByText('Styled Button');
    expect(buttonText.props.style.color).toBe(Colors.BLACK);
    expect(buttonText.props.style.fontSize).toBe(20);
    expect(buttonText.props.style.fontWeight).toBe('bold');
  });
});
