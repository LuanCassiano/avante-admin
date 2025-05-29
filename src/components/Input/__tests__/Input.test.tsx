import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InputContainer from '../Input';
import { Text } from 'react-native';

describe('InputContainer Component', () => {
  const mockPressable = jest.fn();
  const mockLeftIcon = <Text>Left Icon</Text>;
  const mockRightIcon = <Text>Right Icon</Text>;

  it('snapshot', () => {
    const tree = render(<InputContainer />)

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render children and left icon', () => {
    const { getByText } = render(
      <InputContainer leftIcon={mockLeftIcon}>
        <Text>Child Content</Text>
      </InputContainer>
    );

    expect(getByText('Left Icon')).toBeTruthy();
    expect(getByText('Child Content')).toBeTruthy();
  });

  it('should render right icon when provided', () => {
    const { getByText } = render(
      <InputContainer leftIcon={mockLeftIcon} rightIcon={mockRightIcon}>
        <Text>Child Content</Text>
      </InputContainer>
    );

    expect(getByText('Right Icon')).toBeTruthy();
  });

  it('should call pressable function when right icon is pressed', () => {
    const { getByText } = render(
      <InputContainer
        leftIcon={mockLeftIcon}
        rightIcon={mockRightIcon}
        pressable={mockPressable}
      >
        <Text>Child Content</Text>
      </InputContainer>
    );

    fireEvent.press(getByText('Right Icon'));
    expect(mockPressable).toHaveBeenCalled();
  });

  it('should display error message when error and touched are true', () => {
    const { getByText } = render(
      <InputContainer
        leftIcon={mockLeftIcon}
        error="Error Message"
        touched={true}
      >
        <Text>Child Content</Text>
      </InputContainer>
    );

    expect(getByText('Error Message')).toBeTruthy();
  });

  it('should not display error message when touched is false', () => {
    const { queryByText } = render(
      <InputContainer
        leftIcon={mockLeftIcon}
        error="Error Message"
        touched={false}
      >
        <Text>Child Content</Text>
      </InputContainer>
    );

    expect(queryByText('Error Message')).toBeNull();
  });
});