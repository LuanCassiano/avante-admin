import { renderHook, act } from '@testing-library/react-hooks';
import { useSignIn } from '../useSignIn';
import { signInService } from '../../service/signIn';
import { useAuthStore } from '../../zustand/useAuthStore';
import { useToast } from '../useToast';

jest.mock('../../service/signIn');
jest.mock('../../zustand/useAuthStore');
jest.mock('../useToast');

describe('useSignIn', () => {
  const mockSetUser = jest.fn();
  const mockError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as jest.Mock).mockImplementation((selector) => selector({ setUser: mockSetUser }));
    (useToast as jest.Mock).mockReturnValue({ error: mockError });
  });

  it('should call signInService and setUser on successful sign-in', async () => {
    const mockResponse = { email: 'test@example.com', uid: '12345' };
    (signInService as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useSignIn());

    await act(async () => {
      await result.current.signIn({ email: 'test@example.com', password: 'password123' });
    });

    expect(signInService).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    expect(mockSetUser).toHaveBeenCalledWith({ email: 'test@example.com', uid: '12345' });
    expect(mockError).not.toHaveBeenCalled();
  });

  it('should call error toast on sign-in failure', async () => {
    const mockErrorMessage = 'Erro ao realizar o login';
    (signInService as jest.Mock).mockRejectedValue(new Error('Sign-in failed'));

    const { result } = renderHook(() => useSignIn());

    await act(async () => {
      await result.current.signIn({ email: 'test@example.com', password: 'password123' });
    });

    expect(signInService).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockError).toHaveBeenCalledWith(mockErrorMessage);
  });
});
