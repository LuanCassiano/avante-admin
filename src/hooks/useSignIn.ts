import { ISignUp } from "../interfaces/ISignUp";
import { signUpService } from "../service/signUp";
import { useToast } from "./useToast";

interface ISignUpHook extends ISignUp {}

export function useSignIn() {
  const { error, success } = useToast();

  const signUp = async ({
    email,
    name,
    password
  }: ISignUpHook) => {
    try {
      await signUpService({ email, name, password });
  
      success('Cadastro realizado com sucesso!')
    } catch (e) {
      error('Erro ao realizar o cadastro');
    }
  }

  return { signUp }
}