import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ISignUp } from '../interfaces/ISignUp';

interface ISignUpServiceProps extends ISignUp {}

export const signUpService = async ({
  email,
  name,
  password,
}: ISignUpServiceProps) => {
  const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  const uid = userCredential.user.uid;

  await firestore().collection('users').doc(uid).set({
    name,
    email,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  return uid;
};