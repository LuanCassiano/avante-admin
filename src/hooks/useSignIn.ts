import { ISignIn } from "../interfaces/ISignIn";
import { signInService } from "../service/signIn";
import { useAuthStore } from "../zustand/useAuthStore";
import { useToast } from "./useToast";

interface ISignInHook extends ISignIn {}

export function useSignIn() {
  const { error } = useToast();

  const signIn = async ({
    email,
    password
  }: ISignInHook) => {
    const setUser = useAuthStore((s) => s.setUser);

    if (!email || !password) {
      error('Erro ao realizar o login');
      return;
    }

    try {
      const response = await signInService({ email, password });

      setUser({ email: response.email, uid: response.uid })
    } catch (e) {
      error('Erro ao realizar o login');
    }
  }

  return { signIn }
}
