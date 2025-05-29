import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { InputTextMemo } from '../InputText';

describe('InputText Component', () => {
  it('should render correctly with default props', () => {
    const mockOnTextChange = jest.fn();
    const { getByPlaceholderText } = render(
      <InputTextMemo
        placeholderText="Enter text"
        onTextChange={mockOnTextChange}
      />
    );

    const input = getByPlaceholderText('Enter text');
    expect(input).toBeTruthy();
  });

  it('should call onTextChange when text is changed', () => {
    const mockOnTextChange = jest.fn();
    const { getByPlaceholderText } = render(
      <InputTextMemo
        placeholderText="Enter text"
        onTextChange={mockOnTextChange}
      />
    );

    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'New text');
    expect(mockOnTextChange).toHaveBeenCalledWith('New text');
  });

  it('should render with secureTextEntry when isPasswordField is true', () => {
    const mockOnTextChange = jest.fn();
    const { getByPlaceholderText } = render(
      <InputTextMemo
        placeholderText="Password"
        isPasswordField={true}
        onTextChange={mockOnTextChange}
      />
    );

    const input = getByPlaceholderText('Password');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('should use the provided keyboardType', () => {
    const mockOnTextChange = jest.fn();
    const { getByPlaceholderText } = render(
      <InputTextMemo
        placeholderText="Enter number"
        inputTextType="numeric"
        onTextChange={mockOnTextChange}
      />
    );

    const input = getByPlaceholderText('Enter number');
    expect(input.props.keyboardType).toBe('numeric');
  });

  it('should apply the placeholderTextColor', () => {
    const mockOnTextChange = jest.fn();
    const { getByPlaceholderText } = render(
      <InputTextMemo
        placeholderText="Enter text"
        placeholderColorText="gray"
        onTextChange={mockOnTextChange}
      />
    );

    const input = getByPlaceholderText('Enter text');
    expect(input.props.placeholderTextColor).toBe('gray');
  });
});
