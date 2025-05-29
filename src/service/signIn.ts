import auth from '@react-native-firebase/auth';
import { ISignIn } from '../interfaces/ISignIn';

interface ISignInServiceProps extends ISignIn {}

export const signInService = async ({
  email,
  password,
}: ISignInServiceProps) => {
  const userCredential = await auth().signInWithEmailAndPassword(email, password);

  return userCredential.user;
};