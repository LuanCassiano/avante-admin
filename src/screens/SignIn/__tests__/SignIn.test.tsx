import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import SignIn from "../SignIn";

import { useSignIn } from '../../../hooks/useSignIn';
import { TInputTextProps } from "../../../components/Input/InputText/InputText";

jest.mock('../../../hooks/useSignIn', () => ({
  useSignIn: jest.fn(),
}))

jest.mock('../../../components/Input/InputText/InputText', () => {
  const { TextInput } = require('react-native');
  return {
    InputTextMemo: ({ inputValue, onTextChange, placeholderText, inputName }: TInputTextProps) => (
      <TextInput
        value={inputValue}
        onChangeText={onTextChange}
        placeholder={placeholderText}
        testID={inputName}
      />
    ),
  };
});

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  return {
    FontAwesome5: (props: any) => <></>,
  };
});

describe('Sign In Screen', () => {
  const mockSignIn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSignIn as jest.Mock).mockReturnValue({ signIn: mockSignIn });
  });

  it('snapshot', () => {
    const tree = render(<SignIn />)

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render the login screen correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
  
    expect(getByPlaceholderText('Digite seu e-mail')).toBeTruthy();
    expect(getByPlaceholderText('Digite sua senha')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
  });

  it('should show validation errors when fields are empty and submit is pressed', async () => {
    const { getByText, findByText } = render(<SignIn />);

    fireEvent.press(getByText('Entrar'));
  
    expect(await findByText('Insira seu e-mail')).toBeTruthy();
    expect(await findByText('Insira sua senha')).toBeTruthy();
  });

  it('should call signIn function with correct values', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    
    fireEvent.changeText(getByPlaceholderText('Digite seu e-mail'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Digite sua senha'), 'password123');
    
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });
});
